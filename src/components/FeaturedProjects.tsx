import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
const projects = [
{
  id: 1,
  name: 'BKC Signature Residences',
  location: 'Bandra Kurla Complex, Mumbai',
  price: '₹8.5 Cr',
  image:
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'
},
{
  id: 2,
  name: 'Whitefield Heights',
  location: 'Whitefield, Bengaluru',
  price: '₹3.2 Cr',
  image:
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
},
{
  id: 3,
  name: 'Golf Course Estate',
  location: 'Gurugram, Delhi-NCR',
  price: '₹5.8 Cr',
  image:
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop'
}];

export function FeaturedProjects() {
  return (
    <section id="projects" className="bg-black py-24 border-t border-gold/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-[36px] md:text-[48px] leading-tight tracking-tightest text-white mb-4">
              Featured Developments
            </h2>
            <div className="w-[60px] h-[2px] bg-gold" />
          </div>
          <button className="font-sans text-[14px] tracking-widest text-gold uppercase hover:text-white transition-colors flex items-center gap-2">
            View All Projects <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) =>
          <motion.div
            key={project.id}
            initial={{
              opacity: 0,
              y: 30
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
              delay: index * 0.1
            }}
            className="group cursor-pointer">
            
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-olive shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(175,133,59,0.1)]">
                <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/30 m-4" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <MapPin size={16} />
                    <span className="font-sans text-[12px] tracking-widest uppercase">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-[24px] text-white tracking-tightest mb-1">
                    {project.name}
                  </h3>
                  <p className="font-sans text-[14px] text-white/70 tracking-widest">
                    From {project.price}
                  </p>
                </div>
              </div>
              <button className="w-full h-[50px] border border-gold/30 text-white font-sans text-[14px] tracking-widest uppercase group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                View Details
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}