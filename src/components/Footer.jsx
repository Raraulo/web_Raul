import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ecIcon from '../assets/ec.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const socialsRef = useRef(null);
  const coordsTextRef = useRef(null);
  const coordsDotRef = useRef(null);
  const logoWrapRef = useRef(null);
  const logoRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // ---------- secuencia de entrada, dispara una sola vez al hacer scroll ----------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from(socialsRef.current.children, {
        x: -28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
      })
        .from(
          logoWrapRef.current,
          {
            scale: 0.6,
            opacity: 0,
            rotate: -25,
            duration: 0.9,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        .from(
          bottomRef.current,
          { opacity: 0, y: 12, duration: 0.5 },
          '-=0.35'
        );

      // ---------- "GPS lock": las coordenadas se "sintonizan" hasta 0° 0' 0'' ----------
      // Ecuador = la línea equinoccial → tiene sentido narrativo, no es decoración gratuita.
      const target = "0° 0' 0''";
      const digits = '0123456789';
      const scramble = { p: 0 };

      gsap.fromTo(
        scramble,
        { p: 0 },
        {
          p: 1,
          duration: 1.4,
          delay: 0.35,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            const revealed = Math.floor(scramble.p * target.length);
            let out = '';
            for (let i = 0; i < target.length; i++) {
              const c = target[i];
              if (c === ' ' || c === '°' || c === "'") {
                out += c;
              } else {
                out += i < revealed ? c : digits[(Math.random() * 10) | 0];
              }
            }
            if (coordsTextRef.current) coordsTextRef.current.textContent = out;
          },
          onComplete: () => {
            if (coordsTextRef.current)
              coordsTextRef.current.textContent = target;
          },
        }
      );

      // punto pulsante, ambiental, constante
      gsap.to(coordsDotRef.current, {
        scale: 1.6,
        opacity: 0.35,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // respiración de brillo en el logo, ambiental
      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 10px 34px rgba(0,255,255,.35))',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // tilt 3D magnético del logo siguiendo el mouse
  const handleLogoMove = (e) => {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: relX * 18,
      rotateX: -relY * 18,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 600,
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  // micro-rebote del icono en cada link social
  const handleSocialEnter = (e) => {
    gsap.to(e.currentTarget.querySelector('.social-icon'), {
      scale: 1.25,
      rotate: -8,
      duration: 0.3,
      ease: 'back.out(3)',
    });
  };
  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.social-icon'), {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <footer ref={footerRef} style={styles.footer}>
      <style>{`
        .coords-line{
          display:flex;
          align-items:center;
          gap:.7rem;
        }

        .coords-dot{
          width:6px;
          height:6px;
          border-radius:50%;
          background:var(--primary);
          display:inline-block;
        }

        .coords-text{
          letter-spacing:.12em;
          font-variant-numeric: tabular-nums;
        }

        .coords-location{
          color:var(--primary);
          letter-spacing:.08em;
          font-family:var(--font-mono);
          font-size:.95rem;
        }

        .social-link{
          color:var(--text-muted);
          transition:color .3s, transform .3s;
          display:flex;
          align-items:center;
          gap:.7rem;
          text-decoration:none;
        }

        .social-link:hover{
          color:var(--primary);
          transform:translateX(4px);
        }

        .social-icon{
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }

        .social-name{
          font-family:var(--font-mono);
          font-size:.85rem;
          letter-spacing:.05em;
        }

        .footer-logo-wrap{
          perspective:600px;
        }

        .footer-logo{
          width:170px;
          height:170px;
          object-fit:contain;
          filter:drop-shadow(0 6px 20px rgba(0,0,0,.35));
          will-change: transform, filter;
          transform-style: preserve-3d;
          cursor:pointer;
        }

        @media (prefers-reduced-motion: reduce){
          .footer-logo, .coords-dot{
            transition:none !important;
            animation:none !important;
          }
        }
      `}</style>

      <div className="container" style={styles.container}>

        {/* Primera fila */}
        <div style={styles.topRow}>

          {/* Redes, apiladas una abajo de otra */}
          <div ref={socialsRef} style={styles.socialsContainer}>

            <a
              href="https://www.linkedin.com/in/raúl-amaguaña-3b1222223/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              onMouseEnter={handleSocialEnter}
              onMouseLeave={handleSocialLeave}
            >
              <span className="social-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
              <span className="social-name">LinkedIn</span>
            </a>

            <a
              href="https://www.instagram.com/rauloo._.o/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              onMouseEnter={handleSocialEnter}
              onMouseLeave={handleSocialLeave}
            >
              <span className="social-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </span>
              <span className="social-name">Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@raulgp"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              onMouseEnter={handleSocialEnter}
              onMouseLeave={handleSocialLeave}
            >
              <span className="social-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
                </svg>
              </span>
              <span className="social-name">TikTok</span>
            </a>

          </div>

          {/* Coordenadas con efecto de "lock" GPS */}
          <div style={styles.coordsContainer}>
            <span className="coords-line">
              <span className="coords-dot" ref={coordsDotRef}></span>
              <span className="coords-text" ref={coordsTextRef}>
                0° 0' 0''
              </span>
            </span>
          </div>

          {/* Quito Ecuador, a la derecha, misma altura */}
          <div style={styles.locationContainer}>
            <span className="coords-location">
              Quito · Ecuador
            </span>
          </div>

        </div>

        {/* Logo principal, con tilt 3D magnético */}
        <div style={styles.logoRow}>
          <div ref={logoWrapRef} className="footer-logo-wrap">
            <img
              ref={logoRef}
              src={ecIcon}
              alt="Ecuador"
              className="footer-logo"
              onMouseMove={handleLogoMove}
              onMouseLeave={handleLogoLeave}
            />
          </div>
        </div>

        {/* Parte inferior */}
        <div ref={bottomRef} style={styles.bottomRow}>
          <p style={styles.text}>
            © {new Date().getFullYear()} Raul Amaguaña Jaramillo
          </p>
        </div>

      </div>
    </footer>
  );
};

const styles = {

  footer:{
    borderTop:'1px solid var(--border)',
    marginTop:'3rem',
    padding:'4rem 0 2rem'
  },

  container:{
    display:'flex',
    flexDirection:'column',
    gap:'2.8rem'
  },

  topRow:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },

  socialsContainer:{
    display:'flex',
    flexDirection:'column',
    gap:'.9rem',
    flex:1
  },

  coordsContainer:{
    display:'flex',
    justifyContent:'center',
    flex:1,
    fontFamily:'var(--font-mono)',
    color:'var(--text-muted)',
    fontSize:'.95rem'
  },

  locationContainer:{
    display:'flex',
    justifyContent:'flex-end',
    flex:1
  },

  logoRow:{
    display:'flex',
    justifyContent:'center'
  },

  bottomRow:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    flexWrap:'wrap',
    gap:'1rem'
  },

  text:{
    color:'var(--text-muted)',
    fontFamily:'var(--font-mono)',
    fontSize:'.85rem'
  }

};

export default Footer;