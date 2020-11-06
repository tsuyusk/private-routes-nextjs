import { IncomingMessage } from 'http';
import JsCookie from 'js-cookie';

function getCookieFromServer(key: string, request: IncomingMessage) {
  if (!request.headers.cookie) {
    return null;
  }
  const rawCookie = request.headers.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return null;
  }

  return decodeURIComponent(rawCookie.split('=')[1]);
}

export default class Cookie {
  public static setCookie(key: string, value: any): void {
    JsCookie.set(key, value, {
      expires: 1,
    });
  }

  public static getCookie(key: string, request?: IncomingMessage): any {
    return process.browser
      ? JsCookie.get(key)
      : getCookieFromServer(key, request);
  }

  public static removeCookie(key: string): void {
    JsCookie.remove(key);
  }
}
