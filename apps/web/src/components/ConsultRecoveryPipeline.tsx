'use client';

import { useEffect, useRef } from 'react';

export default function ConsultRecoveryPipeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (s: string) => el.querySelector(s) as HTMLElement;
    const $$ = (s: string) => [...el.querySelectorAll(s)] as HTMLElement[];

    const cols = $('.crp-cols'), board = $('.crp-board');
    const srcJk = $('#src-jk'), dstJk = $('#dst-jk'), matchCard = $('#match-card'), matchBtn = $('#match-btn');
    const wires = $('#wires') as unknown as SVGSVGElement;
    const w1 = $('#wire1') as unknown as SVGPathElement, w2 = $('#wire2') as unknown as SVGPathElement;
    const w1d = $('#wire1d'), w2d = $('#wire2d'), pulse = $('#pulse');
    const colEls = $$('.col');
    const consultsLeft = [...colEls[0].querySelectorAll('.consult')] as HTMLElement[];
    const consultsRight = [...colEls[2].querySelectorAll('.consult')] as HTMLElement[];
    const mfields = $$('.mfield');
    let timers: number[] = [], rafs: number[] = [];
    const wait = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const center = (node: Element, side: 'left' | 'right') => {
      const r = node.getBoundingClientRect(), b = cols.getBoundingClientRect();
      return { x: (side === 'right' ? r.right : r.left) - b.left, y: r.top - b.top + r.height / 2 };
    };
    function drawWires() {
      const b = cols.getBoundingClientRect();
      wires.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
      const a = center(srcJk, 'right'), m1 = center(matchCard, 'left'), m2 = center(matchCard, 'right'), c = center(dstJk, 'left');
      const d1 = `M ${a.x} ${a.y} C ${a.x + (m1.x - a.x) * 0.5} ${a.y}, ${a.x + (m1.x - a.x) * 0.5} ${m1.y}, ${m1.x} ${m1.y}`;
      const d2 = `M ${m2.x} ${m2.y} C ${m2.x + (c.x - m2.x) * 0.5} ${m2.y}, ${m2.x + (c.x - m2.x) * 0.5} ${c.y}, ${c.x} ${c.y}`;
      w1.setAttribute('d', d1); w1d.setAttribute('d', d1); w2.setAttribute('d', d2); w2d.setAttribute('d', d2);
    }
    function setDraw(path: SVGPathElement) {
      const len = path.getTotalLength();
      path.style.transition = 'none'; path.style.strokeDasharray = String(len); path.style.strokeDashoffset = String(len);
      void path.getBBox(); path.style.transition = 'stroke-dashoffset .7s cubic-bezier(.22,1,.36,1)'; path.style.strokeDashoffset = '0';
    }
    function travel(path: SVGPathElement, dur: number) {
      let len: number; try { len = path.getTotalLength(); } catch { return; }
      const start = performance.now(); pulse.style.opacity = '1';
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1); const p = path.getPointAtLength(len * t);
        pulse.setAttribute('cx', String(p.x)); pulse.setAttribute('cy', String(p.y));
        if (t < 1) rafs.push(requestAnimationFrame(tick)); else pulse.style.opacity = '0';
      };
      rafs.push(requestAnimationFrame(tick));
    }
    function countTo(node: HTMLElement, target: number, dur: number) {
      const start = performance.now();
      const tick = (now: number) => { const t = Math.min((now - start) / dur, 1); node.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3)))); if (t < 1) rafs.push(requestAnimationFrame(tick)); };
      rafs.push(requestAnimationFrame(tick));
    }
    function reset() {
      timers.forEach(clearTimeout); rafs.forEach(cancelAnimationFrame); timers = []; rafs = [];
      [...consultsLeft, ...consultsRight].forEach(c => c.classList.remove('in', 'scanning'));
      dstJk.classList.remove('flip'); matchCard.classList.remove('lit'); matchBtn.classList.remove('in', 'flash');
      mfields.forEach(m => m.classList.remove('in'));
      [w1, w2].forEach(p => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
      [w1d, w2d].forEach(p => (p.style.opacity = '0')); pulse.style.opacity = '0';
      ($('#c-matched').textContent = '0'); ($('#c-routed').textContent = '0'); ($('#c-flagged').textContent = '0');
      ($('#dst-pill').style.opacity = '0'); ($('#dst-proc').style.opacity = '0');
    }
    function showEnd() {
      [...consultsLeft, ...consultsRight].forEach(c => c.classList.add('in'));
      drawWires(); [w1d, w2d].forEach(p => (p.style.opacity = '0.5'));
      matchCard.classList.add('lit'); matchBtn.classList.add('in'); mfields.forEach(m => m.classList.add('in')); dstJk.classList.add('flip');
      ($('#dst-pill').style.opacity = '1'); ($('#dst-proc').style.opacity = '1');
      ($('#c-matched').textContent = '3'); ($('#c-routed').textContent = '1'); ($('#c-flagged').textContent = '2');
    }
    function play() {
      reset();
      if (reduce) { showEnd(); return; }
      const P = $('#dst-pill'), PR = $('#dst-proc'); P.style.transition = PR.style.transition = 'opacity .4s';
      consultsLeft.forEach((c, i) => wait(() => c.classList.add('in'), 120 * i));
      consultsRight.forEach((c, i) => wait(() => c.classList.add('in'), 200 + 120 * i));
      wait(() => { srcJk.classList.add('scanning'); dstJk.classList.add('scanning'); }, 900);
      wait(() => { srcJk.classList.remove('scanning'); dstJk.classList.remove('scanning'); }, 1900);
      wait(() => { drawWires(); w1d.style.opacity = '0.5'; setDraw(w1); travel(w1, 700); }, 1700);
      wait(() => matchCard.classList.add('lit'), 2150);
      mfields.forEach((m, i) => wait(() => m.classList.add('in'), 2250 + 150 * i));
      wait(() => matchBtn.classList.add('in'), 3050);
      wait(() => { matchBtn.classList.add('flash'); drawWires(); w2d.style.opacity = '0.5'; setDraw(w2); travel(w2, 700); }, 3300);
      wait(() => { dstJk.classList.add('flip'); P.style.opacity = '1'; PR.style.opacity = '1'; }, 4000);
      wait(() => matchBtn.classList.remove('flash'), 4400);
      wait(() => { countTo($('#c-matched'), 3, 800); countTo($('#c-routed'), 1, 800); countTo($('#c-flagged'), 2, 800); }, 4100);
    }

    let started = false;
    const kickoff = () => { if (started) return; started = true; wait(play, 200); };
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) kickoff(); }), { threshold: 0.15 });
    io.observe(board);
    const onResize = () => { if (started) drawWires(); };
    window.addEventListener('resize', onResize);
    const replay = $('#crp-replay'); const onReplay = () => { started = true; play(); }; replay.addEventListener('click', onReplay);
    const t = window.setTimeout(() => { const r = board.getBoundingClientRect(); if (r.top < window.innerHeight) kickoff(); }, 800);

    return () => { timers.forEach(clearTimeout); rafs.forEach(cancelAnimationFrame); clearTimeout(t); io.disconnect(); window.removeEventListener('resize', onResize); replay.removeEventListener('click', onReplay); };
  }, []);

  return (
    <section className="crp-section" ref={root}>
      <div className="crp-board">
        <div className="crp-head">
          <span className="crp-title"><span className="led" />Consult Recovery Pipeline</span>
          <span className="crp-flow"><b>Boulevard</b><span className="arr">→</span><b>Scrutexity</b><span className="arr">→</span><b>Mangomint</b></span>
        </div>

        <div className="crp-cols">
          <svg className="wires" id="wires">
            <defs><linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#b9825f" stopOpacity="0.25" /><stop offset="0.5" stopColor="#b9825f" /><stop offset="1" stopColor="#7f8f78" /></linearGradient></defs>
            <path id="wire1d" className="wire-dash" /><path id="wire2d" className="wire-dash" />
            <path id="wire1" className="wire" /><path id="wire2" className="wire" />
            <circle id="pulse" className="pulse-dot" r="5" />
          </svg>

          {/* LEFT — Boulevard */}
          <div className="col">
            <div className="col-head"><div className="col-name">Boulevard<small>NYC · Flatiron</small></div><span className="src-tag">Source A</span></div>
            <div className="col-rule" />
            <div className="consult missed focus" id="src-jk"><div className="scan" /><div className="ln1"><span className="time">10:15 AM</span><span className="pill missed">Missed</span></div><div className="ln2"><span className="pat">Patient: <b>J.K.</b></span><span className="proc">Morpheus8…</span></div></div>
            <div className="consult missed"><div className="ln1"><span className="time">11:45 AM</span><span className="pill missed">Missed</span></div><div className="ln2"><span className="pat">Patient: <b>A.L.</b></span><span className="proc">Morpheus8…</span></div></div>
            <div className="consult missed"><div className="ln1"><span className="time">02:30 PM</span><span className="pill missed">Missed</span></div><div className="ln2"><span className="pat">Patient: <b>M.R.</b></span><span className="proc">Morpheus8…</span></div></div>
            <div className="col-foot warn"><span className="d" />Missed inquiries detected</div>
          </div>

          {/* MIDDLE — Scrutexity Layer */}
          <div className="col">
            <div className="layer-head">
              <div className="layer-title"><span className="shield"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>Scrutexity Layer</div>
              <span className="verified-chip"><span className="d" />Active</span>
            </div>
            <div className="matched" id="match-card">
              <div className="matched-label">Matched Record</div>
              <div className="mfield"><span className="k">Patient</span><span className="v acc">J. Kennedy</span></div>
              <div className="mfield"><span className="k">Source</span><span className="v">Boulevard / Mangomint</span></div>
              <div className="mfield"><span className="k">Intent</span><span className="v">Morpheus8 Consult</span></div>
              <div className="mfield"><span className="k">Status</span><span className="v"><span className="vrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>NP Assigned</span></span></div>
              <div className="mfield"><span className="k">Escalation</span><span className="v"><span className="vrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Clinically Routed</span></span></div>
            </div>
            <div className="match-btn" id="match-btn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>Inquiry matched and routed</div>
          </div>

          {/* RIGHT — Mangomint */}
          <div className="col">
            <div className="col-head"><div className="col-name">Mangomint<small>NYC · SoHo</small></div><span className="src-tag">Source B</span></div>
            <div className="col-rule" />
            <div className="consult routed-card focus" id="dst-jk"><div className="scan" /><div className="ln1"><span className="time">10:22 AM</span><span className="pill routed" id="dst-pill" style={{opacity:0}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Routed</span></div><div className="ln2"><span className="pat">Patient: <b>J.K.</b></span><span className="proc ok" id="dst-proc" style={{opacity:0}}>Matched ✓</span></div></div>
            <div className="consult missed"><div className="ln1"><span className="time">04:10 PM</span><span className="pill missed">Missed</span></div><div className="ln2"><span className="pat">Patient: <b>S.M.</b></span><span className="proc">Botox follow-up…</span></div></div>
            <div className="col-foot ok"><span className="d" />Matching active</div>
          </div>
        </div>

        <div className="crp-foot">
          <span className="trail-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>Consult Trail</span>
          <span className="trail-stat"><b id="c-matched">0</b> consults matched</span><span className="trail-sep" />
          <span className="trail-stat"><b id="c-routed">0</b> routed to NP</span><span className="trail-sep" />
          <span className="trail-stat"><b id="c-flagged">0</b> flagged for recovery</span>
          <span className="trail-demo">Demo — not a live deployment · Illustrative</span>
        </div>
      </div>

      <div className="crp-fine">
        <span>Operational verification only. Not legal or medical advice. Multi-EMR comparison subject to individual practice setup. Illustrative composite.</span>
        <button className="replay" id="crp-replay" type="button"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>Replay</button>
      </div>

      <style jsx>{`
        .crp-section { position: relative; overflow: hidden; padding: clamp(40px,5vw,72px) clamp(16px,4vw,56px); background: radial-gradient(120% 80% at 80% -10%, rgba(216,177,122,0.12), transparent 46%), linear-gradient(165deg,#fbf7ef 0%,#f5ede1 55%,#efe6d7 100%); }
        .crp-section::before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: url('/noise.png'); background-size: 220px; opacity: 0.05; }
        .crp-board { position: relative; max-width: 1180px; margin: 0 auto; background: rgba(255,250,242,0.72); border: 1px solid rgba(225,212,197,0.8); border-radius: 28px; box-shadow: 0 28px 90px rgba(85,62,41,0.09), inset 0 1px 0 rgba(255,255,255,0.72); backdrop-filter: blur(20px); overflow: hidden; }
        .crp-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 20px 28px; border-bottom: 1px solid #e1d4c5; background: linear-gradient(180deg,rgba(244,236,223,0.6),transparent); }
        .crp-title { display: inline-flex; align-items: center; gap: 12px; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 13px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #221f1b; }
        .crp-title .led { position: relative; width: 9px; height: 9px; border-radius: 50%; background: #b9825f; }
        .crp-title .led::after { content: ''; position: absolute; inset: -5px; border-radius: 50%; border: 1.5px solid #b9825f; opacity: .4; animation: crp-ripple 2.4s ease-out infinite; }
        @keyframes crp-ripple { 0% { transform: scale(0.7); opacity: .5; } 100% { transform: scale(1.8); opacity: 0; } }
        .crp-flow { display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 12px; letter-spacing: 0.04em; color: #857a6e; }
        .crp-flow b { color: #9b6a51; font-weight: 600; } .crp-flow .arr { color: #d8b17a; }
        .crp-cols { position: relative; display: grid; grid-template-columns: 1fr 1.12fr 1fr; gap: clamp(14px,2.2vw,30px); padding: clamp(20px,3vw,34px); }
        .col-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
        .col-name { font-family: var(--font-display,'Instrument Serif',Georgia,serif); font-size: 23px; line-height: 1.05; letter-spacing: -0.01em; color: #221f1b; }
        .col-name small { display: block; font-family: var(--font-satoshi,'Satoshi',system-ui,sans-serif); font-size: 12px; letter-spacing: 0.02em; color: #857a6e; margin-top: 3px; }
        .src-tag { flex: none; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 9px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6b6259; background: #f4ecdf; border: 1px solid #e1d4c5; padding: 6px 11px; border-radius: 100px; text-align: center; line-height: 1.3; }
        .col-rule { height: 1px; background: #e1d4c5; margin: 16px 0 18px; }
        .consult { position: relative; border: 1px solid #e1d4c5; border-radius: 16px; background: #fffaf2; padding: 15px 16px; margin-bottom: 12px; opacity: 0; transform: translateY(12px); transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .4s; }
        .consult.in { opacity: 1; transform: none; }
        .consult.missed { background: linear-gradient(180deg,rgba(107,29,47,0.045),rgba(255,250,242,0.4)); }
        .consult .ln1 { display: flex; align-items: center; gap: 10px; }
        .consult .time { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 14px; font-weight: 600; letter-spacing: -0.01em; color: #221f1b; }
        .pill { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 9px; border-radius: 100px; display: inline-flex; align-items: center; gap: 5px; }
        .pill.missed { color: #6b1d2f; background: rgba(107,29,47,0.09); }
        .pill.routed { color: #3b6d44; background: rgba(127,143,120,0.16); }
        .consult .ln2 { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-top: 9px; }
        .consult .pat { font-family: var(--font-satoshi,'Satoshi',system-ui,sans-serif); font-size: 13px; letter-spacing: -0.01em; color: #6b6259; }
        .consult .pat b { color: #221f1b; font-weight: 600; }
        .consult .proc { font-family: var(--font-satoshi,'Satoshi',system-ui,sans-serif); font-size: 12px; color: #857a6e; }
        .consult .proc.ok { color: #3b6d44; font-weight: 600; }
        .consult.focus { border-color: #b9825f; box-shadow: 0 0 0 3px rgba(185,130,95,0.12), 0 22px 70px rgba(85,62,41,0.08); }
        .consult.flip { border-color: rgba(127,143,120,0.5); background: linear-gradient(180deg,rgba(127,143,120,0.1),rgba(255,250,242,0.5)); }
        .consult .scan { position: absolute; inset: 0; border-radius: 16px; overflow: hidden; pointer-events: none; opacity: 0; }
        .consult.scanning .scan { opacity: 1; }
        .consult .scan::after { content: ''; position: absolute; top: 0; bottom: 0; width: 40%; left: -40%; background: linear-gradient(100deg,transparent,rgba(185,130,95,0.28),transparent); animation: crp-sweep 1s cubic-bezier(.22,1,.36,1); }
        @keyframes crp-sweep { to { left: 110%; } }
        .col-foot { margin-top: 6px; padding-top: 16px; border-top: 1px solid #e1d4c5; display: flex; align-items: center; gap: 9px; font-family: var(--font-satoshi,'Satoshi',system-ui,sans-serif); font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
        .col-foot .d { width: 8px; height: 8px; border-radius: 50%; }
        .col-foot.warn { color: #9b6a51; } .col-foot.warn .d { background: #b9825f; }
        .col-foot.ok { color: #3b6d44; } .col-foot.ok .d { background: #7f8f78; animation: crp-pulse 2s ease-in-out infinite; }
        @keyframes crp-pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
        .layer-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .layer-title { display: flex; align-items: center; gap: 11px; font-family: var(--font-display,'Instrument Serif',Georgia,serif); font-size: 25px; letter-spacing: -0.01em; color: #221f1b; }
        .layer-title .shield { width: 30px; height: 30px; border-radius: 9px; background: #f4ecdf; border: 1px solid #e1d4c5; display: flex; align-items: center; justify-content: center; color: #b9825f; }
        .verified-chip { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #3b6d44; background: rgba(127,143,120,0.16); border: 1px solid rgba(127,143,120,0.3); padding: 6px 12px; border-radius: 100px; display: inline-flex; align-items: center; gap: 7px; }
        .verified-chip .d { width: 7px; height: 7px; border-radius: 50%; background: #7f8f78; }
        .matched { margin-top: 18px; border: 1px solid #e1d4c5; border-radius: 18px; background: rgba(255,250,242,0.7); padding: 22px; position: relative; overflow: hidden; box-shadow: 0 22px 70px rgba(85,62,41,0.08); }
        .matched::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg,#b9825f,#d8b17a); opacity: 0; transition: opacity .5s; }
        .matched.lit::before { opacity: 1; }
        .matched-label { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 10px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #9b6a51; margin-bottom: 16px; }
        .mfield { display: grid; grid-template-columns: 96px 1fr; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(225,212,197,0.5); opacity: 0; transform: translateY(6px); transition: opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1); }
        .mfield.in { opacity: 1; transform: none; } .mfield:last-child { border-bottom: none; }
        .mfield .k { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #857a6e; padding-top: 2px; }
        .mfield .v { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 14px; letter-spacing: -0.01em; color: #221f1b; }
        .mfield .v.acc { color: #9b6a51; }
        .mfield .v .vrow { display: inline-flex; align-items: center; gap: 7px; } .mfield .v :global(svg) { color: #3b6d44; }
        .match-btn { margin-top: 18px; width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 11px; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9b6a51; background: linear-gradient(120deg,rgba(243,234,223,0.95),rgba(255,250,242,0.7)); border: 1px solid rgba(185,130,95,0.18); border-radius: 14px; padding: 16px; cursor: default; opacity: 0; transform: translateY(8px); transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1), box-shadow .4s; }
        .match-btn.in { opacity: 1; transform: none; }
        .match-btn.flash { box-shadow: 0 0 0 4px rgba(185,130,95,0.14), 0 12px 30px -12px rgba(185,130,95,0.5); }
        .match-btn :global(svg) { color: #b9825f; }
        .wires { position: absolute; inset: 0; pointer-events: none; z-index: 4; overflow: visible; }
        .wires :global(.wire) { fill: none; stroke: url(#wireGrad); stroke-width: 2.5; stroke-linecap: round; }
        .wires :global(.wire-dash) { fill: none; stroke: #d8b17a; stroke-width: 1.5; stroke-dasharray: 3 6; opacity: 0; }
        .wires :global(.pulse-dot) { fill: #b9825f; filter: drop-shadow(0 0 6px rgba(185,130,95,0.7)); opacity: 0; }
        .crp-foot { display: flex; align-items: center; gap: clamp(12px,2vw,28px); flex-wrap: wrap; padding: 18px 28px; border-top: 1px solid #e1d4c5; background: rgba(244,236,223,0.5); }
        .trail-title { display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #221f1b; }
        .trail-title :global(svg) { color: #3b6d44; }
        .trail-stat { font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 12px; letter-spacing: 0.02em; color: #6b6259; }
        .trail-stat b { color: #9b6a51; font-weight: 600; }
        .trail-sep { width: 4px; height: 4px; border-radius: 50%; background: #d8b17a; }
        .trail-demo { margin-left: auto; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 11px; letter-spacing: 0.04em; color: #857a6e; }
        .crp-fine { max-width: 1180px; margin: 14px auto 0; padding: 0 6px; font-family: var(--font-satoshi,'Satoshi',system-ui,sans-serif); font-size: 11.5px; line-height: 1.5; color: #857a6e; display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .replay { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono,'JetBrains Mono',monospace); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #9b6a51; background: none; border: none; cursor: pointer; padding: 0; }
        .replay :global(svg) { transition: transform .5s cubic-bezier(.22,1,.36,1); } .replay:hover :global(svg) { transform: rotate(-180deg); }
        @media (max-width: 900px) { .crp-cols { grid-template-columns: 1fr; gap: 22px; } .wires { display: none; } }
        @media (prefers-reduced-motion: reduce) { .consult, .mfield, .match-btn { opacity: 1 !important; transform: none !important; } .crp-title .led::after, .col-foot.ok .d { animation: none; } }
      `}</style>
    </section>
  );
}
