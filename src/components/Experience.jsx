import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience — read as a commit log, not a generic vertical timeline.
 *
 * Signature idea: this section is already chronological, so unlike a
 * decorative 01/02/03 list, a git-log framing is earned here. Each role is
 * a "commit": a short hash, the role as the commit message, and bullets
 * rendered as diff additions (`+ line`). The vertical rail per entry grows
 * downward on scroll like a branch line extending to the next commit.
 *
 * Requires: gsap (ScrollTrigger submodule, already bundled with gsap).
 */

const BuildingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const ENTRIES = [
  {
    hash: 'a3f9c21',
    role: 'Practicante QA',
    company: 'Servicio Nacional de Contratación Pública (SERCOP)',
    location: 'Quito',
    period: 'Ago 2025 – Sep 2025',
    bullets: [
      'Control de calidad para sistemas de contratación pública.',
      'Diseño y ejecución de casos de prueba y validación de correcciones.',
      'Verificación funcional y reporte de incidencias estructuradas.',
      'Colaboración en entornos con control de versiones (Git).',
    ],
  },
  {
    hash: 'e77b410',
    role: 'Practicante Soporte TI',
    company: 'Dirección de Informática, PUCE',
    location: 'Quito',
    period: 'Ago 2024 – Dic 2024',
    bullets: [
      'Mantenimiento preventivo y correctivo de hardware.',
      'Levantamiento y gestión de inventario de activos tecnológicos.',
      'Soporte a usuarios y seguimiento de tickets.',
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const lineFillRefs = useRef([]);
  const nodeRefs = useRef([]);
  const headerRefs = useRef([]);
  const listRefs = useRef([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [...cardRefs.current, ...headerRefs.current, ...listRefs.current],
          { opacity: 1, x: 0, y: 0 }
        );
        gsap.set(lineFillRefs.current, { scaleY: 1 });
        gsap.set(nodeRefs.current, { scale: 1 });
        return;
      }

      ENTRIES.forEach((_, i) => {
        const card = cardRefs.current[i];
        const lineFill = lineFillRefs.current[i];
        const node = nodeRefs.current[i];
        const header = headerRefs.current[i];
        const list = listRefs.current[i];
        if (!card) return;

        // Card + header settle in
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          }
        );

        // Commit node "lands" with a small bounce
        gsap.fromTo(
          node,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        );

        // Branch line grows downward, scrubbed to how far the card is scrolled through
        gsap.fromTo(
          lineFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              end: 'bottom 55%',
              scrub: 0.4,
            },
          }
        );

        // Bullets: diff-style stagger reveal
        if (list) {
          gsap.fromTo(
            list.children,
            { opacity: 0, x: -14 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: list, start: 'top 85%' },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section container" style={styles.section}>
      <style>{`
        .exp-hash { color: var(--secondary); opacity: 0.8; }
        .exp-diff-plus { color: var(--secondary); font-family: var(--font-mono); margin-right: 0.5rem; }
      `}</style>

      <div style={styles.eyebrow}>
        <span style={styles.eyebrowPrompt}>&gt;</span>&nbsp;git log --oneline --author=&quot;Desconocido&quot;
      </div>
      <h2 className="section-title" style={styles.title}>Experiencia</h2>

      <div style={styles.timeline}>
        {ENTRIES.map((entry, i) => (
          <div key={entry.hash} ref={(el) => (cardRefs.current[i] = el)} style={styles.card}>
            {/* Branch line: static faint track + GSAP-scrubbed fill */}
            <div style={styles.lineTrack}></div>
            <div ref={(el) => (lineFillRefs.current[i] = el)} style={styles.lineFill}></div>
            <div ref={(el) => (nodeRefs.current[i] = el)} style={styles.node}></div>

            <div ref={(el) => (headerRefs.current[i] = el)} style={styles.header}>
              <div style={styles.iconBox}><BuildingIcon /></div>
              <div>
                <p style={styles.commitLine}>
                  commit <span className="exp-hash" style={styles.hashText}>{entry.hash}</span>
                </p>
                <h3 style={styles.role}>{entry.role}</h3>
                <p style={styles.company}>
                  {entry.company} • {entry.location} • {entry.period}
                </p>
              </div>
            </div>

            <ul ref={(el) => (listRefs.current[i] = el)} style={styles.list}>
              {entry.bullets.map((bullet) => (
                <li key={bullet} style={styles.listItem}>
                  <span className="exp-diff-plus">+</span>
                  {bullet}
                </li>
              ))}
            </ul>
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
    marginBottom: '3rem',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem',
  },
  card: {
    position: 'relative',
    paddingLeft: '2.5rem',
  },
  lineTrack: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
  },
  lineFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'var(--secondary)',
    borderRadius: '2px',
    transformOrigin: 'top',
  },
  node: {
    position: 'absolute',
    left: '-4px',
    top: '0.5rem',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'var(--secondary)',
    boxShadow: '0 0 12px var(--secondary)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  iconBox: {
    background: 'rgba(255,255,255,0.05)',
    padding: '1rem',
    borderRadius: '16px',
    color: 'var(--secondary)',
    border: '1px solid var(--border)',
  },
  commitLine: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
  },
  hashText: {
    fontFamily: 'var(--font-mono)',
  },
  role: {
    fontSize: '1.4rem',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  company: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--secondary)',
    fontSize: '0.9rem',
  },
  list: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.7',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
  },
};

export default Experience;