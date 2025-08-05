const {contextBridge, ipcRenderer} = require('electron');

let openUrlHandler;
ipcRenderer.on('open-url-in-main-webview', (_, url) => {
  console.log(url);
  openUrlHandler && openUrlHandler(url);
})

contextBridge.exposeInMainWorld('api', {
  setOpacity: (value) => ipcRenderer.send('set-opacity', value),
  setAlwaysOnTop: (enabled) => ipcRenderer.send('set-always-on-top', enabled),
  closeWindow: () => ipcRenderer.send('close-window'),
  onUrlOpen: (callback) => openUrlHandler = callback,
});
