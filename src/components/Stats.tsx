import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Building2, Target, Globe, Handshake } from 'lucide-react';
const stats = [
{
  icon: Building2,
  prefix: '',
  targetValue: 500,
  suffix: 'M+',
  label: 'ASSETS UNDER\nMANAGEMENT'
},
{
  icon: Target,
  prefix: '',
  targetValue: 15,
  suffix: '+',
  label: 'PROJECTS\nDELIVERED'
},
{
  icon: Globe,
  prefix: '',
  targetValue: 3,
  suffix: '',
  label: 'CONTINENTS\nOF OPERATION'
},
{
  icon: Handshake,
  prefix: '',
  targetValue: 25,
  suffix: '+',
  label: 'STRATEGIC\nPARTNERS'
}];

function Counter({
  targetValue,
  duration = 2



}: {targetValue: number;duration?: number;}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        if (progress < 1) {
          setCount(Math.floor(targetValue * progress));
          requestAnimationFrame(animateCount);
        } else {
          setCount(targetValue);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, targetValue, duration]);
  return <span ref={ref}>{count}</span>;
}
export function Stats() {
  return (
    <section className="bg-olive py-24 border-y border-gold/30 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 text-center divide-y sm:divide-y-0 sm:divide-x-0 lg:divide-x divide-gold/20">
          {stats.map((stat, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              margin: '-50px'
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.15
            }}
            className="flex flex-col items-center pt-8 sm:pt-0 lg:px-8 first:pt-0 first:lg:pl-0 last:lg:pr-0">
            
              <stat.icon
              size={48}
              strokeWidth={1.5}
              className="text-gold mb-6" />
            
              <div className="text-[48px] md:text-[56px] font-serif text-white mb-4 tracking-tightest leading-none flex items-center justify-center">
                {stat.prefix &&
              <span className="text-gold">{stat.prefix}</span>
              }
                <Counter targetValue={stat.targetValue} />
                {stat.suffix &&
              <span className="text-gold">{stat.suffix}</span>
              }
              </div>
              <div className="font-sans text-[12px] md:text-[13px] text-white/80 tracking-[0.2em] uppercase whitespace-pre-line leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}