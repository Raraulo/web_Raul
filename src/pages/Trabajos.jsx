import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import pdfFile from '../assets/capturas/Maison Des Senteurs.pdf';
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
import go1 from '../assets/capturas/go (1).png';
import go2 from '../assets/capturas/go (2).png';

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

const Trabajos = () => {
  // lightbox = { images, index, title } | null
  const [lightbox, setLightbox] = useState(null);

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

  const openLightbox = (imgs, index, title) => setLightbox({ images: imgs, index, title });

  return (
    <section className="section container fade-up-element is-visible" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <style>{galleryStyles}</style>

      <h2 className="section-title">Portafolio de Proyectos</h2>
      <p style={styles.pageIntro}>
        Una selección de proyectos de extremo a extremo: el problema de negocio, las decisiones técnicas
        detrás de la solución y el resultado final en producción.
      </p>

      {/* PDF Section */}
      <div className="project-card" style={styles.cardSpacing}>
        <Eyebrow>React Native · iOS &amp; Android · Gemini AI</Eyebrow>
        <h3 style={styles.subtitle}>Maison Des Senteurs</h3>
        <div style={styles.desc}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>El Problema:</strong> Se requería desarrollar una aplicación móvil de comercio electrónico desde cero para una marca de perfumes de lujo. El reto principal era lograr que la experiencia de navegación en dispositivos móviles igualara o superara la calidad de las aplicaciones nativas en términos de fluidez, transiciones y rendimiento gráfico, sin incurrir en los altos costos y tiempos de desarrollar dos aplicaciones separadas (iOS y Android).
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Actividad Requerida:</strong> Diseñar y construir una aplicación multiplataforma con un diseño UX/UI inmersivo, garantizar transiciones a 60fps constantes, implementar un catálogo de alta gama y asegurar un proceso de compra intuitivo e integrado con un backend externo.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Desafíos Técnicos:</strong> El mayor desafío técnico fue optimizar la gestión del estado global (carrito de compras, sesión de usuario, favoritos) y la carga asíncrona de imágenes en alta resolución sin saturar la memoria del dispositivo (evitando excepciones <em>Out of Memory</em>). Además, se debía sincronizar perfectamente la interfaz fluida con las respuestas del backend sin bloquear el hilo principal (Main Thread).
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Solución (React Native):</strong> La aplicación fue desarrollada utilizando React Native, lo que permitió un solo código base para iOS y Android. Se optimizó el renderizado utilizando componentes funcionales avanzados y <code>FlatList</code> para manejar catálogos extensos sin afectar el rendimiento. La gestión del estado se centralizó eficientemente, y se implementó un sistema de caché de imágenes local. Finalmente, la integración mediante peticiones asíncronas seguras con el servidor garantizó tiempos de carga mínimos, proporcionando una experiencia verdaderamente premium a los usuarios finales.
          </p>
          <p>
            <strong>El Factor Diferenciador:</strong> La plataforma se distingue por integrar "Giulia", un asistente inteligente potenciado por la <strong>API de Inteligencia Artificial Gemini</strong>, capaz de comprender el lenguaje natural y las exigencias de los usuarios para recomendar perfumes altamente personalizados. Además, el flujo de pago se integra con <strong>Wawallet</strong>, una aplicación financiera satélite ultrarrápida (creada con Firebase y la infraestructura de seguridad de Google), que permite la generación de tarjetas virtuales y compras directas en un solo clic dentro de la app principal.
          </p>
        </div>

        <div style={styles.pdfContainer}>
          <iframe
            src={pdfFile}
            width="100%"
            height="500px"
            style={{ border: 'none', borderRadius: '8px' }}
            title="Vista previa del PDF"
          ></iframe>
        </div>

        <a href={pdfFile} download="Maison_Des_Senteurs.pdf" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
          Descargar PDF
        </a>

        {/* Django Backend Section */}
        <div style={styles.subSection}>
          <Eyebrow>Python · Django REST Framework · PostgreSQL</Eyebrow>
          <h4 style={styles.subtitle}>Backend en Django</h4>
          <div style={styles.desc}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> La aplicación móvil de perfumería requería de un sistema central que gestionara el inventario, los usuarios y los pedidos de forma segura y unificada. Era crítico que este sistema pudiera orquestar lógica de negocio compleja, como jerarquías de fragancias y precios dinámicos, de manera altamente eficiente.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Actividad Requerida:</strong> Arquitecturar e implementar un backend escalable y una API REST robusta. Además, se necesitaba proveer de un panel de administración completo (dashboard operativo) para que el personal gestionara el inventario y analizara las ventas en tiempo real.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Desafíos Técnicos:</strong> Modelar una base de datos relacional fuertemente normalizada para evitar inconsistencias en el inventario. Implementar mecanismos de seguridad estrictos para la API (ya que manejaría datos transaccionales), optimizar consultas complejas para evitar el problema de N+1 queries, y asegurar que el panel de administración pudiera manejar grandes volúmenes de datos sin latencia.
            </p>
            <p>
              <strong>La Solución (Django &amp; DRF):</strong> Se eligió Python con Django y Django REST Framework (DRF) por su capacidad de desarrollo estructurado y seguridad integrada. Se diseñó un esquema relacional complejo en PostgreSQL. Se expusieron endpoints optimizados (minimizando queries a base de datos mediante <code>select_related</code> y <code>prefetch_related</code>) y se protegieron implementando autenticación JWT y políticas CORS restrictivas. El panel de administración fue personalizado exhaustivamente, proporcionando herramientas analíticas potentes y una gestión segura.
            </p>
          </div>
          <Gallery
            images={djangoImages}
            title="Backend Django"
            onOpen={(i) => openLightbox(djangoImages, i, 'Backend en Django')}
          />
        </div>
      </div>

      {/* Carousel Section */}
      <div className="project-card" style={{ ...styles.cardSpacing, marginTop: '4rem' }}>
        <Eyebrow>Grails · Spring Boot · Groovy</Eyebrow>
        <h3 style={styles.subtitle}>E-Commerce Don Books - Dashboard Grails</h3>
        <div style={styles.desc}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>El Problema:</strong> Existía la necesidad de consolidar múltiples flujos de ventas, inventario y métricas de rendimiento en una única plataforma empresarial unificada (ERP), dado que el sistema previo estaba fragmentado y generaba silos de información que impedían la toma de decisiones informada.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Actividad Requerida:</strong> Desarrollar un panel de control analítico integral y una plataforma de gestión (Dashboard) en tiempo real, capaz de procesar de manera segura y eficiente grandes volúmenes de transacciones financieras y catalogación masiva de productos.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Desafíos Técnicos:</strong> Mantener una alta cohesión y bajo acoplamiento en una base de código empresarial. Otro gran reto fue integrar librerías de visualización para procesar millones de registros de datos y renderizar gráficos interactivos en el frontend sin colapsar el navegador, asegurando a la vez la total integridad transaccional (ACID) en la base de datos subyacente.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Solución (Grails &amp; Spring Boot):</strong> Se construyó el sistema basándose en el framework Grails, aprovechando la potencia del ecosistema Spring Boot y el lenguaje Groovy. Se estructuró bajo un patrón estricto MVC. El procesamiento intensivo de datos analíticos se delegó a servicios transaccionales en el backend, los cuales pre-calculaban las métricas antes de ser enviadas a la interfaz. En el frontend, se integraron eficientemente librerías de generación de gráficos, logrando un dashboard fluido, escalable y que provee Inteligencia de Negocios (BI) instantánea.
          </p>
          <p>
            <strong>El Factor Diferenciador:</strong> A diferencia de las plataformas ERP tradicionales, que suelen ser áridas y complejas, este sistema destaca por incorporar galerías fotográficas de alta resolución para el catálogo de libros y la construcción de paneles (dashboards) <strong>altamente didácticos e intuitivos</strong>. Esto democratiza los datos, permitiendo que cualquier usuario operativo pueda interpretar métricas comerciales complejas mediante elementos visuales muy amigables.
          </p>
        </div>

        <Gallery
          images={images}
          title="Dashboard Don Books"
          onOpen={(i) => openLightbox(images, i, 'E-Commerce Don Books - Dashboard Grails')}
        />
      </div>

      {/* E-Commerce Dog Section */}
      <div className="project-card" style={{ ...styles.cardSpacing, marginTop: '4rem' }}>
        <Eyebrow>Angular · RxJS · NgRx</Eyebrow>
        <h3 style={styles.subtitle}>E-Commerce Pawluxury para Mascotas</h3>
        <div style={styles.desc}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>El Problema:</strong> La actividad requería modernizar una plataforma de e-commerce legada que sufría de tiempos de carga de hasta 8 segundos por página, lo que provocaba una alta tasa de rebote (bounce rate) y abandonos frecuentes en el embudo de conversión, especialmente en dispositivos móviles. La gestión del estado del carrito era ineficiente y causaba discrepancias en el inventario durante picos de tráfico.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Actividad Requerida:</strong> Diseñar y desarrollar desde cero una Single Page Application (SPA) "premium" orientada al sector pet-care, con el objetivo de reducir el tiempo de First Contentful Paint (FCP) a menos de 1.5 segundos, implementar una experiencia de usuario (UX) fluida y sin recargas, y construir un proceso de checkout robusto, a prueba de fallos y de fricción nula.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Desafíos Técnicos:</strong> El principal desafío radicaba en manejar el estado complejo de la aplicación (catálogo extenso, filtros dinámicos múltiples, carrito de compras en tiempo real y perfiles de usuario) sin degradar el rendimiento del navegador o consumir memoria excesiva. Además, se requería una sincronización perfecta con el backend en Go para evitar problemas de concurrencia y carrera de datos (race conditions) al momento del pago.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>La Solución (Implementación con Angular):</strong> Se optó por el framework Angular debido a su arquitectura fuertemente tipada (TypeScript) y su robusto ecosistema empresarial. La interfaz fue construida siguiendo metodologías de diseño atómico, creando componentes UI reutilizables y aislados. Se implementaron estrategias avanzadas de optimización de rendimiento: <em>Lazy Loading</em> de módulos a nivel de ruta para minimizar el tamaño del bundle inicial, <em>Change Detection Strategy OnPush</em> para evitar renderizados innecesarios del árbol DOM, y programación reactiva pura utilizando <strong>RxJS</strong>. Los observables de RxJS permitieron orquestar flujos asíncronos complejos, combinando peticiones HTTP, eventos de usuario y la actualización del estado global (NgRx) de forma declarativa y elegante. El resultado final fue una reducción del 85% en los tiempos de carga de la plataforma y un incremento sustancial en la métrica de conversión de ventas.
          </p>
          <p>
            <strong>El Factor Diferenciador:</strong> El verdadero valor agregado de esta plataforma radicó en una dirección de arte audaz y disruptiva. Se implementó una estética extremadamente colorida, lúdica y vibrante, llevando los principios de diseño <strong>Ultra UI/UX</strong> al límite. La integración armónica de colores intensos, tipografías divertidas y microinteracciones fluidas logró capturar la esencia alegre del mundo de las mascotas, maximizando la retención emocional del usuario de una manera que las tiendas tradicionales rara vez consiguen.
          </p>
        </div>

        <Gallery
          images={dogImages}
          title="Pawluxury"
          onOpen={(i) => openLightbox(dogImages, i, 'E-Commerce Pawluxury para Mascotas')}
        />

        {/* Go Backend Section */}
        <div style={styles.subSection}>
          <Eyebrow>Go · Goroutines · JWT</Eyebrow>
          <h4 style={styles.subtitle}>Servidor de Alta Concurrencia en Go</h4>
          <div style={styles.desc}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El Problema:</strong> El crecimiento proyectado de la plataforma e-commerce de mascotas anticipaba picos masivos de tráfico y miles de solicitudes concurrentes por segundo, un escenario donde las arquitecturas tradicionales de un solo hilo experimentaban cuellos de botella y caídas de servicio.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La Actividad Requerida:</strong> Construir desde cero un microservicio backend orientado a soportar una altísima demanda y escalabilidad horizontal nativa, priorizando el resguardo absoluto de los datos transaccionales mediante protocolos de máxima ciberseguridad.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Desafíos Técnicos:</strong> Lograr concurrencia máxima con un uso mínimo de memoria (low memory footprint) para optimizar costos de infraestructura en la nube. Implementar manualmente estrategias defensivas rigurosas (prevención de inyección SQL, XSS, CSRF) y proteger la API contra ataques de fuerza bruta, todo sin añadir latencia a las respuestas.
            </p>
            <p>
              <strong>La Solución (Go / Golang):</strong> Se desarrolló un servicio de alto rendimiento nativo en Go, utilizando <em>Goroutines</em> para el procesamiento asíncrono y ultra-concurrente de peticiones, logrando tiempos de respuesta en el orden de pocos milisegundos. La capa de seguridad implementó cifrado completo de tráfico (HTTPS/TLS), autenticación stateless estricta mediante JWT con tiempos de expiración cortos, rotación automática de tokens y configuración estricta de políticas CORS. Esto resultó en un servidor ultra-resiliente, a prueba de fallos y capaz de escalar instantáneamente frente a la carga comercial masiva.
            </p>
          </div>
          <Gallery
            images={goImages}
            title="Servidor Go"
            onOpen={(i) => openLightbox(goImages, i, 'Servidor de Alta Concurrencia en Go')}
          />
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
            <img src={lightbox.images[lightbox.index]} alt={`${lightbox.title} — ${lightbox.index + 1}`} />
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
};

/* ----------------------------------------------------------------
   Estilos para la galería, las tarjetas y el lightbox. Se inyectan
   localmente para no depender de clases globales no definidas en
   este archivo (hover, grids responsivas y animaciones de foco).
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
}
.lightbox-figure {
  margin: 0;
  max-width: min(90vw, 1100px);
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lightbox-figure img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
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
}
`;

export default Trabajos;
