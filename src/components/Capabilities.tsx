import React from 'react';
import { motion } from 'framer-motion';
import { design } from '../lib/design-tokens';

const CAPABILITIES_BG = '/hero-bg.png';
const { layout, type, colors } = design;

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className={`relative w-full overflow-hidden ${layout.scrollMt} border-y border-gold/25`}
      style={{ backgroundColor: colors.capabilities }}
    >
      <img
        src={CAPABILITIES_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-[2px] opacity-[0.22] pointer-events-none select-none"
      />
      <div className="absolute inset-0 pointer-events-none india-surface-mesh" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none india-jaali opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 india-grain" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,15,19,0.78) 0%, rgba(5,15,19,0.88) 48%, rgba(5,15,19,0.8) 100%)',
        }}
      />

      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center ${layout.container} ${layout.sectionPadding}`}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`${type.eyebrow} m-0 mb-5`}
        >
          Our Focus
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={`${type.sectionTitle} max-w-[940px] m-0 text-balance`}
        >
          Connecting Investors with
          <br />
          India&apos;s Most Exclusive Opportunities
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-7 h-px w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
