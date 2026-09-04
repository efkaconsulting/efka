/*
 * The site's two locales and the slug each page carries in each of them.
 *
 * Turkish is the default and sits at the root; English sits under `/en/`.
 * Pages are addressed by a stable key rather than by URL, so navigation and
 * the language switcher never hard-code a path:
 *
 *   localePath('services', 'tr')  →  /hizmetler
 *   localePath('services', 'en')  →  /en/services
 *
 * Adding a page means adding one row to ROUTES and one route file per locale.
 */

export const LOCALES = ['tr', 'en'] as const;
export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Lang = 'tr';

/** Human label for the switcher. */
export const LOCALE_LABEL: Record<Lang, string> = {
  tr: 'TR',
  en: 'EN',
};

/** `lang` attribute for <html>. */
export const LOCALE_HTML_LANG: Record<Lang, string> = {
  tr: 'tr-TR',
  en: 'en',
};

/** OpenGraph locale. */
export const LOCALE_OG: Record<Lang, string> = {
  tr: 'tr_TR',
  en: 'en_US',
};

export const ROUTES = {
  home: { tr: '', en: '' },
  services: { tr: 'hizmetler', en: 'services' },
  whyFilipino: { tr: 'neden-filipinli-bakici', en: 'why-a-filipino-caregiver' },
  about: { tr: 'hakkimizda', en: 'about' },
  process: { tr: 'surecimiz', en: 'process' },
  faq: { tr: 'sss', en: 'faq' },
  contact: { tr: 'iletisim', en: 'contact' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof ROUTES;

/** The path a page lives at in a given locale, e.g. `/en/services`. */
export const localePath = (key: PageKey, lang: Lang): string => {
  const slug = ROUTES[key][lang];
  const prefix = lang === DEFAULT_LOCALE ? '' : lang;
  const path = [prefix, slug].filter(Boolean).join('/');
  return path ? `/${path}` : '/';
};

/** Every path → the page it renders, for both locales. Used to resolve the switcher. */
const PATH_TO_PAGE: Record<string, { key: PageKey; lang: Lang }> = Object.fromEntries(
  (Object.keys(ROUTES) as PageKey[]).flatMap((key) =>
    LOCALES.map((lang) => [localePath(key, lang), { key, lang }] as const)
  )
);

const normalize = (pathname: string): string => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
};

/**
 * Given the path being viewed, where the switcher should point.
 *
 * Falls back to the other locale's home page for anything not in the table,
 * so a 404 or a future page never yields a dead switcher.
 */
export const alternate = (pathname: string): { lang: Lang; path: string; label: string } => {
  const match = PATH_TO_PAGE[normalize(pathname)];
  const from: Lang = match?.lang ?? DEFAULT_LOCALE;
  const to: Lang = from === 'tr' ? 'en' : 'tr';
  return {
    lang: to,
    path: match ? localePath(match.key, to) : localePath('home', to),
    label: LOCALE_LABEL[to],
  };
};

/** The locale a path belongs to, or the default for anything unrecognized. */
export const langOf = (pathname: string): Lang => PATH_TO_PAGE[normalize(pathname)]?.lang ?? DEFAULT_LOCALE;

/**
 * Every path → its counterpart in each locale.
 *
 * Serialized into the page so the header, which persists across view
 * transitions, can re-resolve its links after a navigation instead of keeping
 * the ones rendered for the first page loaded.
 */
export const PATH_ALTERNATES: Record<string, Record<Lang, string>> = Object.fromEntries(
  (Object.keys(ROUTES) as PageKey[]).flatMap((key) =>
    LOCALES.map(
      (lang) =>
        [
          localePath(key, lang),
          Object.fromEntries(LOCALES.map((l) => [l, localePath(key, l)])) as Record<Lang, string>,
        ] as const
    )
  )
);
