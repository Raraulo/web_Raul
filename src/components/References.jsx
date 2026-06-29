import React from 'react';

const references = [
  {
    name: 'Alan Jaramillo',
    role: 'Supervisor · Dirección de Informática',
    phone: '0968748569',
    email: 'adjaramillo@puce.edu.ec'
  },
  {
    name: 'Aivaly Silva',
    role: 'Analista QA · SERCOP',
    phone: '0991821406',
    email: 'aivaly.silva@sercop.gob.ec'
  }
];

const References = () => {
  return (
    <section id="references" className="section container fade-up-element">
      <h2 className="section-title">Referencias Profesionales</h2>
      
      <div style={styles.grid}>
        {references.map((ref, index) => (
          <div key={index} className="premium-card" style={styles.card}>
            <h3 style={styles.name}>{ref.name}</h3>
            <p style={styles.role}>{ref.role}</p>
            <div style={styles.contactInfo}>
              <a href={`tel:${ref.phone}`} style={styles.link}>{ref.phone}</a>
              <span style={styles.separator}>•</span>
              <a href={`mailto:${ref.email}`} style={styles.link}>{ref.email}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    textAlign: 'center',
    padding: '2rem',
  },
  name: {
    fontSize: '1.25rem',
    color: 'var(--text-main)',
    marginBottom: '0.25rem',
  },
  role: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
  },
  link: {
    color: 'var(--primary)',
    transition: 'color 0.2s',
  },
  separator: {
    color: 'var(--border)',
  }
};

export default References;
