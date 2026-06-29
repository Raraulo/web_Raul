import React from 'react';

const CVSection = () => {
  return (
    <section id="cv" style={styles.section} className="container animate-fade-in">
      <div style={styles.header}>
        <h2 style={styles.title}>Curriculum Vitae</h2>
        <p style={styles.subtitle}>My professional journey and experience</p>
      </div>

      <div style={styles.grid}>
        <div className="glass-panel" style={styles.card}>
          <h3 style={styles.cardTitle}>Experience</h3>
          <div style={styles.timelineItem}>
            <div style={styles.date}>2023 - Present</div>
            <h4 style={styles.role}>Senior Web Developer</h4>
            <p style={styles.company}>Tech Solutions Inc.</p>
            <p style={styles.desc}>Leading frontend development, creating high-performance React applications and optimizing user experiences.</p>
          </div>
          <div style={styles.timelineItem}>
            <div style={styles.date}>2020 - 2023</div>
            <h4 style={styles.role}>Web Developer</h4>
            <p style={styles.company}>Creative Agency</p>
            <p style={styles.desc}>Developed responsive websites, sales landing pages, and interactive web tools for diverse clients.</p>
          </div>
        </div>

        <div className="glass-panel" style={styles.card}>
          <h3 style={styles.cardTitle}>Skills</h3>
          <div style={styles.skillsGrid}>
            {['React', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Vite', 'Node.js', 'UI/UX Design', 'Performance Optimization', 'SEO'].map(skill => (
              <span key={skill} style={styles.skillTag}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.125rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '2rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: 'var(--primary)',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '0.5rem',
  },
  timelineItem: {
    marginBottom: '2rem',
  },
  date: {
    fontSize: '0.875rem',
    color: 'var(--secondary)',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  role: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  company: {
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  },
  desc: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: 'var(--text-main)',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  skillTag: {
    background: 'rgba(99, 102, 241, 0.1)',
    color: 'var(--primary)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  }
};

export default CVSection;
