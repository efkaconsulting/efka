/*
 * Locale → copy. The single place a page component reaches for its wording.
 *
 *   const c = useContent(lang).services;
 */

import { tr } from '~/data/tr';
import { en } from '~/data/en';
import type { Lang } from './routes';

export const CONTENT = { tr, en } as const;

export type Dict = typeof tr;

export const useContent = (lang: Lang): Dict => CONTENT[lang];
