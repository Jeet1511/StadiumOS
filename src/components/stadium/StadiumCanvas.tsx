import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Map, Coffee, HeartPulse, Bath, ShoppingBag, Car, Bus, Train, Info, AlertTriangle, Accessibility, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { POIS } from '../../data/pois';
import type { Layer } from '../../types';

const POI_ICONS: Record<string, React.ElementType> = {
  Gate: Map, Food: Coffee, Medical: HeartPulse, Restroom: Bath,
  Merch: ShoppingBag, Parking: Car, Bus: Bus, Metro: Train,
  Taxi: Car, Volunteer: Info, Emergency: AlertTriangle, Accessible: Accessibility,
};

const CX = 500, CY = 500;
function p2c(r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}
function sectorPath(r1: number, r2: number, a1: number, a2: number) {
  const [ix1,iy1]=p2c(r1,a1),[ix2,iy2]=p2c(r1,a2),[ox1,oy1]=p2c(r2,a1),[ox2,oy2]=p2c(r2,a2);
  return `M${ix1},${iy1} A${r1},${r1} 0 0 1 ${ix2},${iy2} L${ox2},${oy2} A${r2},${r2} 0 0 0 ${ox1},${oy1}Z`;
}
function arcStroke(r: number, a1: number, a2: number) {
  const [x1,y1]=p2c(r,a1),[x2,y2]=p2c(r,a2);
  return `M${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2}`;
}

const LR1=220,LR2=295,UR1=305,UR2=375,CR1=380,CR2=415,WR=430;
const ROWS_L=[238,253,268,283],ROWS_U=[322,340,358,370];
const CONCOURSE_MID = (CR1+CR2)/2;

const SECTIONS = [
  { num: 101, a1: 7, a2: 31 }, { num: 102, a1: 33, a2: 57 }, { num: 103, a1: 59, a2: 83 },
  { num: 104, a1: 97, a2: 121 }, { num: 105, a1: 123, a2: 147 }, { num: 106, a1: 149, a2: 173 },
  { num: 107, a1: 187, a2: 211 }, { num: 108, a1: 213, a2: 237 }, { num: 109, a1: 239, a2: 263 },
  { num: 110, a1: 277, a2: 301 }, { num: 111, a1: 303, a2: 327 }, { num: 112, a1: 329, a2: 353 },
];
const GATES=[{l:'N',a:0,c:'#ef4444'},{l:'E',a:90,c:'#f59e0b'},{l:'S',a:180,c:'#22c55e'},{l:'W',a:270,c:'#3b82f6'}];

const USER_ANGLE = 195;
const SEAT_ANGLE = 341;
const SEAT_R = (LR1+LR2)/2;

// Crowd data per section
const CROWD: Record<number, {density:'heavy'|'moderate'|'light'; pct:number; count:number; fill:string}> = {
  101:{density:'heavy',pct:87,count:7200,fill:'rgba(239,68,68,0.07)'},
  102:{density:'moderate',pct:65,count:5400,fill:'rgba(245,158,11,0.05)'},
  103:{density:'heavy',pct:91,count:7500,fill:'rgba(239,68,68,0.07)'},
  104:{density:'moderate',pct:58,count:4800,fill:'rgba(245,158,11,0.05)'},
  105:{density:'light',pct:32,count:2600,fill:'rgba(74,222,128,0.04)'},
  106:{density:'moderate',pct:62,count:5100,fill:'rgba(245,158,11,0.05)'},
  107:{density:'light',pct:28,count:2300,fill:'rgba(74,222,128,0.04)'},
  108:{density:'moderate',pct:55,count:4500,fill:'rgba(245,158,11,0.05)'},
  109:{density:'heavy',pct:84,count:6900,fill:'rgba(239,68,68,0.07)'},
  110:{density:'light',pct:35,count:2900,fill:'rgba(74,222,128,0.04)'},
  111:{density:'moderate',pct:60,count:4900,fill:'rgba(245,158,11,0.05)'},
  112:{density:'light',pct:38,count:3100,fill:'rgba(74,222,128,0.04)'},
};

function genDots(sec: typeof SECTIONS[0], count: number, r1: number, r2: number) {
  const dots: {x:number;y:number;o:number}[] = [];
  const seed = sec.num * 7;
  for (let i = 0; i < count; i++) {
    const t = ((seed + i * 17) % 100) / 100;
    const angle = sec.a1 + 1.5 + t * (sec.a2 - sec.a1 - 3);
    const rSeed = ((seed + i * 31) % 100) / 100;
    const r = r1 + 8 + rSeed * (r2 - r1 - 12);
    const [x, y] = p2c(r, angle);
    dots.push({ x, y, o: 0.2 + rSeed * 0.4 });
  }
  return dots;
}

interface SectionInfo { num: number; x: number; y: number; data: typeof CROWD[number] }

const StadiumCanvas = React.memo(function StadiumCanvas({ activeLayers }: { activeLayers: Set<Layer> }) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionInfo | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);

  const handleWheel = useCallback((e: React.WheelEvent) => { e.preventDefault(); setScale(p => Math.max(0.4, Math.min(5, p + (e.deltaY > 0 ? -0.15 : 0.15)))); }, []);
  const handleMouseDown = useCallback((e: React.MouseEvent) => { if (e.button !== 0) return; setIsDragging(true); dragMoved.current = false; dragStart.current = { x: e.clientX, y: e.clientY }; translateStart.current = { ...translate }; }, [translate]);
  const handleMouseMove = useCallback((e: React.MouseEvent) => { if (!isDragging) return; dragMoved.current = true; setTranslate({ x: translateStart.current.x + e.clientX - dragStart.current.x, y: translateStart.current.y + e.clientY - dragStart.current.y }); }, [isDragging]);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleSectionClick = useCallback((sec: typeof SECTIONS[0], tier: 'lower'|'upper') => {
    if (dragMoved.current) return;
    const num = tier === 'upper' ? sec.num + 100 : sec.num;
    const mid = (sec.a1 + sec.a2) / 2;
    const r = tier === 'upper' ? (UR1+UR2)/2 : (LR1+LR2)/2;
    const [x, y] = p2c(r, mid);
    const cd = CROWD[sec.num];
    if (cd) setSelectedSection({ num, x, y, data: cd });
  }, []);

  // Single route: user position → concourse arc → aisle → seat
  const routePath = useMemo(() => {
    const pts: string[] = [];
    const [ux, uy] = p2c(CONCOURSE_MID, USER_ANGLE);
    pts.push(`M${ux.toFixed(1)},${uy.toFixed(1)}`);
    for (let d = USER_ANGLE + 1; d <= 329; d += 1) {
      const [x, y] = p2c(CONCOURSE_MID, d);
      pts.push(`L${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const [a1x, a1y] = p2c(UR1, 329);
    pts.push(`L${a1x.toFixed(1)},${a1y.toFixed(1)}`);
    const [a2x, a2y] = p2c(LR2, 330);
    pts.push(`L${a2x.toFixed(1)},${a2y.toFixed(1)}`);
    const [sx, sy] = p2c(SEAT_R, SEAT_ANGLE);
    pts.push(`L${sx.toFixed(1)},${sy.toFixed(1)}`);
    return pts.join(' ');
  }, []);

  const crowdDots = useMemo(() => {
    const all: {x:number;y:number;o:number;color:string}[] = [];
    SECTIONS.forEach(sec => {
      const c = CROWD[sec.num]; if (!c) return;
      const color = c.density === 'heavy' ? '#ef4444' : c.density === 'moderate' ? '#f59e0b' : '#4ade80';
      const lower = Math.round(c.pct / 5);
      const upper = Math.round(lower * 0.6);
      genDots(sec, lower, LR1, LR2).forEach(d => all.push({ ...d, color }));
      genDots(sec, upper, UR1, UR2).forEach(d => all.push({ ...d, color }));
    });
    return all;
  }, []);

  const showRoute = activeLayers.has('navigation') || activeLayers.has('ai');

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
      onClick={() => setSelectedSection(null)}>

      {/* Zoom controls */}
      <div className="absolute bottom-5 right-5 z-40 flex gap-1 bg-[#131b2c]/90 backdrop-blur-lg border border-white/[0.08] rounded-xl p-1 shadow-lg">
        <button onClick={() => setScale(p => Math.min(5, p+0.3))} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"><ZoomIn className="w-3.5 h-3.5" /></button>
        <button onClick={() => setScale(p => Math.max(0.4, p-0.3))} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"><ZoomOut className="w-3.5 h-3.5" /></button>
        <button onClick={() => {setScale(1);setTranslate({x:0,y:0});}} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"><RotateCcw className="w-3.5 h-3.5" /></button>
        <span className="flex items-center text-[9px] text-slate-500 font-mono px-1">{Math.round(scale*100)}%</span>
      </div>

      {/* Section detail popup */}
      {selectedSection && (
        <div className="absolute z-50 bg-[#131b2c]/95 backdrop-blur-xl border border-white/[0.1] rounded-xl p-4 shadow-2xl min-w-[200px]"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] font-bold text-slate-200">Section {selectedSection.num}</span>
            <button onClick={() => setSelectedSection(null)} className="text-slate-500 hover:text-white"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Capacity</span>
              <span className="text-[12px] font-semibold text-slate-200">8,200 seats</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Occupancy</span>
              <span className={`text-[12px] font-bold ${selectedSection.data.density==='heavy'?'text-red-400':selectedSection.data.density==='moderate'?'text-amber-400':'text-green-400'}`}>
                {selectedSection.data.pct}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">People</span>
              <span className="text-[12px] font-semibold text-slate-200">{selectedSection.data.count.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mt-1">
              <div className={`h-full rounded-full transition-all ${selectedSection.data.density==='heavy'?'bg-red-500':selectedSection.data.density==='moderate'?'bg-amber-500':'bg-green-500'}`}
                style={{width:`${selectedSection.data.pct}%`}} />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className={`w-2 h-2 rounded-full ${selectedSection.data.density==='heavy'?'bg-red-500':selectedSection.data.density==='moderate'?'bg-amber-500':'bg-green-500'}`} />
              <span className="text-[10px] text-slate-400 capitalize">{selectedSection.data.density} density</span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full max-w-[min(75vh,85vw)] max-h-[min(75vh,85vw)] relative flex items-center justify-center p-4"
        onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="xMidYMid meet"
          style={{ transform: `translate(${translate.x}px,${translate.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}>
          <defs>
            <filter id="routeGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="userGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {/* Outer wall */}
          <circle cx={CX} cy={CY} r={WR} fill="#0e1628" stroke="#2d3a4f" strokeWidth="1.5" />

          {/* Concourse */}
          <path d={sectorPath(CR1, CR2, 0, 360)} fill="#1a2540" stroke="#2d3a4f" strokeWidth="0.5" />
          <path d={arcStroke(CONCOURSE_MID, 0, 360)} fill="none" stroke="#374d6b" strokeWidth="0.3" strokeDasharray="2 6" strokeOpacity="0.25" />

          {/* Gates */}
          {GATES.map(g => {
            const hw = 5.5;
            const [o1x,o1y]=p2c(WR,g.a-hw),[o2x,o2y]=p2c(WR,g.a+hw);
            const [i1x,i1y]=p2c(CR1,g.a-hw),[i2x,i2y]=p2c(CR1,g.a+hw);
            const [lx,ly]=p2c(WR+14,g.a);
            return <g key={g.l}>
              <path d={`M${i1x},${i1y}L${o1x},${o1y}L${o2x},${o2y}L${i2x},${i2y}Z`} fill="#1e2d45" stroke={g.c} strokeWidth="0.6" strokeOpacity="0.25" />
              <circle cx={lx} cy={ly} r="8" fill={g.c} fillOpacity="0.06" stroke={g.c} strokeWidth="0.8" strokeOpacity="0.4" />
              <text x={lx} y={ly+3} fill={g.c} fontSize="7" fontWeight="700" textAnchor="middle" opacity="0.85">G{g.l}</text>
            </g>;
          })}

          {/* Upper tier — CLICKABLE */}
          {SECTIONS.map(s => {
            const hi = s.num===112; const cd = CROWD[s.num]; const sel = selectedSection?.num === s.num+100;
            return <g key={`u${s.num}`} className="cursor-pointer" onClick={e => { e.stopPropagation(); handleSectionClick(s, 'upper'); }}>
              <path d={sectorPath(UR1,UR2,s.a1,s.a2)} fill={sel?'rgba(99,102,241,0.15)':hi?'#1e1b4b':cd?.fill||'#141e32'} stroke={sel?'#818cf8':hi?'#6366f1':'#2d3a4f'} strokeWidth={sel?1.5:hi?1:0.4} strokeOpacity={sel?0.7:hi?0.5:0.2} className="hover:brightness-150 transition-all duration-200" />
              {ROWS_U.map(r => <path key={r} d={arcStroke(r,s.a1+1,s.a2-1)} fill="none" stroke="#374d6b" strokeWidth="0.2" strokeOpacity="0.12" />)}
              {(()=>{const m=(s.a1+s.a2)/2;const[x,y]=p2c((UR1+UR2)/2,m);return <text x={x} y={y+3} fill={sel||hi?'#a5b4fc':'#546882'} fontSize="7" fontWeight="600" textAnchor="middle" opacity={sel?1:hi?1:0.5} className="pointer-events-none">{s.num+100}</text>;})()}
            </g>;
          })}

          {/* Lower tier — CLICKABLE */}
          {SECTIONS.map(s => {
            const hi = s.num===112; const cd = CROWD[s.num]; const sel = selectedSection?.num === s.num;
            return <g key={`l${s.num}`} className="cursor-pointer" onClick={e => { e.stopPropagation(); handleSectionClick(s, 'lower'); }}>
              <path d={sectorPath(LR1,LR2,s.a1,s.a2)} fill={sel?'rgba(99,102,241,0.15)':hi?'#1e1b4b':cd?.fill||'#18243a'} stroke={sel?'#818cf8':hi?'#818cf8':'#2d3a4f'} strokeWidth={sel?1.5:hi?1:0.4} strokeOpacity={sel?0.7:hi?0.5:0.2} className="hover:brightness-150 transition-all duration-200" />
              {ROWS_L.map(r => <path key={r} d={arcStroke(r,s.a1+1,s.a2-1)} fill="none" stroke="#374d6b" strokeWidth="0.2" strokeOpacity="0.12" />)}
              {(()=>{const m=(s.a1+s.a2)/2;const[x,y]=p2c((LR1+LR2)/2,m);return <text x={x} y={y+3} fill={sel||hi?'#c7d2fe':'#8399b3'} fontSize={hi?9:8} fontWeight="700" textAnchor="middle" opacity={sel?1:hi?1:0.4} className="pointer-events-none">{s.num}</text>;})()}
              {hi && <path d={sectorPath(LR1-2,LR2+2,s.a1-0.5,s.a2+0.5)} fill="none" stroke="#818cf8" strokeWidth="0.6" strokeOpacity="0.12" className="animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />}
            </g>;
          })}

          {/* Crowd dots */}
          {activeLayers.has('crowd') && crowdDots.map((d,i) => (
            <circle key={i} cx={d.x} cy={d.y} r="1.5" fill={d.color} opacity={d.o} className="pointer-events-none" />
          ))}

          {/* Inner barrier */}
          <circle cx={CX} cy={CY} r={LR1-5} fill="none" stroke="#2d3a4f" strokeWidth="0.5" strokeOpacity="0.12" />

          {/* Pitch */}
          <rect x="370" y="410" width="260" height="180" rx="5" fill="#081a0e" stroke="#22c55e" strokeOpacity="0.18" strokeWidth="1.2" />
          <rect x="377" y="417" width="246" height="166" fill="#0b2316" rx="3" />
          <g stroke="#22c55e" strokeWidth="0.6" fill="none" opacity="0.4">
            <rect x="384" y="424" width="232" height="152" /><line x1="500" y1="424" x2="500" y2="576" />
            <circle cx="500" cy="500" r="20" /><circle cx="500" cy="500" r="1.5" fill="#22c55e" />
            <rect x="384" y="460" width="36" height="80" /><rect x="580" y="460" width="36" height="80" />
            <rect x="384" y="477" width="13" height="46" /><rect x="603" y="477" width="13" height="46" />
          </g>

          {/* Route */}
          {showRoute && <g fill="none" className="pointer-events-none">
            <path d={routePath} stroke="#818cf8" strokeWidth="4" strokeLinecap="round" opacity="0.1" filter="url(#routeGlow)" />
            <path d={routePath} stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" opacity="0.8" className="animate-dash" />
            {/* User marker */}
            {(()=>{const[x,y]=p2c(CONCOURSE_MID,USER_ANGLE);return<>
              <circle cx={x} cy={y} r="10" fill="#3b82f6" fillOpacity="0.08" className="animate-[pulse_2s_ease-in-out_infinite]" />
              <circle cx={x} cy={y} r="5" fill="#3b82f6" fillOpacity="0.15" stroke="#60a5fa" strokeWidth="1.2" />
              <circle cx={x} cy={y} r="2.5" fill="#60a5fa" />
              <text x={x+12} y={y-4} fill="#93c5fd" fontSize="7" fontWeight="700">YOU</text>
              <text x={x+12} y={y+4} fill="#546882" fontSize="5" fontWeight="600">S. Concourse</text>
            </>;})()}
            {/* Seat marker */}
            {(()=>{const[x,y]=p2c(SEAT_R,SEAT_ANGLE);return<>
              <circle cx={x} cy={y} r="8" fill="#818cf8" fillOpacity="0.08" className="animate-[pulse_2.5s_ease-in-out_infinite]" />
              <circle cx={x} cy={y} r="4" fill="#818cf8" fillOpacity="0.2" stroke="#a5b4fc" strokeWidth="1.2" />
              <circle cx={x} cy={y} r="2" fill="#a5b4fc" />
              <text x={x+10} y={y-3} fill="#c7d2fe" fontSize="6.5" fontWeight="700">SEC 112 · F24</text>
            </>;})()}
            {/* ETA badge */}
            {(()=>{const[x,y]=p2c(CONCOURSE_MID,270);return<>
              <rect x={x-22} y={y-9} width="44" height="18" rx="9" fill="#818cf8" fillOpacity="0.1" stroke="#818cf8" strokeWidth="0.6" strokeOpacity="0.3" />
              <text x={x} y={y+3} fill="#c7d2fe" fontSize="7" fontWeight="700" textAnchor="middle">~4 min</text>
            </>;})()}
          </g>}

          {/* Gate wait times */}
          {(activeLayers.has('queue')||activeLayers.has('ai'))&&GATES.map(g=>{
            const[x,y]=p2c(WR+28,g.a);const w=g.l==='N'?'14m':g.l==='E'?'8m':'4m';const bad=g.l==='N';
            return<g key={`q${g.l}`} className="pointer-events-none">
              <rect x={x-20} y={y-7} width="40" height="14" rx="7" fill={bad?'#ef4444':'#22c55e'} fillOpacity="0.08" stroke={bad?'#ef4444':'#22c55e'} strokeWidth="0.6" strokeOpacity="0.35"/>
              <text x={x} y={y+3} fill={bad?'#f87171':'#4ade80'} fontSize="7" fontWeight="700" textAnchor="middle">{g.l}·{w}</text>
            </g>;
          })}

          {/* POIs */}
          {POIS.map(poi => {
            let vis=true,hi=false,ic="#6b7f96",bg="rgba(107,127,150,0.04)",bc="rgba(107,127,150,0.1)";
            if(poi.type==='Medical'){vis=!activeLayers.size||activeLayers.has('medical');if(activeLayers.has('medical')){hi=true;ic="#ef4444";bg="rgba(239,68,68,0.06)";bc="rgba(239,68,68,0.2)";}}
            else if(['Metro','Bus','Taxi','Parking'].includes(poi.type)){vis=!activeLayers.size;}
            else{vis=!activeLayers.size||activeLayers.has('crowd')||activeLayers.has('queue')||activeLayers.has('ai');}
            if(!vis&&activeLayers.size>0)return null;
            return<g key={poi.id} transform={`translate(${poi.x},${poi.y})`} className="cursor-pointer">
              {hi&&<circle cx="0" cy="0" r={12} fill={bg} className="animate-[pulse_2s_ease-in-out_infinite]" opacity="0.3"/>}
              <circle cx="0" cy="0" r={hi?8:5} fill={bg} stroke={bc} strokeWidth={hi?0.8:0.4}/>
              <text x="0" y={hi?14:10} fill={ic} fontSize="5" fontWeight="600" textAnchor="middle" opacity={hi?0.8:0.3}>{poi.label}</text>
              <foreignObject x={hi?-4:-2.5} y={hi?-4:-2.5} width={hi?8:5} height={hi?8:5} style={{pointerEvents:'none'}}>
                <div style={{color:ic,width:'100%',height:'100%'}}>{React.createElement(POI_ICONS[poi.type]||Map,{size:hi?8:5,strokeWidth:2})}</div>
              </foreignObject>
            </g>;
          })}
        </svg>
      </div>
    </div>
  );
});
export default StadiumCanvas;
