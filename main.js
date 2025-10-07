require("update-electron-app")();

const { app, BrowserWindow, ipcMain, dialog } = require("electron");

const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "./libs/img/mouse-animal.ico",
    webPreferences: {
      preload: path.join(__dirname, "libs/js/preload.js"), // ✅ absolute path
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile("templates/choose_version.html");
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



ipcMain.handle('show-unsaved-warning', async (event) => {
  const result = await dialog.showMessageBox({
    type: 'warning',
    buttons: ['Cancel', 'Quit'],
    defaultId: 1,
    cancelId: 0,
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to quit?'
  });

  return result.response; // 0 = Cancel, 1 = Quit
});


ipcMain.handle('force-close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});
