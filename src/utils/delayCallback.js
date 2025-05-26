let timeout;

export default function throttle(callback, time) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    callback();
  }, time);
}
