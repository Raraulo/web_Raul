import React from 'react';

const TargetIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const WhyHireMe = () => {
  return (
    <section id="why" className="section container">
      <h2 className="section-title fade-up-element">¿Por qué trabajar conmigo?</h2>
      
      <div style={styles.grid}>
        
        <div className="fade-up-element" style={styles.item}>
          <div style={styles.icon}><TargetIcon /></div>
          <div>
            <h3 style={styles.title}>Full Stack de Extremo a Extremo</h3>
            <p style={styles.desc}>
              No necesitas contratar a múltiples especialistas para cada etapa del proyecto. Yo me encargo de todo el flujo completo: desde el diseño de la base de datos y la arquitectura del backend, hasta el desarrollo del frontend y las apps móviles, hasta el despliegue en producción y su mantenimiento. Esto reduce la fricción entre equipos, acorta los tiempos de entrega y garantiza una coherencia en toda la aplicación. Mi experiencia me permite entender y resolver problemas de manera integral, sin depender de terceros para avanzar en el proyecto.
            </p>
          </div>
        </div>

        <div className="fade-up-element" style={styles.item}>
          <div style={styles.icon}><TargetIcon /></div>
          <div>
            <h3 style={styles.title}>Arquitectura Empresarial & Alineamiento con el Negocio</h3>
            <p style={styles.desc}>
              Más allá de escribir código funcional, diseño sistemas que están alineados con los objetivos de tu negocio. Mi formación en arquitectura empresarial (TOGAF) me permite entender las necesidades de hoy, pero también pensar en la escalabilidad y mantenibilidad a futuro. Construyo soluciones que pueden crecer con tu empresa, evitando deuda técnica y facilitando la incorporación de nuevas funcionalidades sin reestructurar todo desde cero. Priorizo la claridad y la documentación para que cualquier equipo pueda tomar el relevo sin problemas.
            </p>
          </div>
        </div>

        <div className="fade-up-element" style={styles.item}>
          <div style={styles.icon}><TargetIcon /></div>
          <div>
            <h3 style={styles.title}>QA en el ADN, Calidad Innegociable</h3>
            <p style={styles.desc}>
              Mi experiencia en aseguramiento de calidad en sistemas críticos del Estado (SERCOP) me ha enseñado que la calidad y la seguridad no son aspectos opcionales. Escribo código pensando desde el principio en cómo puede fallar, y aplico prácticas de prevención proactiva de errores. Priorizo la robustez sobre la velocidad a la hora de escribir el código, para minimizar sorpresas en producción. Realizo pruebas rigurosas antes de entregar cualquier funcionalidad, y me aseguro de que todo funcione como se espera en diferentes escenarios y dispositivos.
            </p>
          </div>
        </div>

        <div className="fade-up-element" style={styles.item}>
          <div style={styles.icon}><TargetIcon /></div>
          <div>
            <h3 style={styles.title}>Disponibilidad Inmediata y Compromiso Total</h3>
            <p style={styles.desc}>
              Tengo la disponibilidad y la ambición técnica para sumarme a tu proyecto desde el primer día, ya sea de forma remota o presencial en Quito. Me comprometo a entender rápidamente tus necesidades, a comunicarme de manera clara y frecuente, y a generar valor tangible desde el primer commit. Soy una persona responsable, proactiva y siempre dispuesta a aprender y adaptarme a las tecnologías y procesos de tu equipo para integrarme sin problemas y empezar a contribuir desde el primer momento.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  icon: {
    color: 'var(--secondary)',
  },
  title: {
    fontSize: '1.4rem',
    color: '#ffffff',
    marginBottom: '0.75rem',
    fontWeight: '700',
  },
  desc: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.8',
  }
};

export default WhyHireMe;
