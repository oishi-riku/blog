const X_MICROCMS_API_KEY = process.env.NEXT_PUBLIC_X_MICROCMS_API_KEY || '';

const fetcher = async <T>(url: string): Promise<T> => {
  const result = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': X_MICROCMS_API_KEY,
    },
  });
  const json = (await result.json()) as T;

  return json;
};

export default fetcher;
