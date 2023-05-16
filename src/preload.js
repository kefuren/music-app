const { contextBridge, ipcRenderer } = require('electron');

const openLoginWin = () => {
  ipcRenderer.invoke('on-open-loginWin');
}
const closeLoginWin = (data) => {
  ipcRenderer.invoke('on-close-loginWin');
}

contextBridge.exposeInMainWorld('electronAPI', {
  openLoginWin,
  closeLoginWin
})

