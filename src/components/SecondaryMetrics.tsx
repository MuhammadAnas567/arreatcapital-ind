import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Wallet, type LucideIcon } from 'lucide-react';
import { design } from '../lib/design-tokens';

interface Metric {
  icon: LucideIcon;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  {
    icon: TrendingUp,
    value: 12,
    decimals: 0,
    suffix: '%+',
    label: 'Average investment growth',
  },
  {
    icon: Users,
    value: 500,
    decimals: 0,
    suffix: '+',
    label: 'Trusted Investors',
  },
  {
    icon: Wallet,
    value: 2.5,
    decimals: 1,
    suffix: 'B+',
    label: 'Total Portfolio Value',
  },
];

function DecimalCounter({
  targetValue,
  duration = 2,
  decimals = 0,
}: {
  targetValue: number;
  duration?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(targetValue * easeOutQuart);
      if (progress < 1) requestAnimationFrame(animateCount);
      else setCount(targetValue);
    };
    requestAnimationFrame(animateCount);
  }, [isInView, targetValue, duration, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export function SecondaryMetrics() {
  return (
    <section className={`${design.layout.section} py-12 sm:py-16 md:py-20 border-y border-gold/25 relative`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className={`${design.layout.container} relative z-10`}>
        <div className="border border-gold/30 p-3 sm:p-5 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.article
                  key={metric.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group min-w-0 bg-[#E6DFCF] border border-gold/35 px-6 md:px-8 py-8 md:py-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-11 h-11 flex items-center justify-center bg-[#061216]/8 border border-[#061216]/10">
                      <Icon
                        className="w-[18px] h-[18px] text-[#061216]"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="font-serif text-[42px] sm:text-[48px] md:text-[56px] text-[#061216] tracking-tightest leading-none">
                      <DecimalCounter
                        targetValue={metric.value}
                        decimals={metric.decimals}
                      />
                      <span className="text-gold">{metric.suffix}</span>
                    </div>

                    <p className="font-sans text-[13px] md:text-[14px] text-[#061216]/75 leading-snug max-w-[220px]">
                      {metric.label}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
