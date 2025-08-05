const {app, BrowserWindow, ipcMain, webContents} = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('set-opacity', (_, value) => {
    if (mainWindow) mainWindow.setOpacity(value);
  });

  ipcMain.on('set-always-on-top', (_, enabled) => {
    if (mainWindow) mainWindow.setAlwaysOnTop(enabled);
  });

  ipcMain.on('close-window', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler((e) => {
    console.log(e.url);
    mainWindow.webContents.send('open-url-in-main-webview', e.url);
    // 拦截任何弹窗请求
    return {action: 'deny'};
  });
});
