import tr from '../i18n/tr.json';
import en from '../i18n/en.json';

export const locales = ['tr', 'en'] as const;
export type Lang = (typeof locales)[number];

/** en.json referans şemadır; tr.json aynı anahtarlara sahip olmazsa typecheck hata verir. */
export type Dict = typeof en;
const dicts: Record<Lang, Dict> = { tr, en };

export const t = (lang: Lang): Dict => dicts[lang];
export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
export const langPaths = () => locales.map((lang) => ({ params: { lang } }));

/** /<lang>/<path>/ biçiminde, sonda eğik çizgili URL üretir. */
export function url(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** İçerik id'si "tr/db-sync" → { lang: 'tr', slug: 'db-sync' } */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = id.split('/');
  if (!locales.includes(lang as Lang)) {
    throw new Error(`İçerik dosyası bir dil klasöründe olmalı (tr/ veya en/): ${id}`);
  }
  return { lang: lang as Lang, slug: rest.join('/') };
}
