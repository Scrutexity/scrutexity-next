'use client';

import { useRef, useEffect } from 'react';

export default function HeroRecovery() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F8F3EA]">
      {/* Full-bleed Video */}
      <video
        ref={videoRef}
        src="/videos/scrutexity-engine.mp4"
        poster="/videos/scrutexity-engine-poster.jpg"
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Scrutexity Autonomous Recovery Engine"
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <p className="inline-block mb-6 px-6 py-2.5 rounded-full border border-white/30 text-white/90 text-sm tracking-[2px] font-medium backdrop-blur-sm">
            AUTONOMOUS RECOVERY ENGINE
          </p>

          <h1 className="text-[2.8rem] md:text-[3.8rem] lg:text-[5rem] leading-[1.05] font-display font-semibold text-white mb-6 tracking-tight">
            Missed inquiries become{' '}
            <span className="text-sage">booked deposits</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-lg mx-auto mb-10">
            Secure AI that turns missed calls, DMs, and forms into revenue — while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pilot"
              className="pointer-events-auto px-10 py-4 bg-white text-[#1E2E26] rounded-full font-semibold text-lg hover:bg-[#C5A059] hover:text-white transition-all active:scale-95"
            >
              Start 14-Day Pilot
            </a>
            <a
              href="#how-it-works"
              className="pointer-events-auto px-10 py-4 border border-white/70 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Watch How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70 text-sm">
        <span>Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent mt-2" />
      </div>
    </section>
  );
}
