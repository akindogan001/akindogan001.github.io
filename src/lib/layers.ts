/** Veri yolculuğunun 4 katmanı: saha → toplama → entegrasyon → karar */
export const LAYERS = ['field', 'acquisition', 'integration', 'decision'] as const;
export type Layer = (typeof LAYERS)[number];
