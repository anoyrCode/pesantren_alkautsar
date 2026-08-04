// Memperkecil gambar di browser sebelum diunggah.
//
// Alasannya: proxy di depan backend membatasi ukuran satu request, dan foto
// langsung dari kamera HP mudah menembusnya — pendaftar gagal kirim tanpa tahu
// sebabnya. Dengan dikecilkan di sisi pengguna, formulir tidak lagi bergantung
// pada batas itu, dan pengunggahan juga jauh lebih cepat di koneksi lambat.
//
// Aman untuk semua masukan: PDF, berkas non-gambar, gambar yang gagal dibaca,
// atau hasil kompresi yang justru membesar — semuanya dikembalikan apa adanya
// supaya backend yang memutuskan, bukan modul ini.

const MAKS_DIMENSI = 1600; // sisi terpanjang, piksel
const KUALITAS = 0.8;      // kualitas JPEG 0..1

export default function kompresGambar(file, { maksDimensi = MAKS_DIMENSI, kualitas = KUALITAS } = {}) {
  if (!file || !file.type?.startsWith("image/")) return Promise.resolve(file);

  return new Promise((selesai) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const skala = Math.min(1, maksDimensi / Math.max(img.width, img.height));
      const lebar = Math.max(1, Math.round(img.width * skala));
      const tinggi = Math.max(1, Math.round(img.height * skala));

      const canvas = document.createElement("canvas");
      canvas.width = lebar;
      canvas.height = tinggi;
      canvas.getContext("2d").drawImage(img, 0, 0, lebar, tinggi);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          // Sebagian gambar (PNG grafis, foto yang sudah kecil) malah membesar
          // setelah dijadikan JPEG — dalam kasus itu file asli lebih baik.
          if (!blob || blob.size >= file.size) return selesai(file);
          const nama = file.name.replace(/\.[^.]+$/, "") + ".jpg";
          selesai(new File([blob], nama, { type: "image/jpeg", lastModified: Date.now() }));
        },
        "image/jpeg",
        kualitas
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      selesai(file);
    };

    img.src = url;
  });
}
