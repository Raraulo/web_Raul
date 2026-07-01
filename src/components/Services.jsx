import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Services — read as a live services registry, not a stacked feature list.
 *
 * Signature idea: "Especialidades" doubles as literal system services —
 * each row gets a `[0N]` index and an ACTIVO status dot, like a
 * `systemctl status` readout. This keeps the numbering honest (it's a real,
 * fixed list of four specialties) instead of decorative 01/02/03 markers.
 * Rows alternate a directional slide-in that mirrors their reversed layout,
 * marquees get soft edge masks instead of a hard cut, and the closing CTA
 * is magnetic with lazo lines that draw themselves in on scroll.
 *
 * Requires: gsap (ScrollTrigger submodule, already bundled with gsap).
 */

const SERVICES = [
  {
    index: '01',
    status: 'ACTIVO',
    title: 'Ingeniería Móvil Multiplataforma',
    desc: 'Diseño y desarrollo aplicaciones móviles nativas y multiplataforma con React Native y Flutter, desde la arquitectura inicial hasta lista para su despliegue. Implemento integración con APIs REST/GraphQL, bases de datos locales y en tiempo real (SQLite, Firebase, Supabase), notificaciones push (FCM, APNs), además de testing de usabilidad con buenas prácticas UI/UX y rendimiento para garantizar fiabilidad en todos los dispositivos.',
    techs: ['React Native', 'Expo', 'Flutter', 'Firebase', 'Supabase', 'Fastlane', 'JWT', 'SQLite'],
    lottieSrc: '/lottie/mobile.json',
    lottieHeight: 'min(600px, 80vh)',
    lottieFlex: '2 1 350px',
    reverse: false,
  },
  {
    index: '02',
    status: 'ACTIVO',
    title: 'Desarrollo Web & Dashboards',
    desc: 'Construyo plataformas web empresariales completas, desde landing pages altamente optimizadas para SEO y conversión hasta dashboards de control en tiempo real con visualizaciones avanzadas (D3.js, Chart.js). Diseño arquitecturas escalables (monolitos modularizados o microservicios) con Node.js/Express, Go o Python (FastAPI), usando bases de datos relacionales (PostgreSQL, SQL Server) y no relacionales (MongoDB, Redis). Implemento autenticación y autorización segura, validación de datos, cacheo, y despliegue en cloud (Vercel, AWS, Railway).',
    techs: ['React/Next.js', 'Angular', 'Node.js/Express', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'Chart.js'],
    lottieSrc: '/lottie/web.json',
    lottieHeight: 'min(350px, 60vh)',
    reverse: true,
  },
  {
    index: '03',
    status: 'ACTIVO',
    title: 'QA, Seguridad & Despliegue',
    desc: 'Garantizo la calidad y seguridad de tus sistemas con procesos rigurosos de QA: diseño de casos de prueba funcionales y de regresión, pruebas manuales exploratorias, y automatización básica. Además, validación de inputs, sanitización de datos, y protección contra ataques comunes. Configuro pipelines CI/CD para automatizar builds, tests y despliegues en entornos de staging y producción, con control de versiones (Git) y gestión de cambios.',
    techs: ['Pruebas Manuales', 'Casos de Prueba', 'TestRail', 'Jira', 'OWASP', 'CI/CD', 'Git'],
    lottieSrc: '/lottie/hacker.json',
    lottieHeight: 'min(350px, 60vh)',
    reverse: false,
  },
  {
    index: '04',
    status: 'ACTIVO',
    title: 'Analista en Ciencia de Datos, Machine Learning y Big Data',
    desc: 'Sólida experiencia en el ciclo completo de análisis y transformación de información. Desarrollo soluciones escalables que van desde la ingesta, preprocesamiento y visualización de grandes volúmenes de datos (usando Apache Spark), hasta la implementación de modelos predictivos y de segmentación no supervisada (Redes Neuronales, K-Means, Regresiones y Árboles de Decisión). Orientado a optimizar procesos, automatizar la toma de decisiones y generar valor estratégico a partir de los datos.',
    techs: ['Python', 'Apache Spark', 'SparkSQL', 'Scikit-Learn', 'Pandas', 'NumPy', 'PyTorch'],
    lottieSrc: '/lottie/datos.json',
    lottieHeight: 'min(400px, 70vh)',
    reverse: true,
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const lottieColRefs = useRef([]);
  const textColRefs = useRef([]);
  const buttonWrapRef = useRef(null);
  const ctaRef = useRef(null);
  const lazoRefs = useRef([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([...lottieColRefs.current, ...textColRefs.current, buttonWrapRef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        gsap.set(lazoRefs.current, { scaleX: 1 });
        return;
      }

      // ---- Per-row choreography: alternating slide-in --------------------
      SERVICES.forEach((service, i) => {
        const row = rowRefs.current[i];
        const lottieCol = lottieColRefs.current[i];
        const textCol = textColRefs.current[i];
        if (!row || !lottieCol || !textCol) return;

        const dir = service.reverse ? 1 : -1; // lottie slides from the side it visually sits on

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 78%' },
          defaults: { ease: 'power3.out', duration: 0.8 },
        });

        tl.fromTo(
          lottieCol,
          { opacity: 0, x: dir * -50, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1 },
          0
        ).fromTo(
          textCol.children,
          { opacity: 0, x: dir * 30 },
          { opacity: 1, x: 0, stagger: 0.12 },
          0.1
        );
      });

      // ---- Status dots: staggered pulse start so the row doesn't feel synced
      gsap.utils.toArray('.svc-status-dot').forEach((dot, i) => {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.4,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // ---- Closing CTA: lazo lines draw in, button settles -----------------
      gsap.fromTo(
        lazoRefs.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: buttonWrapRef.current, start: 'top 90%' },
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: buttonWrapRef.current, start: 'top 90%' },
        }
      );

      // ---- Magnetic CTA ------------------------------------------------
      const cta = ctaRef.current;
      let cleanupCta = () => {};
      if (cta) {
        const magnetX = gsap.quickTo(cta, 'x', { duration: 0.4, ease: 'power3' });
        const magnetY = gsap.quickTo(cta, 'y', { duration: 0.4, ease: 'power3' });
        const handleMove = (e) => {
          const rect = cta.getBoundingClientRect();
          magnetX((e.clientX - (rect.left + rect.width / 2)) * 0.3);
          magnetY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
        };
        const handleLeave = () => {
          magnetX(0);
          magnetY(0);
        };
        cta.addEventListener('mousemove', handleMove);
        cta.addEventListener('mouseleave', handleLeave);
        cleanupCta = () => {
          cta.removeEventListener('mousemove', handleMove);
          cta.removeEventListener('mouseleave', handleLeave);
        };
      }

      return () => cleanupCta();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section container" style={styles.section}>
      <style>{`
        .svc-status-dot { will-change: transform, opacity; }

        .svc-marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-status-dot { animation: none !important; }
        }
      `}</style>

      <div style={styles.eyebrow}>
        <span style={styles.eyebrowPrompt}>&gt;</span>&nbsp;systemctl status --specialties
      </div>
      <h2 className="section-title" style={styles.title}>Especialidades</h2>

      <div style={styles.servicesWrapper}>
        {SERVICES.map((service, i) => (
          <div
            key={service.index}
            ref={(el) => (rowRefs.current[i] = el)}
            style={{
              ...styles.serviceRow,
              ...(service.reverse ? styles.rowReverse : null),
            }}
          >
            <div
              ref={(el) => (lottieColRefs.current[i] = el)}
              style={{
                ...styles.lottieCol,
                ...(service.lottieFlex ? { flex: service.lottieFlex } : null),
              }}
            >
              <lottie-player
                src={service.lottieSrc}
                background="transparent"
                speed="1"
                style={{ width: '100%', height: service.lottieHeight, background: 'transparent' }}
                loop
                autoplay
              ></lottie-player>
            </div>

            <div ref={(el) => (textColRefs.current[i] = el)} style={styles.textCol}>
              <div style={styles.serviceMeta}>
                <span style={styles.serviceIndex}>[{service.index}]</span>
                <span className="svc-status-dot" style={styles.statusDot}></span>
                <span style={styles.statusLabel}>{service.status}</span>
              </div>

              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.desc}>{service.desc}</p>

              <div className="marquee-container svc-marquee-mask">
                <div className="marquee-content">
                  {[...service.techs, ...service.techs].map((tech, j) => (
                    <span key={`${tech}-${j}`} style={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Ver Proyectos con Lazo */}
      <div ref={buttonWrapRef} style={styles.buttonWrapper}>
        <div ref={(el) => (lazoRefs.current[0] = el)} style={styles.lazoLine}></div>
        <Link ref={ctaRef} to="/trabajos" className="btn btn-glass" style={styles.ctaLink}>
          Ver Proyectos
        </Link>
        <div ref={(el) => (lazoRefs.current[1] = el)} style={styles.lazoLine}></div>
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
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6rem',
    width: '100%',
  },
  lazoLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(94, 234, 212, 0.5), transparent)',
    transformOrigin: 'center',
  },
  ctaLink: {
    margin: '0 2rem',
    marginTop: 0,
    display: 'inline-block',
    willChange: 'transform',
  },
  servicesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
  },
  serviceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    flexWrap: 'wrap',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  lottieCol: {
    flex: '1 1 300px',
    minWidth: '280px',
  },
  textCol: {
    flex: '1 1 300px',
    minWidth: '280px',
  },
  serviceMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.75rem',
  },
  serviceIndex: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    letterSpacing: '1px',
  },
  statusDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary)',
    boxShadow: '0 0 10px var(--secondary)',
  },
  statusLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--secondary)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  serviceTitle: {
    fontSize: '1.8rem',
    color: '#ffffff',
    marginBottom: '1.25rem',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  desc: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
  },
  techTag: {
    padding: '0.7rem 1.2rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--secondary)',
    whiteSpace: 'nowrap',
  },
};

export default Services;