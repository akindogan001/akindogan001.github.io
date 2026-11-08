import { getCollection, type CollectionEntry } from 'astro:content';
import stack from '../data/stack.json';
import { splitId, type Lang } from './i18n';

export type Solution = CollectionEntry<'solutions'> & { slug: string; lang: Lang };
export type Approach = CollectionEntry<'approaches'> & { slug: string; lang: Lang };

type StackItem = { name: string; group: string };
const stackMap = stack as Record<string, StackItem>;

export async function getSolutions(lang: Lang): Promise<Solution[]> {
  const all = await getCollection('solutions');
  return all
    .map((e) => ({ ...e, ...splitId(e.id) }))
    .filter((e) => e.lang === lang)
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getApproaches(lang: Lang): Promise<Approach[]> {
  const all = await getCollection('approaches');
  return all
    .map((e) => ({ ...e, ...splitId(e.id) }))
    .filter((e) => e.lang === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

/** Bir çözümün diğer dildeki karşılığı var mı? */
export async function hasTranslation(slug: string, lang: Lang): Promise<boolean> {
  const all = await getCollection('solutions');
  return all.some((e) => e.id === `${lang}/${slug}`);
}

/** stack.json'da olmayan bir id kullanılırsa build hata verir (yazım hatalarını yakalar). */
export function stackItem(id: string): StackItem {
  const item = stackMap[id];
  if (!item) throw new Error(`stack.json içinde tanımsız teknoloji: "${id}"`);
  return item;
}

export function groupStack(ids: string[]): Map<string, StackItem[]> {
  const groups = new Map<string, StackItem[]>();
  for (const id of ids) {
    const item = stackItem(id);
    groups.set(item.group, [...(groups.get(item.group) ?? []), item]);
  }
  return groups;
}

export const allStackIds = () => Object.keys(stackMap);
