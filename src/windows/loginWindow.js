export const ACHEME = "app";
export const LOAD_URL = `${ ACHEME }://./index.html`;

const path = require('path')

const miniWinURL = process.env.NODE_ENV === "development"
                                          ? `http://localhost:8080/login`
                                          : `${ LOAD_URL }/login`;
let loginWin;
const createLoginWindow = function(BrowserWindow) {
  let obj = {
    width: 350,
    height: 530,
    frame: false,
    // parent: global.win,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../src/preload.js'),
    },
  };
  loginWin = new BrowserWindow(obj);
  loginWin.loadURL(miniWinURL);
  
  return loginWin;
}

export default createLoginWindow;