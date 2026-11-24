import type { Dict } from './i18n';

export type Status = 'production' | 'completed' | 'testing' | 'in-progress' | 'planned';

/** Durum → i18n anahtarı (common.*) ve gösterge rengi sınıfı */
const meta: Record<Status, { key: keyof Dict['common']; cls: string }> = {
  production: { key: 'production', cls: '' },
  completed: { key: 'completed', cls: '' },
  testing: { key: 'testing', cls: 'status--progress' },
  'in-progress': { key: 'inProgress', cls: 'status--progress' },
  planned: { key: 'planned', cls: 'status--planned' },
};

export const statusLabel = (d: Dict, s: Status): string => d.common[meta[s].key] as string;
export const statusClass = (s: Status): string => `status ${meta[s].cls}`.trim();
