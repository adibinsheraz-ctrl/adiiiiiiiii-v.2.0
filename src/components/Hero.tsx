import { useState, useEffect, useRef, useCallback } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const SENSITIVITY = 0.8;
const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
      />
      <path
        d="M8.5 3.5V2.5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1"
        stroke="currentColor"
      />
    </svg>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const prevXRef = useRef<number | null>(null);
  const seekPendingRef = useRef(false);
  const [showActions, setShowActions] = useState(false);

  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);

  // Show action pills 400ms after mount (independent of typewriter)
  useEffect(() => {
    const t = window.setTimeout(() => setShowActions(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // Mouse-scrub video control
  const handleSeeked = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    seekPendingRef.current = false;
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.001) {
      seekPendingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;
      const offset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(targetTimeRef.current + offset, 0),
        video.duration,
      );
      if (!seekPendingRef.current) {
        seekPendingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [handleSeeked]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('adi.binsheraz@gmail.com');
    } catch {
      // fallback: silently ignore
    }
  };

  return (
    <>
      {/* Background video — rendered outside <section> to avoid stacking-context clipping */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 object-cover object-center"
        style={{ width: '100vw', height: '100vh' }}
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/kling_20260901_VIDEO_animate_4782_0.mp4"
          type="video/mp4"
        />
      </video>

      <section className="relative z-[1] h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        {/* Content container */}
        <div className="max-w-xl relative z-10">
          {/* Blurred intro label */}
          <p
            className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            adiiiiiiiii&apos;s Adaptive Response Interface Agent
          </p>

          {/* Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: 54,
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

          {/* Action pills */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: showActions ? 1 : 0,
              transform: showActions ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* White pill buttons */}
            <a
              href="mailto:adi.binsheraz@gmail.com"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              Pitch us an idea
            </a>
            <a
              href="https://adisocial.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              Come work here
            </a>
            <a
              href="https://wa.me/923139033546"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              Send a brief hello
            </a>
            <a
              href="https://adiagency.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              See how we operate
            </a>

            {/* Outline pill with email + copy icon */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">
                  adi.binsheraz@gmail.com
                </span>
              </span>
              <CopyIcon />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
