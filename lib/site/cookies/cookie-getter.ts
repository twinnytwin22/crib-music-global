import { getCookie } from "cookies-next";

export async function getCookieConsent() {
  const consentCookie = getCookie("cribConsentCookie");

  if (consentCookie === "accepted") {
    // Cookie exists, return its value
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(consentCookie);
      }, 500),
    );
  } else {
    return "false";
  }
}

export async function getMusicPageCookie() {
  const consentCookie = getCookie("music");

  if (consentCookie === "visited") {
    // Cookie exists, return its value
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(consentCookie);
      }, 500),
    );
  } else {
    return "false";
  }
}
