const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showUnsavedWarning: () => ipcRenderer.invoke('show-unsaved-warning'),
  forceClose: () => ipcRenderer.invoke('force-close')
});
