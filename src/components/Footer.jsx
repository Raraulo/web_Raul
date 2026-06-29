import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <p style={styles.text}>
          © {new Date().getFullYear()} Raul Amaguaña Jaramillo
        </p>
        <p style={styles.location}>
          Quito, Ecuador
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '2rem 0',
    marginTop: '2rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  text: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  location: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: 'var(--primary)',
  }
};

export default Footer;
