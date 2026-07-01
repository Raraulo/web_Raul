import React from 'react';
import ecIcon from '../assets/ec.png';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <style>{`
        .coords-line{
          display:flex;
          align-items:center;
          gap:.7rem;
        }

        .coords-dot{
          width:6px;
          height:6px;
          border-radius:50%;
          background:var(--primary);
        }

        .coords-text{
          letter-spacing:.12em;
        }

        .coords-location{
          color:var(--primary);
          letter-spacing:.08em;
          font-family:var(--font-mono);
          font-size:.95rem;
        }

        .social-link{
          color:var(--text-muted);
          transition:.3s;
          display:flex;
          align-items:center;
          gap:.7rem;
          text-decoration:none;
        }

        .social-link:hover{
          color:var(--primary);
          transform:translateX(4px);
        }

        .social-icon{
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }

        .social-name{
          font-family:var(--font-mono);
          font-size:.85rem;
          letter-spacing:.05em;
        }

        .footer-logo{
          width:170px;
          height:170px;
          object-fit:contain;
          transition:.35s;
          filter:drop-shadow(0 6px 20px rgba(0,0,0,.35));
        }

        .footer-logo:hover{
          transform:scale(1.06);
          filter:drop-shadow(0 8px 28px rgba(0,255,255,.25));
        }
      `}</style>

      <div className="container" style={styles.container}>

        {/* Primera fila */}
        <div style={styles.topRow}>

          {/* Redes, apiladas una abajo de otra */}
          <div style={styles.socialsContainer}>

            <a
              href="https://www.linkedin.com/in/raúl-amaguaña-3b1222223/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <span className="social-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
              <span className="social-name">LinkedIn</span>
            </a>

            <a
              href="https://www.instagram.com/rauloo._.o/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <span className="social-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </span>
              <span className="social-name">Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@raulgp"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <span className="social-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
                </svg>
              </span>
              <span className="social-name">TikTok</span>
            </a>

          </div>

          {/* Coordenadas solitas, centradas */}
          <div style={styles.coordsContainer}>
            <span className="coords-line">
              <span className="coords-dot"></span>
              <span className="coords-text">
                0° 0' 0''
              </span>
            </span>
          </div>

          {/* Quito Ecuador, a la derecha, misma altura */}
          <div style={styles.locationContainer}>
            <span className="coords-location">
              Quito · Ecuador
            </span>
          </div>

        </div>

        {/* Logo principal, sin círculo */}

        <div style={styles.logoRow}>
          <img
            src={ecIcon}
            alt="Ecuador"
            className="footer-logo"
          />
        </div>

        {/* Parte inferior */}

        <div style={styles.bottomRow}>

          <p style={styles.text}>
            © {new Date().getFullYear()} Raul Amaguaña Jaramillo
          </p>

        </div>

      </div>
    </footer>
  );
};

const styles = {

  footer:{
    borderTop:'1px solid var(--border)',
    marginTop:'3rem',
    padding:'4rem 0 2rem'
  },

  container:{
    display:'flex',
    flexDirection:'column',
    gap:'2.8rem'
  },

  topRow:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },

  socialsContainer:{
    display:'flex',
    flexDirection:'column',
    gap:'.9rem',
    flex:1
  },

  coordsContainer:{
    display:'flex',
    justifyContent:'center',
    flex:1,
    fontFamily:'var(--font-mono)',
    color:'var(--text-muted)',
    fontSize:'.95rem'
  },

  locationContainer:{
    display:'flex',
    justifyContent:'flex-end',
    flex:1
  },

  logoRow:{
    display:'flex',
    justifyContent:'center'
  },

  bottomRow:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    flexWrap:'wrap',
    gap:'1rem'
  },

  text:{
    color:'var(--text-muted)',
    fontFamily:'var(--font-mono)',
    fontSize:'.85rem'
  }

};

export default Footer;