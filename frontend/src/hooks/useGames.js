import { useEffect, useMemo, useState } from "react";
import { fetchGames } from "../services/gamesApi"; 
export function useDebounce(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return v;
}

export default function useGames(initial = {}) {
  const [filters, setFilters] = useState({ page: 1, limit: 12, genre: "", sort: "-createdAt", visibility: "public", search: "", ...initial });
  const debouncedSearch = useDebounce(filters.search);

  const query = useMemo(() => ({ ...filters, search: debouncedSearch }), [filters, debouncedSearch]);

  const [state, setState] = useState({ loading: false, error: "", games: [], totalPages: 1, total: 0 });

  useEffect(() => {
    let alive = true;
    setState(s => ({ ...s, loading: true, error: "" }));

    fetchGames(query)
      .then((data) => {
        if (!alive) return;
        setState({
          loading: false,
          error: "",
          games: data.games || [],
          totalPages: data.totalPages || 1,
          total: data.total || 0,
        });
      })
      .catch((err) => {
        if (!alive) return;
        setState(s => ({ ...s, loading: false, error: err.message || "Failed to load games" }));
      });

    return () => { alive = false; };
  }, [query.page, query.limit, query.genre, query.sort, query.visibility, query.search]);

  return { ...state, filters, setFilters };
}