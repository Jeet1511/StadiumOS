import React, { useState, useCallback, useRef } from 'react';
import {
  Map, Coffee, HeartPulse, Bath, ShoppingBag, Car, Bus, Train,
  Info, AlertTriangle, Accessibility, ZoomIn, ZoomOut, Maximize
} from 'lucide-react';
import { POIS } from '../../data/pois';
import type { Layer } from '../../types';

const POI_ICONS: Record<string, React.ElementType> = {
  Gate: Map, Food: Coffee, Medical: HeartPulse, Restroom: Bath,
  Merch: ShoppingBag, Parking: Car, Bus: Bus, Metro: Train,
  Taxi: Car, Volunteer: Info, Emergency: AlertTriangle, Accessible: Accessibility,
};

const StadiumCanvas = React.memo(function StadiumCanvas({ activeLayers }: { activeLayers: Set<Layer> }) {
  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(4, prev + delta)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    translateStart.current = { ...translate };
  }, [translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setTranslate({ x: translateStart.current.x + dx, y: translateStart.current.y + dy });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const resetView = useCallback(() => { setScale(1); setTranslate({ x: 0, y: 0 }); }, []);
  const zoomIn = useCallback(() => setScale(prev => Math.min(4, prev + 0.3)), []);
  const zoomOut = useCallback(() => setScale(prev => Math.max(0.5, prev - 0.3)), []);

  const sectionLines = [];
  for (let i = 0; i < 72; i++) {
    sectionLines.push(
      <line key={i} x1="500" y1="500" x2="500" y2="150"
        transform={`rotate(${i * 5} 500 500)`}
        stroke="#1e293b" strokeWidth="1.5" strokeOpacity="0.4" />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute bottom-28 right-8 z-40 flex flex-col gap-1.5">
        <button onClick={zoomIn} id="zoom-in" aria-label="Zoom in"
          className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={zoomOut} id="zoom-out" aria-label="Zoom out"
          className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={resetView} id="zoom-reset" aria-label="Reset view"
          className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
          <Maximize className="w-4 h-4" />
        </button>
        <div className="text-[10px] text-white/40 text-center font-mono mt-1">{Math.round(scale * 100)}%</div>
      </div>

      <div className="w-[65vw] h-[65vh] relative flex items-center justify-center"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Stadium digital twin - top-down view. Use mouse wheel to zoom, drag to pan."
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          <defs>
            <clipPath id="seatingClip"><rect x="200" y="210" width="600" height="580" rx="140" /></clipPath>
            <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
              <stop offset="50%" stopColor="rgba(249, 115, 22, 0.4)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </radialGradient>
            <radialGradient id="heatMedium" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.5)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
            </radialGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="softGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {/* Stadium structure */}
          <rect x="50" y="50" width="900" height="900" rx="300" fill="#030303" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="4" />
          <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.04">
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <line key={deg} x1="500" y1="500" x2="500" y2="50" transform={`rotate(${deg} 500 500)`} />
            ))}
          </g>
          <rect x="100" y="100" width="800" height="800" rx="250" fill="#080808" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" />
          <rect x="150" y="150" width="700" height="700" rx="200" fill="#0c0c0c" />
          <rect x="200" y="210" width="600" height="580" rx="140" fill="#141414" />
          <g clipPath="url(#seatingClip)">
            <rect x="250" y="270" width="500" height="460" rx="100" fill="#1c1c1c" />
            {sectionLines}
          </g>

          {/* Pitch */}
          <rect x="330" y="383" width="340" height="234" rx="10" fill="#050505" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="4" />
          <g>
            <rect x="340" y="393" width="320" height="214" fill="#061f10" />
            <g stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.5">
              <rect x="350" y="403" width="300" height="194" />
              <line x1="500" y1="403" x2="500" y2="597" />
              <circle cx="500" cy="500" r="27" />
              <circle cx="500" cy="500" r="2" fill="#22c55e" />
              <rect x="350" y="440" width="50" height="120" />
              <rect x="600" y="440" width="50" height="120" />
              <rect x="350" y="470" width="18" height="60" />
              <rect x="632" y="470" width="18" height="60" />
              <circle cx="386" cy="500" r="1.5" fill="#22c55e" />
              <circle cx="614" cy="500" r="1.5" fill="#22c55e" />
              <path d="M 400 475 A 27 27 0 0 1 400 525" />
              <path d="M 600 475 A 27 27 0 0 0 600 525" />
            </g>
          </g>

          {/* Sector labels — brighter */}
          <g fill="#ffffff" fillOpacity="0.45" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="3">
            <text x="500" y="295">NORTH SECTOR 100</text>
            <text x="500" y="715">SOUTH SECTOR 100</text>
            <text x="500" y="175">NORTH SECTOR 200</text>
            <text x="500" y="835">SOUTH SECTOR 200</text>
            <g transform="rotate(-90 275 500)"><text x="275" y="500">WEST 100</text></g>
            <g transform="rotate(90 725 500)"><text x="725" y="500">EAST 100</text></g>
          </g>

          {/* Crowd heatmap layer */}
          {activeLayers.has('crowd') && (
            <g style={{ mixBlendMode: 'screen' }}>
              <circle cx="500" cy="150" r="80" fill="url(#heatHigh)" className="animate-[pulse_4s_ease-in-out_infinite]" />
              <circle cx="850" cy="500" r="100" fill="url(#heatMedium)" className="animate-[pulse_5s_ease-in-out_infinite_0.5s]" />
              <circle cx="300" cy="250" r="60" fill="url(#heatHigh)" className="animate-[pulse_3s_ease-in-out_infinite_1s]" />
              <circle cx="500" cy="220" r="70" fill="url(#heatMedium)" className="animate-[pulse_4s_ease-in-out_infinite_2s]" />
              <circle cx="500" cy="320" r="120" fill="url(#heatHigh)" opacity="0.6" className="animate-[pulse_6s_ease-in-out_infinite]" />
              <circle cx="500" cy="680" r="120" fill="url(#heatMedium)" opacity="0.6" className="animate-[pulse_5s_ease-in-out_infinite_1.5s]" />
            </g>
          )}

          {/* Navigation routes */}
          {(activeLayers.has('navigation') || activeLayers.has('ai')) && (
            <g stroke="#a855f7" strokeWidth="6" strokeDasharray="12 8" strokeLinecap="round" fill="none" opacity="0.9">
              <path d="M 300 250 Q 500 250 500 400" className="animate-dash" filter="url(#glow)" />
              {activeLayers.has('navigation') && (
                <path d="M 850 500 Q 850 800 600 800" stroke="#3b82f6" className="animate-dash" filter="url(#softGlow)" />
              )}
            </g>
          )}

          {/* Accessible routes */}
          {activeLayers.has('accessibility') && (
            <g stroke="#0ea5e9" strokeWidth="5" strokeDasharray="8 6" strokeLinecap="round" fill="none" opacity="0.8">
              <path d="M 120 880 Q 150 800 380 280" className="animate-dash" filter="url(#softGlow)" />
            </g>
          )}

          {/* Queue wait times */}
          {(activeLayers.has('queue') || activeLayers.has('ai')) && (
            <g>
              <g className="animate-[pulse_2s_ease-in-out_infinite]">
                <rect x="270" y="210" width="60" height="24" rx="12" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1.5" />
                <text x="300" y="226" fill="#ef4444" fontSize="11" fontWeight="700" textAnchor="middle">24 min</text>
              </g>
              <rect x="670" y="710" width="60" height="24" rx="12" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.7" />
              <text x="700" y="726" fill="#22c55e" fontSize="11" fontWeight="700" textAnchor="middle">3 min</text>
              {activeLayers.has('ai') && (
                <circle cx="300" cy="250" r="45" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.3" />
              )}
            </g>
          )}

          {/* POI markers */}
          {POIS.map(poi => {
            let isVisible = true;
            let highlight = false;
            let iconColor = "rgba(255,255,255,0.5)";
            let bgFill = "rgba(255,255,255,0.04)";
            let borderColor = "rgba(255,255,255,0.15)";

            if (poi.type === 'Medical') {
              isVisible = activeLayers.size === 0 || activeLayers.has('medical');
              if (activeLayers.has('medical')) { highlight = true; iconColor = "#ef4444"; bgFill = "rgba(239,68,68,0.12)"; borderColor = "rgba(239,68,68,0.4)"; }
            } else if (poi.type === 'Emergency') {
              isVisible = activeLayers.size === 0 || activeLayers.has('security');
              if (activeLayers.has('security')) { highlight = true; iconColor = "#ef4444"; bgFill = "rgba(239,68,68,0.12)"; borderColor = "rgba(239,68,68,0.5)"; }
            } else if (poi.type === 'Gate') {
              isVisible = activeLayers.size === 0 || activeLayers.has('security') || activeLayers.has('queue') || activeLayers.has('crowd');
              if (activeLayers.has('security')) { highlight = true; iconColor = "#f97316"; bgFill = "rgba(249,115,22,0.12)"; borderColor = "rgba(249,115,22,0.4)"; }
            } else if (['Metro', 'Bus', 'Taxi', 'Parking'].includes(poi.type)) {
              isVisible = activeLayers.size === 0 || activeLayers.has('transportation');
              if (activeLayers.has('transportation')) { highlight = true; iconColor = "#3b82f6"; bgFill = "rgba(59,130,246,0.12)"; borderColor = "rgba(59,130,246,0.4)"; }
            } else if (poi.type === 'Accessible') {
              isVisible = activeLayers.size === 0 || activeLayers.has('accessibility');
              if (activeLayers.has('accessibility')) { highlight = true; iconColor = "#0ea5e9"; bgFill = "rgba(14,165,233,0.12)"; borderColor = "rgba(14,165,233,0.4)"; }
            } else {
              isVisible = activeLayers.size === 0 || activeLayers.has('crowd') || activeLayers.has('queue') || activeLayers.has('ai');
            }

            if (!isVisible && activeLayers.size > 0) return null;

            if (activeLayers.has('ai') && poi.id === 'f-2') {
              highlight = true; iconColor = "#a855f7"; bgFill = "rgba(168,85,247,0.15)"; borderColor = "rgba(168,85,247,0.5)";
            }

            return (
              <g key={poi.id} transform={`translate(${poi.x}, ${poi.y})`} className="cursor-pointer group">
                {highlight && <circle cx="0" cy="0" r={24} fill={bgFill} className="animate-[pulse_2s_ease-in-out_infinite]" opacity="0.5" />}
                <circle cx="0" cy="0" r={highlight ? 18 : 14} fill={bgFill} stroke={borderColor} strokeWidth={highlight ? 2 : 1.5} className="transition-all duration-500 ease-out hover:scale-110" />
                <text x="0" y={highlight ? 30 : 26} fill={iconColor} fontSize="11" fontWeight="600" textAnchor="middle" opacity={highlight ? 1 : 0.7} className="transition-all duration-300 drop-shadow-md">
                  {poi.label}
                </text>
                <foreignObject x={highlight ? -9 : -7} y={highlight ? -9 : -7} width={highlight ? 18 : 14} height={highlight ? 18 : 14} style={{ pointerEvents: 'none' }}>
                  <div style={{ color: iconColor, width: '100%', height: '100%', transition: 'all 0.3s ease' }}>
                    {React.createElement(POI_ICONS[poi.type] || Map, { size: highlight ? 18 : 14, strokeWidth: highlight ? 2.5 : 2 })}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
});

export default StadiumCanvas;
