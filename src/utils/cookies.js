export function setServerCookie(name, value, options = {}) {
  if (typeof window === "undefined") {
    const { cookies } = require("next/headers");
    cookies().set(name, value, { path: "/", ...options });
  }
}

export function getServerCookie(name) {
  if (typeof window === "undefined") {
    const { cookies } = require("next/headers");
    return cookies().get(name)?.value || null;
  }
  return null;
}

export function setClientCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;
  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}

export function getClientCookie(name) {
  if (typeof document === "undefined") return null;

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length));
  }

  return null;
}
