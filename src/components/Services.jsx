import React from 'react';

const Services = () => {
  return (
    <section id="services" className="section container">
      <h2 className="section-title fade-up-element">Especialidades</h2>
      
      <div style={styles.servicesWrapper}>
        
        {/* Service 1: Mobile */}
        <div className="fade-up-element" style={styles.serviceRow}>
          <div style={styles.lottieCol}>
            <lottie-player
              src="/src/assets/lottie/mobile.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: 'min(400px, 70vh)' }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <div style={styles.textCol}>
            <h3 style={styles.title}>Ingeniería Móvil Multiplataforma</h3>
            <p style={styles.desc}>
              Diseño y desarrollar aplicaciones móviles nativas y multiplataforma con React Native y Flutter, desde la arquitectura inicial hasta lista para su despliegue. Implemento integración con APIs REST/GraphQL, bases de datos locales y en tiempo real (SQLite, Firebase, Supabase), notificaciones push (FCM, APNs) ademas testing de usabilidad con buenas practicas UI/UX y rendimiento para garantizar fiabilidad en todos los dispositivos.
            </p>
            <div className="marquee-container">
              <div className="marquee-content">
                <span style={styles.techTag}>React Native</span>
                <span style={styles.techTag}>Expo</span>
                <span style={styles.techTag}>Flutter</span>
                <span style={styles.techTag}>Firebase</span>
                <span style={styles.techTag}>Supabase</span>
                <span style={styles.techTag}>Fastlane</span>
                <span style={styles.techTag}>JWT</span>
                <span style={styles.techTag}>SQLite</span>
                <span style={styles.techTag}>React Native</span>
                <span style={styles.techTag}>Expo</span>
                <span style={styles.techTag}>Flutter</span>
                <span style={styles.techTag}>Firebase</span>
                <span style={styles.techTag}>Supabase</span>
                <span style={styles.techTag}>Fastlane</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service 2: Web */}
        <div className="fade-up-element" style={{ ...styles.serviceRow, ...styles.rowReverse }}>
          <div style={styles.lottieCol}>
            <lottie-player
              src="/src/assets/lottie/web.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: 'min(350px, 60vh)' }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <div style={styles.textCol}>
            <h3 style={styles.title}>Desarrollo Web & Dashboards</h3>
            <p style={styles.desc}>
              Construyo plataformas web empresariales completas, desde landing pages altamente optimizadas para SEO y conversión hasta dashboards de control en tiempo real con visualizaciones avanzadas (D3.js, Chart.js). Diseño arquitecturas escalables (monolitos modularizados o microservicios) con Node.js/Express, Go o Python (FastAPI), usando bases de datos relacionales (PostgreSQL, SQL Server) y no relacionales (MongoDB, Redis). Implemento autenticación y autorización segura, validación de datos, cacheo, y despliegue en cloud (Vercel, AWS, Railway). Aplico principios de UX/UI para interfaces intuitivas y accesibles.
            </p>
            <div className="marquee-container">
              <div className="marquee-content">
                <span style={styles.techTag}>React/Next.js</span>
                <span style={styles.techTag}>Angular</span>
                <span style={styles.techTag}>Node.js/Express</span>
                <span style={styles.techTag}>Go</span>
                <span style={styles.techTag}>PostgreSQL</span>
                <span style={styles.techTag}>MongoDB</span>
                <span style={styles.techTag}>Redis</span>
                <span style={styles.techTag}>Chart.js</span>
                <span style={styles.techTag}>React/Next.js</span>
                <span style={styles.techTag}>Angular</span>
                <span style={styles.techTag}>Node.js/Express</span>
                <span style={styles.techTag}>Go</span>
                <span style={styles.techTag}>PostgreSQL</span>
                <span style={styles.techTag}>MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service 3: QA & Security */}
        <div className="fade-up-element" style={styles.serviceRow}>
          <div style={styles.lottieCol}>
            <lottie-player
              src="/src/assets/lottie/hacker.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: 'min(350px, 60vh)' }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <div style={styles.textCol}>
            <h3 style={styles.title}>QA, Seguridad & Despliegue</h3>
            <p style={styles.desc}>
              Garantizo la calidad y seguridad de tus sistemas con procesos rigurosos de QA: diseño de casos de prueba funcionales y de regresión, pruebas manuales exploratorias, y automatización básica.Ademas validación de inputs, sanitización de datos, y protección contra ataques comunes. Configuro pipelines CI/CD para automatizar builds, tests y despliegues en entornos de staging y producción, con control de versiones (Git) y gestión de cambios. Aplico monitoreo básico y logging para asegurar la disponibilidad y rendimiento de tus aplicaciones.
            </p>
            <div className="marquee-container">
              <div className="marquee-content">
                <span style={styles.techTag}>Pruebas Manuales</span>
                <span style={styles.techTag}>Casos de Prueba</span>
                <span style={styles.techTag}>TestRail</span>
                <span style={styles.techTag}>Jira</span>
                <span style={styles.techTag}>OWASP</span>
                <span style={styles.techTag}>CI/CD</span>
                <span style={styles.techTag}>Git</span>
                <span style={styles.techTag}>AWS</span>
                <span style={styles.techTag}>Pruebas Manuales</span>
                <span style={styles.techTag}>Casos de Prueba</span>
                <span style={styles.techTag}>TestRail</span>
                <span style={styles.techTag}>Jira</span>
                <span style={styles.techTag}>OWASP</span>
                <span style={styles.techTag}>CI/CD</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const styles = {
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
  title: {
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
  }
};

export default Services;
