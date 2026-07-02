'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';
import Footer from '../components/Footer';

// npm install gsap d3-geo topojson-client

const QUITO = { lat: -0.1807, lon: -78.4678, name: 'QUITO' };
const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const LAND_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json';

const R = 140;
const CX = 160;
const CY = 160;

// Ciudades de referencia para dar contexto de escala en el globo.
const CITIES = [
  { name: 'Bogotá', lat: 4.711, lon: -74.0721 },
  { name: 'Lima', lat: -12.0464, lon: -77.0428 },
  { name: 'Ciudad de México', lat: 19.4326, lon: -99.1332 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  { name: 'Nueva York', lat: 40.7128, lon: -74.006 },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Londres', lat: 51.5072, lon: -0.1276 },
  { name: 'Tokio', lat: 35.6762, lon: 139.6503 },
];

const toRad = (d) => (d * Math.PI) / 180;

const haversineDistanceKm = (lat1, lon1, lat2, lon2) => {
  const RADIUS = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return RADIUS * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const ecefPoint = (lat, lon, altitudeKm) => {
  const radius = 6371 + altitudeKm;
  const latRad = toRad(lat);
  const lonRad = toRad(lon);
  return {
    x: radius * Math.cos(latRad) * Math.cos(lonRad),
    y: radius * Math.cos(latRad) * Math.sin(lonRad),
    z: radius * Math.sin(latRad),
  };
};

const ecefDistanceKm = (p1, p2) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2);

const Iss = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [land, setLand] = useState(null);
  // rotation = [lambda, phi] en grados. Arranca centrado en Quito.
  const [rotation, setRotation] = useState([QUITO.lon * -1, QUITO.lat * -1]);

  const dragState = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const satGroupRef = useRef(null);
  const pulseRef = useRef(null);
  const lineRef = useRef(null);
  const satPos = useRef({ x: CX, y: CY });
  const tweenRef = useRef(null);

  // --- proyección: se reconstruye cada vez que rotas el globo ---
  const projection = useMemo(
    () => geoOrthographic().scale(R).translate([CX, CY]).clipAngle(90).rotate(rotation),
    [rotation]
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => geoGraticule10(), []);

  const isVisible = (lon, lat) => {
    const center = [-rotation[0], -rotation[1]];
    return geoDistance([lon, lat], center) < Math.PI / 2 - 0.02;
  };

  // --- cargar el contorno de los continentes una sola vez ---
  useEffect(() => {
    fetch(LAND_URL)
      .then((res) => res.json())
      .then((topo) => setLand(feature(topo, topo.objects.land)))
      .catch(() => setLand(null));
  }, []);

  // --- arrastrar el globo con el cursor / dedo ---
  const onPointerDown = (e) => {
    dragState.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.lastX;
    const dy = e.clientY - dragState.current.lastY;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    setRotation(([lambda, phi]) => [
      lambda + dx * 0.35,
      Math.max(-90, Math.min(90, phi - dy * 0.35)),
    ]);
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  // --- datos de la ISS ---
  const fetchIss = async () => {
    try {
      const response = await fetch(ISS_URL);
      if (!response.ok) throw new Error('No se pudo obtener la posición de la ISS');
      const json = await response.json();
      setData(json);
      setError('');
      setCountdown(5);
    } catch (err) {
      setError(err.message || 'Error al consultar la ISS');
    }
  };

  useEffect(() => {
    fetchIss();
    const dataInterval = setInterval(fetchIss, 5000);
    const clockInterval = setInterval(() => setCountdown((p) => (p > 1 ? p - 1 : 5)), 1000);
    return () => {
      clearInterval(dataInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const metrics = useMemo(() => {
    if (!data) return null;
    const issLat = data.latitude;
    const issLon = data.longitude;
    const issAlt = data.altitude || 0; // ya viene en km
    return {
      lat: issLat,
      lon: issLon,
      altitude: issAlt,
      velocity: data.velocity,
      haversine: haversineDistanceKm(QUITO.lat, QUITO.lon, issLat, issLon),
      ecef: ecefDistanceKm(ecefPoint(QUITO.lat, QUITO.lon, 0), ecefPoint(issLat, issLon, issAlt)),
    };
  }, [data]);

  // pinta el satélite / línea / pulso en las coordenadas x,y actuales
  const paintSatellite = (x, y) => {
    satPos.current = { x, y };
    if (satGroupRef.current) {
      const angle = (Math.atan2(y - CY, x - CX) * 180) / Math.PI + 90;
      satGroupRef.current.setAttribute('transform', `translate(${x},${y}) rotate(${angle})`);
    }
    if (pulseRef.current) {
      pulseRef.current.setAttribute('cx', x);
      pulseRef.current.setAttribute('cy', y);
    }
    if (lineRef.current) {
      lineRef.current.setAttribute('x2', x);
      lineRef.current.setAttribute('y2', y);
    }
  };

  // cuando llegan datos nuevos de la ISS: animar con GSAP hasta la nueva posición
  useEffect(() => {
    if (!metrics) return;
    const p = projection([metrics.lon, metrics.lat]);
    if (!p) return;
    const [tx, ty] = p;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(satPos.current, {
      x: tx,
      y: ty,
      duration: 3.5,
      ease: 'power2.out',
      onUpdate: () => paintSatellite(satPos.current.x, satPos.current.y),
    });
    if (satGroupRef.current) {
      gsap.to(satGroupRef.current, { opacity: isVisible(metrics.lon, metrics.lat) ? 1 : 0.15, duration: 0.6 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics]);

  // cuando rotas el globo con el cursor: reposicionar todo al instante (sin tween)
  useEffect(() => {
    if (!metrics) {
      paintSatellite(CX, CY);
      return;
    }
    const p = projection([metrics.lon, metrics.lat]);
    if (p) paintSatellite(p[0], p[1]);
    tweenRef.current?.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation]);

  // pulso de radar continuo
  useEffect(() => {
    if (!pulseRef.current) return;
    const t = gsap.to(pulseRef.current, {
      attr: { r: 20 },
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      ease: 'power1.out',
    });
    return () => t.kill();
  }, []);

  const quitoXY = projection([QUITO.lon, QUITO.lat]);

  return (
    <section className="section container" style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.badge}>ISS Live Tracker</div>
        <h1 style={styles.title}>¿Dónde está la ISS ahora?</h1>
        <p style={styles.subtitle}>
          Globo interactivo: arrástralo con el cursor para girarlo. La posición real usa proyección
          ortográfica sobre el contorno real de los continentes, y la distancia se calcula con Haversine
          (superficie) y coordenadas ECEF (línea recta real en el espacio).
        </p>
      </div>

      <div style={styles.layout}>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <span>Globo</span>
            <span style={styles.hint}>arrastra para girar</span>
          </div>
          <svg
            viewBox="0 0 320 320"
            style={{ width: '100%', height: 'auto', cursor: 'grab', touchAction: 'none' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <defs>
              <radialGradient id="ocean" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#123044" />
                <stop offset="60%" stopColor="#081a26" />
                <stop offset="100%" stopColor="#04101a" />
              </radialGradient>
              <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
                <stop offset="85%" stopColor="rgba(125,211,252,0)" />
                <stop offset="100%" stopColor="rgba(125,211,252,0.25)" />
              </radialGradient>
              {/* relieve: ruido + luz difusa simulando textura del terreno */}
              <filter id="relief" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
                <feDiffuseLighting in="noise" lightingColor="#9fd8b8" surfaceScale="2.2" result="light">
                  <feDistantLight azimuth="235" elevation="55" />
                </feDiffuseLighting>
                <feComposite in="light" in2="SourceGraphic" operator="in" result="litLand" />
                <feBlend in="SourceGraphic" in2="litLand" mode="multiply" />
              </filter>
            </defs>

            <circle cx={CX} cy={CY} r={R + 6} fill="url(#atmosphere)" />
            <circle cx={CX} cy={CY} r={R} fill="url(#ocean)" stroke="rgba(255,255,255,0.08)" />

            {land && (
              <path d={pathGen(land)} fill="#3c6b52" opacity="0.9" filter="url(#relief)" />
            )}

            <path d={pathGen(graticule)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />

            {/* línea de señal Quito -> ISS */}
            <line
              ref={lineRef}
              x1={quitoXY ? quitoXY[0] : CX}
              y1={quitoXY ? quitoXY[1] : CY}
              x2={satPos.current.x}
              y2={satPos.current.y}
              stroke="var(--secondary)"
              strokeWidth="1.2"
              strokeDasharray="5 5"
              opacity="0.55"
            />

            {/* ciudades de referencia */}
            {CITIES.map((c) => {
              const xy = projection([c.lon, c.lat]);
              if (!xy || !isVisible(c.lon, c.lat)) return null;
              return (
                <g key={c.name} opacity="0.85">
                  <circle cx={xy[0]} cy={xy[1]} r="2" fill="rgba(255,255,255,0.6)" />
                  <text x={xy[0] + 5} y={xy[1] + 3} fontSize="7" fill="var(--text-muted)" fontFamily="var(--font-mono)">
                    {c.name}
                  </text>
                </g>
              );
            })}

            {/* Quito */}
            {quitoXY && (
              <g>
                <circle cx={quitoXY[0]} cy={quitoXY[1]} r="4" fill="#ffffff" />
                <text x={quitoXY[0] + 8} y={quitoXY[1] - 8} fontSize="9" fill="#ffffff" fontFamily="var(--font-mono)">
                  {QUITO.name}
                </text>
              </g>
            )}

            {/* pulso radar de la ISS */}
            <circle ref={pulseRef} cx={satPos.current.x} cy={satPos.current.y} r="4" fill="none" stroke="var(--secondary)" strokeWidth="1.5" />

            {/* ícono del satélite */}
            <g ref={satGroupRef} transform={`translate(${satPos.current.x},${satPos.current.y})`}>
              <rect x="-3" y="-2" width="6" height="4" rx="0.6" fill="var(--secondary)" />
              <rect x="-9" y="-3.2" width="5" height="6.4" fill="rgba(125,211,252,0.55)" stroke="var(--secondary)" strokeWidth="0.4" />
              <rect x="4" y="-3.2" width="5" height="6.4" fill="rgba(125,211,252,0.55)" stroke="var(--secondary)" strokeWidth="0.4" />
              <line x1="-4" y1="0" x2="-9" y2="0" stroke="var(--secondary)" strokeWidth="0.6" />
              <line x1="4" y1="0" x2="9" y2="0" stroke="var(--secondary)" strokeWidth="0.6" />
            </g>
          </svg>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <span>Telemetría</span>
          </div>
          {error ? (
            <div style={styles.error}>{error}</div>
          ) : metrics ? (
            <>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>Lat / Lon</span>
                <span style={styles.metricValue}>
                  {metrics.lat.toFixed(4)}°, {metrics.lon.toFixed(4)}°
                </span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>Altitud</span>
                <span style={styles.metricValue}>{metrics.altitude?.toFixed(2)} km</span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>Velocidad</span>
                <span style={styles.metricValue}>{metrics.velocity?.toFixed(2)} km/h</span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>Distancia Haversine</span>
                <span style={styles.metricValue}>{metrics.haversine.toFixed(0)} km</span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>Distancia 3D real</span>
                <span style={styles.metricValue}>{metrics.ecef.toFixed(0)} km</span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabel}>Refresco</span>
                <span style={styles.metricValue}>cada {countdown}s</span>
              </div>
            </>
          ) : (
            <div style={styles.loading}>Consultando la ISS…</div>
          )}
        </div>
      </div>

      <Footer />
    </section>
  );
};

const styles = {
  page: { minHeight: '100vh', paddingTop: '7rem', paddingBottom: '4rem' },
  hero: { marginBottom: '2rem' },
  badge: {
    display: 'inline-block',
    padding: '0.5rem 0.9rem',
    borderRadius: '999px',
    background: 'rgba(125, 211, 252, 0.15)',
    color: 'var(--secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    marginBottom: '1rem',
  },
  title: { fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', marginBottom: '0.75rem' },
  subtitle: { color: 'var(--text-muted)', maxWidth: '760px', lineHeight: 1.7 },
  layout: { display: 'grid', gap: '1.5rem', gridTemplateColumns: '1.1fr 0.9fr' },
  panel: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px',
    padding: '1.4rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
  },
  panelHeader: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--secondary)',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hint: { color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 'normal', fontSize: '0.7rem' },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.7rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  metricLabel: { color: 'var(--text-muted)' },
  metricValue: { color: '#ffffff', textAlign: 'right' },
  error: { color: '#ff8a8a' },
  loading: { color: 'var(--text-muted)' },
};

export default Iss;