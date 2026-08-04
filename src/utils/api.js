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

// Error yang pesannya memang ditujukan untuk dibaca pengguna. Ditandai supaya
// halaman bisa membedakannya dari error teknis (mis. jaringan putus), yang
// pesan aslinya tidak berarti apa-apa bagi pendaftar.
export function errorRamah(pesan) {
  const e = new Error(pesan);
  e.ramah = true;
  return e;
}

// Satu-satunya cara yang boleh dipakai halaman untuk menampilkan error ke layar.
// Pesan teknis (jaringan putus, JSON gagal diurai) tidak pernah lolos ke pengguna.
export const pesanError = (err) =>
  err?.ramah ? err.message : "Koneksi ke server gagal. Periksa jaringan Anda, lalu coba lagi.";

const PESAN_STATUS = {
  413: "Ukuran file terlalu besar. Coba perkecil atau potong fotonya, lalu kirim lagi.",
  502: "Server sedang tidak bisa dihubungi. Coba lagi beberapa saat.",
  503: "Server sedang tidak bisa dihubungi. Coba lagi beberapa saat.",
  504: "Server terlalu lama merespons. Coba lagi beberapa saat.",
};

// Membaca body sebagai JSON. Kalau yang datang ternyata HTML — misalnya halaman
// error bawaan Nginx saat request terlalu besar — JSON.parse akan melempar teks
// mentah browser ("Unexpected token '<'" di Chrome, "The string did not match
// the expected pattern." di Safari) yang tidak berarti apa-apa bagi pendaftar.
// Di sini kegagalan itu diterjemahkan jadi kalimat yang bisa ditindaklanjuti.
export async function bacaJson(res) {
  const teks = await res.text();
  try {
    return JSON.parse(teks);
  } catch {
    throw errorRamah(
      PESAN_STATUS[res.status] ||
        `Server membalas dengan format yang tidak dikenali (kode ${res.status}). Coba lagi, atau hubungi panitia PPDB.`
    );
  }
}
