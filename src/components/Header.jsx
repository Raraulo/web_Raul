import React from 'react';

const Header = () => {
  return (
    <header style={styles.header} className="glass-panel">
      <div className="container" style={styles.container}>
        <div style={styles.logo}>
          <img src="/favicon.svg" alt="Logo" style={styles.logoImg} />
        </div>
        <nav style={styles.nav}>
          <a href="#about" style={styles.link}>About</a>
          <a href="#cv" style={styles.link}>CV</a>
          <a href="#services" style={styles.link}>Services</a>
          <a href="#contact" className="btn btn-primary" style={styles.btnNav}>Hire Me</a>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '1200px',
    zIndex: 1000,
    padding: '1rem 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    width: '2rem',
    height: '2rem',
    display: 'block',
  },
  highlight: {
    color: 'var(--primary)',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    fontWeight: '500',
    fontSize: '1rem',
    color: 'var(--text-main)',
  },
  btnNav: {
    padding: '0.5rem 1.25rem',
  }
};

export default Header;
