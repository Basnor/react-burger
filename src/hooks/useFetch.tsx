import { BASE_URL } from "../utils/contants";

const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

function useFetch<T, K>(endpoint: string) {
  const _fetchData = async (
    url: string,
    method: Method,
    body?: K,
    token?: string,
  ): Promise<T> => {
    const config = {
      method,
      headers,
    };

    if (token) {
      headers.set('Authorization', token);
    }

    if (body) {
      Object.assign(config, { body: JSON.stringify(body) });
    }

    const response = await fetch(url, config);

    if (response && !response.ok) {
      const error = await response.json();

      return Promise.reject(
        new Error(error.message || `Ошибка запроса. Статус: ${response.status}`)
      );
    }

    const data = await response.json();

    return data;
  };

  const get = (token?: string) => {
    return _fetchData(BASE_URL + endpoint, Method.GET, undefined, token);
  };

  const post = (body: K, token?: string) => {
    return _fetchData(BASE_URL + endpoint, Method.POST, body, token);
  };

  const patch = (body: K, token: string) => {
    return _fetchData(BASE_URL + endpoint, Method.PATCH, body, token);
  };

  return { get, post, patch };
}

export default useFetch;
