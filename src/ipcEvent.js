import { ipcMain, BrowserWindow, MessageChannelMain } from "electron";
import createLoginWindow from "./windows/loginWindow";

let loginWin;

export default function () {
  ipcMain.handle("on-open-loginWin", (event, data) => {
    if (loginWin) {
      loginWin.focus();
      return
    }
    loginWin = createLoginWindow(BrowserWindow);

    loginWin.on("ready-to-show", () => {
      loginWin.show();
    });

    loginWin.on("closed", () => {
      loginWin = null;
    });
  });

  ipcMain.handle("on-close-loginWin", () => {
    global.win.webContents.send('update-counter', 'ok')
    loginWin && loginWin.close()
  })

  global.win.on('enter-full-screen', function (event) {
    global.win.webContents.send('enter-full-screen')
  });
  
  global.win.on('leave-full-screen', function (event) {
    global.win.webContents.send('leave-full-screen')
  });

  ipcMain.on('window-min', function () {
    if(global.win.isFullScreen()){
      global.win.setFullScreen(false);
      setTimeout(() => {
        global.win.minimize();
      }, 800)
    } else {
      global.win.minimize();
    }
  })

  ipcMain.on('window-max', function () {
    if(!global.win.isFullScreen()){
      global.win.setFullScreen(true)
    } else {
      global.win.setFullScreen(false)
    }
  })

  ipcMain.on('window-close', function () {
    global.win.hide();
  })
}