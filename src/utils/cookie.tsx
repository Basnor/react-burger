// See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
interface ICookieName {
  Expires?: string
}

export function setCookie(name: string, value: string, props: { expires?: number }) {
  const { expires } = props;

  let attributes: ICookieName = {};

  if (expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    
    attributes = {
      Expires: date.toUTCString()
    }
  }

  let updatedCookie = `${name}=${encodeURIComponent(value)}`;

  for (const cookieName in attributes) {
    const cookieValue = attributes[cookieName as keyof typeof attributes];

    updatedCookie += `; ${cookieName}=${cookieValue}`;
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}
