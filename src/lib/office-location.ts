/** Wesoco Teknoloji ofisi (Google Maps GBP) — Can Bakkal İş Merkezi, Uzun Sk. 25 */
export const OFFICE_MAP_QUERY = "Wesoco Teknoloji";
export const OFFICE_LAT = 41.0078;
export const OFFICE_LNG = 39.7266;

const q = encodeURIComponent(OFFICE_MAP_QUERY);

export const MAP_EMBED = `https://maps.google.com/maps?q=${q}&ll=${OFFICE_LAT},${OFFICE_LNG}&z=17&hl=tr&output=embed`;

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${q}`;
