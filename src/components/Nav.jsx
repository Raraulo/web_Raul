import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SECTIONS = [
  { id: '#about', label: 'sobre-mi', index: '01' },
  { id: '#services', label: 'especialidades', index: '02' },
  { id: '#experience', label: 'experiencia', index: '03' },
  { id: '#why', label: 'por-que', index: '04' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const observerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';
  const onIss = location.pathname === '/iss';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // fondo + barra de progreso de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // detecta qué sección está en pantalla para resaltar el link activo
  useEffect(() => {
    if (!onHome) {
      setActiveSection(null);
      return undefined;
    }
    const targets = SECTIONS.map((s) => document.querySelector(s.id)).filter(Boolean);
    if (!targets.length) return undefined;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection('#' + visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => observerRef.current.observe(t));
    return () => observerRef.current?.disconnect();
  }, [onHome]);

  // bloquea el scroll del body y permite cerrar con Escape en el menú móvil
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && closeMobileMenu();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    closeMobileMenu();
    if (!onHome) {
      navigate('/');
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goIss = (e) => {
    e.preventDefault();
    closeMobileMenu();
    navigate('/iss');
  };

  return (
    <nav
      className="nav"
      style={{
        background: scrolled ? 'rgba(8, 11, 18, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        padding: scrolled ? '1rem 0' : '1.5rem 0',
      }}
    >
      <style>{`
        .nav {
          position: fixed;
          top: -0.2rem;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
        }
        .nav-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.15s linear;
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
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .nav-logo-img {
          width: 3.2rem;
          height: 3.2rem;
          display: block;
          filter: drop-shadow(0 0 0 rgba(0,0,0,0));
          transition: filter 0.3s ease;
        }
        .nav-logo:hover .nav-logo-img {
          filter: drop-shadow(0 0 10px rgba(242, 163, 59, 0.55));
        }
        .nav-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
        .nav-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 0 rgba(242, 163, 59, 0.6);
          animation: statusPulse 2.2s infinite;
        }
        @keyframes statusPulse {
          0% { box-shadow: 0 0 0 0 rgba(242, 163, 59, 0.45); }
          70% { box-shadow: 0 0 0 6px rgba(242, 163, 59, 0); }
          100% { box-shadow: 0 0 0 0 rgba(242, 163, 59, 0); }
        }
        .nav-links {
          display: flex;
          gap: 1.75rem;
          align-items: center;
        }
        .nav-link {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: none;
          padding: 0.25rem 0;
        }
        .nav-link-index {
          font-size: 0.7rem;
          color: var(--border);
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: var(--secondary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        .nav-link.active {
          color: var(--text-main);
        }
        .nav-link.active .nav-link-index {
          color: var(--secondary);
        }
        .nav-btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }
        .nav-iss {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--secondary);
          text-decoration: none;
          padding: 0.35rem 0.75rem;
          border: 1px solid rgba(125, 211, 252, 0.35);
          border-radius: 999px;
          background: rgba(125, 211, 252, 0.06);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .nav-iss:hover {
          background: rgba(125, 211, 252, 0.14);
          border-color: rgba(125, 211, 252, 0.6);
        }
        .nav-iss-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--secondary);
          animation: statusPulse 1.8s infinite;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
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
          gap: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .mobile-menu-link {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--text-main);
          text-align: center;
          padding: 0.85rem;
          text-decoration: none;
          opacity: 0;
          transform: translateY(6px);
        }
        .mobile-menu.open .mobile-menu-link {
          animation: menuItemIn 0.35s ease forwards;
        }
        .mobile-menu.open .mobile-menu-link:nth-child(1) { animation-delay: 0.03s; }
        .mobile-menu.open .mobile-menu-link:nth-child(2) { animation-delay: 0.08s; }
        .mobile-menu.open .mobile-menu-link:nth-child(3) { animation-delay: 0.13s; }
        .mobile-menu.open .mobile-menu-link:nth-child(4) { animation-delay: 0.18s; }
        .mobile-menu.open .mobile-menu-link:nth-child(5) { animation-delay: 0.23s; }
        .mobile-menu.open .mobile-menu-link:nth-child(6) { animation-delay: 0.28s; }
        @keyframes menuItemIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-index {
          color: var(--secondary);
          font-size: 0.8rem;
          margin-right: 0.5rem;
        }
        .mobile-menu-btn {
          color: #000;
          background: var(--primary);
          border-radius: 8px;
          margin-top: 0.5rem;
        }
        .mobile-menu-iss {
          color: var(--secondary);
        }
        a.nav-link:focus-visible,
        a.nav-iss:focus-visible,
        a.mobile-menu-link:focus-visible,
        button.hamburger:focus-visible {
          outline: 2px solid var(--secondary);
          outline-offset: 3px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .nav-status {
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

      <div className="nav-progress" style={{ width: `${progress}%` }} />

      <div className="nav-container">
        <a href="#top" className="nav-logo" onClick={(e) => handleNavClick(e, '#top')}>
          <img src="/favicon.svg" alt="Logo" className="nav-logo-img" />
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={s.id}
              className={`nav-link${onHome && activeSection === s.id ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, s.id)}
            >
              <span className="nav-link-index">{s.index}</span>
              {s.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-btn" onClick={(e) => handleNavClick(e, '#contact')}>
            Contacto
          </a>
          <a href="/iss" className={`nav-iss${onIss ? ' active' : ''}`} onClick={goIss}>
            <span className="nav-iss-dot" />
            Where is the ISS?
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className="hamburger-line"
            style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
          />
          <span className="hamburger-line" style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
          <span
            className="hamburger-line"
            style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {SECTIONS.map((s) => (
          <a key={s.id} href={s.id} className="mobile-menu-link" onClick={(e) => handleNavClick(e, s.id)}>
            <span className="mobile-menu-index">{s.index}</span>
            {s.label}
          </a>
        ))}
        <a href="#contact" className="mobile-menu-link mobile-menu-btn" onClick={(e) => handleNavClick(e, '#contact')}>
          Contacto
        </a>
        <a href="/iss" className="mobile-menu-link mobile-menu-iss" onClick={goIss}>
          Where is the ISS?
        </a>
      </div>
    </nav>
  );
};

export default Nav;