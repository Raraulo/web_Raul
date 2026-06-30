import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trabajos from './pages/Trabajos';

function AppContent() {
  const cursorRef = useRef(null);
  const starsRef = useRef(null);
  const stars2Ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.fade-up-element');
    
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Custom cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Star parallax
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;
      
      if (starsRef.current) {
        starsRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      
      if (stars2Ref.current) {
        stars2Ref.current.style.transform = `translate(${-moveX * 1.5}px, ${-moveY * 1.5}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('hover');
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, .btn, .carousel-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [location.pathname]);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="stars" ref={starsRef}></div>
      <div className="stars2" ref={stars2Ref}></div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trabajos" element={<Trabajos />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
