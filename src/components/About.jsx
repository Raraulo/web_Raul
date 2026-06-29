import React from 'react';

const About = () => {
  return (
    <section id="about" className="section container">
      <h2 className="section-title fade-up-element">Sobre Mí</h2>

      <div className="fade-up-element" style={styles.header}>
        <div style={styles.avatar}>RA</div>
        <div style={styles.info}>
          <h3 style={styles.role}>System & Full Stack Engineer</h3>
          <p style={styles.location}>Pontificia Universidad Católica Ecuador</p>
        </div>
      </div>

      <div style={styles.content}>
        <p className="fade-up-element" style={styles.text}>
          <strong>Estudiante de Ingeniería en Sistemas (8° semestre)</strong> con experiencia práctica en desarrollo de software empresarial y aseguramiento de calidad para sistemas críticos.
        </p>
        <p className="fade-up-element" style={styles.text}>
          Arquitecto y construyo <strong>soluciones de extremo a extremo</strong> en todo el stack: diseño de bases de datos relacionales normalizadas (PostgreSQL, SQL Server), construcción de APIs RESTful/GraphQL con Node.js/Express y Go, implementación de SPAs responsivas con React/Next.js y Angular, y desarrollo de apps móviles multiplataforma con React Native y Flutter.
        </p>
        <p className="fade-up-element" style={styles.text}>
          Mi formación en <strong>arquitectura empresarial TOGAF</strong> garantiza que los sistemas sean escalables, mantenibles y alineados con los objetivos del negocio. Integro flujos de desarrollo potenciados por IA (GitHub Copilot, Claude) para acelerar la entrega mientras mantengo rigurosos estándares de QA perfeccionados en SERCOP.
        </p>
      </div>

      <div style={styles.stats}>
        <div className="fade-up-element" style={styles.stat}>
          <span style={styles.statNum}>+2</span>
          <span style={styles.statLabel}>Años de Experiencia</span>
        </div>
        <div className="fade-up-element" style={styles.stat}>
          <span style={styles.statNum}>+15</span>
          <span style={styles.statLabel}>Tecnologías</span>
        </div>
        <div className="fade-up-element" style={styles.stat}>
          <span style={styles.statNum}>99.9%</span>
          <span style={styles.statLabel}>Fiabilidad</span>
        </div>
      </div>
    </section>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: '#ffffff',
    color: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2.5rem',
    fontWeight: '700',
    fontFamily: 'var(--font-mono)',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  role: {
    fontSize: '1.8rem',
    color: '#ffffff',
    fontWeight: '700',
  },
  location: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--secondary)',
    fontSize: '1rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '4rem',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--text-muted)',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
  },
  statNum: {
    fontSize: '3.5rem',
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
  }
};

export default About;
