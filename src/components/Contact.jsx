import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section container fade-up-element">
      <div className="premium-card" style={styles.card}>
        <h2 style={styles.title}>Let's Build</h2>
        <p style={styles.subtitle}>
          Sistemas rápidos, código limpio y entregas a tiempo.
        </p>
        
        <div style={styles.emailContainer}>
          <a href="mailto:rauljaramillo756@gmail.com" style={styles.email}>
            &gt; rauljaramillo756@gmail.com_
          </a>
        </div>

        <div style={styles.actions}>
          <a href="https://wa.me/593992768897" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            WhatsApp
          </a>
          <a href="https://github.com/Raraulo" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  card: {
    padding: '6rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '4.5rem',
    marginBottom: '1rem',
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: '-2px',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: 'var(--text-muted)',
    marginBottom: '4rem',
  },
  emailContainer: {
    padding: '2rem 3rem',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    marginBottom: '4rem',
  },
  email: {
    fontFamily: 'var(--font-mono)',
    fontSize: '2rem',
    color: 'var(--secondary)',
    fontWeight: '700',
  },
  actions: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
};

export default Contact;
