import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------
   Iconografía — un ícono distinto por módulo, no un genérico repetido
--------------------------------------------------------------- */

const LayersIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ArchitectureIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5" cy="19" r="2.4" />
    <circle cx="19" cy="19" r="2.4" />
    <line x1="12" y1="7.4" x2="6.4" y2="17" />
    <line x1="12" y1="7.4" x2="17.6" y2="17" />
    <line x1="7.4" y1="19" x2="16.6" y2="19" />
  </svg>
);

const QAIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 4 6.5v5c0 4.6 3.2 8.5 8 9.5 4.8-1 8-4.9 8-9.5v-5L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AvailabilityIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

/* ---------------------------------------------------------------
   Contenido — cada módulo lleva un id de sistema real (no decorativo):
   referencia directamente la competencia que describe. El framing de
   "módulos cargados" (estilo modprobe/lsmod) es el mismo lenguaje que
   ya usa el id MOD.0N, ahora llevado al resto de la sección.
--------------------------------------------------------------- */

const MODULES = [
  {
    id: 'MOD.01',
    tag: 'STACK.FULL',
    icon: LayersIcon,
    title: 'Full Stack de extremo a extremo',
    desc: 'No necesitas contratar a múltiples especialistas para cada etapa del proyecto. Me encargo del flujo completo: diseño de base de datos, arquitectura del backend, frontend, apps móviles, despliegue y mantenimiento. Esto reduce la fricción entre equipos, acorta los tiempos de entrega y garantiza coherencia en toda la aplicación.',
  },
  {
    id: 'MOD.02',
    tag: 'ARCH.TOGAF',
    icon: ArchitectureIcon,
    title: 'Arquitectura empresarial alineada al negocio',
    desc: 'Diseño sistemas alineados con tus objetivos, no solo código funcional. Mi formación en arquitectura empresarial (TOGAF) me permite resolver las necesidades de hoy pensando en la escalabilidad de mañana, evitando deuda técnica y facilitando nuevas funcionalidades sin reestructurar todo desde cero.',
  },
  {
    id: 'MOD.03',
    tag: 'QA.CRÍTICO',
    icon: QAIcon,
    title: 'QA en el ADN, calidad innegociable',
    desc: 'Mi experiencia asegurando calidad en sistemas críticos del Estado (SERCOP) me enseñó que la calidad y la seguridad no son opcionales. Escribo código pensando en cómo puede fallar, priorizo la robustez sobre la velocidad y pruebo rigurosamente antes de entregar cualquier funcionalidad.',
  },
  {
    id: 'MOD.04',
    tag: 'AVAIL.NOW',
    icon: AvailabilityIcon,
    title: 'Disponibilidad inmediata, compromiso total',
    desc: 'Tengo la disponibilidad para sumarme desde el primer día, remoto o presencial en Quito. Me comprometo a entender rápido tus necesidades, comunicarme con claridad y generar valor desde el primer commit, integrándome sin fricción a las tecnologías y procesos de tu equipo.',
  },
];

const WhyHireMe = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const loaderRefs = useRef([]);
  const statusDotRefs = useRef([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(cardRefs.current, { opacity: 1, y: 0, rotateX: 0, rotateY: 0 });
        gsap.set(loaderRefs.current, { scaleX: 1 });
        gsap.set(statusDotRefs.current, { scale: 1 });
        return;
      }

      const cleanups = [];

      MODULES.forEach((_, i) => {
        const card = cardRefs.current[i];
        const loader = loaderRefs.current[i];
        const dot = statusDotRefs.current[i];
        if (!card) return;

        gsap.set(card, { transformPerspective: 800 });

        // ---- "Module load" sequence: bar fills, card lands, status dot pops ----
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });

        tl.fromTo(loader, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out' })
          .fromTo(
            card,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.15'
          )
          .fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.35, ease: 'back.out(2.4)' }, '-=0.3');

        // Ambient pulse once loaded, staggered so cards don't blink in sync
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.4,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1 + i * 0.25,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });

        // ---- Cursor tilt --------------------------------------------------
        const rotateX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power3' });
        const rotateY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power3' });

        const handleMove = (e) => {
          const rect = card.getBoundingClientRect();
          const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          rotateY(relX * 5);
          rotateX(relY * -5);
        };
        const handleLeave = () => {
          rotateX(0);
          rotateY(0);
        };
        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', handleMove);
          card.removeEventListener('mouseleave', handleLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="section container whm-section" ref={sectionRef}>
      <style>{`
        .whm-section {
          --whm-accent: var(--secondary, #FF8A50);
          --whm-bg: #0c1117;
          --whm-panel: #121821;
          --whm-border: #232c36;
          --whm-text: #ecf0f3;
          --whm-muted: var(--text-muted, #8d99a6);
        }

        .whm-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--whm-accent);
          margin-bottom: 0.9rem;
        }

        .whm-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--whm-accent);
          box-shadow: 0 0 0 0 rgba(255, 138, 80, 0.55);
          animation: whm-pulse 2.4s ease-out infinite;
        }

        @keyframes whm-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(255, 138, 80, 0.45); }
          70%  { box-shadow: 0 0 0 8px rgba(255, 138, 80, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 138, 80, 0); }
        }

        .whm-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .whm-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.9rem 1.9rem 2.1rem;
          background: linear-gradient(180deg, var(--whm-panel) 0%, #0e1319 100%);
          border: 1px solid var(--whm-border);
          border-radius: 4px;
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .whm-loader {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--whm-accent), transparent);
          transform-origin: left;
          transform: scaleX(0);
        }

        .whm-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--whm-accent), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .whm-card:hover {
          border-color: rgba(255, 138, 80, 0.45);
          box-shadow: 0 8px 28px -16px rgba(0, 0, 0, 0.6);
        }

        .whm-card:hover::before { opacity: 1; }

        .whm-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .whm-tag-group {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .whm-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--whm-accent);
          box-shadow: 0 0 8px var(--whm-accent);
          flex-shrink: 0;
        }

        .whm-tag {
          font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--whm-muted);
        }

        .whm-tag span { color: var(--whm-accent); }

        .whm-icon {
          color: var(--whm-accent);
          display: inline-flex;
          padding: 0.55rem;
          border: 1px solid var(--whm-border);
          border-radius: 4px;
          background: rgba(255, 138, 80, 0.06);
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .whm-card:hover .whm-icon {
          transform: translateY(-2px) translateZ(20px);
          background: rgba(255, 138, 80, 0.12);
        }

        .whm-title {
          font-size: 1.28rem;
          line-height: 1.3;
          color: var(--whm-text);
          font-weight: 700;
          margin: 0;
        }

        .whm-desc {
          font-size: 0.98rem;
          line-height: 1.75;
          color: var(--whm-muted);
          margin: 0;
        }

        @media (max-width: 760px) {
          .whm-grid { grid-template-columns: 1fr; }
          .whm-card { padding: 1.6rem 1.5rem 1.8rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .whm-eyebrow-dot { animation: none; }
        }
      `}</style>

      <div className="whm-eyebrow">
        <span className="whm-eyebrow-dot"></span>
        &gt;&nbsp;modprobe --list-loaded
      </div>

      <h2 className="section-title">Cuatro razones para sumarme a tu equipo</h2>

      <div className="whm-grid">
        {MODULES.map(({ id, tag, icon: Icon, title, desc }, i) => (
          <article
            key={id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="whm-card"
          >
            <div ref={(el) => (loaderRefs.current[i] = el)} className="whm-loader"></div>

            <div className="whm-card-head">
              <span className="whm-icon">
                <Icon />
              </span>
              <div className="whm-tag-group">
                <span ref={(el) => (statusDotRefs.current[i] = el)} className="whm-status-dot"></span>
                <span className="whm-tag">
                  {id} · <span>{tag}</span>
                </span>
              </div>
            </div>
            <h3 className="whm-title">{title}</h3>
            <p className="whm-desc">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhyHireMe;