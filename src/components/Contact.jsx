import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact — the closing terminal prompt, bookending the Hero.
 *
 * Signature idea: the Hero opens the "session" with a looping scramble on
 * the name; Contact closes it with the same vocabulary but one shot, not a
 * loop — "Let's Build" resolves once, like a command that just ran. The
 * eyebrow reads as a git commit waiting for a message (echoing the commit
 * log framing from Experience), and the email is rendered as a live shell
 * prompt with a blinking cursor instead of a static underscore.
 *
 * Requires: gsap (ScrollTrigger submodule, already bundled with gsap).
 */

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%&01';

class TextScramble {
  constructor(el) {
    this.el = el;
    this.frame = 0;
    this.frameRequest = null;
    this.queue = [];
    this.resolve = null;
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.textContent || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => { this.resolve = resolve; });
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 8;
      this.queue.push({ from, to, start, end, char: '' });
    }
    if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.3) {
          item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        output += `<span class="contact-scramble-char">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }
    this.el.innerHTML = output.replace(/ /g, '&nbsp;');
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  }
  stop() {
    if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
  }
}

const TITLE_TEXT = "Let's Build";

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const statusRef = useRef(null);
  const subtitleRef = useRef(null);
  const emailBoxRef = useRef(null);
  const actionsRef = useRef(null);
  const whatsappRef = useRef(null);
  const githubRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        titleRef.current.textContent = TITLE_TEXT;
        gsap.set(
          [statusRef.current, subtitleRef.current, emailBoxRef.current, actionsRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const cleanups = [];

      // ---- Entrance sequence ---------------------------------------------
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });

      tl.fromTo(statusRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .add(() => {
          const fx = new TextScramble(titleRef.current);
          fx.setText(TITLE_TEXT);
          cleanups.push(() => fx.stop());
        }, '-=0.1')
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          emailBoxRef.current,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          actionsRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );

      // Ambient status dot pulse
      gsap.to(statusRef.current.querySelector('.contact-status-dot'), {
        scale: 1.5,
        opacity: 0.4,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      // ---- Magnetic CTAs ---------------------------------------------------
      [whatsappRef.current, githubRef.current].forEach((btn) => {
        if (!btn) return;
        const magnetX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
        const magnetY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
        const handleMove = (e) => {
          const rect = btn.getBoundingClientRect();
          magnetX((e.clientX - (rect.left + rect.width / 2)) * 0.3);
          magnetY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
        };
        const handleLeave = () => {
          magnetX(0);
          magnetY(0);
        };
        btn.addEventListener('mousemove', handleMove);
        btn.addEventListener('mouseleave', handleLeave);
        cleanups.push(() => {
          btn.removeEventListener('mousemove', handleMove);
          btn.removeEventListener('mouseleave', handleLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section container" style={styles.section}>
      <style>{`
        .contact-scramble-char { color: var(--secondary, #5eead4); opacity: 0.65; }

        .contact-cursor {
          display: inline-block;
          width: 0.5em;
          height: 1.1em;
          background: var(--secondary);
          margin-left: 0.15em;
          vertical-align: -0.18em;
          animation: contact-blink 1s steps(1) infinite;
        }
        @keyframes contact-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        .contact-email-link {
          transition: opacity 0.25s ease;
        }
        .contact-email-link:hover { opacity: 0.75; }

        @media (prefers-reduced-motion: reduce) {
          .contact-cursor { animation: none; }
        }
      `}</style>

      <div className="premium-card" style={styles.card}>
        <div ref={statusRef} style={styles.status}>
          <span className="contact-status-dot" style={styles.statusDot}></span>
          <span style={styles.statusText}>Disponible para nuevos proyectos</span>
        </div>

        <h2 ref={titleRef} style={styles.title}>{TITLE_TEXT}</h2>

        <p ref={subtitleRef} style={styles.subtitle}>
          Sistemas rápidos, código limpio y entregas a tiempo.
        </p>

        <div ref={emailBoxRef} style={styles.emailContainer}>
          <a
            href="mailto:rauljaramillo756@gmail.com"
            className="contact-email-link"
            style={styles.email}
          >
            &gt;&nbsp;rauljaramillo756@gmail.com
          </a>
          <span className="contact-cursor"></span>
        </div>

        <div ref={actionsRef} style={styles.actions}>
          <a
            ref={whatsappRef}
            href="https://wa.me/593992768897"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={styles.ctaBtn}
          >
            WhatsApp
          </a>
          <a
            ref={githubRef}
            href="https://github.com/Raraulo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={styles.ctaBtn}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
  },
  card: {
    padding: '6rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '2rem',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary)',
    boxShadow: '0 0 10px var(--secondary)',
  },
  statusText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
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
  },
  ctaBtn: {
    display: 'inline-block',
    willChange: 'transform',
  },
};

export default Contact;