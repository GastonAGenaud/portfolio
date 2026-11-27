// Electron main process: the window, microphone permission, and the files the
// recorder keeps under <home>/Narration Recorder. Not Documents: it is often
// synced to the cloud, and the takes add up to several GB.
const { app, BrowserWindow, ipcMain, session, shell } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');

const storage = () => path.join(app.getPath('home'), 'Narration Recorder');

// Every path the page sends is relative to the storage folder and must stay in it.
const inStorage = (relative) => {
  const root = storage();
  const full = path.resolve(root, relative);
  if (full !== root && !full.startsWith(root + path.sep)) {
    throw new Error(`Path outside storage: ${relative}`);
  }
  return full;
};

const writeFile = async (relative, data) => {
  const full = inStorage(relative);
  await fs.mkdir(path.dirname(full), { recursive: true });
  // Write then rename, so a crash never leaves half a file behind.
  await fs.writeFile(`${full}.tmp`, data);
  await fs.rename(`${full}.tmp`, full);
};

ipcMain.handle('storage:path', () => storage());

ipcMain.handle('state:load', async () => {
  try {
    return JSON.parse(await fs.readFile(inStorage('state.json'), 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
});

ipcMain.handle('state:save', (_event, state) =>
  writeFile('state.json', JSON.stringify(state, null, 2))
);

ipcMain.handle('file:write', (_event, relative, data) =>
  writeFile(relative, Buffer.from(data))
);

ipcMain.handle('file:read', async (_event, relative) => {
  const buffer = await fs.readFile(inStorage(relative));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
});

ipcMain.handle('file:delete', (_event, relative) =>
  fs.rm(inStorage(relative), { force: true })
);

ipcMain.handle('folder:open', async (_event, relative = '.') => {
  const full = inStorage(relative);
  await fs.mkdir(full, { recursive: true });
  return shell.openPath(full);
});

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1600,
    height: 980,
    minWidth: 1200,
    minHeight: 760,
    backgroundColor: '#0b1120',
    autoHideMenuBar: true,
    title: 'Narration Recorder',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  window.loadFile(path.join(__dirname, 'app', 'index.html'));
};

app.whenReady().then(() => {
  // The page only ever asks for the microphone.
  const allowed = new Set(['media', 'audioCapture']);
  session.defaultSession.setPermissionRequestHandler(
    (_contents, permission, callback) => callback(allowed.has(permission))
  );
  session.defaultSession.setPermissionCheckHandler((_contents, permission) =>
    allowed.has(permission)
  );
  createWindow();
});

app.on('window-all-closed', () => app.quit());
