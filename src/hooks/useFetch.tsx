import { useCallback, useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка получения данных. Статус: ${response.status}`)
      }

      const data = await response?.json();

      setData(data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.warn(error);

      setError(error);
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, error };
}

export default useFetch;
