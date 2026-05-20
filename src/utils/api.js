// Kosong = pakai path relatif (lewat Vite proxy saat dev/ngrok)
// Isi dengan URL backend saat production terpisah
export const API_URL = import.meta.env.VITE_API_URL || "";

export function apiFetch(path, options = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "ngrok-skip-browser-warning": "true",
      ...options.headers,
    },
  });
}
