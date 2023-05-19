const { contextBridge, ipcRenderer } = require('electron');

const openLoginWin = () => ipcRenderer.invoke('on-open-loginWin');
const closeLoginWin = () => ipcRenderer.invoke('on-close-loginWin');

const handleCounter = (callback) => ipcRenderer.on('update-counter', callback);

const enterFullScreen = (callback) => ipcRenderer.on('enter-full-screen', callback);
const leaveFullScreen = (callback) => ipcRenderer.on('leave-full-screen', callback);

const windowClose = () => ipcRenderer.send('window-close');
const windowMin = () => ipcRenderer.send('window-min');
const windowMax = () => ipcRenderer.send('window-max');

contextBridge.exposeInMainWorld('electronAPI', {
  windowClose,
  windowMin,
  windowMax,
  openLoginWin,
  closeLoginWin,
  handleCounter,
  enterFullScreen,
  leaveFullScreen
})
