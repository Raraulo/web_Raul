import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TEXTS = [
  'Raúl Amaguaña',
  'Next level unlocked',
  'Welcome',
  'Bright futures ahead',
  'いらっしゃいませ',
  'Bem-vindo',
  'The human potential'
];

const TITLE = 'Ingeniero en Sistemas y Desarrollador Fullstack';

const Hero = () => {
  const sectionRef = useRef(null);
  const lottieOuterRef = useRef(null);
  const lottieWrapRef = useRef(null);
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const actionsRef = useRef(null);
  const ctaRef = useRef(null);

  const [displayText, setDisplayText] = useState('');
  const currentIndex = useRef(0);

  // ==================== ENTRANCE ANIMATION ====================
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([lottieWrapRef.current, badgeRef.current, nameRef.current, titleRef.current, actionsRef.current], {
          opacity: 1, y: 0
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(lottieWrapRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2.6 }, 0)
        .fromTo(badgeRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
        .fromTo(nameRef.current, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1.1 }, 0.7)
        .fromTo(titleRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1 }, 1.1)
        .fromTo(lineRef.current, { width: '0%' }, { width: '90px', duration: 1.3 }, 1.4)
        .fromTo(actionsRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 1.7);

      // Parallax
      const xTo = gsap.quickTo(lottieWrapRef.current, 'x', { duration: 1.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(lottieWrapRef.current, 'y', { duration: 1.5, ease: 'power3.out' });

      const handlePointerMove = (e) => {
        const relX = (e.clientX / window.innerWidth - 0.5) * 2;
        const relY = (e.clientY / window.innerHeight - 0.5) * 2;
        xTo(relX * -25);
        yTo(relY * -25);
      };

      window.addEventListener('pointermove', handlePointerMove);

      // Magnetic CTA
      const cta = ctaRef.current;
      let cleanupCta = () => {};
      if (cta) {
        const magnetX = gsap.quickTo(cta, 'x', { duration: 0.5, ease: 'power2.out' });
        const magnetY = gsap.quickTo(cta, 'y', { duration: 0.5, ease: 'power2.out' });

        const handleMove = (e) => {
          const rect = cta.getBoundingClientRect();
          magnetX((e.clientX - (rect.left + rect.width / 2)) * 0.3);
          magnetY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
        };
        const handleLeave = () => { magnetX(0); magnetY(0); };

        cta.addEventListener('mousemove', handleMove);
        cta.addEventListener('mouseleave', handleLeave);

        cleanupCta = () => {
          cta.removeEventListener('mousemove', handleMove);
          cta.removeEventListener('mouseleave', handleLeave);
        };
      }

      gsap.to(badgeRef.current.querySelector('.pulse-dot'), {
        scale: 1.4,
        opacity: 0.55,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        cleanupCta();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ==================== ALTERNATING TYPEWRITER ====================
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(TEXTS[0]);
      return;
    }

    let timeoutId;
    let isCancelled = false;

    const type = (text, callback) => {
      let i = 0;
      const interval = setInterval(() => {
        if (isCancelled) return clearInterval(interval);
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          callback?.();
        }
      }, 70); // velocidad de escritura
    };

    const deleteText = (callback) => {
      let i = displayText.length || TEXTS[currentIndex.current].length;
      const interval = setInterval(() => {
        if (isCancelled) return clearInterval(interval);
        setDisplayText(prev => prev.slice(0, i));
        i--;
        if (i < 0) {
          clearInterval(interval);
          callback?.();
        }
      }, 38);
    };

    const loop = () => {
      if (isCancelled) return;

      const currentText = TEXTS[currentIndex.current];

      type(currentText, () => {
        if (isCancelled) return;
        timeoutId = setTimeout(() => {
          deleteText(() => {
            if (isCancelled) return;
            currentIndex.current = (currentIndex.current + 1) % TEXTS.length;
            timeoutId = setTimeout(loop, 600);
          });
        }, 2800); // tiempo que se muestra cada texto
      });
    };

    // Iniciar
    timeoutId = setTimeout(loop, 800);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} style={styles.section} className="container">
      {/* ==================== BLACK HOLE (reemplaza al lottie-player) ==================== */}
      <div ref={lottieOuterRef} style={styles.blackHoleOuter}>
        <div ref={lottieWrapRef} style={styles.blackHoleWrap} className="bh-wrap">
          {/* resplandor ambiental */}
          <div className="bh-ambient" />

          <svg
            className="bh-svg"
            viewBox="0 0 500 500"
            style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
          >
            <defs>
              <radialGradient id="bhCore" cx="45%" cy="42%" r="58%">
                <stop offset="0%" stopColor="#050301" />
                <stop offset="80%" stopColor="#000000" />
                <stop offset="96%" stopColor="#000000" />
                <stop offset="100%" stopColor="#f5f2b2" />
              </radialGradient>

              {/* el gradiente rota sobre sí mismo — el anillo no se mueve, la luz sí */}
              <linearGradient id="bhDisk" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#fff3a3" stopOpacity="0.95" />
                <stop offset="8%" stopColor="#ffd54f" stopOpacity="0.95" />
                <stop offset="24%" stopColor="#ffbf48" stopOpacity="0.95" />
                <stop offset="42%" stopColor="#fffaf0" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="58%" stopColor="#fffaf0" stopOpacity="1" />
                <stop offset="76%" stopColor="#ffb464" stopOpacity="0.9" />
                <stop offset="92%" stopColor="#f3e17f" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fff01f" stopOpacity="0" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="rotate"
                  from="0 0.5 0.5"
                  to="360 0.5 0.5"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <radialGradient id="bhHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.20" />
                <stop offset="55%" stopColor="#ffd900" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#ffb469" stopOpacity="0" />
              </radialGradient>

              <filter id="bhGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* ruido animado + desplazamiento = el borde del anillo "respira" como una nube */}
              <filter id="bhCloud" x="-60%" y="-60%" width="220%" height="220%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.028" numOctaves="3" seed="7" result="noise">
                  <animate
                    attributeName="baseFrequency"
                    values="0.012 0.028;0.017 0.035;0.012 0.028"
                    dur="9s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feGaussianBlur in="displaced" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="displaced" />
                </feMerge>
              </filter>
            </defs>

            {/* halo suave de fondo, fijo */}
            <circle cx="250" cy="250" r="235" fill="url(#bhHalo)" />

            {/* resplandor amplio detrás del anillo, tipo nube */}
            <circle
              cx="250" cy="250" r="150"
              fill="none" stroke="url(#bhDisk)" strokeWidth="48"
              filter="url(#bhCloud)"
              opacity="0.45"
            />

            {/* anillo único — sigue el contorno del círculo, grueso, con textura de nube en movimiento */}
            <circle
              cx="250" cy="250" r="150"
              fill="none" stroke="url(#bhDisk)" strokeWidth="30"
              filter="url(#bhCloud)"
              className="bh-ring"
            />

            {/* núcleo brillante fino sobre el anillo */}
            <circle
              cx="250" cy="250" r="150"
              fill="none" stroke="url(#bhDisk)" strokeWidth="6"
              filter="url(#bhCloud)"
              opacity="0.85"
            />

            {/* horizonte de sucesos */}
            <circle cx="250" cy="250" r="104" fill="url(#bhCore)" opacity="0.95" />
          </svg>
        </div>
      </div>

      <style>{`
        .hero-name {
          font-family: var(--font-mono, monospace);
          white-space: pre;
        }
        .hero-name::after {
          content: '|';
          animation: blink 0.85s step-end infinite;
          color: var(--secondary, #7dd3fc);
        }
        @keyframes blink { 50% { opacity: 0; } }

        .bh-wrap {
          position: relative;
        }
        .bh-svg {
          opacity: 0.9;
        }
        .bh-ambient {
          position: absolute;
          inset: -10%;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255,180,100,0.10), rgba(255,180,100,0) 60%);
          filter: blur(20px);
          animation: bhAmbientPulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes bhAmbientPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        .bh-ring {
          transform-origin: 250px 250px;
          animation: bhRingDrift 22s linear infinite;
        }
        @keyframes bhRingDrift {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bh-ambient, .bh-ring {
            animation: none !important;
          }
        }
      `}</style>

      <div style={styles.content}>
        <div ref={badgeRef} style={styles.badge}>
          <div className="pulse-dot" style={styles.pulseDot}></div>
          <span style={styles.badgeText}>Disponible</span>
        </div>

        <h1 
          ref={nameRef} 
          style={styles.name} 
          className="hero-name"
          aria-label={TEXTS[0]}
        >
          {displayText}
        </h1>

        <div ref={titleRef} style={styles.titleContainer}>
          <h2 style={styles.title}>{TITLE}</h2>
          <div ref={lineRef} className="title-line" style={styles.line} />
        </div>

        <div ref={actionsRef} style={styles.actions}>
          <a ref={ctaRef} href="#contact" className="btn btn-primary" style={styles.cta}>
            Iniciar Proyecto
          </a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: '6rem',
    overflow: 'hidden',
  },
  blackHoleOuter: {
    position: 'absolute',
    top: '48%',
    left: 'calc(60% + 4cm)',
    transform: 'translate(-50%, -50%)',
    width: '58vw',
    height: '58vw',
    maxWidth: '640px',
    maxHeight: '640px',
    minWidth: '360px',
    minHeight: '360px',
    zIndex: -1,
    pointerEvents: 'none',
  },
  blackHoleWrap: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
    opacity: 0.84,
    willChange: 'transform',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '820px',
    zIndex: 2,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.65rem 1.4rem',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '9999px',
    marginBottom: '2.5rem',
    backdropFilter: 'blur(8px)',
  },
  pulseDot: {
    width: '9px',
    height: '9px',
    backgroundColor: 'var(--secondary)',
    borderRadius: '50%',
    boxShadow: '0 0 12px var(--secondary)',
  },
  badgeText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.95rem',
    color: '#ffffff',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 'clamp(3.2rem, 7.5vw, 6rem)',
    fontWeight: '700',
    lineHeight: '1.05',
    letterSpacing: '-2.5px',
    color: '#ffffff',
    marginBottom: '1.1rem',
    minHeight: '1.2em',
  },
  titleContainer: {
    marginBottom: '3.5rem',
  },
  title: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
    color: 'var(--text-muted)',
    fontWeight: '400',
    letterSpacing: '0.6px',
  },
  line: {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)',
    marginTop: '0.8rem',
  },
  actions: {
    display: 'flex',
    gap: '1.5rem',
  },
  cta: {
    display: 'inline-block',
    padding: '1rem 2.3rem',
    fontSize: '1.1rem',
    willChange: 'transform',
  },
};

export default Hero;