require("update-electron-app")();

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'libs/img/mouse-animal.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'libs/js/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile('templates/choose_version.html');

  // Open target="_blank" links in the user's default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'deny' };
  });

  // Optional: Open navigated external links in browser
  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http') && !url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC: Handle quit confirmation
ipcMain.handle('showCloseWarning', async () => {
  const result = await dialog.showMessageBox({
    type: 'warning',
    buttons: ['Cancel', 'Quit'],
    defaultId: 1,
    cancelId: 0,
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to quit the application?'
  });
  return result.response;
});

// IPC: Handle navigation confirmation
ipcMain.handle('showNavigationWarning', async () => {
  const result = await dialog.showMessageBox({
    type: 'question',
    buttons: ['Stay', 'Continue'],
    defaultId: 1,
    cancelId: 0,
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Do you want to leave this page?'
  });
  return result.response;
});

// IPC: Force close the window
ipcMain.handle('force-close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});
