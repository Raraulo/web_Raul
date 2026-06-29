import React from 'react';

const categories = [
  {
    title: 'Frontend',
    color: 'var(--primary)',
    skills: ['React.js', 'Angular', 'HTML5', 'CSS3', 'JS (ES6+)']
  },
  {
    title: 'Backend',
    color: 'var(--secondary)',
    skills: ['Node.js', 'Go', 'Express', 'Django']
  },
  {
    title: 'Datos / IA',
    color: 'var(--primary)',
    skills: ['Python', 'SQL', 'LLMs', 'Copilot']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <h2 className="section-title fade-up-element">Tecnologías</h2>
      
      <div style={styles.grid}>
        {categories.map((cat, index) => (
          <div key={index} className="premium-card fade-up-element" style={styles.card}>
            <h3 style={{...styles.catTitle, color: cat.color}}>{cat.title}</h3>
            <div style={styles.tagsContainer}>
              {cat.skills.map((skill, sIdx) => {
                const isPrimary = cat.color === 'var(--primary)';
                const tagStyle = isPrimary ? styles.tagPrimary : styles.tagSecondary;
                return (
                  <span key={sIdx} style={{...styles.tag, ...tagStyle}}>
                    {skill}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '3rem',
  },
  card: {
    padding: '3rem',
  },
  catTitle: {
    fontSize: '2rem',
    fontFamily: 'var(--font-mono)',
    marginBottom: '2rem',
    letterSpacing: '-1px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  tag: {
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    fontSize: '1.25rem',
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
  }
};

export default Skills;
