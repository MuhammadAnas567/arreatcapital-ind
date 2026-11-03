import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { design } from '../lib/design-tokens';

const { layout, type } = design;

const TEAM_COPY =
  'Behind Arreat Capital India is a team of seasoned property advisors with deep knowledge of Mumbai, Bengaluru, Delhi-NCR, and other growth markets. We guide investors and homeowners at every stage\u2014from shortlisting the right opportunity to closing with clarity. With strong developer relationships and a transparent, client-first approach, we help you invest in India\u2019s premium real estate with confidence.';

const teamMembers = [
  {
    name: 'Rohan Mehta',
    role: 'Co-Founder / Director',
    image: 'https://i.pravatar.cc/480?img=12',
    imageClassName: 'object-cover object-center',
  },
  {
    name: 'Ananya Sharma',
    role: 'Co-Founder / Director',
    image: 'https://i.pravatar.cc/480?img=47',
    imageClassName: 'object-cover object-top',
  },
  {
    name: 'Kabir Singh',
    role: 'CEO',
    image: 'https://i.pravatar.cc/480?img=33',
    imageClassName: 'object-cover object-center',
  },
  {
    name: 'Priya Nair',
    role: 'Property Consultant',
    image: 'https://i.pravatar.cc/480?img=5',
    imageClassName: 'object-cover object-top',
  },
  {
    name: 'Arjun Patel',
    role: 'Property Consultant',
    image: 'https://i.pravatar.cc/480?img=15',
    imageClassName: 'object-cover object-center',
  },
  {
    name: 'Neha Kapoor',
    role: 'Property Consultant',
    image: 'https://i.pravatar.cc/480?img=20',
    imageClassName: 'object-cover object-top',
  },
] as const;

function TeamMemberCard({
  name,
  role,
  image,
  imageClassName = 'object-cover object-center',
  index,
}: {
  name: string;
  role: string;
  image: string;
  imageClassName?: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="india-panel group flex h-full flex-col"
    >
      <div className="relative aspect-[3/2] shrink-0 overflow-hidden bg-[#132830]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${imageClassName}`}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(180deg, transparent 45%, rgba(6,18,22,0.55) 100%)',
          }}
        />
      </div>

      <div className="h-px w-full shrink-0 bg-gold/35" aria-hidden="true" />

      <div className="flex flex-1 flex-col justify-center bg-capabilities/80 px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-serif text-[17px] font-normal uppercase leading-tight tracking-tight text-cream sm:text-[19px]">
          {name}
        </h3>
        <p className="mt-2 font-sans text-[11px] font-light uppercase tracking-[0.12em] text-gold sm:text-[12px]">
          {role}
        </p>
      </div>
    </motion.article>
  );
}

export function Team() {
  return (
    <section
      id="about"
      className={`relative ${layout.section} ${layout.sectionPadding} ${layout.scrollMt}`}
    >
      <div
        className="absolute inset-0 pointer-events-none india-surface-mesh opacity-60"
        aria-hidden="true"
      />
      <div className={`relative ${layout.container}`}>
        <div className={`${layout.sectionIntro} ${layout.sectionHeaderGap}`}>
          <p className={`${type.eyebrow} m-0`}>Team</p>
          <h2 className={`${type.sectionTitle} m-0 text-cream`}>Meet the team</h2>
          <div className={type.goldRule} />
          <p className={`${type.sectionSubtitle} m-0`}>{TEAM_COPY}</p>
        </div>

        <div className={`${layout.sectionHeaderGap} grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3`}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} {...member} index={index} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="light" scrollTo="#contact" className="!min-w-[180px]">
            CONTACT US
          </Button>
        </div>
      </div>
    </section>
  );
}
