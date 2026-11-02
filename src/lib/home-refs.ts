/** Ana sayfa referans kartları — sunucu ve istemci ortak */
export type HomeRef = {
  id: string;
  title: string;
  lead: string;
  filter: string;
  imageUrl: string;
  videoUrl: string | null;
};

/** HTML'de her türden ilk gelen kart sayısı; kalanı /api/refs */
export const REF_PAGE = 9;
