/**
 * E-posta adresini HTML kaynağında düz metin olarak bırakmamak için basit kodlama.
 * Spam botlarının sayfadan adres toplamasını zorlaştırır; adres tarayıcıda çözülür.
 */
export const encodeMail = (s: string): string => btoa([...s].reverse().join(''));
export const decodeMail = (s: string): string => [...atob(s)].reverse().join('');

/** Ekranda gösterilecek, doğrudan kopyalanamayan biçim: ad [at] alan.com */
export const maskMail = (s: string): string => s.replace('@', ' [at] ');

/** Hazır konu ve gövdeyle mailto: adresi üretir. */
export function buildMailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
