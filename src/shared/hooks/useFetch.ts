import { useEffect, useRef, useState } from "react";

interface UseFetchOptions {
  skip?: boolean;
  retry?: number;
}

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (options.skip) return;

    let attempts = 0;
    const maxRetries = options.retry ?? 3;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = (await response.json()) as T;

        if (isMountedRef.current) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (error) {
        if (attempts < maxRetries) {
          attempts++;
          setTimeout(fetchData, Math.pow(2, attempts) * 1000);
        } else if (isMountedRef.current) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    setState({ data: null, loading: true, error: null });
    fetchData();
  }, [url, options.skip, options.retry]);

  return state;
}
