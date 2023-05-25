export function eleDrag (el) {
  let x,
      y;

  document.addEventListener('mousedown', function (e) {
    let e = e || window.event;
    x = e.pageX - el.offsetLeft;
    y = e.pageY - el.offsetTop;

    document.addEventListener('mousemove', _mousemove, false);
    document.addEventListener('mouseup', _mouseup, false);

    e.stopPropagation();
    e.preventDefault();

    function _mousemove (e) {
      let e = e || window.event;
      el.style.left = e.pageX - x + 'px';
      el.style.top = e.pageY - y + 'px';
    }
    
    function _mouseup (e) {
      document.removeEventListener('mousemove', _mousemove, false)
      document.removeEventListener('mouseup', _mouseup, false)
    }

  }, false)
}