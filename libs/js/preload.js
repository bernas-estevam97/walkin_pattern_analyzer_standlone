const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showCloseWarning: () => ipcRenderer.invoke('showCloseWarning'),
  showNavigationWarning: () => ipcRenderer.invoke('showNavigationWarning'),
  forceClose: () => ipcRenderer.invoke('force-close'),
  openExternal: (url) => shell.openExternal(url)
});
