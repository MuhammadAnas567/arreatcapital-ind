/** Shared Arreat Capital India contact — New Delhi office. */
export const CONTACT_EMAIL = 'info@arreat.capital';

/** India desk phone numbers. */
export const PHONES = [
  {
    e164: '919811225766',
    display: '+91 98112 25766',
    tel: 'tel:+919811225766',
  },
  {
    e164: '918588854155',
    display: '+91 85888 54155',
    tel: 'tel:+918588854155',
  },
] as const;

/** Primary WhatsApp / call number (first India desk line). */
export const WHATSAPP_E164 = PHONES[0].e164;
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;
export const PHONE_TEL = PHONES[0].tel;
export const PHONE_DISPLAY = PHONES[0].display;

export const OFFICE = {
  city: 'New Delhi',
  line1: '1201 C, 12th Floor, Antariksh Bhawan',
  line2: 'KG Marg, New Delhi 110001',
  line3: 'Nearest metro: Barakhamba Road',
  label: 'India office',
} as const;
