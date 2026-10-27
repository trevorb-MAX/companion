const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const window = new BrowserWindow({
        width: 320,
        height: 440,
        transparent: true,
        frame: false,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        hasShadow: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        backgroundColor: '#00000000',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    window.loadFile(path.join(__dirname, 'index.html'));
    window.setAlwaysOnTop(true, 'floating');
}

ipcMain.on('move-window-by', (event, deltaX, deltaY) => {
    const window = BrowserWindow.fromWebContents(event.sender);

    if (!window || window.isDestroyed()) return;

    const [x, y] = window.getPosition();

    window.setPosition(
        Math.round(x + deltaX),
        Math.round(y + deltaY)
    );
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});