const { contextBridge, ipcRenderer } = require('electron');

// The only bridge between the page and the disk.
contextBridge.exposeInMainWorld('recorder', {
  storagePath: () => ipcRenderer.invoke('storage:path'),
  loadState: () => ipcRenderer.invoke('state:load'),
  saveState: (state) => ipcRenderer.invoke('state:save', state),
  writeFile: (relative, data) =>
    ipcRenderer.invoke('file:write', relative, data),
  readFile: (relative) => ipcRenderer.invoke('file:read', relative),
  deleteFile: (relative) => ipcRenderer.invoke('file:delete', relative),
  openFolder: (relative) => ipcRenderer.invoke('folder:open', relative),
});
