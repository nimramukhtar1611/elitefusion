// src/services/gamesApi.js
import api from "./apiClient";

export function fetchGames(params = {}) {
  // GET /api/games?page=..&limit=..&search=.. etc
  return api.get("/api/games", { params }).then((r) => r.data);
}

export function fetchGameBySlug(slug) {
  return api.get(`/api/games/slug/${slug}`).then((r) => r.data);
}

export function fetchMyGames() {
  return api.get("/api/games/user/my-games").then((r) => r.data);
}
