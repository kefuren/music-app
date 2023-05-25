//判空
export function checkNull(value) {
  if (!value || isNull(value) || isUndefined(value) || value == "") {
    return true;
  }
  return false;
};

// @参数（v）：传入对象
export function isNull(v) {
	return (typeof(v) == 'undefined') ? true : ((v == null) ? true : v === "");
}

// @参数（v）：传入对象
export function isUndefined(obj) {
	return typeof(obj) === "undefined";
}

// 获取当前日期
export function now() {
	let now = new Date();
	return dateFormat(now, 'yyyy-MM-dd');
}

// 日期格式化
export function dateFormat(d, str) {
	if (checkNull(str)) { //如果格式化字符为空，返回空字符
		return "";
	}
	if (checkNull(d)) { //如果日期为空，自动获取当前日期
		d = new Date();
	} else if (d.constructor != Date) { //如果参数不是一个日期对象，就认为是一个标准Long值日期
		d = new Date(d);
	}
	return str.replace("yyyy", d.getFullYear()).replace("MM", fillZero(d.getMonth() + 1)).replace("dd", fillZero(d.getDate()))
		.replace("HH", fillZero(d.getHours())).replace("mm", fillZero(d.getMinutes())).replace("ss", fillZero(d.getSeconds()))
		.replace("sss", d.getMilliseconds());
}

//填充0
export function fillZero(value) {
  if (value.toString().length < 2) {
    return "0" + value;
  }
  return value;
};

export function obj2StrParams(url, obj) {
	if (!obj || JSON.stringify(obj) == "{}") return url;
  let params = url + '?';

  for (let p in obj) {
    params += p + "=" + obj[p] + "&";
  }
  return params.substring(0, params.length - 1);
}

export function numberFormat(value = 0) {
  let param = {};
  let k = 10000,
  sizes = ['', '万', '亿', '万亿'],
  i;
  if (value < k) {
    param.value = value;
    param.unit = '';
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    param.value = ((value / Math.pow(k, i))).toFixed(0);
    param.unit = sizes[i];
  }
  var val = param.value + param.unit

  return val
}

export function nameFormat(artists, token) {
  let names = [];
  artists.forEach(item => {
    names.push(item.name);
  })
  return names.join(token);
}

export function throttle (fn, delay) {
  var t = null,
    begin = new Date().getTime();

  return function () {
    var _self = this,
        args = arguments,
        cur = new Date().getTime();

    clearTimeout(t);

    if (cur - begin >= delay) {
      fn.apply(_self, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
          fn.apply(_self, args)
      }, delay)
    }
  }
}

export function debounce (fn, time, triggerNow) {
  var t = null;

  return function () {
      const _self = this,
          args = arguments;

      clearTimeout(t);
      
      if (triggerNow) {
          let exce = !t;

          t = setTimeout(function () {
              t = null;
          }, time)

          if (exce) {
              fn.apply(_self, args);
          }
      } else {
          t = setTimeout(function () {
              fn.apply(_self, args);
          }, time)
      }
  }
}

export function secondToDate(second) {
  var h = Math.floor(second / 3600),
      m = Math.floor((second / 60 % 60)),
      s = Math.floor((second % 60)),
      time = '';

  if (h == 0) {
    if (m >= 10) {
      if (s >= 10) {
        time = m + ':' + s;
      } else {
        time = m + ':0' + s;
      }
    } else {
      if (s >= 10) {
        time = '0' + m + ':' + s;
      } else {
        time = '0' + m + ':0' + s;
      }
    }
  } else {
    if (m >= 10) {
      if (s >= 10) {
        time = h + ':' + m + ':' + s
      } else {
        time = h + ':' + m + ':0' + s
      }
    } else {
      if (s >= 10) {
        time = h + ':0' + m + ':' + s
      } else {
        time = h + ':0' + m + ':0' + s
      }
    }
  }

  return time;
}