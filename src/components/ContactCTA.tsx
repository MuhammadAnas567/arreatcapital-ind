import React, { useState } from 'react';
import { toast } from 'sonner';
import { Building2, Mail, MessageCircle, Phone } from 'lucide-react';
import { design } from '../lib/design-tokens';
import { cn } from './Button';
import {
  CONTACT_EMAIL,
  OFFICE,
  PHONES,
  WHATSAPP_URL,
} from '../lib/contact';

const { contact, layout } = design;

const contactMethods = [
  {
    label: OFFICE.label,
    value: `${OFFICE.line1}, ${OFFICE.city}`,
    href: null as string | null,
    icon: Building2,
  },
  {
    label: 'WhatsApp · India desk',
    value: PHONES[0].display,
    href: WHATSAPP_URL,
    icon: MessageCircle,
  },
  {
    label: 'Phone',
    value: PHONES[0].display,
    href: PHONES[0].tel,
    icon: Phone,
  },
  {
    label: 'Phone',
    value: PHONES[1].display,
    href: PHONES[1].tel,
    icon: Phone,
  },
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
];

const submitButtonClass =
  'india-btn-sheen relative inline-flex items-center justify-center rounded-none border border-[#D4B37A] bg-[#D4B37A] font-hero-body font-medium text-[11px] tracking-[0.1em] uppercase text-[#050F13] whitespace-nowrap transition-all duration-300 hover:bg-[#E2C48E] hover:border-[#E2C48E]';

function buildContactMailto(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get('name') ?? '');
  const email = String(data.get('email') ?? '');
  const phone = String(data.get('phone') ?? 'Not provided');
  const message = String(data.get('message') ?? 'Not provided');

  const subject = encodeURIComponent(`Contact inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

function useContactSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'Not provided',
      message: formData.get('message') || 'Not provided',
      _subject: 'New contact inquiry - Arreat Capital India',
      _captcha: 'false',
    };

    const toastStyle = {
      background: '#0F242C',
      border: '1px solid #D4B37A',
      color: '#FFFFFF',
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(typeof result.message === 'string' ? result.message : 'Submit failed');
      }

      toast.success('Inquiry submitted successfully', {
        description: 'An expert will be in touch with you shortly.',
        style: toastStyle,
      });
      form.reset();
    } catch {
      window.location.href = buildContactMailto(form);
      toast.success('Inquiry submitted successfully', {
        description: 'An expert will be in touch with you shortly.',
        style: toastStyle,
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
}

function ContactDetails({ compact = false }: { compact?: boolean }) {
  const { colors: c } = contact.card;

  return (
    <div className={cn('flex flex-col', compact ? 'gap-5' : 'gap-6')}>
      <h2
        className={cn(
          'font-serif font-normal leading-[1.1] tracking-tightest m-0',
          compact ? 'text-[28px] sm:text-[32px]' : 'text-[36px] lg:text-[40px]'
        )}
        style={{ color: c.heading }}
      >
        Let&apos;s explore what&apos;s next
      </h2>

      <div className="flex flex-col gap-2">
        <p
          className="font-sans font-light text-[15px] leading-[1.6] m-0"
          style={{ color: c.body }}
        >
          Speak with Arreat Capital India advisors for Mumbai, Bengaluru,
          Delhi-NCR and other growth markets.
        </p>
        <p
          className="font-sans font-light text-[15px] leading-[1.6] m-0"
          style={{ color: c.body }}
        >
          From shortlisting to paperwork and handover — clear guidance at every
          step.
        </p>
      </div>

      <ul className="flex flex-col gap-4 m-0 p-0 list-none">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          const content = (
            <>
              <span
                className="w-[38px] h-[38px] shrink-0 rounded-full flex items-center justify-center"
                style={{ backgroundColor: c.icon }}
              >
                <Icon className="w-[17px] h-[17px] text-white" strokeWidth={1.75} />
              </span>
              <span>
                <span
                  className="block font-sans text-[14px] font-semibold leading-tight"
                  style={{ color: c.heading }}
                >
                  {method.label}
                </span>
                <span
                  className="block font-sans text-[14px] font-light leading-tight mt-1"
                  style={{ color: c.body }}
                >
                  {method.value}
                </span>
              </span>
            </>
          );

          return (
            <li key={`${method.label}-${method.value}`}>
              {method.href ? (
                <a href={method.href} className="flex items-center gap-3.5 no-underline">
                  {content}
                </a>
              ) : (
                <div className="flex items-center gap-3.5">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactForm({
  isSubmitting,
  onSubmit,
  messageHeight = 220,
  submitAlign = 'end',
}: {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  messageHeight?: number;
  submitAlign?: 'end' | 'stretch';
}) {
  const fieldStyle: React.CSSProperties = {
    backgroundColor: contact.card.colors.field,
    color: '#FFFFFF',
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          required
          placeholder="Enter your name"
          className="w-full h-[46px] border-0 px-4 font-sans text-[16px] focus:outline-none placeholder:text-white/50"
          style={fieldStyle}
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full h-[46px] border-0 px-4 font-sans text-[16px] focus:outline-none placeholder:text-white/50"
          style={fieldStyle}
          autoComplete="email"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full h-[46px] border-0 px-4 font-sans text-[16px] focus:outline-none placeholder:text-white/50"
          style={fieldStyle}
          autoComplete="tel"
        />
      </div>

      <textarea
        id="message"
        name="message"
        placeholder="Message"
        className="w-full mt-3 border-0 p-4 font-sans text-[16px] focus:outline-none resize-none placeholder:text-white/50 flex-1"
        style={{ ...fieldStyle, minHeight: messageHeight }}
      />

      <div
        className={cn(
          'pt-5 flex',
          submitAlign === 'stretch' ? 'justify-stretch' : 'justify-end'
        )}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            submitButtonClass,
            'h-[48px] px-7 disabled:opacity-50',
            submitAlign === 'stretch' ? 'w-full' : 'min-w-[142px]'
          )}
        >
          {isSubmitting ? 'Sending...' : 'SUBMIT'}
        </button>
      </div>
    </form>
  );
}

function ContactCard({
  isSubmitting,
  onSubmit,
  compact = false,
}: {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  compact?: boolean;
}) {
  const { card } = contact;

  return (
    <div
      className="relative box-border grid grid-cols-1 lg:grid-cols-[minmax(0,418px)_1fr] gap-8 lg:gap-12"
      style={{
        backgroundColor: card.background,
        backdropFilter: `blur(${card.blur}px)`,
        WebkitBackdropFilter: `blur(${card.blur}px)`,
        boxShadow: card.shadow,
        padding: compact
          ? '28px 20px'
          : `${card.paddingY}px ${card.paddingX}px`,
      }}
    >
      <ContactDetails compact={compact} />
      <ContactForm
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        messageHeight={compact ? 160 : 220}
        submitAlign={compact ? 'stretch' : 'end'}
      />
    </div>
  );
}

function ContactCTAMobile() {
  const { isSubmitting, handleSubmit } = useContactSubmit();

  return (
    <section
      className={`md:hidden w-full overflow-hidden`}
      style={{ backgroundColor: contact.background }}
    >
      <div className="relative">
        <img
          src={contact.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(37, 46, 3, 0.58)' }}
        />

        <div className={`relative ${layout.container} ${layout.sectionPadding}`}>
          <ContactCard isSubmitting={isSubmitting} onSubmit={handleSubmit} compact />
        </div>
      </div>
    </section>
  );
}

function ContactCTADesktop() {
  const { isSubmitting, handleSubmit } = useContactSubmit();

  return (
    <section
      className={`hidden md:block w-full overflow-hidden`}
      style={{ backgroundColor: contact.background }}
    >
      <div className="relative">
        <img
          src={contact.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ opacity: 0.52 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(37, 46, 3, 0.55)' }}
        />

        <div className={`relative ${layout.container} ${layout.sectionPadding}`}>
          <ContactCard isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <div id="contact" className={`w-full ${layout.scrollMt}`}>
      <ContactCTAMobile />
      <ContactCTADesktop />
    </div>
  );
}
