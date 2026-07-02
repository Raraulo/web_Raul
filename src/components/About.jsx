import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portadaImage from '../assets/imagenporta.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * About — "system status" read of the person, not a generic bio card.
 *
 * Signature idea: the section reads like a terminal session — `> whoami`,
 * a status line, and a progress rail that fills as you scroll through the
 * narrative, echoing the loading/boot language of a systems engineer.
 * Stats resolve as counters with a command-line label, tying back to the
 * same monospace vocabulary used in the Hero.
 *
 * Requires: gsap (already installed). Uses gsap/ScrollTrigger.
 */

const STATS = [
  { command: '$ experience --years', prefix: '+', value: 2, decimals: 0, suffix: '', label: 'Años de Experiencia' },
  { command: '$ stack --list | wc -l', prefix: '+', value: 15, decimals: 0, suffix: '', label: 'Tecnologías' },
  { command: '$ uptime --reliability', prefix: '', value: 99.9, decimals: 1, suffix: '%', label: 'Fiabilidad' },
];

const About = () => {
  const sectionRef = useRef(null);
  const avatarWrapRef = useRef(null);
  const avatarRef = useRef(null);
  const railFillRef = useRef(null);
  const paraWrapRef = useRef(null);
  const paraRefs = useRef([]);
  const statRefs = useRef([]);
  const numRefs = useRef([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const paragraphs = paraRefs.current.filter(Boolean);
      const stats = statRefs.current.filter(Boolean);
      const nums = numRefs.current.filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set([...paragraphs, ...stats, avatarWrapRef.current], { opacity: 1, y: 0 });
        gsap.set(railFillRef.current, { height: '100%' });
        nums.forEach((el, i) => {
          const s = STATS[i];
          el.textContent = `${s.prefix}${s.value.toFixed(s.decimals)}${s.suffix}`;
        });
        return;
      }

      // ---- Header: avatar + identity settle in ------------------------
      gsap.fromTo(
        avatarWrapRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // ---- Paragraphs: discrete staggered reveal -----------------------
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: paraWrapRef.current, start: 'top 78%' },
        }
      );

      // ---- Progress rail: continuous fill scrubbed to scroll -----------
      gsap.fromTo(
        railFillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: paraWrapRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.4,
          },
        }
      );

      // ---- Stats: reveal + count up once in view ------------------------
      stats.forEach((el, i) => {
        const s = STATS[i];
        const proxy = { val: 0 };
        const numEl = nums[i];

        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );

        gsap.to(proxy, {
          val: s.value,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            numEl.textContent = `${s.prefix}${proxy.val.toFixed(s.decimals)}${s.suffix}`;
          },
        });
      });

      // ---- Avatar tilt (3D, follows cursor) -----------------------------
      const wrap = avatarWrapRef.current;
      const rotateX = gsap.quickTo(avatarRef.current, 'rotateX', { duration: 0.5, ease: 'power3' });
      const rotateY = gsap.quickTo(avatarRef.current, 'rotateY', { duration: 0.5, ease: 'power3' });

      const handleMove = (e) => {
        const rect = wrap.getBoundingClientRect();
        const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        rotateY(relX * 18);
        rotateX(relY * -18);
      };
      const handleLeave = () => {
        rotateX(0);
        rotateY(0);
      };
      wrap.addEventListener('mousemove', handleMove);
      wrap.addEventListener('mouseleave', handleLeave);

      return () => {
        wrap.removeEventListener('mousemove', handleMove);
        wrap.removeEventListener('mouseleave', handleLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section container" style={styles.section}>
      <style>{`
        .about-cursor {
          display: inline-block;
          width: 0.55em;
          height: 1em;
          background: var(--secondary);
          margin-left: 0.4em;
          vertical-align: -0.15em;
          animation: about-blink 1s steps(1) infinite;
        }
        @keyframes about-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        .about-avatar-ring {
          animation: about-spin 6s linear infinite;
        }
        @keyframes about-spin { to { transform: rotate(360deg); } }

        .about-status-dot {
          animation: about-pulse 2s ease-in-out infinite;
        }
        @keyframes about-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }

        .about-layout { display: grid; grid-template-columns: 260px 1fr; gap: 4rem; }
        .about-avatar-image {
          object-fit: cover;
          object-position: center 20%;
          width: 100%;
          height: 100%;
          display: block;
        }
        @media (max-width: 860px) {
          .about-layout { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-cursor, .about-avatar-ring, .about-status-dot { animation: none; }
        }
      `}</style>

      <div style={styles.eyebrow}>
        <span style={styles.eyebrowPrompt}>&gt;</span>&nbsp;whoami
        <span className="about-cursor"></span>
      </div>

      <h2 className="section-title" style={styles.title}>Sobre Mí</h2>

      <div className="about-layout" style={styles.spacingTop}>
        {/* Identity column */}
        <div style={styles.identityCol}>
          <div ref={avatarWrapRef} style={styles.avatarWrap}>
            <div className="about-avatar-ring" style={styles.avatarRing}></div>
            <div ref={avatarRef} style={styles.avatarImageWrap}>
              <img src={portadaImage} alt="Raúl Amaguaña" style={styles.avatarImage} />
            </div>
          </div>

          <h3 style={styles.role}>System &amp; Full Stack Engineer</h3>
          <p style={styles.university}>Pontificia Universidad Católica del Ecuador</p>

          <div style={styles.statusRow}>
            <span className="about-status-dot" style={styles.statusDot}></span>
            <span style={styles.statusText}>Construyendo activamente</span>
          </div>
        </div>

        {/* Narrative column with scroll rail */}
        <div style={styles.narrativeCol}>
          <div style={styles.railTrack}>
            <div ref={railFillRef} style={styles.railFill}></div>
          </div>

          <div ref={paraWrapRef} style={styles.paragraphs}>
            <p ref={(el) => (paraRefs.current[0] = el)} style={styles.text}>
              <strong>Estudiante de Ingeniería en Sistemas (8° semestre)</strong> con experiencia
              práctica en desarrollo de software empresarial y aseguramiento de calidad para
              sistemas críticos.
            </p>
            <p ref={(el) => (paraRefs.current[1] = el)} style={styles.text}>
              Arquitecto y construyo <strong>soluciones de extremo a extremo</strong> en todo el
              stack: diseño de bases de datos relacionales normalizadas (PostgreSQL, SQL Server),
              construcción de APIs RESTful/GraphQL con Node.js/Express y Go, implementación de
              SPAs responsivas con React/Next.js y Angular, y desarrollo de apps móviles
              multiplataforma con React Native y Flutter.
            </p>
            <p ref={(el) => (paraRefs.current[2] = el)} style={styles.text}>
              Mi formación en <strong>arquitectura empresarial TOGAF</strong> garantiza que los
              sistemas sean escalables, mantenibles y alineados con los objetivos del negocio.
              Integro flujos de desarrollo potenciados por IA (GitHub Copilot, Claude) para
              acelerar la entrega mientras mantengo rigurosos estándares de QA perfeccionados en
              SERCOP.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.stats}>
        {STATS.map((s, i) => (
          <div key={s.label} ref={(el) => (statRefs.current[i] = el)} style={styles.stat}>
            <span style={styles.statCommand}>{s.command}</span>
            <span ref={(el) => (numRefs.current[i] = el)} style={styles.statNum}>
              {s.prefix}0{s.suffix}
            </span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.95rem',
    color: 'var(--secondary)',
    letterSpacing: '1px',
    marginBottom: '0.75rem',
  },
  eyebrowPrompt: {
    color: 'var(--secondary)',
  },
  title: {
    marginBottom: '0',
  },
  spacingTop: {
    marginTop: '3rem',
  },
  identityCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  avatarWrap: {
    position: 'relative',
    width: '180px',
    height: '180px',
    marginBottom: '0.75rem',
    perspective: '600px',
  },
  avatarRing: {
    position: 'absolute',
    inset: '-8px',
    borderRadius: '50%',
    background:
      'conic-gradient(from 0deg, var(--secondary), transparent 30%, transparent 70%, var(--secondary))',
    opacity: 0.6,
  },
  avatarImageWrap: {
    position: 'absolute',
    inset: '0',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.16)',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 20%',
    display: 'block',
  },
  role: {
    fontSize: '1.6rem',
    color: '#ffffff',
    fontWeight: '700',
    margin: 0,
  },
  university: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    margin: 0,
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginTop: '0.5rem',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary)',
    boxShadow: '0 0 10px var(--secondary)',
  },
  statusText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  narrativeCol: {
    position: 'relative',
    display: 'flex',
    gap: '2rem',
  },
  railTrack: {
    position: 'relative',
    width: '2px',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
  },
  railFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: 'linear-gradient(to bottom, var(--secondary), transparent)',
    borderRadius: '2px',
  },
  paragraphs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--text-muted)',
    margin: 0,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
    marginTop: '4.5rem',
    paddingTop: '3rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statCommand: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--secondary)',
    opacity: 0.7,
    letterSpacing: '0.5px',
  },
  statNum: {
    fontSize: '3.2rem',
    fontWeight: '700',
    fontFamily: 'var(--font-mono)',
    color: '#ffffff',
    lineHeight: '1',
  },
  statLabel: {
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    textAlign: 'center',
  },
};

export default About;