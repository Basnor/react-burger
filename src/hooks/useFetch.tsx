import { BASE_URL } from "../utils/contants";

const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

enum Method {
  GET = "GET",
  POST = "POST",
  PATH = "PATH",
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

    if (response && !response.ok) {    if (!body) {
      return Promise.reject(new Error("Тело POST запроса не указано."));
    }
      return Promise.reject(
        new Error(`Ошибка запроса. Статус: ${response.status}`)
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

  const path = (body: K, token: string) => {
    return _fetchData(BASE_URL + endpoint, Method.PATH, body, token);
  };

  return { get, post, path };
}

export default useFetch;
