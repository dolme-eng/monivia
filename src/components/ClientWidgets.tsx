'use client';

import dynamic from 'next/dynamic';

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const ExitIntentModal = dynamic(() => import('@/components/ExitIntentModal'), { ssr: false });
const StickyConversionBar = dynamic(() => import('@/components/StickyConversionBar'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <CookieBanner />
      <StickyConversionBar />
      <WhatsAppButton />
      <BackToTop />
      <ExitIntentModal />
    </>
  );
}
