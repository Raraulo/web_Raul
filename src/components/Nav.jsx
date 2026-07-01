import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    closeMobileMenu();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav" style={{
      background: scrolled ? 'rgba(8, 11, 18, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      padding: scrolled ? '1rem 0' : '1.5rem 0'
    }}>
      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .nav-logo span {
          color: var(--secondary);
        }
        .nav-logo-img {
          width: 2.5rem;
          height: 2.5rem;
          display: block;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s;
          text-decoration: none;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
        .nav-btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: none;
          padding: 10px;
          z-index: 1001;
        }
        .hamburger-line {
          width: 25px;
          height: 3px;
          background: var(--text-main);
          transition: all 0.3s ease;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(8, 11, 18, 0.98);
          backdrop-filter: blur(10px);
          padding: 2rem;
          gap: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .mobile-menu-link {
          font-family: var(--font-mono);
          font-size: 1.2rem;
          color: var(--text-main);
          text-align: center;
          padding: 1rem;
          text-decoration: none;
        }
        .mobile-menu-btn {
          color: #000;
          background: var(--primary);
          border-radius: 8px;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .mobile-menu.open {
            display: flex;
          }
        }
      `}</style>

      <div className="nav-container">
        <div className="nav-logo">
            <img src="/favicon.svg" alt="Logo" className="nav-logo-img" />
          </div>
        
        {/* Desktop Links */}
        <div className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>Sobre Mí</a>
          <a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, '#services')}>Especialidades</a>
          <a href="#experience" className="nav-link" onClick={(e) => handleNavClick(e, '#experience')}>Experiencia</a>
          <a href="#why" className="nav-link" onClick={(e) => handleNavClick(e, '#why')}>¿Por qué?</a>
          <a href="#contact" className="btn btn-primary nav-btn" onClick={(e) => handleNavClick(e, '#contact')}>Contacto</a>
        </div>

        {/* Hamburger Button */}
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className="hamburger-line" 
            style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
          ></span>
          <span 
            className="hamburger-line" 
            style={{ opacity: mobileMenuOpen ? 0 : 1 }}
          ></span>
          <span 
            className="hamburger-line" 
            style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#about" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#about')}>Sobre Mí</a>
        <a href="#services" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#services')}>Especialidades</a>
        <a href="#experience" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#experience')}>Experiencia</a>
        <a href="#why" className="mobile-menu-link" onClick={(e) => handleNavClick(e, '#why')}>¿Por qué?</a>
        <a href="#contact" className="mobile-menu-link mobile-menu-btn" onClick={(e) => handleNavClick(e, '#contact')}>Contacto</a>
      </div>
    </nav>
  );
};

export default Nav;
