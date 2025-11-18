// src/hooks/useTmdb.js
import tmdb from "@/services/tmdb";
import { useEffect, useState } from "react";

export default function useTmdb(endpoint, page = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await tmdb.get(`${endpoint}?page=${page}`);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data || err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false; // cegah memory leak
    };
  }, [endpoint, page]);

  return { data, loading, error };
}
