import type { Publication } from './types';

// Every host name, user, address and project below is a placeholder on purpose.

const architecture = `iPhone (Moshi)
   │  mosh/SSH sobre WireGuard (Tailscale)
   ▼
host Linux / WSL2 ── sin puertos abiertos a internet
   ├─ sshd (solo llaves) + mosh-server
   ├─ herdr server        → dueño de las terminales (systemd --user)
   │    ├─ pane: pi        → modelo local (llama.cpp en 127.0.0.1)
   │    └─ pane: claude    → Claude Code
   ├─ llama-server        → API OpenAI-compatible solo en loopback
   └─ moshi-hook serve    → recibe eventos de los agentes y los
                            empuja al teléfono (aprobaciones, inbox)`;

const architectureEn = `iPhone (Moshi)
   │  mosh/SSH over WireGuard (Tailscale)
   ▼
Linux / WSL2 host ── no ports open to the internet
   ├─ sshd (keys only) + mosh-server
   ├─ herdr server        → owns the terminals (systemd --user)
   │    ├─ pane: pi        → local model (llama.cpp on 127.0.0.1)
   │    └─ pane: claude    → Claude Code
   ├─ llama-server        → OpenAI-compatible API on loopback only
   └─ moshi-hook serve    → receives agent events and pushes them
                            to the phone (approvals, inbox)`;

const tailscaleInstall = `curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up            # login en el navegador, una sola vez
tailscale status             # el host y el teléfono tienen que aparecer`;

const tailscaleInstallEn = `curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up            # browser login, once
tailscale status             # the host and the phone must both show up`;

const wslConf = `# /etc/wsl.conf (dentro de la distro)
[boot]
systemd=true

# %UserProfile%\\.wslconfig (en Windows)
[wsl2]
vmIdleTimeout=-1   # que la VM no se duerma con los agentes corriendo`;

const wslConfEn = `# /etc/wsl.conf (inside the distro)
[boot]
systemd=true

# %UserProfile%\\.wslconfig (on Windows)
[wsl2]
vmIdleTimeout=-1   # keep the VM awake while agents run`;

const sshd = `# /etc/ssh/sshd_config.d/10-hardening.conf
PasswordAuthentication no
PermitRootLogin no`;

const acl = `{
  "tagOwners": { "tag:agents": ["autogroup:admin"] },
  "acls": [
    {
      "action": "accept",
      "src": ["autogroup:member"],
      "dst": ["tag:agents:22", "tag:agents:60000-61000"]
    }
  ]
}`;

const ufw = `sudo ufw default deny incoming
sudo ufw allow in on tailscale0 to any port 22 proto tcp
sudo ufw allow in on tailscale0 to any port 60000:61000 proto udp
sudo ufw enable`;

const herdrInstall = `curl -fsSL https://herdr.dev/install.sh | sh
herdr --version`;

const herdrUnit = `# ~/.config/systemd/user/herdr.service
[Unit]
Description=herdr server
After=network-online.target

[Service]
ExecStart=%h/.local/bin/herdr server
Restart=on-failure
RestartSec=5
WorkingDirectory=%h

[Install]
WantedBy=default.target`;

const herdrEnable = `systemctl --user daemon-reload
systemctl --user enable --now herdr
sudo loginctl enable-linger "$USER"   # sigue vivo sin sesión abierta`;

const herdrEnableEn = `systemctl --user daemon-reload
systemctl --user enable --now herdr
sudo loginctl enable-linger "$USER"   # keeps running with no login session`;

const herdrConfig = `# ~/.config/herdr/config.toml
[keys]
prefix = "ctrl+a"
previous_agent = "prefix+alt+k"
next_agent = "prefix+alt+j"
focus_agent = "prefix+ctrl+1..9"

[ui]
status_indicators = "dots"`;

const herdrSessions = `herdr session attach trabajo     # una sesión por contexto
herdr session attach personal
herdr agent list                 # qué agentes ve y en qué estado`;

const herdrSessionsEn = `herdr session attach work        # one session per context
herdr session attach personal
herdr agent list                 # which agents it sees and their state`;

const piInstall = `curl -fsSL https://pi.dev/install.sh | sh
pi --version`;

const piModels = `// ~/.pi/agent/models.json
{
  "providers": {
    "local": {
      "baseUrl": "http://127.0.0.1:8080/v1",
      "api": "openai-completions",
      "apiKey": "local",
      "models": [
        { "id": "<tu-modelo>", "name": "Modelo local", "contextWindow": 65536 }
      ]
    }
  }
}`;

const piModelsEn = `// ~/.pi/agent/models.json
{
  "providers": {
    "local": {
      "baseUrl": "http://127.0.0.1:8080/v1",
      "api": "openai-completions",
      "apiKey": "local",
      "models": [
        { "id": "<your-model>", "name": "Local model", "contextWindow": 65536 }
      ]
    }
  }
}`;

const llamaUnit = `# ~/.config/systemd/user/llama-router.service
[Service]
ExecStart=%h/.local/bin/llama-server --models-preset %h/.config/llama.cpp/presets.ini \\
  --host 127.0.0.1 --port 8080
Restart=on-failure

[Install]
WantedBy=default.target`;

const moshiPair = `# En el teléfono: Moshi → Settings → Hooks → copiar el token de pairing
moshi-hook pair --token <token-de-pairing>
moshi-hook host setup          # Easy Pair: autoriza la llave SSH de Moshi
moshi-hook install             # hooks de Claude Code y demás CLIs detectados
moshi-hook install --target pi # extensión para pi`;

const moshiPairEn = `# On the phone: Moshi → Settings → Hooks → copy the pairing token
moshi-hook pair --token <pairing-token>
moshi-hook host setup          # Easy Pair: authorizes Moshi's SSH key
moshi-hook install             # hooks for Claude Code and other detected CLIs
moshi-hook install --target pi # extension for pi`;

const moshiUnit = `# ~/.config/systemd/user/moshi-hook.service
[Service]
ExecStart=%h/.local/bin/moshi-hook serve
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target`;

const moshiCheck = `systemctl --user enable --now moshi-hook
moshi-hook doctor     # qué funciona en este host y cómo arreglar lo que falta
moshi-hook logs -f`;

const moshiCheckEn = `systemctl --user enable --now moshi-hook
moshi-hook doctor     # what works on this host and how to fix the rest
moshi-hook logs -f`;

const herdrIntegrations = `herdr integration install pi
herdr integration install claude
herdr integration status`;

const daily = `# desde Moshi, conectado por mosh al host del tailnet
herdr session attach trabajo
#   prefix+alt+j / prefix+alt+k   → saltar entre agentes
#   prefix+q                      → salir dejando todo corriendo`;

const dailyEn = `# from Moshi, connected over mosh to the tailnet host
herdr session attach work
#   prefix+alt+j / prefix+alt+k   → jump between agents
#   prefix+q                      → detach, everything keeps running`;

export const moshiPiHerdrTailscale: Publication = {
  slug: 'moshi-pi-herdr-tailscale',
  date: '2026-10-29',
  readingMinutes: 12,
  kind: { es: 'Guía', en: 'Guide' },
  tags: ['Moshi', 'pi', 'herdr', 'Tailscale', 'mosh', 'AI agents'],
  title: {
    es: 'Agentes de IA desde el teléfono: Moshi + pi + herdr sobre Tailscale',
    en: 'AI agents from your phone: Moshi + pi + herdr over Tailscale',
  },
  summary: {
    es: 'Cómo armé un host para correr agentes (pi con un modelo local y Claude Code) dentro de herdr, controlarlos desde el iPhone con Moshi y aprobar acciones con push, todo dentro de un tailnet sin abrir un solo puerto a internet.',
    en: 'How I set up a host that runs coding agents (pi on a local model and Claude Code) inside herdr, drives them from the iPhone with Moshi and approves actions over push, all inside a tailnet without opening a single port to the internet.',
  },
  body: {
    es: [
      {
        type: 'p',
        text: 'La idea es simple: los agentes corren en una máquina potente que está siempre prendida, y yo los manejo desde el teléfono. Si se corta el Wi-Fi o cambio de red, la sesión sigue; si un agente necesita permiso para algo, me llega una notificación y lo apruebo desde la pantalla bloqueada.',
      },
      {
        type: 'note',
        text: 'Todos los nombres de host, usuarios, direcciones y proyectos de esta guía son de ejemplo. No hace falta (ni conviene) publicar los tuyos.',
      },
      { type: 'h2', text: 'Las piezas' },
      {
        type: 'list',
        items: [
          '**Moshi**: terminal para iOS con mosh nativo, pensada para agentes. Trae un inbox de aprobaciones, Live Activity y vista de chat por agente.',
          '**moshi-hook**: el daemon del lado del host. Instala los hooks de cada agente, escucha en un socket local y mantiene el canal con la app para las aprobaciones.',
          '**herdr**: un gestor de workspaces de terminal para agentes, al estilo tmux. Un server en segundo plano es dueño de los paneles, así que nada muere cuando te desconectás, y la barra lateral muestra si cada agente está trabajando, bloqueado o terminado.',
          '**pi**: un harness de agente minimalista y extensible (extensiones en TypeScript, skills, temas). Lo uso con un modelo local servido por llama.cpp.',
          '**Tailscale**: la red privada (WireGuard) que une el teléfono con el host. Es lo que permite no exponer SSH ni mosh a internet.',
        ],
      },
      { type: 'code', code: architecture, caption: 'Cómo se conecta todo' },

      { type: 'h2', text: '1. Red: Tailscale primero' },
      {
        type: 'p',
        text: 'Instalá Tailscale en el host y la app de Tailscale en el iPhone, con la misma cuenta. Desde ese momento el teléfono ve al host por su nombre de MagicDNS, y nada más en internet lo ve.',
      },
      { type: 'code', lang: 'bash', code: tailscaleInstall },
      {
        type: 'p',
        text: 'Si el host es WSL2, Tailscale corre dentro de la distro. Activá systemd para que los servicios arranquen solos y evitá que la VM se suspenda:',
      },
      { type: 'code', lang: 'ini', code: wslConf },
      { type: 'h3', text: 'Endurecer el acceso' },
      {
        type: 'p',
        text: 'SSH solo con llaves y sin root. Moshi usa SSH para el arranque de mosh, así que esto aplica a las dos cosas:',
      },
      { type: 'code', lang: 'ini', code: sshd },
      {
        type: 'p',
        text: 'En la política del tailnet, limitá quién llega al host y a qué puertos: 22/TCP para SSH y 60000-61000/UDP para mosh. Un ejemplo con un tag para las máquinas de agentes:',
      },
      {
        type: 'code',
        lang: 'json',
        code: acl,
        caption: 'Política del tailnet (ejemplo)',
      },
      {
        type: 'p',
        text: 'El host se etiqueta al conectarlo, con `sudo tailscale up --advertise-tags=tag:agents`.',
      },
      {
        type: 'p',
        text: 'Si además querés un firewall local, dejá entrar solo por la interfaz `tailscale0`:',
      },
      { type: 'code', lang: 'bash', code: ufw },
      {
        type: 'note',
        text: 'No hace falta Tailscale Funnel ni port forwarding en el router. Todo el tráfico va dentro del tailnet.',
      },

      { type: 'h2', text: '2. herdr: terminales que no se mueren' },
      { type: 'code', lang: 'bash', code: herdrInstall },
      {
        type: 'p',
        text: 'Lo corro como servicio de usuario para que el server esté vivo aunque no haya nadie conectado:',
      },
      { type: 'code', lang: 'ini', code: herdrUnit },
      { type: 'code', lang: 'bash', code: herdrEnable },
      {
        type: 'p',
        text: 'Mi configuración base: prefijo `ctrl+a` (más cómodo en el teclado del teléfono que el default) y atajos para saltar entre agentes:',
      },
      { type: 'code', lang: 'toml', code: herdrConfig },
      {
        type: 'p',
        text: 'Separo los contextos en sesiones con nombre; cada una es un espacio aislado con sus propios workspaces. Así lo de trabajo y lo personal nunca se cruzan en la misma barra lateral:',
      },
      { type: 'code', lang: 'bash', code: herdrSessions },
      {
        type: 'p',
        text: 'Las integraciones de herdr son opcionales: suman estado del ciclo de vida o restauración de sesión según el agente.',
      },
      { type: 'code', lang: 'bash', code: herdrIntegrations },

      { type: 'h2', text: '3. pi con un modelo local' },
      { type: 'code', lang: 'bash', code: piInstall },
      {
        type: 'p',
        text: 'llama.cpp expone una API compatible con OpenAI. La dejo escuchando solo en `127.0.0.1`, así el modelo no queda accesible ni siquiera desde el tailnet:',
      },
      { type: 'code', lang: 'ini', code: llamaUnit },
      {
        type: 'p',
        text: 'Después declaro el proveedor en pi. El `apiKey` es un valor de relleno, porque el server local no lo valida:',
      },
      { type: 'code', lang: 'json', code: piModels },
      {
        type: 'p',
        text: 'En `~/.pi/agent/settings.json` dejo ese proveedor como default (`defaultProvider` y `defaultModel`). Si no tenés GPU, el mismo esquema funciona apuntando pi a cualquier proveedor en la nube.',
      },

      { type: 'h2', text: '4. moshi-hook: notificaciones y aprobaciones' },
      {
        type: 'p',
        text: 'Este es el puente entre los agentes y el teléfono. Primero se empareja el host con la app y se instalan los hooks:',
      },
      { type: 'code', lang: 'bash', code: moshiPair },
      {
        type: 'p',
        text: 'Para Claude Code, `install` agrega hooks a `~/.claude/settings.json` (pedidos de permiso, preguntas, fin de turno, inicio y fin de sesión). Para pi escribe una extensión en `~/.pi/agent/extensions/`. Si el daemon no está corriendo, los hooks fallan en silencio y el agente sigue normal.',
      },
      { type: 'code', lang: 'ini', code: moshiUnit },
      { type: 'code', lang: 'bash', code: moshiCheck },
      {
        type: 'note',
        text: '`moshi-hook doctor` es el mejor primer paso cuando algo no llega: marca hooks desactualizados (por ejemplo después de actualizar pi) y te da el comando exacto para arreglarlo. Recordá reiniciar los agentes que ya estaban corriendo: leen los hooks al arrancar.',
      },

      { type: 'h2', text: '5. Conectar desde el teléfono' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Con Tailscale activo en el iPhone, agregá el host en Moshi usando su nombre de MagicDNS y elegí mosh.',
          'Usá la llave que dejó `moshi-hook host setup` (o la tuya). No hay contraseñas.',
          'Al conectar, el selector de sesiones de Moshi muestra las sesiones de herdr; elegí una y estás adentro.',
          'Habilitá las notificaciones de Moshi en iOS y la Live Activity en Moshi → Settings → Hooks.',
        ],
      },
      { type: 'code', lang: 'bash', code: daily, caption: 'El día a día' },
      {
        type: 'p',
        text: 'Cuando un agente pide permiso (correr un comando, salir del modo plan, responder una pregunta), aparece en el inbox de Moshi y lo aprobás o rechazás desde ahí. La vista de diff muestra los cambios del repo del agente sin abrir nada más.',
      },

      { type: 'h2', text: 'Qué no publicar' },
      {
        type: 'p',
        text: 'Si vas a compartir tu configuración (un post, un repo de dotfiles, una captura), revisá esto antes:',
      },
      {
        type: 'list',
        items: [
          'El nombre del tailnet (`*.ts.net`), las IPs 100.x y los nombres de máquina.',
          'Tokens de pairing, `auth.json`, claves de API y llaves SSH: nunca en un repo, ni siquiera en uno privado.',
          'Nombres de clientes o proyectos en presets, sesiones, workspaces o temas de herdr. Usá nombres genéricos.',
          'Rutas absolutas con tu usuario (`/home/<usuario>/...`); usá `~` o `%h` en las units de systemd.',
          'Capturas de la barra lateral de herdr o del inbox de Moshi: muestran títulos de terminal, ramas y nombres de repos.',
        ],
      },

      { type: 'h2', text: 'Problemas comunes' },
      {
        type: 'list',
        items: [
          '**No llegan notificaciones**: correr `moshi-hook doctor`, revisar permisos de notificación en iOS y reiniciar el agente.',
          '**El agente no aparece en Moshi**: tiene que correr dentro de herdr o tmux; en una shell suelta no se lo puede seguir.',
          '**mosh no conecta pero SSH sí**: falta abrir el rango UDP 60000-61000 en la política del tailnet o en el firewall.',
          '**En WSL2 todo se cae al rato**: revisar `vmIdleTimeout` y que systemd esté activo (`systemctl --user status herdr`).',
        ],
      },
    ],
    en: [
      {
        type: 'p',
        text: 'The idea is simple: agents run on a powerful machine that is always on, and I drive them from the phone. If the Wi-Fi drops or I switch networks, the session survives; if an agent needs permission for something, I get a notification and approve it from the lock screen.',
      },
      {
        type: 'note',
        text: 'Every host name, user, address and project in this guide is an example. There is no need (and no reason) to publish yours.',
      },
      { type: 'h2', text: 'The pieces' },
      {
        type: 'list',
        items: [
          '**Moshi**: an iOS terminal with native mosh, built for agents. It adds an approvals inbox, a Live Activity and a per-agent chat view.',
          "**moshi-hook**: the host-side daemon. It installs each agent's hooks, listens on a local socket and keeps the channel to the app for approvals.",
          '**herdr**: a tmux-style terminal workspace manager for agents. A background server owns the panes, so nothing dies when you disconnect, and the sidebar shows whether each agent is working, blocked or done.',
          '**pi**: a minimal, extensible agent harness (TypeScript extensions, skills, themes). I run it against a local model served by llama.cpp.',
          '**Tailscale**: the private WireGuard network that joins the phone and the host. It is what lets SSH and mosh stay off the internet.',
        ],
      },
      { type: 'code', code: architectureEn, caption: 'How it fits together' },

      { type: 'h2', text: '1. Network: Tailscale first' },
      {
        type: 'p',
        text: 'Install Tailscale on the host and the Tailscale app on the iPhone, with the same account. From then on the phone reaches the host by its MagicDNS name, and nothing else on the internet does.',
      },
      { type: 'code', lang: 'bash', code: tailscaleInstallEn },
      {
        type: 'p',
        text: 'If the host is WSL2, Tailscale runs inside the distro. Turn on systemd so services start on their own, and stop the VM from suspending:',
      },
      { type: 'code', lang: 'ini', code: wslConfEn },
      { type: 'h3', text: 'Lock down access' },
      {
        type: 'p',
        text: 'SSH with keys only and no root. Moshi uses SSH to bootstrap mosh, so this covers both:',
      },
      { type: 'code', lang: 'ini', code: sshd },
      {
        type: 'p',
        text: 'In the tailnet policy, limit who reaches the host and on which ports: 22/TCP for SSH and 60000-61000/UDP for mosh. An example with a tag for agent machines:',
      },
      {
        type: 'code',
        lang: 'json',
        code: acl,
        caption: 'Tailnet policy (example)',
      },
      {
        type: 'p',
        text: 'Tag the host when you bring it up, with `sudo tailscale up --advertise-tags=tag:agents`.',
      },
      {
        type: 'p',
        text: 'If you also want a local firewall, only allow traffic in on the `tailscale0` interface:',
      },
      { type: 'code', lang: 'bash', code: ufw },
      {
        type: 'note',
        text: 'You need neither Tailscale Funnel nor port forwarding on the router. All traffic stays inside the tailnet.',
      },

      { type: 'h2', text: '2. herdr: terminals that do not die' },
      { type: 'code', lang: 'bash', code: herdrInstall },
      {
        type: 'p',
        text: 'I run it as a user service so the server stays alive with nobody attached:',
      },
      { type: 'code', lang: 'ini', code: herdrUnit },
      { type: 'code', lang: 'bash', code: herdrEnableEn },
      {
        type: 'p',
        text: 'My base config: `ctrl+a` as prefix (easier on a phone keyboard than the default) and shortcuts to jump between agents:',
      },
      { type: 'code', lang: 'toml', code: herdrConfig },
      {
        type: 'p',
        text: 'I split contexts into named sessions; each one is an isolated namespace with its own workspaces, so work and personal never share a sidebar:',
      },
      { type: 'code', lang: 'bash', code: herdrSessionsEn },
      {
        type: 'p',
        text: 'herdr integrations are optional: depending on the agent they add lifecycle state, session restore or both.',
      },
      { type: 'code', lang: 'bash', code: herdrIntegrations },

      { type: 'h2', text: '3. pi on a local model' },
      { type: 'code', lang: 'bash', code: piInstall },
      {
        type: 'p',
        text: 'llama.cpp exposes an OpenAI-compatible API. I keep it bound to `127.0.0.1`, so the model is not reachable even from the tailnet:',
      },
      { type: 'code', lang: 'ini', code: llamaUnit },
      {
        type: 'p',
        text: 'Then I declare the provider in pi. The `apiKey` is a filler value; the local server does not check it:',
      },
      { type: 'code', lang: 'json', code: piModelsEn },
      {
        type: 'p',
        text: 'In `~/.pi/agent/settings.json` I make that provider the default (`defaultProvider` and `defaultModel`). Without a GPU, the same setup works by pointing pi at any cloud provider.',
      },

      { type: 'h2', text: '4. moshi-hook: notifications and approvals' },
      {
        type: 'p',
        text: 'This is the bridge between the agents and the phone. First pair the host with the app and install the hooks:',
      },
      { type: 'code', lang: 'bash', code: moshiPairEn },
      {
        type: 'p',
        text: 'For Claude Code, `install` adds hooks to `~/.claude/settings.json` (permission requests, questions, end of turn, session start and end). For pi it writes an extension under `~/.pi/agent/extensions/`. When the daemon is not running, the hooks fail silently and the agent carries on.',
      },
      { type: 'code', lang: 'ini', code: moshiUnit },
      { type: 'code', lang: 'bash', code: moshiCheckEn },
      {
        type: 'note',
        text: '`moshi-hook doctor` is the best first step when something does not arrive: it flags outdated hooks (for example after updating pi) and prints the exact fix. Restart agents that were already running: they read their hooks at startup.',
      },

      { type: 'h2', text: '5. Connect from the phone' },
      {
        type: 'list',
        ordered: true,
        items: [
          'With Tailscale on in the iPhone, add the host in Moshi by its MagicDNS name and pick mosh.',
          'Use the key that `moshi-hook host setup` authorized (or your own). No passwords.',
          "On connect, Moshi's session picker lists the herdr sessions; pick one and you are in.",
          'Allow Moshi notifications in iOS and turn on the Live Activity in Moshi → Settings → Hooks.',
        ],
      },
      { type: 'code', lang: 'bash', code: dailyEn, caption: 'Day to day' },
      {
        type: 'p',
        text: "When an agent asks for permission (run a command, leave plan mode, answer a question), it shows up in the Moshi inbox and you approve or reject it there. The diff view shows the changes in the agent's repository without opening anything else.",
      },

      { type: 'h2', text: 'What not to publish' },
      {
        type: 'p',
        text: 'If you share your setup (a post, a dotfiles repo, a screenshot), check this first:',
      },
      {
        type: 'list',
        items: [
          'Your tailnet name (`*.ts.net`), the 100.x addresses and machine names.',
          'Pairing tokens, `auth.json`, API keys and SSH keys: never in a repo, not even a private one.',
          'Client or project names in herdr presets, sessions, workspaces or themes. Use generic names.',
          'Absolute paths with your user (`/home/<user>/...`); use `~` or `%h` in systemd units.',
          'Screenshots of the herdr sidebar or the Moshi inbox: they show terminal titles, branches and repo names.',
        ],
      },

      { type: 'h2', text: 'Common problems' },
      {
        type: 'list',
        items: [
          '**No notifications**: run `moshi-hook doctor`, check iOS notification permissions and restart the agent.',
          '**The agent does not show up in Moshi**: it has to run inside herdr or tmux; a bare shell cannot be followed.',
          '**mosh fails but SSH works**: the 60000-61000 UDP range is not open in the tailnet policy or the firewall.',
          '**On WSL2 everything dies after a while**: check `vmIdleTimeout` and that systemd is on (`systemctl --user status herdr`).',
        ],
      },
    ],
  },
};
