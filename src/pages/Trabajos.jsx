import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import book1 from '../assets/capturas/book1.png';
import book2 from '../assets/capturas/book2.png';
import book3 from '../assets/capturas/book3.png';
import book4 from '../assets/capturas/book4.png';
import book5 from '../assets/capturas/book5.png';
import book6 from '../assets/capturas/book6.png';
import book7 from '../assets/capturas/book7.png';
import book8 from '../assets/capturas/book8.png';
import django1 from '../assets/capturas/django1.png';
import django2 from '../assets/capturas/django2.png';
import django3 from '../assets/capturas/django3.png';
import django4 from '../assets/capturas/django4.png';
import django5 from '../assets/capturas/django5.png';
import dog1 from '../assets/capturas/dog1 (1).png';
import dog2 from '../assets/capturas/dog1 (2).png';
import dog3 from '../assets/capturas/dog1 (3).png';
import dog4 from '../assets/capturas/dog1 (4).png';
import dog5 from '../assets/capturas/dog1 (5).png';
import dog6 from '../assets/capturas/dog1 (6).png';
import dog7 from '../assets/capturas/dog1 (7).png';
import dog8 from '../assets/capturas/dog1 (8).png';
import dog9 from '../assets/capturas/dog1 (9).png';
import dog10 from '../assets/capturas/dog1 (10).png';
import dog11 from '../assets/capturas/dog1 (11).png';
import dog12 from '../assets/capturas/dog1 (12).png';
import dog13 from '../assets/capturas/dog1 (13).png';
import wawPhoneImg from '../assets/capturas/waw.jpg';
import wawPhoneImg2 from '../assets/capturas/waw1.jpg';
import maisonPhoneImg from '../assets/capturas/maison.jpg';
import maisonPhoneImg2 from '../assets/capturas/maison1.jpg';
import go1 from '../assets/capturas/go (1).png';
import go2 from '../assets/capturas/go (2).png';
import wawScreen from '../assets/capturas/waw.jpg';
import wawQrAnimation from '../assets/lottie/qr.json';
import wawQrCode from '../assets/capturas/WaWallet.apk_QR.png';
import maisonScreen from '../assets/capturas/maison.jpg';
import maisonQrCode from '../assets/capturas/Maisondeparfum.apk_QR.png';
import newsImg from '../assets/capturas/news.png';
import laraImg from '../assets/capturas/lara.png';

gsap.registerPlugin(ScrollTrigger);

const images = [book1, book2, book3, book4, book5, book6, book7, book8];
const djangoImages = [django1, django2, django3, django4, django5];
const dogImages = [dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8, dog9, dog10, dog11, dog12, dog13];
const goImages = [go1, go2];

const notebooks = [
  {
    label: 'Análisis de Señales — Transformada de Fourier',
    desc: 'Descomposición espectral de señales en el dominio de la frecuencia usando FFT con NumPy y Matplotlib.',
    path: '/datos/An%C3%A1lisis_de_Se%C3%B1ales_Transformada_de_Fourier.html',
  },
  {
    label: 'Clasificación de Imágenes con CNNs',
    desc: 'Red Neuronal Convolucional (CNN) entrenada con Keras/TensorFlow para clasificar imágenes con alta precisión.',
    path: '/datos/Clasificaci%C3%B3n_de_Im%C3%A1genes_con_CNNs.html',
  },
  {
    label: 'Red Neuronal Simple para Clasificación',
    desc: 'Implementación desde cero de un perceptrón multicapa para clasificación binaria sin librerías de alto nivel.',
    path: '/datos/Creaci%C3%B3n_Red_Neuronal_Simple_para_Clasificaci%C3%B3n.html',
  },
  {
    label: 'Red Neuronal Multicapa — Diseño & Implementación',
    desc: 'Arquitectura profunda de capas densas, funciones de activación, backpropagation y optimización de hiperparámetros.',
    path: '/datos/Dise%C3%B1o_e_implementaci%C3%B3n_de_una_red_neuronal_multicapa.html',
  },
  {
    label: 'Eliminación de Ruido con Fourier',
    desc: 'Filtrado de señales ruidosas en el dominio frecuencial: identificación, aislamiento y supresión selectiva de frecuencias no deseadas.',
    path: '/datos/Eliminaci%C3%B3n_de_Ruido_en_Se%C3%B1ales_Transformada_de_Fourier.html',
  },
  {
    label: 'Visualización de Datos Grandes',
    desc: 'Técnicas de visualización interactiva aplicadas a datasets de gran volumen: heatmaps, scatter plots y gráficos multidimensionales.',
    path: '/datos/Visualizaci%C3%B3n_Datos_Grandes.html',
  },
  {
    label: 'Big Data con Apache Spark',
    desc: 'Procesamiento distribuido y analítica sobre grandes volúmenes de datos usando PySpark y su ecosistema.',
    path: '/datos/Visualizaci%C3%B3n_de_Big_Data_con_Apache_Spark.html',
  },
  {
    label: 'Preparación de Datos',
    desc: 'Pipeline completo de preparación y limpieza de datos: manejo de valores nulos, normalización, encoding y feature engineering.',
    path: '/datos/preparacion_2.html',
  },
];

const awsPdf = '/aws.pdf'; // Coloca aws.pdf en la carpeta public/

/* ----------------------------------------------------------------
   Galería con layout tipo "bento": una imagen destacada + grilla de
   miniaturas. Reemplaza el carrusel plano original y abre el
   lightbox con navegación al hacer clic.
------------------------------------------------------------------ */
const Gallery = ({ images: imgs, title, onOpen }) => {
  if (!imgs || imgs.length === 0) return null;
  const featured = imgs.length >= 5;

  return (
    <div className="gallery-wrap">
      <div className="gallery-meta">
        <span className="gallery-meta-line" />
        <span className="gallery-count">
          {imgs.length} {imgs.length === 1 ? 'captura' : 'capturas'}
        </span>
      </div>
      <div className={`gallery-grid ${featured ? 'gallery-grid--featured' : 'gallery-grid--compact'}`}>
        {imgs.map((src, i) => (
          <div
            key={i}
            className={`gallery-item ${featured && i === 0 ? 'gallery-item--featured' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(i)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(i)}
            aria-label={`Ampliar captura ${i + 1} de ${title}`}
          >
            <img src={src} alt={`${title} — captura ${i + 1}`} loading="lazy" />
            <span className="gallery-item-overlay" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Eyebrow = ({ children }) => (
  <div className="section-eyebrow">
    <span className="section-eyebrow-dot" />
    {children}
  </div>
);

const SlideshowImage = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '8px', zIndex: 1 }}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === currentIndex ? 0.85 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        />
      ))}
    </div>
  );
};

const Trabajos = () => {
  // lightbox = { images, index, title } | null
  const [lightbox, setLightbox] = useState(null);
  const [qrFullscreen, setQrFullscreen] = useState(false);
  const [maisonQrFullscreen, setMaisonQrFullscreen] = useState(false);
  const [githubLangs, setGithubLangs] = useState([]);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const res = await fetch('https://api.github.com/users/Raraulo/repos');
        const repos = await res.json();
        const langCounts = {};
        repos.forEach(repo => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });
        const data = Object.keys(langCounts)
          .map(key => ({ name: key, value: langCounts[key] }))
          .sort((a, b) => b.value - a.value);
        setGithubLangs(data);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    }
    fetchGitHubData();
  }, []);

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6B6B', '#FF7F50', '#8A2BE2'];

  const rootRef = useRef(null);
  const qrContainerRef = useRef(null);
  const qrAnimRef = useRef(null);
  const maisonQrContainerRef = useRef(null);
  const maisonQrAnimRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback((e) => {
    e?.stopPropagation();
    setLightbox((l) => (l ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length } : l));
  }, []);

  const showNext = useCallback((e) => {
    e?.stopPropagation();
    setLightbox((l) => (l ? { ...l, index: (l.index + 1) % l.images.length } : l));
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, showPrev, showNext]);

  // Cierre del QR en pantalla completa con Escape
  useEffect(() => {
    if (!qrFullscreen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setQrFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [qrFullscreen]);

  // Cierre del QR de Maison APP en pantalla completa con Escape
  useEffect(() => {
    if (!maisonQrFullscreen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setMaisonQrFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [maisonQrFullscreen]);

  const openLightbox = (imgs, index, title) => setLightbox({ images: imgs, index, title });

  // Carga la animación del QR directamente con lottie-web sobre el div
  // contenedor. Se evita el wrapper de 'lottie-react' porque en algunos
  // entornos de Vite su import por defecto no resuelve al componente.
  useEffect(() => {
    if (!qrContainerRef.current) return;
    qrAnimRef.current = lottie.loadAnimation({
      container: qrContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: wawQrAnimation,
    });
    return () => {
      qrAnimRef.current?.destroy();
      qrAnimRef.current = null;
    };
  }, []);

  // El QR está pausado por defecto y "cobra vida" al pasar el cursor
  const handleQrHoverStart = () => {
    qrAnimRef.current?.setSpeed(1.3);
    qrAnimRef.current?.play();
  };
  const handleQrHoverEnd = () => {
    qrAnimRef.current?.pause();
  };

  // Misma animación Lottie reutilizada para el QR de Maison APP
  useEffect(() => {
    if (!maisonQrContainerRef.current) return;
    maisonQrAnimRef.current = lottie.loadAnimation({
      container: maisonQrContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: wawQrAnimation,
    });
    return () => {
      maisonQrAnimRef.current?.destroy();
      maisonQrAnimRef.current = null;
    };
  }, []);

  const handleMaisonQrHoverStart = () => {
    maisonQrAnimRef.current?.setSpeed(1.3);
    maisonQrAnimRef.current?.play();
  };
  const handleMaisonQrHoverEnd = () => {
    maisonQrAnimRef.current?.pause();
  };

  /* ----------------------------------------------------------------
     Scroll choreography — cada bloque (project-card, galería, notebook,
     sección AWS) entra al hacer scroll en vez de estar todo estático
     desde el primer render. Usa selectores de clase ya existentes en
     el DOM, así que no requiere tocar el JSX de abajo con refs sueltas.
  ------------------------------------------------------------------ */
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });

      gsap.utils.toArray('.gallery-grid').forEach((grid) => {
        const items = grid.querySelectorAll('.gallery-item');
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: { trigger: grid, start: 'top 88%' },
          }
        );
      });

      gsap.utils.toArray('.notebook-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });

      const wawShowcase = rootRef.current?.querySelector('.waw-showcase');
      if (wawShowcase) {
        gsap.fromTo(
          wawShowcase,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: wawShowcase, start: 'top 88%' },
          }
        );
      }

      const aws = rootRef.current?.querySelector('.aws-section');
      if (aws) {
        gsap.fromTo(
          aws,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: aws, start: 'top 85%' },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="section container fade-up-element is-visible"
      style={{ paddingTop: '8rem', minHeight: '100vh' }}
    >
      <style>{galleryStyles}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem', marginTop: '-1rem' }}>
        <div style={{ flex: '1 1 380px' }}>
          <Eyebrow>ls ./proyectos --sort=date</Eyebrow>
          <h2 className="section-title">Portafolio de Proyectos</h2>
          <p style={styles.pageIntro}>
            Una selección de proyectos de extremo a extremo: el problema de negocio, las decisiones técnicas
          </p>
        </div>

        {githubLangs.length > 0 && (
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '1rem', marginLeft: '-1.5rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Tecnologías Usadas</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ width: 220, height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={githubLangs}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      animationDuration={1400}
                      stroke="none"
                    >
                      {githubLangs.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(15,15,25,0.95)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.82rem', padding: '6px 12px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value, name) => [`${value} repo${value > 1 ? 's' : ''}`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {githubLangs.map((entry, index) => (
                  <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: PIE_COLORS[index % PIE_COLORS.length], flexShrink: 0, boxShadow: `0 0 6px ${PIE_COLORS[index % PIE_COLORS.length]}88` }} />
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem', fontWeight: 500 }}>{entry.name}</span>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem' }}>{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The Quito Grid (Right Image) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8rem', marginTop: '4rem', position: 'relative', width: '100%', minHeight: '400px' }}>
        <div style={{ flex: '1 1 50%', maxWidth: '50%', zIndex: 2, paddingRight: '2rem' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>The Quito Grid</h3>
          <a href="https://web-news-red.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', color: 'var(--secondary, #7dd3fc)', marginBottom: '1.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>
            Ver página ↗
          </a>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> Se necesitaba una plataforma capaz de centralizar información en tiempo real de diversas fuentes sin comprometer el rendimiento ni la experiencia de usuario.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Solución:</strong> Implementé Next.js aprovechando Server-Side Rendering (SSR). Se integraron múltiples APIs de noticias globales, eventos de arte y de música. Todo con una arquitectura limpia y alojado en Vercel.
            </p>
            <p>
              <strong>Tecnologías Clave:</strong> Next.js, React, TailwindCSS, Vercel, RESTful APIs.
            </p>
          </div>
        </div>
        
        <div style={{ width: '50%', zIndex: 1 }}></div>

        <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '60%', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #050301 0%, rgba(5,3,1,0.95) 25%, transparent 100%)', zIndex: 2 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050301 0%, transparent 10%, transparent 90%, #050301 100%)', zIndex: 2 }}></div>
          <img src={newsImg} alt="The Quito Grid" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, borderRadius: '8px' }} />
        </div>
      </div>

      {/* Laravel Buildmaster (Left Image) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8rem', marginTop: '4rem', position: 'relative', width: '100%', minHeight: '400px' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '60%', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, #050301 0%, rgba(5,3,1,0.95) 25%, transparent 100%)', zIndex: 2 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050301 0%, transparent 10%, transparent 90%, #050301 100%)', zIndex: 2 }}></div>
          <img src={laraImg} alt="Laravel Buildmaster" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, borderRadius: '8px' }} />
        </div>

        <div style={{ width: '50%', zIndex: 1 }}></div>

        <div style={{ flex: '1 1 50%', maxWidth: '50%', zIndex: 2, paddingLeft: '2rem' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Buildmaster</h3>
          <a href="http://buildmaster.howto.rocks/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', color: 'var(--secondary, #7dd3fc)', marginBottom: '1.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>
            Ver página ↗
          </a>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Gestión de Construcción:</strong> Un ERP a medida construido con Laravel y MySQL, enfocado en el sector de la construcción.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Características:</strong> Gestión integral de personas y recursos humanos, control exhaustivo de inventario y materiales, y monitorización en tiempo real del avance de obra.
            </p>
            <p>
              <strong>Tecnologías Clave:</strong> Laravel, PHP, MySQL, TailwindCSS.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Apps Section */}
      <div style={{ marginTop: '6rem', marginBottom: '8rem', width: '100%' }}>
        <Eyebrow>React Native · iOS &amp; Android · Gemini AI</Eyebrow>
        <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Maison Des Senteurs</h3>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '4rem', maxWidth: '800px' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>El Problema:</strong> Se requería desarrollar una aplicación móvil de comercio electrónico premium, con una experiencia de navegación fluida a 60fps, sin incurrir en los altos costos de desarrollar en lenguajes nativos por separado para iOS y Android.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Solución:</strong> Se desarrolló en React Native con un solo código base. Se integró un asistente inteligente ("Giulia") potenciado por la API de Gemini para recomendar perfumes de forma hiper-personalizada, y un flujo de pago ultrarrápido con tarjetas virtuales integradas.
          </p>
        </div>



        {/* WaWallet App Section */}
        <div style={styles.subSection}>
          <Eyebrow>React Native · Firebase · App Nativa</Eyebrow>
          <h4 style={styles.subtitle}>WaWallet — App de Testeo</h4>
          <div style={styles.desc}>
            <p style={{ marginBottom: '1rem' }}>
              WaWallet es la aplicación financiera satélite que impulsa los pagos dentro de Maison Des Senteurs. Construida con React Native e integrada sobre la infraestructura de seguridad de Firebase, permite generar tarjetas virtuales y realizar compras directas en un solo toque.
            </p>
            <p>
              Pruebalo escaneando el código QR con tu celular, da clic sobre él Qr para descargarlo.
            </p>
            <div className="waw-showcase" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {/* First phone (iPhone) */}
              <div className="waw-phone waw-phone--iphone" style={{ width: '200px', height: '400px', position: 'relative' }}>
                <div className="waw-phone-notch" />
                <div className="waw-phone-screen">
                  <img src={wawScreen} alt="Pantalla de la aplicación WaWallet" loading="lazy" />
                </div>
              </div>

              {/* Second phone (Android style) using alternate image */}
              <div className="waw-phone waw-phone--android" style={{ backgroundImage: `url(${wawPhoneImg2})`, backgroundSize: 'cover', width: '200px', height: '400px', position: 'relative' }} />

              {/* QR code area remains unchanged */}
              <div
                className="waw-qr-wrap"
                role="button"
                tabIndex={0}
                onClick={() => setQrFullscreen(true)}
                onMouseEnter={handleQrHoverStart}
                onMouseLeave={handleQrHoverEnd}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setQrFullscreen(true)}
                aria-label="Ver código QR de descarga de WaWallet en pantalla completa"
              >
                <div className="waw-android-badge">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M17.523 15.34a1.05 1.05 0 1 1 0-2.1 1.05 0 0 1 0 2.1Zm-11.046 0a1.05 1.05 0 1 1 0-2.1 1.05 0 0 1 0 2.1ZM17.86 9.6l1.66-2.877a.375.375 0 0 0-.65-.375L17.17 9.19a10.76 10.76 0 0 0-10.34 0L5.13 6.348a.375.375 0 1 0-.65.375L6.14 9.6C3.6 11.09 1.9 13.68 1.6 16.66h20.8c-.3-2.98-2-5.57-4.54-7.06Z" />
                  </svg>
                  <span>Disponible en Android</span>
                </div>
                <div ref={qrContainerRef} className="waw-qr-lottie" />
                <span className="waw-qr-hint">Toca para ampliar ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Maison APP Section */}
        <div style={styles.subSection}>
          <Eyebrow>React Native · Django · Consume WaWallet</Eyebrow>
          <h4 style={styles.subtitle}>Maison APP — App de Perfumes</h4>
          <div style={styles.desc}>
            <p style={{ marginBottom: '1rem' }}>
              Maison APP es la aplicación de perfumería construida con React Native, con un backend propio en Django, que consume la API de WaWallet para procesar los pagos dentro de la experiencia de compra.
            </p>
            <p>
              Pruébala escaneando el código QR con tu celular, da clic sobre él para descargarlo.
            </p>
          </div>

          <div className="waw-showcase">
            <div
              className="waw-qr-wrap"
              role="button"
              tabIndex={0}
              onClick={() => setMaisonQrFullscreen(true)}
              onMouseEnter={handleMaisonQrHoverStart}
              onMouseLeave={handleMaisonQrHoverEnd}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setMaisonQrFullscreen(true)}
              aria-label="Ver código QR de descarga de Maison APP en pantalla completa"
            >
              <div className="waw-android-badge">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M17.523 15.34a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm-11.046 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1ZM17.86 9.6l1.66-2.877a.375.375 0 0 0-.65-.375L17.17 9.19a10.76 10.76 0 0 0-10.34 0L5.13 6.348a.375.375 0 1 0-.65.375L6.14 9.6C3.6 11.09 1.9 13.68 1.6 16.66h20.8c-.3-2.98-2-5.57-4.54-7.06Z" />
                </svg>
                <span>Disponible en Android</span>
              </div>
              <div ref={maisonQrContainerRef} className="waw-qr-lottie" />
              <span className="waw-qr-hint">Toca para ampliar ↗</span>
            </div>

            <div className="waw-phone waw-phone--iphone" style={{ width: '200px', height: '400px', position: 'relative' }}>
              <div className="waw-phone-notch" />
              <div className="waw-phone-screen">
                <img src={maisonScreen} alt="Pantalla de la aplicación Maison APP" loading="lazy" />
              </div>
            </div>
            {/* Second phone for Maison using alternate image */}
            <div className="waw-phone waw-phone--iphone" style={{ width: '200px', height: '400px', position: 'relative' }}>
              <div className="waw-phone-notch" />
              <div className="waw-phone-screen">
                <img src={maisonPhoneImg2} alt="Pantalla alternativa de Maison APP" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Backend en Django (Image Below Text) */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8rem', marginTop: '4rem', width: '100%' }}>
        <div style={{ maxWidth: '900px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Backend Django</h3>
          <a href="https://appmovilback-1.onrender.com/admin/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', color: 'var(--secondary, #7dd3fc)', marginBottom: '1.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>
            Ver página ↗
          </a>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> Se requería un sistema central que gestionara el inventario, usuarios y pedidos de forma segura y orquestara lógica de negocio compleja (jerarquías de fragancias y precios dinámicos).
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Solución:</strong> Se diseñó un esquema relacional complejo en PostgreSQL. Se expusieron endpoints optimizados (minimizando queries con <code>select_related</code>) y protegidos mediante JWT.
            </p>
            <p>
              <strong>Tecnologías Clave:</strong> Python, Django REST Framework, PostgreSQL.
            </p>
          </div>
        </div>
        <div 
          style={{ position: 'relative', width: '100%', height: '500px', cursor: 'pointer', overflow: 'hidden', borderRadius: '12px' }}
          onClick={() => openLightbox(djangoImages, 0, 'Backend Django')}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #050301 0%, transparent 50%)', zIndex: 2, pointerEvents: 'none' }}></div>
          <SlideshowImage images={djangoImages} />
        </div>
      </div>

      {/* Dashboard Don Books (Image Below Text) */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8rem', marginTop: '4rem', width: '100%' }}>
        <div style={{ maxWidth: '900px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Dashboard Don Books</h3>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> Consolidar múltiples flujos de ventas, inventario y métricas en un ERP unificado para evitar silos de información.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Solución:</strong> Se construyó el sistema basándose en el framework Grails (Spring Boot y Groovy). Se logró un dashboard fluido y altamente interactivo para procesar millones de registros sin colapsar el navegador.
            </p>
            <p>
              <strong>Tecnologías Clave:</strong> Grails, Spring Boot, Groovy, MVC.
            </p>
          </div>
        </div>
        <div 
          style={{ position: 'relative', width: '100%', height: '500px', cursor: 'pointer', overflow: 'hidden', borderRadius: '12px' }}
          onClick={() => openLightbox(images, 0, 'Dashboard Don Books')}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #050301 0%, transparent 50%)', zIndex: 2, pointerEvents: 'none' }}></div>
          <SlideshowImage images={images} />
        </div>
      </div>



      {/* E-Commerce Pawluxury (Image Below Text) */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8rem', marginTop: '4rem', width: '100%' }}>
        <div style={{ maxWidth: '900px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>E-Commerce Pawluxury</h3>
          <a href="https://cliente-angular-s3ov.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', color: 'var(--secondary, #7dd3fc)', marginBottom: '1.5rem', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>
            Ver página ↗
          </a>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> Modernizar una plataforma legada con altos tiempos de carga, que causaba fricción en dispositivos móviles y abandono de carritos.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Solución:</strong> Se desarrolló una SPA premium utilizando Angular, manejando el estado global de forma reactiva con RxJS y NgRx. Se lograron tiempos de carga ultrarrápidos y un checkout sin fricciones, complementado con una estética Ultra UI vibrante.
            </p>
            <p>
              <strong>Tecnologías Clave:</strong> Angular, RxJS, NgRx, TypeScript.
            </p>
          </div>
        </div>
        <div 
          style={{ position: 'relative', width: '100%', height: '500px', cursor: 'pointer', overflow: 'hidden', borderRadius: '12px' }}
          onClick={() => openLightbox(dogImages, 0, 'E-Commerce Pawluxury')}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #050301 0%, transparent 50%)', zIndex: 2, pointerEvents: 'none' }}></div>
          <SlideshowImage images={dogImages} />
        </div>
      </div>

      {/* Go Backend Section (Top Image) */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8rem', marginTop: '4rem', width: '100%' }}>
        <div 
          style={{ position: 'relative', width: '100%', height: '500px', cursor: 'pointer', overflow: 'hidden', borderRadius: '12px' }}
          onClick={() => openLightbox(goImages, 0, 'Servidor Alta Concurrencia')}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050301 0%, transparent 50%)', zIndex: 2, pointerEvents: 'none' }}></div>
          <SlideshowImage images={goImages} />
        </div>
        <div style={{ marginTop: '2rem', maxWidth: '900px' }}>
          <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>Servidor Alta Concurrencia</h3>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> Soportar miles de solicitudes concurrentes para el e-commerce sin cuellos de botella ni caídas de servicio.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Solución:</strong> Se construyó un microservicio en Go usando Goroutines para lograr máxima concurrencia con mínimo uso de memoria, implementando cifrado y autenticación JWT estricta para garantizar seguridad absoluta.
            </p>
            <p>
              <strong>Tecnologías Clave:</strong> Go, Goroutines, JWT, Seguridad API.
            </p>
          </div>
        </div>
      </div>

      {/* Notebooks / Data Science Section */}
      <div className="project-card" style={{ ...styles.cardSpacing, marginTop: '4rem' }}>
        <Eyebrow>Python · NumPy · TensorFlow · PySpark</Eyebrow>
        <h3 style={styles.subtitle}>Ciencia de Datos &amp; Machine Learning</h3>
        <div style={styles.desc}>
          <p style={{ marginBottom: '1rem' }}>
            Colección de notebooks de Jupyter orientados al análisis de señales, visión computacional y Big Data. Cada ejercicio aborda un problema real aplicando técnicas de Machine Learning, procesamiento de datos y visualización avanzada con librerías de referencia industrial.
          </p>
        </div>

        <div className="notebook-grid">
          {notebooks.map((nb, index) => (
            <div key={index} className="notebook-card">
              <div style={styles.notebookHeader}>
                <h4 style={styles.notebookTitle}>{nb.label}</h4>
              </div>
              <p style={styles.notebookDesc}>{nb.desc}</p>
              <div style={styles.iframeWrapper}>
                <iframe
                  src={nb.path}
                  title={nb.label}
                  style={styles.notebookIframe}
                  loading="lazy"
                />
              </div>
              <a
                href={nb.path}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                Ver en pantalla completa ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* AWS Certification Section - Full Width */}
      <div className="aws-section">
        {/* Left side */}
        <div style={styles.awsLeft}>
          <div style={styles.awsBadge}>
            <svg width="72" height="72" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="16" fill="#232F3E" />
              <text x="50" y="58" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#FF9900" fontFamily="Arial, sans-serif">aws</text>
            </svg>
          </div>
          <div style={styles.awsTextBlock}>
            <span style={styles.awsTag}>Certificación Oficial</span>
            <h3 style={styles.awsTitle}>AWS Academy Graduate</h3>
            <p style={styles.awsSubtitle}>Cloud Foundations — Training Badge</p>
            <p style={styles.awsDesc}>
              Certificación emitida por Amazon Web Services Academy que valida el dominio de los fundamentos de la computación en la nube: arquitectura AWS, seguridad, facturación y servicios core de la plataforma líder mundial en infraestructura cloud.
            </p>
            <a
              href={awsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ marginTop: '1.5rem', display: 'inline-block' }}
            >
              Ver certificado completo ↗
            </a>
          </div>
        </div>

        {/* Right side - PDF Preview */}
        <div className="aws-right">
          <div style={styles.awsIframeWrapper}>
            <object
              data={awsPdf}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ border: 'none', borderRadius: '12px' }}
              title="Certificado AWS"
            >
              <p style={{ color: '#fff', padding: '1rem', textAlign: 'center' }}>
                El navegador no puede mostrar el PDF.{' '}
                <a href={awsPdf} target="_blank" rel="noopener noreferrer" style={{ color: '#FF9900' }}>
                  Ábrelo aquí ↗
                </a>
              </p>
            </object>
          </div>
        </div>
      </div>

      {/* Lightbox con navegación */}
      {lightbox && createPortal(
        <div className="fullscreen-modal lightbox-backdrop" onClick={closeLightbox}>
          <button className="close-btn lightbox-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }} aria-label="Cerrar">
            ×
          </button>

          {lightbox.images.length > 1 && (
            <button className="lightbox-arrow lightbox-arrow--prev" onClick={showPrev} aria-label="Imagen anterior">
              ‹
            </button>
          )}

          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightbox.index}
              src={lightbox.images[lightbox.index]}
              alt={`${lightbox.title} — ${lightbox.index + 1}`}
            />
            <figcaption className="lightbox-caption">
              <span>{lightbox.title}</span>
              {lightbox.images.length > 1 && (
                <span className="lightbox-counter">{lightbox.index + 1} / {lightbox.images.length}</span>
              )}
            </figcaption>
          </figure>

          {lightbox.images.length > 1 && (
            <button className="lightbox-arrow lightbox-arrow--next" onClick={showNext} aria-label="Imagen siguiente">
              ›
            </button>
          )}
        </div>,
        document.body
      )}

      {/* QR de WaWallet en pantalla completa */}
      {qrFullscreen && createPortal(
        <div className="fullscreen-modal qr-fullscreen-backdrop" onClick={() => setQrFullscreen(false)}>
          <button
            className="close-btn lightbox-close"
            onClick={(e) => { e.stopPropagation(); setQrFullscreen(false); }}
            aria-label="Cerrar"
          >
            ×
          </button>
          <figure className="qr-fullscreen-figure" onClick={(e) => e.stopPropagation()}>
            <img src={wawQrCode} alt="Código QR para descargar WaWallet" />
            <figcaption>Escanea para descargar WaWallet</figcaption>
          </figure>
        </div>,
        document.body
      )}

      {/* QR de Maison APP en pantalla completa */}
      {maisonQrFullscreen && createPortal(
        <div className="fullscreen-modal qr-fullscreen-backdrop" onClick={() => setMaisonQrFullscreen(false)}>
          <button
            className="close-btn lightbox-close"
            onClick={(e) => { e.stopPropagation(); setMaisonQrFullscreen(false); }}
            aria-label="Cerrar"
          >
            ×
          </button>
          <figure className="qr-fullscreen-figure" onClick={(e) => e.stopPropagation()}>
            <img src={maisonQrCode} alt="Código QR para descargar Maison APP" />
            <figcaption>Escanea para descargar Maison APP</figcaption>
          </figure>
        </div>,
        document.body
      )}
    </section>
  );
};

const styles = {
  cardSpacing: {
    background: 'rgba(25, 25, 25, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '2.5rem',
    backdropFilter: 'blur(10px)',
  },
  pageIntro: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    maxWidth: '640px',
    marginTop: '-0.5rem',
    marginBottom: '3rem',
    lineHeight: 1.6,
  },
  subSection: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  subtitle: {
    fontSize: '1.8rem',
    color: '#ffffff',
    marginBottom: '1rem',
    marginTop: 0,
  },
  desc: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem',
  },
  pdfContainer: {
    background: 'rgba(0,0,0,0.5)',
    padding: '10px',
    borderRadius: '12px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
  },
  awsLeft: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
  },
  awsBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  awsTextBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  awsTag: {
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#FF9900',
    background: 'rgba(255,153,0,0.1)',
    border: '1px solid rgba(255,153,0,0.3)',
    borderRadius: '20px',
    padding: '0.25rem 0.75rem',
    display: 'inline-block',
    width: 'fit-content',
  },
  awsTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    lineHeight: '1.2',
  },
  awsSubtitle: {
    fontSize: '1.1rem',
    color: '#FF9900',
    margin: 0,
    fontWeight: '500',
  },
  awsDesc: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.7',
    margin: 0,
    maxWidth: '480px',
  },
  awsIframeWrapper: {
    width: '100%',
    height: '100%',
    minHeight: '420px',
    background: 'rgba(0,0,0,0.4)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255,153,0,0.15)',
    padding: '8px',
  },
  notebookHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  notebookTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#c8b8ff',
    margin: 0,
    lineHeight: '1.4',
  },
  notebookDesc: {
    fontSize: '0.9rem',
    color: 'rgba(200,200,220,0.7)',
    lineHeight: '1.6',
    margin: 0,
  },
  iframeWrapper: {
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    height: '280px',
    flexShrink: 0,
  },
  notebookIframe: {
    border: 'none',
    background: '#fff',
    transform: 'scale(0.8)',
    transformOrigin: 'top left',
    width: '125%',
    height: '125%',
  },
  pinnedLinkBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    background: 'rgba(157, 139, 255, 0.08)',
    border: '1px solid rgba(157, 139, 255, 0.16)',
    borderRadius: '18px',
    padding: '1.5rem 1.75rem',
    marginBottom: '2rem',
  },
  pinnedLinkText: {
    margin: 0,
    color: '#d8d0ff',
    fontSize: '1rem',
    lineHeight: 1.6,
    maxWidth: '720px',
  },
  pinnedLinkButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.95rem 1.3rem',
    borderRadius: '999px',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
  pinnedLinkIcon: {
    display: 'inline-flex',
    transform: 'translateX(0)',
    transition: 'transform 0.2s ease',
  },
  simpleLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-muted)',
    fontSize: '1.05rem',
    fontWeight: 500,
    fontStyle: 'normal',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.7)',
    textDecorationThickness: '1.2px',
    textUnderlineOffset: '3px',
    marginTop: '2.5rem',
    marginBottom: '2rem',
  },
  linkIcon: {
    display: 'inline-flex',
    fontSize: '1rem',
    lineHeight: 1,
  },
  linkIconBox: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.85rem',
    height: '1.85rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(255,255,255,0.35)',
    background: 'rgba(255,255,255,0.06)',
    marginRight: '0.75rem',
  },
};

/* ----------------------------------------------------------------
   Estilos para la galería, las tarjetas, la sección de WaWallet y el
   lightbox. Se inyectan localmente para no depender de clases
   globales no definidas en este archivo (hover, grids responsivas y
   animaciones de foco).
------------------------------------------------------------------ */
const galleryStyles = `
.project-card {
  background: rgba(25, 25, 25, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
}
.project-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.section-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9d8bff;
  margin-bottom: 0.6rem;
}
.section-eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9d8bff;
  box-shadow: 0 0 8px rgba(157, 139, 255, 0.8);
  flex-shrink: 0;
}

.gallery-wrap {
  margin-top: 1rem;
}
.gallery-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}
.gallery-meta-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}
.gallery-count {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.gallery-grid {
  display: grid;
  gap: 0.65rem;
}
.gallery-grid--featured {
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 110px;
  grid-auto-flow: dense;
}
.gallery-item--featured {
  grid-column: span 2;
  grid-row: span 2;
}
.gallery-grid--compact {
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
.gallery-grid--compact .gallery-item {
  aspect-ratio: 4 / 3;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.3);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.gallery-item:hover img,
.gallery-item:focus-visible img {
  transform: scale(1.07);
}
.gallery-item-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.gallery-item:hover .gallery-item-overlay,
.gallery-item:focus-visible .gallery-item-overlay {
  opacity: 1;
}
.gallery-item:focus-visible {
  outline: 2px solid #9d8bff;
  outline-offset: 2px;
}

.notebook-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 1rem;
}
.notebook-card {
  background: rgba(15,15,25,0.6);
  border: 1px solid rgba(120,100,255,0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.notebook-card:hover {
  border-color: rgba(157, 139, 255, 0.45);
  transform: translateY(-2px);
}

/* WaWallet showcase */
.waw-showcase {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin-top: 2rem;
  padding: 3rem;
  background: radial-gradient(circle at 30% 20%, rgba(157,139,255,0.10), transparent 60%), rgba(0,0,0,0.25);
  border-radius: 20px;
  border: 1px solid rgba(157,139,255,0.15);
}

.waw-phone {
  position: relative;
  width: 220px;
  height: 440px;
  background: #0a0a0f;
  border-radius: 34px;
  border: 6px solid #1c1c24;
  box-shadow: 0 25px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05);
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}
.waw-phone:hover {
  transform: translateY(-4px);
}
.waw-phone-notch {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 16px;
  background: #0a0a0f;
  border-radius: 10px;
  z-index: 2;
}
.waw-phone--galaxy {
  border-radius: 26px;
  border-color: #15151c;
}
.waw-phone-camera {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0f;
  border: 2px solid #1c1c24;
  z-index: 2;
}
.waw-phone-screen {
  width: 100%;
  height: 100%;
}
.waw-phone-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.waw-android-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #0e1a12;
  border: 1px solid rgba(61, 220, 132, 0.4);
  color: #3ddc84;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  z-index: 1;
}

.waw-qr-wrap {
  position: relative;
  width: 260px;
  height: 260px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(157,139,255,0.2);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  flex-shrink: 0;
}
.waw-qr-wrap:hover,
.waw-qr-wrap:focus-visible {
  transform: scale(1.04);
  border-color: rgba(157,139,255,0.5);
  box-shadow: 0 20px 50px rgba(157,139,255,0.18);
}
.waw-qr-wrap:focus-visible {
  outline: 2px solid #9d8bff;
  outline-offset: 3px;
}
.waw-qr-lottie {
  width: 85%;
  height: 85%;
}
.waw-qr-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.55);
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}
.waw-qr-wrap:hover .waw-qr-hint,
.waw-qr-wrap:focus-visible .waw-qr-hint {
  opacity: 1;
}

.simple-link {
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.simple-link:hover,
.simple-link:focus-visible {
  color: #c8b2ff;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 4px;
}

.qr-fullscreen-backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: lightbox-fade-in 0.25s ease;
}
.qr-fullscreen-figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: lightbox-scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.qr-fullscreen-figure img {
  width: min(70vw, 480px);
  height: auto;
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.qr-fullscreen-figure figcaption {
  color: rgba(255,255,255,0.85);
  font-size: 0.95rem;
  letter-spacing: 0.03em;
}

.aws-section {
  margin-top: 5rem;
  display: flex;
  align-items: stretch;
  gap: 4rem;
  padding: 3rem 0;
  border-top: 1px solid rgba(255,153,0,0.2);
  border-bottom: 1px solid rgba(255,153,0,0.2);
}
.aws-right {
  flex: 1;
  min-height: 420px;
}

.lightbox-backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: lightbox-fade-in 0.25s ease;
}
@keyframes lightbox-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.lightbox-figure {
  margin: 0;
  max-width: min(90vw, 1100px);
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: lightbox-scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes lightbox-scale-in {
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 1; transform: scale(1); }
}
.lightbox-figure img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: lightbox-img-in 0.25s ease;
}
@keyframes lightbox-img-in {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.lightbox-caption {
  margin-top: 0.85rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255,255,255,0.85);
  font-size: 0.9rem;
}
.lightbox-counter {
  color: rgba(255,255,255,0.5);
  font-variant-numeric: tabular-nums;
}
.lightbox-arrow {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.8rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.25s ease, transform 0.25s ease;
}
.lightbox-arrow:hover {
  background: rgba(255,255,255,0.18);
  transform: scale(1.08);
}

@media (max-width: 768px) {
  .notebook-grid {
    grid-template-columns: 1fr;
  }
  .aws-section {
    flex-direction: column;
    gap: 2rem;
  }
  .aws-right {
    min-height: 320px;
  }
  .gallery-grid--featured {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 90px;
  }
  .gallery-item--featured {
    grid-column: span 2;
    grid-row: span 2;
  }
  .lightbox-arrow {
    width: 38px;
    height: 38px;
    font-size: 1.4rem;
  }
  .lightbox-figure {
    max-width: 80vw;
  }
  .waw-showcase {
    flex-direction: column;
    gap: 2.5rem;
    padding: 2rem 1.5rem;
  }
  .waw-phone {
    width: 180px;
    height: 360px;
  }
  .waw-qr-wrap {
    width: 220px;
    height: 220px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-backdrop,
  .lightbox-figure,
  .lightbox-figure img,
  .qr-fullscreen-backdrop,
  .qr-fullscreen-figure {
    animation: none;
  }
  .waw-phone:hover {
    transform: none;
  }
}
`;

export default Trabajos;