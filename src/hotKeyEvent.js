import { globalShortcut } from 'electron'

export default function () {
  globalShortcut.register('ESC', () => {
    if(global.win.isFullScreen()){
      global.win.setFullScreen(false);
    }
  })
}