const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopCompanion', {
    moveWindowBy: (deltaX, deltaY) => {
        ipcRenderer.send('move-window-by', deltaX, deltaY);
    }
});