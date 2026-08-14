/** Wesoco Teknoloji ofisi (Google Maps GBP) — Can Bakkal İş Merkezi, Uzun Sk. 25 */
export const OFFICE_MAP_QUERY = "Wesoco Teknoloji";
export const OFFICE_LAT = 41.0058;
export const OFFICE_LNG = 39.7274;

const q = encodeURIComponent(OFFICE_MAP_QUERY);

/** `ll` yok: harita sorgu pin’ine (Wesoco) ortalanır, kuzeydeki otel noktasına değil. */
export const MAP_EMBED = `https://maps.google.com/maps?q=${q}&z=17&hl=tr&output=embed`;

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${q}`;
