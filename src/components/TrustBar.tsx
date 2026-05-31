'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

export default function TrustBar() {
  return (
    <motion.section 
      {...fadeInUp}
      className="py-16 relative overflow-hidden"
    >
      <Image src="/assets/business_bg.png" alt="Trust Background" fill sizes="100vw" className="object-cover object-center z-[-2]" />
      <div className="absolute inset-0 bg-slate-900/85 z-[-1]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-xs md:text-sm uppercase tracking-tighter font-black text-slate-400 mb-10">
          Partner di fiducia e certificazioni istituzionali
        </p>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500"
        >
           {["OAM CERTIFICATO", "GDPR COMPLIANT", "SSL SECURE", "BANCA D'ITALIA"].map((text, i) => (
             <motion.div 
              key={i}
              variants={fadeInUp}
              className={`text-xl md:text-2xl font-black text-white tracking-tighter italic ${i % 2 === 0 ? 'underline decoration-secondary decoration-4 underline-offset-4' : ''}`}
             >
               {text}
             </motion.div>
           ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
