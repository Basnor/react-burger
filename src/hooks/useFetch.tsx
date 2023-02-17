import { BASE_URL } from "../utils/contants";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

enum Method {
  GET = "GET",
  POST = "POST",
}

function useFetch<T, K>(endpoint: string) {
  const _fetchData = async (
    url: string,
    method: Method = Method.GET,
    body?: object
  ): Promise<T> => {
    const config = {
      method,
      headers: HEADERS,
    };

    if (body) {
      Object.assign(config, { body: JSON.stringify(body) });
    }

    const response = await fetch(url, config);

    if (response && !response.ok) {
      return Promise.reject(
        new Error(`Ошибка запроса. Статус: ${response.status}`)
      );
    }

    const data = await response.json();

    return data;
  };

  const get = () => {
    return _fetchData(BASE_URL + endpoint);
  };

  const post = (body?: K) => {
    if (!body) {
      return Promise.reject(new Error("Тело POST запроса не указано."));
    }

    return _fetchData(BASE_URL + endpoint, Method.POST, body);
  };

  return { get, post };
}

export default useFetch;
