/**
 * Contact details used across the site. These are the placeholders from the
 * IVAARO static site: replace them with the real number and address.
 */
export const SITE = {
  /** WhatsApp number in international format, digits only (91 + 10 digits) */
  whatsapp: '910000000000',
  phoneDisplay: '+91 [00000 00000]',
  phoneTel: '+910000000000',
  email: 'care@ivaaro.com',
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Normalises an Indian mobile number to 10 digits, or returns null.
 * Accepts +91, 0-prefixed and spaced numbers.
 */
export function indianMobile(input: string) {
  let d = input.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}
