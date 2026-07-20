'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';

// npm install gsap d3-geo topojson-client

const QUITO = { id: 'quito', name: 'Quito', lat: -0.1807, lon: -78.4678, home: true };
const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const LAND_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json';

const R = 140;
const CX = 160;
const CY = 160;

// Capitales de referencia — cobertura global para dar contexto de escala real al globo.
const CITIES = [
  { id: 'bogota', name: 'Bogotá', lat: 4.711, lon: -74.0721 },
  { id: 'lima', name: 'Lima', lat: -12.0464, lon: -77.0428 },
  { id: 'santiago', name: 'Santiago', lat: -33.4489, lon: -70.6693 },
  { id: 'caracas', name: 'Caracas', lat: 10.4806, lon: -66.9036 },
  { id: 'la-paz', name: 'La Paz', lat: -16.5, lon: -68.15 },
  { id: 'asuncion', name: 'Asunción', lat: -25.2637, lon: -57.5759 },
  { id: 'montevideo', name: 'Montevideo', lat: -34.9011, lon: -56.1645 },
  { id: 'buenos-aires', name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  { id: 'brasilia', name: 'Brasilia', lat: -15.8267, lon: -47.9218 },
  { id: 'ciudad-mexico', name: 'Ciudad de México', lat: 19.4326, lon: -99.1332 },
  { id: 'washington', name: 'Washington D.C.', lat: 38.9072, lon: -77.0369 },
  { id: 'ottawa', name: 'Ottawa', lat: 45.4215, lon: -75.6972 },
  { id: 'madrid', name: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { id: 'londres', name: 'Londres', lat: 51.5072, lon: -0.1276 },
  { id: 'paris', name: 'París', lat: 48.8566, lon: 2.3522 },
  { id: 'berlin', name: 'Berlín', lat: 52.52, lon: 13.405 },
  { id: 'roma', name: 'Roma', lat: 41.9028, lon: 12.4964 },
  { id: 'moscu', name: 'Moscú', lat: 55.7558, lon: 37.6173 },
  { id: 'el-cairo', name: 'El Cairo', lat: 30.0444, lon: 31.2357 },
  { id: 'nairobi', name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
  { id: 'pretoria', name: 'Pretoria', lat: -25.7479, lon: 28.2293 },
  { id: 'nueva-delhi', name: 'Nueva Delhi', lat: 28.6139, lon: 77.209 },
  { id: 'pekin', name: 'Pekín', lat: 39.9042, lon: 116.4074 },
  { id: 'tokio', name: 'Tokio', lat: 35.6762, lon: 139.6503 },
  { id: 'canberra', name: 'Canberra', lat: -35.2809, lon: 149.13 },
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
  const [selectedCity, setSelectedCity] = useState(null); // capital elegida por el usuario
  const [overLocation, setOverLocation] = useState(''); // país / océano actual bajo la ISS
  // rotation = [lambda, phi] en grados. Arranca centrado en Quito.
  const [rotation, setRotation] = useState([QUITO.lon * -1, QUITO.lat * -1]);

  const dragState = useRef({ dragging: false, moved: false, lastX: 0, lastY: 0 });
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

  // --- arrastrar el globo con el cursor / dedo (con umbral para distinguir de un click) ---
  const onPointerDown = (e) => {
    dragState.current = { dragging: true, moved: false, lastX: e.clientX, lastY: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.lastX;
    const dy = e.clientY - dragState.current.lastY;
    if (Math.abs(dx) + Math.abs(dy) > 2) dragState.current.moved = true;
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
      let json;
      try {
        const response = await fetch(ISS_URL);
        if (!response.ok) throw new Error('Error primary API');
        json = await response.json();
      } catch (err) {
        // Fallback a open-notify si api.wheretheiss.at falla (ej. error 522)
        const fbResponse = await fetch('http://api.open-notify.org/iss-now.json');
        if (!fbResponse.ok) throw new Error('No se pudo obtener la posición de la ISS (fallback)');
        const fbJson = await fbResponse.json();
        json = {
          latitude: parseFloat(fbJson.iss_position.latitude),
          longitude: parseFloat(fbJson.iss_position.longitude),
          altitude: 420.5, // valor promedio aproximado
          velocity: 27580, // valor promedio aproximado
        };
      }
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

  // --- averigua qué país (u océano) hay bajo la posición actual de la ISS ---
  useEffect(() => {
    if (!data) return;
    const controller = new AbortController();
    const lookup = async () => {
      try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.latitude}&longitude=${data.longitude}&localityLanguage=es`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('reverse geocode failed');
        const json = await res.json();
        if (json.countryName) {
          setOverLocation(json.countryName);
        } else {
          const ocean = json.localityInfo?.informative?.find((i) => /ocean|mar|sea/i.test(i.name));
          setOverLocation(ocean ? ocean.name : 'mar abierto');
        }
      } catch (err) {
        if (err.name !== 'AbortError') setOverLocation('');
      }
    };
    lookup();
    return () => controller.abort();
  }, [data?.latitude, data?.longitude]);

  const metrics = useMemo(() => {
    if (!data) return null;
    const issLat = data.latitude;
    const issLon = data.longitude;
    const issAlt = data.altitude || 0; // ya viene en km
    const ref = selectedCity || QUITO;
    return {
      lat: issLat,
      lon: issLon,
      altitude: issAlt,
      velocity: data.velocity,
      refName: ref.name,
      haversine: haversineDistanceKm(ref.lat, ref.lon, issLat, issLon),
      ecef: ecefDistanceKm(ecefPoint(ref.lat, ref.lon, 0), ecefPoint(issLat, issLon, issAlt)),
      visible: isVisible(issLon, issLat),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedCity, rotation]);

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
      gsap.to(satGroupRef.current, { opacity: metrics.visible ? 1 : 0, duration: 0.5 });
    }
    if (pulseRef.current) {
      gsap.to(pulseRef.current, { opacity: metrics.visible ? 1 : 0, duration: 0.5 });
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
      attr: { r: 22 },
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      ease: 'power1.out',
    });
    return () => t.kill();
  }, []);

  // capitales visibles + posición proyectada, con las etiquetas que se solapan ocultas (el punto sigue visible)
  const visibleCities = useMemo(() => {
    const withXY = CITIES.map((c) => ({ city: c, xy: projection([c.lon, c.lat]) }))
      .filter((d) => d.xy && isVisible(d.city.lon, d.city.lat));

    // la capital seleccionada siempre gana su etiqueta; el resto se ordena por cercanía
    // al centro del globo (menos distorsión, más fácil de leer)
    withXY.sort((a, b) => {
      const aActive = selectedCity?.id === a.city.id ? -1 : 0;
      const bActive = selectedCity?.id === b.city.id ? -1 : 0;
      if (aActive !== bActive) return aActive - bActive;
      const da = (a.xy[0] - CX) ** 2 + (a.xy[1] - CY) ** 2;
      const db = (b.xy[0] - CX) ** 2 + (b.xy[1] - CY) ** 2;
      return da - db;
    });

    const placed = [];
    const MIN_DIST = 16; // px mínimos entre centros de etiqueta para no solaparse
    return withXY.map((d) => {
      const tooClose = placed.some((p) => Math.hypot(p[0] - d.xy[0], p[1] - d.xy[1]) < MIN_DIST);
      const showLabel = selectedCity?.id === d.city.id || !tooClose;
      if (showLabel) placed.push(d.xy);
      return { ...d, showLabel };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation, selectedCity]);

  const refPoint = selectedCity || QUITO;
  const refXY = projection([refPoint.lon, refPoint.lat]);
  const refVisible = isVisible(refPoint.lon, refPoint.lat);

  const handleCityClick = (city) => {
    if (dragState.current.moved) return; // fue un arrastre, no un click
    setSelectedCity((prev) => (prev?.id === city.id ? null : city));
  };

  return (
    <section className="section container" style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.badgeRow}>
          <div style={styles.badge}>
            <span style={{ ...styles.liveDot, opacity: error ? 0.3 : 1 }} />
            ISS Live Tracker
          </div>
          {!error && (
            <span style={styles.badgeMeta}>
              {overLocation ? `sobre ${overLocation} · ` : ''}próxima actualización en {countdown}s
            </span>
          )}
        </div>
        <h1 style={styles.title}>¿Dónde está la ISS ahora?</h1>
        <p style={styles.subtitle}>
          Globo interactivo: arrástralo para girarlo y toca cualquier capital para medir su distancia
          a la estación. La posición usa proyección ortográfica sobre el contorno real de los
          continentes; la distancia se calcula con Haversine (sobre la superficie) y con coordenadas
          ECEF (línea recta real a través del espacio).
        </p>
      </div>

      <div style={styles.layout}>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <span>Globo</span>
            <span style={styles.hint}>
              {overLocation ? <>ISS sobre <strong style={styles.hintStrong}>{overLocation}</strong></> : 'localizando…'}
            </span>
          </div>
          <svg
            viewBox="0 0 320 320"
            style={{ width: '100%', height: 'auto', cursor: 'grab', touchAction: 'none', userSelect: 'none' }}
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
                <stop offset="82%" stopColor="rgba(125,211,252,0)" />
                <stop offset="100%" stopColor="rgba(125,211,252,0.3)" />
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
              <filter id="satGlow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx={CX} cy={CY} r={R + 6} fill="url(#atmosphere)" />
            <circle cx={CX} cy={CY} r={R} fill="url(#ocean)" stroke="rgba(255,255,255,0.08)" />

            {land && (
              <path d={pathGen(land)} fill="#3c6b52" opacity="0.9" filter="url(#relief)" />
            )}

            <path d={pathGen(graticule)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

            {/* línea de señal ciudad de referencia -> ISS, solo si ambos son visibles */}
            {metrics && metrics.visible && refVisible && refXY && (
              <line
                ref={lineRef}
                x1={refXY[0]}
                y1={refXY[1]}
                x2={satPos.current.x}
                y2={satPos.current.y}
                stroke="var(--secondary)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            )}

            {/* capitales de referencia — tocables; las etiquetas que se solaparían quedan solo como punto */}
            {visibleCities.map(({ city: c, xy, showLabel }) => {
              const active = selectedCity?.id === c.id;
              return (
                <g
                  key={c.id}
                  opacity={active ? 1 : 0.75}
                  onPointerUp={() => handleCityClick(c)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={xy[0]} cy={xy[1]} r={active ? 8 : 6} fill="transparent" />
                  <circle
                    cx={xy[0]}
                    cy={xy[1]}
                    r={active ? 3 : 1.8}
                    fill={active ? 'var(--secondary)' : 'rgba(255,255,255,0.65)'}
                  />
                  {showLabel && (
                    <text
                      x={xy[0] + 5}
                      y={xy[1] + 3}
                      fontSize={active ? '8' : '6.5'}
                      fontWeight={active ? '600' : '400'}
                      fill={active ? '#ffffff' : 'var(--text-muted)'}
                      fontFamily="var(--font-mono)"
                    >
                      {c.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Quito — punto de origen fijo */}
            {(() => {
              const xy = projection([QUITO.lon, QUITO.lat]);
              if (!xy || !isVisible(QUITO.lon, QUITO.lat)) return null;
              const active = !selectedCity;
              return (
                <g
                  onPointerUp={() => handleCityClick(QUITO)}
                  style={{ cursor: 'pointer' }}
                  opacity={active ? 1 : 0.85}
                >
                  <circle cx={xy[0]} cy={xy[1]} r="9" fill="transparent" />
                  <circle cx={xy[0]} cy={xy[1]} r={active ? 4.5 : 3.5} fill="#ffffff" />
                  <circle cx={xy[0]} cy={xy[1]} r={active ? 4.5 : 3.5} fill="none" stroke="var(--secondary)" strokeWidth={active ? '1.4' : '0'} />
                  <text x={xy[0] + 8} y={xy[1] - 8} fontSize="9" fontWeight="600" fill="#ffffff" fontFamily="var(--font-mono)">
                    QUITO
                  </text>
                </g>
              );
            })()}

            {/* la ISS solo se dibuja cuando está en el hemisferio visible: nunca "flota" sobre el globo */}
            {metrics && metrics.visible && (
              <g filter="url(#satGlow)">
                <circle ref={pulseRef} cx={satPos.current.x} cy={satPos.current.y} r="4" fill="none" stroke="var(--secondary)" strokeWidth="1.6" />
                <g ref={satGroupRef} transform={`translate(${satPos.current.x},${satPos.current.y})`}>
                  <circle r="7" fill="rgba(4,16,26,0.75)" />
                  <rect x="-3" y="-2" width="6" height="4" rx="0.6" fill="var(--secondary)" />
                  <rect x="-9" y="-3.2" width="5" height="6.4" fill="rgba(125,211,252,0.6)" stroke="var(--secondary)" strokeWidth="0.5" />
                  <rect x="4" y="-3.2" width="5" height="6.4" fill="rgba(125,211,252,0.6)" stroke="var(--secondary)" strokeWidth="0.5" />
                  <line x1="-4" y1="0" x2="-9" y2="0" stroke="var(--secondary)" strokeWidth="0.7" />
                  <line x1="4" y1="0" x2="9" y2="0" stroke="var(--secondary)" strokeWidth="0.7" />
                </g>
              </g>
            )}
          </svg>

          {metrics && !metrics.visible && (
            <div style={styles.farSideNote}>
              La ISS está sobre el lado oculto del globo ahora mismo — gira el mapa para verla.
            </div>
          )}
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <span>Telemetría</span>
            {selectedCity && (
              <button type="button" onClick={() => setSelectedCity(null)} style={styles.resetBtn}>
                usar Quito ↺
              </button>
            )}
          </div>
          {error ? (
            <div style={styles.error}>{error}</div>
          ) : metrics ? (
            <>
              <div style={styles.refChip}>
                Distancia calculada desde <strong>{metrics.refName}</strong>
              </div>

              <div style={styles.metricGrid}>
                <div style={styles.metricCard}>
                  <span style={styles.metricLabel}>Altitud</span>
                  <span style={styles.metricValueBig}>{metrics.altitude?.toFixed(0)} <small>km</small></span>
                </div>
                <div style={styles.metricCard}>
                  <span style={styles.metricLabel}>Velocidad</span>
                  <span style={styles.metricValueBig}>{metrics.velocity?.toFixed(0)} <small>km/h</small></span>
                </div>
              </div>

              <div style={styles.metricRow}>
                <span style={styles.metricLabelSm}>Lat / Lon</span>
                <span style={styles.metricValue}>
                  {metrics.lat.toFixed(4)}°, {metrics.lon.toFixed(4)}°
                </span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabelSm}>Distancia Haversine (superficie)</span>
                <span style={styles.metricValue}>{metrics.haversine.toFixed(0)} km</span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabelSm}>Distancia 3D real (ECEF)</span>
                <span style={styles.metricValue}>{metrics.ecef.toFixed(0)} km</span>
              </div>
              <div style={styles.metricRow}>
                <span style={styles.metricLabelSm}>Visibilidad</span>
                <span style={styles.metricValue}>{metrics.visible ? 'sobre el lado visible' : 'lado oculto'}</span>
              </div>
            </>
          ) : (
            <div style={styles.loading}>Consultando la ISS…</div>
          )}
        </div>
      </div>
    </section>
  );
};

const styles = {
  page: { minHeight: '100vh', paddingTop: '7rem', paddingBottom: '4rem' },
  hero: { marginBottom: '2rem' },
  badgeRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.9rem',
    borderRadius: '999px',
    background: 'rgba(125, 211, 252, 0.15)',
    color: 'var(--secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
  },
  liveDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--secondary)',
    display: 'inline-block',
  },
  badgeMeta: { color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' },
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
  hintStrong: { color: '#ffffff', fontWeight: 600 },
  farSideNote: {
    marginTop: '0.9rem',
    padding: '0.6rem 0.8rem',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--text-muted)',
    fontSize: '0.78rem',
    lineHeight: 1.5,
  },
  resetBtn: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    textTransform: 'none',
    letterSpacing: 'normal',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '999px',
    color: 'var(--text-muted)',
    padding: '0.25rem 0.7rem',
    cursor: 'pointer',
  },
  refChip: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    marginBottom: '1rem',
    paddingBottom: '0.9rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  metricCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '14px',
    padding: '0.85rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  metricValueBig: { color: '#ffffff', fontSize: '1.5rem', fontWeight: 600 },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.7rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  metricLabel: { color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
  metricLabelSm: { color: 'var(--text-muted)', fontSize: '0.82rem' },
  metricValue: { color: '#ffffff', textAlign: 'right' },
  error: { color: '#ff8a8a' },
  loading: { color: 'var(--text-muted)' },
};

export default Iss;