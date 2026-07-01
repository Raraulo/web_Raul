import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills — read as a directory tree of the stack, not a grid of chip clouds.
 *
 * Signature idea: category → skills is a literal two-level hierarchy, so a
 * `tree ./stack` framing is earned, not decorative. A single trunk line
 * grows down the section as you scroll (same visual language as the rail
 * in About and the branch lines in Experience), with a branch node per
 * category and its packages listed below as chips.
 *
 * Requires: gsap (ScrollTrigger submodule, already bundled with gsap).
 */

const FrontendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 6 3 12 8 18" />
    <polyline points="16 6 21 12 16 18" />
  </svg>
);

const BackendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
    <line x1="7" y1="17" x2="7.01" y2="17" />
  </svg>
);

const DataIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

const CATEGORIES = [
  {
    title: 'Frontend',
    color: 'var(--primary)',
    icon: FrontendIcon,
    skills: ['React.js', 'Angular', 'HTML5', 'CSS3', 'JS (ES6+)'],
  },
  {
    title: 'Backend',
    color: 'var(--secondary)',
    icon: BackendIcon,
    skills: ['Node.js', 'Go', 'Express', 'Django'],
  },
  {
    title: 'Datos / IA',
    color: 'var(--primary)',
    icon: DataIcon,
    skills: ['Python', 'SQL', 'LLMs', 'Copilot'],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const trunkFillRef = useRef(null);
  const rowRefs = useRef([]);
  const nodeRefs = useRef([]);
  const stubRefs = useRef([]);
  const headerRefs = useRef([]);
  const chipsRefs = useRef([]);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(trunkFillRef.current, { scaleY: 1 });
        gsap.set(
          [...rowRefs.current, ...headerRefs.current, ...nodeRefs.current, ...stubRefs.current],
          { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1 }
        );
        chipsRefs.current.forEach((el) => el && gsap.set(el.children, { opacity: 1, y: 0 }));
        return;
      }

      // Trunk line: continuous fill scrubbed across the whole list
      gsap.fromTo(
        trunkFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.skl-tree'),
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: 0.4,
          },
        }
      );

      CATEGORIES.forEach((_, i) => {
        const row = rowRefs.current[i];
        const node = nodeRefs.current[i];
        const stub = stubRefs.current[i];
        const header = headerRefs.current[i];
        const chips = chipsRefs.current[i];
        if (!row) return;

        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%' } });

        tl.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)' })
          .fromTo(stub, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, '-=0.15')
          .fromTo(
            header,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.15'
          )
          .fromTo(
            chips.children,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
            '-=0.2'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section container" style={styles.section}>
      <style>{`
        .skl-cursor {
          display: inline-block;
          width: 0.55em;
          height: 1em;
          background: var(--secondary);
          margin-left: 0.4em;
          vertical-align: -0.15em;
          animation: skl-blink 1s steps(1) infinite;
        }
        @keyframes skl-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        .skl-chip {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .skl-chip:hover {
          transform: translateY(-3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .skl-cursor { animation: none; }
        }
      `}</style>

      <div style={styles.eyebrow}>
        <span style={styles.eyebrowPrompt}>&gt;</span>&nbsp;tree ./stack -L 2
        <span className="skl-cursor"></span>
      </div>
      <h2 className="section-title" style={styles.title}>Tecnologías</h2>

      <div className="skl-tree" style={styles.tree}>
        <div style={styles.trunkTrack}></div>
        <div ref={trunkFillRef} style={styles.trunkFill}></div>

        {CATEGORIES.map((cat, index) => {
          const isPrimary = cat.color === 'var(--primary)';
          const Icon = cat.icon;
          return (
            <div key={cat.title} ref={(el) => (rowRefs.current[index] = el)} style={styles.row}>
              <div
                ref={(el) => (nodeRefs.current[index] = el)}
                style={{ ...styles.node, background: cat.color, boxShadow: `0 0 10px ${cat.color}` }}
              ></div>
              <div
                ref={(el) => (stubRefs.current[index] = el)}
                style={{ ...styles.stub, background: cat.color }}
              ></div>

              <div style={styles.content}>
                <div ref={(el) => (headerRefs.current[index] = el)} style={styles.header}>
                  <span style={{ ...styles.iconBox, color: cat.color, borderColor: 'var(--border)' }}>
                    <Icon />
                  </span>
                  <h3 style={{ ...styles.catTitle, color: cat.color }}>{cat.title}</h3>
                  <span style={styles.count}>{cat.skills.length} pkgs</span>
                </div>

                <div ref={(el) => (chipsRefs.current[index] = el)} style={styles.tagsContainer}>
                  {cat.skills.map((skill) => {
                    const tagStyle = isPrimary ? styles.tagPrimary : styles.tagSecondary;
                    return (
                      <span key={skill} className="skl-chip" style={{ ...styles.tag, ...tagStyle }}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.95rem',
    color: 'var(--secondary)',
    letterSpacing: '1px',
    marginBottom: '0.75rem',
  },
  eyebrowPrompt: {
    color: 'var(--secondary)',
  },
  title: {
    marginBottom: '3.5rem',
  },
  tree: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    maxWidth: '760px',
    paddingLeft: '2.5rem',
  },
  trunkTrack: {
    position: 'absolute',
    left: '5px',
    top: '0.6rem',
    bottom: '2.5rem',
    width: '2px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
  },
  trunkFill: {
    position: 'absolute',
    left: '5px',
    top: '0.6rem',
    bottom: '2.5rem',
    width: '2px',
    background: 'var(--secondary)',
    borderRadius: '2px',
    transformOrigin: 'top',
  },
  row: {
    position: 'relative',
    display: 'flex',
  },
  node: {
    position: 'absolute',
    left: '-2.5rem',
    top: '0.55rem',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    transform: 'translateX(-4px)',
  },
  stub: {
    position: 'absolute',
    left: '-1.9rem',
    top: '1.05rem',
    width: '1.4rem',
    height: '1.5px',
    transformOrigin: 'left',
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.9rem',
    marginBottom: '1.25rem',
  },
  iconBox: {
    display: 'inline-flex',
    padding: '0.5rem',
    borderRadius: '10px',
    border: '1px solid',
    background: 'rgba(255,255,255,0.04)',
  },
  catTitle: {
    fontSize: '1.6rem',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '-1px',
    margin: 0,
    flex: 1,
  },
  count: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.5px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  tag: {
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '700',
  },
  tagPrimary: {
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  tagSecondary: {
    background: 'rgba(94, 234, 212, 0.05)',
    color: 'var(--secondary)',
    border: '1px solid rgba(94, 234, 212, 0.3)',
  },
};

export default Skills;