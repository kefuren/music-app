import { ref } from 'vue'
export function useRotate() {
  let requestId = 0,
    animationStartTime = 0,
    stoppedAt = 0;

  const animateState = ref('stopped');
  const $el = ref(null);


  function animate(time) {
    let current = (time - animationStartTime) / 100 % 360;
    $el.value.value.style.transform = 'rotate(' + current + 'deg)';
    requestId = window.requestAnimationFrame(animate);
  }

  function start(el) {
    $el.value = el;
    animateState.value = 'rotating';
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    animationStartTime = window.performance.now();
    requestId = window.requestAnimationFrame(animate);
  }

  function stop() {
    if (animateState === 'stopped') {
      return;
    }
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      // Stop point timestamp
      stoppedAt = window.performance.now();
      animateState.value = 'stopped';
    }
  }

  function continu() {
    if (animateState === 'rotating') {
      return;
    }
    // Adding stoppage time to start time. 
    animationStartTime += window.performance.now() - stoppedAt;
    requestId = window.requestAnimationFrame(animate);
    animateState.value = 'rotating';
  }

  return {
    start,
    stop,
    continu, 
    animateState
  }
}

