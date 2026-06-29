import React from 'react';

const SalesSection = () => {
  return (
    <section id="services" style={styles.section} className="container animate-fade-in">
      <div style={styles.header}>
        <h2 style={styles.title}>Services & Pricing</h2>
        <p style={styles.subtitle}>Elevate your business with professional web solutions</p>
      </div>

      <div style={styles.grid}>
        <div className="glass-panel" style={styles.card}>
          <h3 style={styles.cardTitle}>Landing Page</h3>
          <div style={styles.price}>$499</div>
          <p style={styles.desc}>Perfect for marketing campaigns and single-product sales.</p>
          <ul style={styles.features}>
            <li style={styles.feature}>Custom Premium Design</li>
            <li style={styles.feature}>Mobile Responsive</li>
            <li style={styles.feature}>SEO Optimized</li>
            <li style={styles.feature}>Lead Capture Form</li>
          </ul>
          <a href="#contact" className="btn btn-outline" style={{width: '100%'}}>Choose Plan</a>
        </div>

        <div className="glass-panel" style={{...styles.card, ...styles.featuredCard}}>
          <div style={styles.badge}>Most Popular</div>
          <h3 style={styles.cardTitle}>Full Web App</h3>
          <div style={styles.price}>$1,299</div>
          <p style={styles.desc}>Complete digital presence for established businesses.</p>
          <ul style={styles.features}>
            <li style={styles.feature}>Everything in Landing Page</li>
            <li style={styles.feature}>Multiple Pages</li>
            <li style={styles.feature}>CMS Integration</li>
            <li style={styles.feature}>Advanced Animations</li>
            <li style={styles.feature}>Performance Optimization</li>
          </ul>
          <a href="#contact" className="btn btn-primary" style={{width: '100%'}}>Choose Plan</a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.125rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  card: {
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  featuredCard: {
    border: '1px solid var(--primary)',
    transform: 'scale(1.05)',
  },
  badge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white',
    padding: '0.25rem 1rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  price: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    color: 'var(--text-main)',
  },
  desc: {
    color: 'var(--text-muted)',
    marginBottom: '2rem',
  },
  features: {
    listStyle: 'none',
    marginBottom: '2rem',
    flexGrow: 1,
  },
  feature: {
    marginBottom: '0.75rem',
    paddingLeft: '1.5rem',
    position: 'relative',
  },
};

export default SalesSection;
