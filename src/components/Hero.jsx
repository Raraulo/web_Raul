import React from 'react';

const Hero = () => {
  return (
    <section id="hero" style={styles.section} className="container">

      {/* Massive Background Lottie */}
      <div style={styles.massiveLottieContainer}>
        <lottie-player
          src="/src/assets/lottie/code.json"
          background="transparent"
          speed="0.5"
          style={{ width: '100%', height: '100%', opacity: 0.2 }}
          loop
          autoplay
        ></lottie-player>
      </div>

      <div style={styles.content}>

        {/* Animated Badge */}
        <div style={styles.badge} className="fade-up-element is-visible">
          <div style={styles.pulseDot}></div>
          <span style={styles.badgeText}>Disponible</span>
        </div>

        <h1 style={styles.name} className="typewriter">
          //Raúl Amaguaña
        </h1>
        <h2 style={styles.title} className="fade-up-element is-visible">
          Ingeniero en Sistemas y Desarrollador Fullstack
        </h2>

        <div style={styles.actions} className="fade-up-element is-visible">
          <a href="#contact" className="btn btn-primary">Iniciar Proyecto</a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: '6rem',
  },
  massiveLottieContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150vw',
    height: '150vw',
    maxWidth: '1200px',
    maxHeight: '1200px',
    zIndex: -1,
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '900px',
    zIndex: 2,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.5rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '2rem',
    marginBottom: '3rem',
    backdropFilter: 'blur(5px)',
  },
  pulseDot: {
    width: '10px',
    height: '10px',
    backgroundColor: 'var(--secondary)',
    borderRadius: '50%',
    boxShadow: '0 0 15px var(--secondary)',
    animation: 'pulse 2s infinite',
  },
  badgeText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '1rem',
    color: '#ffffff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 'clamp(3rem, 8vw, 6.5rem)',
    fontWeight: '700',
    marginBottom: '1rem',
    lineHeight: '1',
    letterSpacing: '-2px',
    color: '#ffffff',
  },
  title: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    color: 'var(--text-muted)',
    marginBottom: '4rem',
  },
  actions: {
    display: 'flex',
    gap: '1.5rem',
  }
};

export default Hero;
