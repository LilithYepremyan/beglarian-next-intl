import locales from "public/locales";

export function getCurrentLang() {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const langFromUrl = url.searchParams.get("lang");

    if (langFromUrl && locales[langFromUrl]) {
      localStorage.setItem("bfLang", langFromUrl);
      return langFromUrl;
    }

    const langFromStorage = localStorage.getItem("bfLang");
    if (langFromStorage && locales[langFromStorage]) {
      return langFromStorage;
    }
  }

  return process.env.NEXT_PUBLIC_LOCALE || "en";
}
