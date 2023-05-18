const { contextBridge, ipcRenderer } = require('electron');

const openLoginWin = () => ipcRenderer.invoke('on-open-loginWin');
const closeLoginWin = () => ipcRenderer.invoke('on-close-loginWin');

const handleCounter = (callback) => ipcRenderer.on('update-counter', callback);

const enterFullScreen = (callback) => ipcRenderer.on('enter-full-screen', callback);
const leaveFullScreen = (callback) => ipcRenderer.on('leave-full-screen', callback);

contextBridge.exposeInMainWorld('electronAPI', {
  openLoginWin,
  closeLoginWin,
  handleCounter,
  enterFullScreen,
  leaveFullScreen
})
