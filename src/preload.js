const { contextBridge, ipcRenderer } = require('electron');

const openLoginWin = () => ipcRenderer.invoke('on-open-loginWin');
const closeLoginWin = () => ipcRenderer.invoke('on-close-loginWin');
const handleCounter = (callback) => ipcRenderer.on('update-counter', callback);

contextBridge.exposeInMainWorld('electronAPI', {
  openLoginWin,
  closeLoginWin,
  handleCounter
})
