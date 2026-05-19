const GA_ID  = import.meta.env.VITE_GA4_ID;
const IS_DEV = import.meta.env.DEV;

// Log event ke console saat development agar mudah di-debug
function devLog(type, payload) {
  if (IS_DEV) {
    console.log(`%c[GA4 ${type}]`, "color:#4f46e5;font-weight:bold", payload);
  }
}

export function initGA() {
  if (!GA_ID) {
    if (IS_DEV) console.warn("[GA4] VITE_GA4_ID belum diset di .env");
    return;
  }
  if (IS_DEV) {
    console.info("[GA4] Mode development — event hanya dicatat di console, tidak dikirim ke GA.");
    return;
  }

  // Inject gtag script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,     // page view dikelola manual via usePageTracking
    anonymize_ip:   true,      // privasi pengguna
  });
}

export function trackPageView(path, title) {
  devLog("page_view", { path, title });
  if (!GA_ID || IS_DEV || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path:  path,
    page_title: title || document.title,
  });
}

// Kirim custom event ke GA4
export function trackEvent(eventName, params = {}) {
  devLog(eventName, params);
  if (!GA_ID || IS_DEV || !window.gtag) return;
  window.gtag("event", eventName, params);
}

// ── Event helper — konsistensi nama event ────────────────────

export const GA = {
  /** Pengguna membuka halaman formulir PPDB */
  formOpen: () =>
    trackEvent("ppdb_form_open", { event_category: "PPDB" }),

  /** Pengguna berhasil submit formulir */
  formSubmit: (nomorPendaftaran) =>
    trackEvent("ppdb_form_submit", {
      event_category: "PPDB",
      nomor_pendaftaran: nomorPendaftaran,
    }),

  /** Pengguna klik tombol CTA (mis. "Daftar Sekarang") */
  ctaClick: (label) =>
    trackEvent("cta_click", { event_category: "Engagement", label }),

  /** Pengguna klik tombol WhatsApp */
  whatsappClick: () =>
    trackEvent("whatsapp_click", { event_category: "Kontak" }),
};
