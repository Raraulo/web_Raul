import React from 'react';

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

const Experience = () => {
  return (
    <section id="experience" className="section container">
      <h2 className="section-title fade-up-element">Experiencia</h2>
      
      <div style={styles.timeline}>
        
        <div className="fade-up-element" style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconBox}><BuildingIcon /></div>
            <div>
              <h3 style={styles.role}>Practicante QA</h3>
              <p style={styles.company}>Servicio Nacional de Contratación Pública (SERCOP) • Quito • Ago 2025 – Sep 2025</p>
            </div>
          </div>
          <ul style={styles.list}>
            <li>Control de calidad para sistemas de contratación pública.</li>
            <li>Diseño y ejecución de casos de prueba y validación de correcciones.</li>
            <li>Verificación funcional y reporte de incidencias estructuradas.</li>
            <li>Colaboración en entornos con control de versiones (Git).</li>
          </ul>
        </div>

        <div className="fade-up-element" style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconBox}><BuildingIcon /></div>
            <div>
              <h3 style={styles.role}>Practicante Soporte TI</h3>
              <p style={styles.company}>Dirección de Informática, PUCE • Quito • Ago 2024 – Dic 2024</p>
            </div>
          </div>
          <ul style={styles.list}>
            <li>Mantenimiento preventivo y correctivo de hardware.</li>
            <li>Levantamiento y gestión de inventario de activos tecnológicos.</li>
            <li>Soporte a usuarios y seguimiento de tickets.</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

const styles = {
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem',
  },
  card: {
    borderLeft: '2px solid var(--secondary)',
    paddingLeft: '2.5rem',
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
    paddingLeft: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    listStyleType: 'square',
  }
};

export default Experience;
