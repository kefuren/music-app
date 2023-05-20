import { createApp, watch } from 'vue'
import ToastComponent from './Toast.vue'

const Toast = (options) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  const toastApp = createApp(ToastComponent, options);

  return new Promise((resolve, reject) => {
    showToast(toastApp, options.duration, { resolve, reject })
  })
}

function showToast (app, duration, { resolve, reject }) {
  const oFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);

  document.body.appendChild(oFragment);
  vm.setVisible(true);
  
  hideToast(app, vm, duration, { resolve, reject });
}

function hideToast (app, vm, duration, { resolve, reject }) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false);
    app.unmount();
    clearTimeout(vm.timer);
    vm.timer = null;
    if (!vm.state.visible) {
      resolve()
    }
  }, duration || 2000)

}

export default Toast