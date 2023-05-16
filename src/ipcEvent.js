import { ipcMain, BrowserWindow } from "electron";
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
    loginWin && loginWin.close()
  })
}