import { useCallback, useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url).then((res) => res.json());
      const data = await response?.data;

      setData(data);
      setIsLoading(false);
    } catch (error: any) {
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
