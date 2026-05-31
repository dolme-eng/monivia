'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export default function VideoPromo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <Image src="/assets/business_bg.png" alt="Background" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full mb-6 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Video Presentazione
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Il futuro del credito, <br className="hidden md:block"/> spiegato in 60 secondi
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Guarda come abbiamo semplificato il processo di finanziamento per offrirti la migliore esperienza digitale sul mercato.
          </p>
        </motion.div>
        
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="max-w-5xl mx-auto relative rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group aspect-video bg-slate-900 cursor-pointer"
           onClick={handleVideoPlay}
         >
           {/* Play Button Overlay */}
           {!isPlaying && (
             <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-black/10">
               <motion.div 
                 whileHover={{ scale: 1.15 }}
                 whileTap={{ scale: 0.95 }}
                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
                 className="w-24 h-24 bg-secondary text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-glow pl-2"
               >
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
               </motion.div>
             </div>
           )}
           
           {/* Real Video Player */}
           <video 
             ref={videoRef}
             src="/lv_0_20260529163833.mp4"
             className="w-full h-full object-cover"
             controls={isPlaying}
             loop
             playsInline
             muted={false}
           />
         </motion.div>
      </div>
    </section>
  );
}
