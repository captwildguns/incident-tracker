import { useState } from 'react';
import {
  Search, Camera, MapPin, Check, ChevronLeft, ChevronRight,
  AlertTriangle, MessageSquare, FileText, Map, ClipboardCheck, Timer, LogOut, Flashlight,
} from 'lucide-react';
import tylerLogo from '../../assets/tyler-logo.png';

/* ============================================================
   Tyler Drive — working driver tablet mockup
   Visual language extracted from tyler-drive-maui:
   black content screens, large white text, white app bar,
   lowercase gradient buttons (blue=primary, green=continue,
   orange=back/clear), cyan selection highlight, 5px radius.
   ============================================================ */

interface TabletViewProps {
  onExit: () => void; // tapping the Tyler logo returns to desktop view
}

// ---- design tokens ----
const C = {
  black: '#000000',
  blueGrad: 'linear-gradient(to top,#29448F,#364E96 55%,#586CA7)',
  greenGrad: 'linear-gradient(to top,#117922,#1E8431 55%,#469F5A)',
  orangeGrad: 'linear-gradient(to top,#E0801A,#F2A33E)',
  grey: '#C2C2C2',
  stroke: '#959595',
  cyanSel: '#B3FFFF',
  flatGreen: '#3FB152',
  red: '#D83333',
  redDark: '#840A00',
  tylerBlue: '#3f5fa5',
  tylerOlive: '#8a9b4e',
  run: '#00BFD8',
};

const ROSTER = [
  { id: 'STU-3421', name: 'Marcus Johnson', grade: '10th', seat: 14, color: '#b91c1c', initials: 'MJ' },
  { id: 'STU-1045', name: 'Ethan Lee', grade: '9th', seat: 15, color: '#1d4ed8', initials: 'EL' },
  { id: 'STU-5623', name: 'Olivia Davis', grade: '11th', seat: 9, color: '#7c3aed', initials: 'OD' },
  { id: 'STU-4782', name: 'James Thompson', grade: '9th', seat: 22, color: '#0f766e', initials: 'JT' },
  { id: 'STU-6891', name: 'Noah Wilson', grade: '7th', seat: 6, color: '#b45309', initials: 'NW' },
];

const TYPES = [
  { label: 'Physical Altercation', desc: 'shoving, hitting, fighting', def: 'high' },
  { label: 'Disruptive Behavior', desc: 'language, noise, defiance, bullying', def: 'medium' },
  { label: 'Safety Violation', desc: 'seatbelt, standing, window, exit', def: 'medium' },
  { label: 'Property Damage', desc: 'vandalism, bus or personal property', def: 'medium' },
  { label: 'Weapon / Prohibited Items', desc: 'contact dispatch immediately', def: 'critical' },
];

const ROLES = ['instigator', 'participant', 'victim', 'bystander'] as const;
const SEVS = ['low', 'medium', 'high', 'critical'] as const;
const sevColor: Record<string, string> = { low: '#3a5a3f', medium: '#7a5a1e', high: '#CC504F', critical: C.redDark };

const SEED_INCIDENTS = [
  { id: 'INC-2025-0059', title: 'Brianna Cooper +2 · Physical Altercation', sub: 'Bus 8 · Mar 1 · with safety coordinator', status: 'review', students: [] as any[], driverDesc: '', type: 'Physical Altercation' },
  { id: 'INC-2025-0051', title: 'Natalie Collins · Disruptive Behavior', sub: 'Bus 8 · Mar 9 · awaiting your note', status: 'action', students: [], driverDesc: '', type: 'Disruptive Behavior' },
  { id: 'INC-2025-0042', title: 'Dylan Bell · Safety Violation', sub: 'Bus 8 · Feb 18 · resolved & closed', status: 'closed', students: [], driverDesc: '', type: 'Safety Violation' },
];

type PerStudent = { role: string; severity: string; statement: string };

// "Where it stands" — status flow shown on the incident detail, keyed to status.
const STATUS_FLOW: Record<string, { t: string; sub: string; state: string }[]> = {
  open: [
    { t: 'Reported by driver', sub: 'you · 3:56 PM', state: 'done' },
    { t: 'With safety coordinator', sub: 'S. Williams · reviewing now', state: 'now' },
    { t: 'Parents notified', sub: 'pending', state: '' },
    { t: 'Resolved & closed', sub: 'pending', state: '' },
  ],
  action: [
    { t: 'Reported by driver', sub: 'you · 3:56 PM', state: 'done' },
    { t: 'With safety coordinator', sub: 'awaiting your follow-up note', state: 'now' },
    { t: 'Parents notified', sub: 'pending', state: '' },
    { t: 'Resolved & closed', sub: 'pending', state: '' },
  ],
  review: [
    { t: 'Reported by driver', sub: 'you', state: 'done' },
    { t: 'Safety coordinator review', sub: 'S. Williams', state: 'done' },
    { t: 'Parents notified', sub: 'in progress', state: 'now' },
    { t: 'Resolved & closed', sub: 'pending', state: '' },
  ],
  closed: [
    { t: 'Reported by driver', sub: 'you', state: 'done' },
    { t: 'Safety coordinator review', sub: 'S. Williams', state: 'done' },
    { t: 'Parents notified', sub: 'both parents contacted', state: 'done' },
    { t: 'Resolved & closed', sub: 'no further action needed', state: 'done' },
  ],
};

// Per-incident message threads, written to match each incident's status/detail.
const COORD = 'S. Williams · Safety Coordinator';
const DEFAULT_THREADS: Record<string, any[]> = {
  // Just filed from the tablet — open
  'INC-2025-0064': [
    { me: true, text: 'Reported the back-row altercation — Marcus & Ethan. Photo attached. Both held at school for pickup.', t: '3:56 PM' },
    { me: false, who: COORD, text: 'Got it, thanks Gabe. Did either student report an injury?', t: '3:58 PM' },
    { me: true, text: 'No injuries. Ethan said his shoulder was fine, declined the nurse.', t: '3:59 PM' },
    { me: false, who: COORD, text: "Perfect. I'm contacting both parents now. I'll take it from here.", t: '4:01 PM' },
  ],
  // Brianna Cooper +2 — in review
  'INC-2025-0059': [
    { me: true, text: 'Filed the back-row altercation involving Brianna and two other students from the Mar 1 run.', t: 'Mar 1 · 4:10 PM' },
    { me: false, who: COORD, text: "Thanks Gabe. I've reviewed it and I'm notifying all three families now. Disciplinary review is in progress.", t: 'Mar 1 · 4:40 PM' },
    { me: true, text: 'Understood — let me know if you need anything else from me.', t: 'Mar 1 · 4:42 PM' },
    { me: false, who: COORD, text: "Will do. This one is still in review on my end — I'll update you when it's resolved.", t: 'Mar 2 · 8:15 AM' },
  ],
  // Natalie Collins — ACTION NEEDED: awaiting the driver's follow-up note
  'INC-2025-0051': [
    { me: false, who: COORD, text: "Gabe, I'm working the Natalie Collins incident from the 9th. Before I can contact her parent, can you add a quick note on exactly what she said when you spoke with her?", t: 'Mar 9 · 3:30 PM' },
    { me: false, who: COORD, text: "Following up — I still need your follow-up note on this one when you get a chance. It's holding up the parent call.", t: 'Mar 10 · 9:05 AM' },
  ],
  // Dylan Bell — resolved & closed
  'INC-2025-0042': [
    { me: true, text: 'Reported Dylan standing up while the bus was moving on the Feb 18 run.', t: 'Feb 18 · 3:20 PM' },
    { me: false, who: COORD, text: 'Thanks. I spoke with Dylan and the parent and reinforced the stay-seated rule. Closing this out — no further action needed.', t: 'Feb 18 · 5:00 PM' },
    { me: true, text: '👍 understood', t: 'Feb 18 · 5:02 PM' },
  ],
};

export function TabletView({ onExit }: TabletViewProps) {
  const [screen, setScreen] = useState<'home' | 'report' | 'list' | 'detail' | 'messages'>('home');
  const [step, setStep] = useState(1); // report wizard 1..7 (7 = confirmation)
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [severity, setSeverity] = useState('');
  const [per, setPer] = useState<Record<string, PerStudent>>({});
  const [stmtIdx, setStmtIdx] = useState(0);
  const [driverDesc, setDriverDesc] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [incidents, setIncidents] = useState<any[]>(SEED_INCIDENTS);
  const [active, setActive] = useState<any>(SEED_INCIDENTS[0]);
  const [submittedId, setSubmittedId] = useState('');

  const selStudents = ROSTER.filter(s => selected.includes(s.id));

  // ---------- flow helpers ----------
  const resetReport = () => {
    setStep(1); setSelected([]); setSearch(''); setType(''); setSeverity('');
    setPer({}); setStmtIdx(0); setDriverDesc(''); setHasPhoto(false); setPinned(false); setSubmittedId('');
  };
  const startReport = () => { resetReport(); setScreen('report'); };

  const toggleStudent = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const goStep2to3 = () => {
    // initialize per-student records when leaving roles entry the first time
    const next: Record<string, PerStudent> = { ...per };
    selected.forEach(id => { if (!next[id]) next[id] = { role: 'participant', severity: 'shared', statement: '' }; });
    Object.keys(next).forEach(id => { if (!selected.includes(id)) delete next[id]; });
    setPer(next);
  };

  const setRole = (id: string, role: string) => setPer(p => ({ ...p, [id]: { ...p[id], role } }));
  const setSev = (id: string, sv: string) => setPer(p => ({ ...p, [id]: { ...p[id], severity: sv } }));
  const setStmt = (id: string, v: string) => setPer(p => ({ ...p, [id]: { ...p[id], statement: v } }));

  const submit = () => {
    const maxNum = incidents.reduce((m, i) => Math.max(m, parseInt(String(i.id).split('-')[2] || '0', 10) || 0), 63);
    const id = `INC-2025-${String(maxNum + 1).padStart(4, '0')}`;
    const first = selStudents[0];
    const rec = {
      id,
      title: `${first?.name}${selStudents.length > 1 ? ` +${selStudents.length - 1}` : ''} · ${type}`,
      sub: `Bus 8 · today · you reported this`,
      status: 'open',
      type,
      severity,
      driverDesc,
      hasPhoto, pinned,
      students: selStudents.map(s => ({ ...s, ...per[s.id], severity: per[s.id]?.severity === 'shared' ? severity : per[s.id]?.severity })),
    };
    setIncidents(prev => [rec, ...prev]);
    setSubmittedId(id);
    setActive(rec);
    setStep(7);
  };

  // ============================================================
  //  CHROME
  // ============================================================
  const AppBar = ({ ctx, home }: { ctx?: React.ReactNode; home?: boolean }) => (
    <div style={st.appbar}>
      {/* Real Tyler Technologies logo — tap to return to desktop view */}
      <button onClick={onExit} title="Back to desktop view" style={st.logoBtn}>
        <img src={tylerLogo} alt="Tyler Technologies" style={{ height: 44, display: 'block' }} />
      </button>
      {home ? (
        <div style={st.welcome}>Welcome to Tyler Drive, <b>Gabe Guzman</b></div>
      ) : (
        <>
          <div style={st.ctx}>{ctx}</div>
          <div style={st.driver}><b style={{ color: '#222' }}>G. Guzman</b><br />Bus 8</div>
        </>
      )}
    </div>
  );

  const Footer = ({ children }: { children: React.ReactNode }) => (
    <div style={st.footbar}>{children}</div>
  );

  const Btn = ({ kind, children, onClick, disabled, wide }: any) => {
    const bg = kind === 'green' ? C.greenGrad : kind === 'orange' ? C.orangeGrad : kind === 'grey' ? C.grey : C.blueGrad;
    return (
      <button onClick={disabled ? undefined : onClick} disabled={disabled}
        style={{
          ...st.btn,
          background: bg, // shorthand — overrides Tailwind preflight's background-image reset on <button>
          color: kind === 'grey' ? '#2a2a2a' : '#fff',
          minWidth: wide ? 260 : 120, opacity: disabled ? 0.45 : 1,
          cursor: disabled ? 'default' : 'pointer',
        }}>
        {children}
      </button>
    );
  };

  // ============================================================
  //  HOME
  // ============================================================
  const TILE_GRAD: Record<string, string> = {
    green: 'linear-gradient(to bottom,#4FA85C,#1E7B34)',
    purple: 'linear-gradient(to bottom,#6E5AAE,#463B86)',
    orange: 'linear-gradient(to bottom,#EFA24E,#D77E2A)',
    red: 'linear-gradient(to bottom,#C24A3E,#8E2820)',
  };
  const HomeTile = ({ color, icon, label, badge, onClick }: any) => (
    <button onClick={onClick} style={{ ...st.homeTile, backgroundImage: TILE_GRAD[color], cursor: onClick ? 'pointer' : 'default' }}>
      {badge ? <span style={st.badge}>{badge}</span> : null}
      <span style={st.homeTileLabel}>{label}</span>
      <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{icon}</span>
    </button>
  );

  const renderHome = () => (
    <>
      <AppBar home />
      <div style={st.homeBg}>
        <div style={st.tileRow}>
          <HomeTile color="green" icon={<Map size={64} strokeWidth={1.5} />} label="My Runs" />
          <HomeTile color="purple" icon={<ClipboardCheck size={64} strokeWidth={1.5} />} label="Inspections" />
          <HomeTile color="orange" icon={<Timer size={64} strokeWidth={1.5} />} label="Timekeeping" />
          <HomeTile color="red" icon={<AlertTriangle size={64} strokeWidth={1.5} />} label="Incidents" badge={1} onClick={() => setScreen('list')} />
        </div>
        <div style={st.homeBottom}>
          <button onClick={onExit} style={st.logoutBtn}><LogOut size={30} /> logout</button>
          <button style={st.flashBtn}><Flashlight size={30} /></button>
        </div>
      </div>
    </>
  );

  // ============================================================
  //  REPORT WIZARD
  // ============================================================
  const renderReport = () => {
    if (step === 7) return renderConfirm();
    return (
      <>
        <AppBar ctx={<><span style={st.runChip}>WOLF RD</span> Washington High PM · Bus 8</>} />
        <div style={st.screen}>
          {step === 1 && renderSelect()}
          {step === 2 && renderType()}
          {step === 3 && renderRoles()}
          {step === 4 && renderStatements()}
          {step === 5 && renderDescription()}
          {step === 6 && renderReview()}
        </div>
      </>
    );
  };

  // step 1 — select students
  const renderSelect = () => {
    const list = ROSTER.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));
    return (
      <>
        <div style={st.pad}>
          <div style={st.titleRow}><span style={st.title}>Report incident — involved students</span><span style={st.opt}>step 1 of 6</span></div>
          <div style={st.sub}>Select everyone involved. A linked record is created for each student.</div>
          <div style={st.search}>
            <Search size={22} color="#7c8aa0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="search this run by name or ID…" style={st.searchInput} />
          </div>
          <div style={st.list}>
            {list.map(s => {
              const on = selected.includes(s.id);
              return (
                <button key={s.id} onClick={() => toggleStudent(s.id)} style={{ ...st.row, background: on ? C.cyanSel : '#fff', borderColor: on ? '#3a9aa8' : '#cfcfcf' }}>
                  <span style={{ ...st.chk, background: on ? '#1E8431' : 'transparent', borderColor: on ? '#1E8431' : '#8a8a8a', color: '#fff' }}>{on ? <Check size={20} strokeWidth={3} /> : null}</span>
                  <span style={{ ...st.av, background: s.color }}>{s.initials}</span>
                  <span style={st.rowName}>{s.name}</span>
                  <span style={st.rowMeta}>{s.id} · {s.grade} · Seat {s.seat}</span>
                </button>
              );
            })}
          </div>
        </div>
        <Footer>
          <Btn kind="orange" onClick={() => setScreen('home')}>back</Btn>
          <Btn kind="orange" onClick={() => setSelected([])}>clear</Btn>
          <Btn kind="green" disabled={selected.length === 0} onClick={() => { goStep2to3(); setStep(2); }}>
            continue{selected.length ? ` · ${selected.length} selected` : ''}
          </Btn>
        </Footer>
      </>
    );
  };

  // step 2 — type + severity
  const renderType = () => (
    <>
      <div style={st.pad}>
        <div style={st.titleRow}><span style={st.title}>Incident type</span><span style={st.opt}>step 2 of 6</span></div>
        <div style={st.list}>
          {TYPES.map(t => {
            const on = type === t.label;
            return (
              <button key={t.label} onClick={() => { setType(t.label); setSeverity(t.def); }} style={{ ...st.row, background: on ? C.cyanSel : '#fff', borderColor: on ? '#3a9aa8' : '#cfcfcf' }}>
                <span style={{ ...st.chk, background: on ? '#1E8431' : 'transparent', borderColor: on ? '#1E8431' : '#8a8a8a', color: '#fff' }}>{on ? <Check size={20} strokeWidth={3} /> : null}</span>
                <span style={st.rowName}>{t.label}</span>
                <span style={st.rowMeta}>{t.desc}</span>
              </button>
            );
          })}
        </div>
        {type && (
          <>
            <div style={{ fontSize: 15, color: '#cbd5e1', margin: '14px 0 6px' }}>Severity <span style={{ color: '#8b97a8' }}>(auto-set from type — adjust if needed)</span></div>
            <div style={{ display: 'flex', gap: 12 }}>
              {SEVS.map(sv => (
                <button key={sv} onClick={() => setSeverity(sv)} style={{ ...st.sev, background: sevColor[sv], outline: severity === sv ? '3px solid #fff' : 'none', outlineOffset: 1 }}>{sv}</button>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer>
        <Btn kind="orange" onClick={() => setStep(1)}>back</Btn>
        <Btn kind="orange" onClick={() => { setType(''); setSeverity(''); }}>clear</Btn>
        <Btn kind="green" disabled={!type} onClick={() => setStep(3)}>continue</Btn>
      </Footer>
    </>
  );

  // step 3 — per-student roles
  const renderRoles = () => (
    <>
      <div style={st.pad}>
        <div style={st.titleRow}><span style={st.title}>Role of each student</span><span style={st.opt}>step 3 of 6</span></div>
        <div style={st.sub}>{type} · {selStudents.length} linked record{selStudents.length !== 1 ? 's' : ''}</div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {selStudents.map(s => {
            const d = per[s.id];
            return (
              <div key={s.id} style={st.pcard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <span style={{ ...st.av, width: 48, height: 48, background: s.color, fontSize: 19 }}>{s.initials}</span>
                  <div><div style={{ fontSize: 23, fontWeight: 600 }}>{s.name}</div><div style={{ fontSize: 15, color: '#9aa6b6' }}>{s.id} · {s.grade} Grade</div></div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {ROLES.map(r => {
                    const on = d?.role === r;
                    const tint = r === 'instigator' ? '#ffd0d0' : r === 'victim' ? '#cfe0ff' : '#fff';
                    const tcol = r === 'instigator' ? '#7a1010' : r === 'victim' ? '#0b2a66' : '#13203a';
                    return (
                      <button key={r} onClick={() => setRole(s.id, r)} style={{ ...st.role, background: on ? tint : 'transparent', color: on ? tcol : '#cdd6e4', borderColor: on ? tint : '#46506a', fontWeight: on ? 600 : 400 }}>{r}</button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer>
        <Btn kind="orange" onClick={() => setStep(2)}>back</Btn>
        <Btn kind="green" onClick={() => { setStmtIdx(0); setStep(4); }}>continue</Btn>
      </Footer>
    </>
  );

  // step 4 — STUDENT STATEMENTS (one per student) — NEW capability
  const renderStatements = () => {
    const s = selStudents[stmtIdx];
    if (!s) return null;
    const d = per[s.id];
    const captured = selStudents.filter(x => (per[x.id]?.statement || '').trim()).length;
    return (
      <>
        <div style={st.pad}>
          <div style={st.titleRow}>
            <span style={st.title}>Student's account of what happened</span>
            <span style={st.opt}>step 4 of 6 · {captured}/{selStudents.length} captured · * optional</span>
          </div>
          <div style={st.sub}>Record this student's own description in their words. One statement per student.</div>

          {/* student switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0 14px' }}>
            <button onClick={() => setStmtIdx(i => Math.max(0, i - 1))} disabled={stmtIdx === 0} style={{ ...st.navIcon, opacity: stmtIdx === 0 ? 0.4 : 1 }}><ChevronLeft size={26} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, background: '#11161f', border: '1px solid #2a3342', borderRadius: 8, padding: '10px 16px' }}>
              <span style={{ ...st.av, width: 46, height: 46, background: s.color }}>{s.initials}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 23, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: 15, color: '#9aa6b6' }}>{s.id} · {d?.role} · student {stmtIdx + 1} of {selStudents.length}</div>
              </div>
            </div>
            <button onClick={() => setStmtIdx(i => Math.min(selStudents.length - 1, i + 1))} disabled={stmtIdx === selStudents.length - 1} style={{ ...st.navIcon, opacity: stmtIdx === selStudents.length - 1 ? 0.4 : 1 }}><ChevronRight size={26} /></button>
          </div>

          <div style={{ fontSize: 16, color: '#8b97a8', marginBottom: 6 }}>“In your own words, what happened?” — as told by {s.name.split(' ')[0]}</div>
          <textarea
            value={d?.statement || ''}
            onChange={e => setStmt(s.id, e.target.value)}
            placeholder={`Type ${s.name.split(' ')[0]}'s account of the incident…`}
            style={st.textarea}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            {selStudents.map((x, i) => (
              <button key={x.id} onClick={() => setStmtIdx(i)} style={{
                ...st.pill,
                background: i === stmtIdx ? '#fff' : (per[x.id]?.statement || '').trim() ? '#1E8431' : '#141a23',
                color: i === stmtIdx ? '#13203a' : '#cdd6e4',
                borderColor: i === stmtIdx ? '#fff' : '#38445a',
              }}>
                {(per[x.id]?.statement || '').trim() ? <Check size={15} strokeWidth={3} /> : null} {x.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
        <Footer>
          <Btn kind="orange" onClick={() => setStep(3)}>back</Btn>
          {stmtIdx < selStudents.length - 1
            ? <Btn kind="blue" onClick={() => setStmtIdx(i => i + 1)}>next student</Btn>
            : <Btn kind="green" onClick={() => setStep(5)}>continue</Btn>}
        </Footer>
      </>
    );
  };

  // step 5 — driver's overall description + evidence
  const renderDescription = () => (
    <>
      <div style={st.pad}>
        <div style={st.titleRow}><span style={st.title}>Your account & evidence</span><span style={st.opt}>step 5 of 6 · * optional</span></div>
        <div style={st.sub}>The driver's overall description of the incident.</div>
        <textarea value={driverDesc} onChange={e => setDriverDesc(e.target.value)} placeholder="Describe what you observed…" style={{ ...st.textarea, height: 160 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          <button onClick={() => setHasPhoto(true)} style={{ ...st.attach, color: hasPhoto ? '#bfe3c4' : '#aab4c6', borderColor: hasPhoto ? '#3FB152' : '#4a5670' }}>
            <Camera size={20} /> {hasPhoto ? 'photo added ✓' : 'take photo'}
          </button>
          <button onClick={() => setPinned(true)} style={{ ...st.attach, color: pinned ? '#bfe3c4' : '#aab4c6', borderColor: pinned ? '#3FB152' : '#4a5670' }}>
            <MapPin size={20} /> {pinned ? 'location pinned — Lot B ✓' : 'pin location'}
          </button>
        </div>
      </div>
      <Footer>
        <Btn kind="orange" onClick={() => setStep(4)}>back</Btn>
        <Btn kind="green" onClick={() => setStep(6)}>review</Btn>
      </Footer>
    </>
  );

  // step 6 — review & submit
  const renderReview = () => (
    <>
      <div style={st.pad}>
        <div style={st.titleRow}><span style={st.title}>Review & submit</span><span style={st.opt}>step 6 of 6</span></div>
        <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1 }}>
            <h4 style={st.sumH}>Incident</h4>
            <div style={st.sumLn}>{type} · <b style={{ color: '#ff9a8d' }}>{severity}</b></div>
            <div style={st.sumDim}>{selStudents.length} student{selStudents.length !== 1 ? 's' : ''} · {selStudents.length} linked record{selStudents.length !== 1 ? 's' : ''}</div>
            <h4 style={{ ...st.sumH, marginTop: 14 }}>Transportation</h4>
            <div style={st.sumLn}>Run: Washington High PM — Wolf Rd</div>
            <div style={st.sumLn}>Bus 8{pinned ? ' · Lot B (pinned)' : ''}</div>
            <div style={st.sumDim}>Reported by G. Guzman · today</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={st.sumH}>Captured</h4>
            <div style={st.sumList}>
              {selStudents.map(s => {
                const d = per[s.id];
                const hasStmt = (d?.statement || '').trim().length > 0;
                return (
                  <div key={s.id} style={st.sumItem}>
                    <b style={{ color: '#ffd479' }}>{s.name}</b> — {d?.role}
                    <span style={{ fontSize: 16, color: '#9aa6b6' }}> · {d?.severity === 'shared' ? severity : d?.severity}</span>
                    <div style={{ fontSize: 16, color: hasStmt ? '#bfe3c4' : '#8b97a8', marginTop: 2 }}>
                      {hasStmt ? '“' + (d!.statement.length > 60 ? d!.statement.slice(0, 60) + '…' : d!.statement) + '”' : 'no student statement'}
                    </div>
                  </div>
                );
              })}
              {driverDesc.trim() && <div style={st.sumItem}>Driver description <span style={{ fontSize: 16, color: '#9aa6b6' }}>· captured</span></div>}
              {hasPhoto && <div style={st.sumItem}>📷 Photo evidence <span style={{ fontSize: 16, color: '#9aa6b6' }}>· 1 file</span></div>}
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <Btn kind="orange" onClick={() => setStep(5)}>back</Btn>
        <Btn kind="green" wide onClick={submit}>submit incident</Btn>
      </Footer>
    </>
  );

  // step 7 — confirmation
  const renderConfirm = () => (
    <>
      <AppBar ctx={<><span style={st.runChip}>WOLF RD</span> Washington High PM · Bus 8</>} />
      <div style={st.screen}><div style={{ ...st.pad, alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 18, display: 'flex', flexDirection: 'column' }}>
        <div style={st.ring}><Check size={78} color={C.flatGreen} strokeWidth={2.5} /></div>
        <h2 style={{ fontSize: 38, margin: 0 }}>Incident submitted</h2>
        <p style={{ fontSize: 22, color: '#aeb9c9', margin: 0 }}>{selStudents.length} linked record{selStudents.length !== 1 ? 's' : ''} created · your safety coordinator has been notified</p>
        <div style={{ fontSize: 20, color: '#ffd479', fontFamily: 'monospace' }}>{submittedId}</div>
        <p style={{ fontSize: 18, color: '#8b97a8', margin: 0 }}>You can track it any time under “my incidents.”</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <Btn kind="grey" onClick={() => { resetReport(); setScreen('home'); }}>done</Btn>
          <Btn kind="blue" onClick={() => setScreen('detail')}>view incident</Btn>
        </div>
      </div></div>
    </>
  );

  // ============================================================
  //  MY INCIDENTS
  // ============================================================
  const [filter, setFilter] = useState('all');
  const statusMap: Record<string, { lbl: string; bg: string; fg: string }> = {
    open: { lbl: 'OPEN', bg: '#7a5a1e', fg: '#ffe6b0' },
    review: { lbl: 'IN REVIEW', bg: '#1d3a6b', fg: '#cfe0ff' },
    action: { lbl: 'ACTION NEEDED', bg: C.redDark, fg: '#ffd2cd' },
    closed: { lbl: 'CLOSED', bg: '#2f4030', fg: '#bfe3c4' },
  };
  const renderList = () => {
    const shown = incidents.filter(i =>
      filter === 'all' ? true : filter === 'open' ? (i.status === 'open' || i.status === 'action') : filter === 'review' ? i.status === 'review' : i.status === 'closed');
    return (
      <>
        <AppBar ctx="my incidents" />
        <div style={st.screen}><div style={st.pad}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 26, fontWeight: 500 }}>My Incidents</span>
            <Btn kind="green" onClick={startReport}>+ report incident</Btn>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            {['all', 'open', 'review', 'closed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ ...st.pill, background: filter === f ? '#fff' : '#141a23', color: filter === f ? '#13203a' : '#aab4c6', borderColor: filter === f ? '#fff' : '#38445a' }}>{f}</button>
            ))}
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {shown.map(i => {
              const s = statusMap[i.status];
              return (
                <button key={i.id} onClick={() => { setActive(i); setScreen('detail'); }} style={st.inc}>
                  <span style={st.incId}>{i.id}</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>
                    <span style={{ display: 'block', fontSize: 22, fontWeight: 600 }}>{i.title}</span>
                    <span style={{ display: 'block', fontSize: 15, color: '#9aa6b6' }}>{i.sub}</span>
                  </span>
                  <span style={{ ...st.stat, background: s.bg, color: s.fg }}>{s.lbl}</span>
                  <ChevronRight size={28} color="#5a6678" />
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 10 }}><Btn kind="orange" onClick={() => setScreen('home')}>back to home</Btn></div>
        </div></div>
      </>
    );
  };

  // ============================================================
  //  INCIDENT DETAIL (driver view + manage)
  // ============================================================
  const renderDetail = () => {
    const i = active || incidents[0];
    const s = statusMap[i.status] || statusMap.open;
    return (
      <>
        <AppBar ctx={i.id} />
        <div style={st.screen}>
          <div style={st.pad}>
            <div style={st.titleRow}><span style={{ ...st.title, fontSize: 26 }}>{i.title}</span><span style={{ ...st.stat, background: s.bg, color: s.fg, fontSize: 14 }}>{s.lbl}</span></div>
            <div style={{ display: 'flex', gap: 22, flex: 1, minHeight: 0 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
                <div style={st.panel}>
                  <h4 style={st.panelH}>Your report</h4>
                  <div style={st.kv}><span style={{ color: '#9aa6b6' }}>Reported</span> today · Bus 8{i.pinned ? ' · Lot B' : ''}</div>
                  {i.driverDesc ? <div style={st.kv}><span style={{ color: '#9aa6b6' }}>Description</span> {i.driverDesc}</div> : null}
                  {i.hasPhoto ? <div style={st.kv}><span style={{ color: '#9aa6b6' }}>Evidence</span> 1 photo{i.pinned ? ' · location pinned' : ''}</div> : null}
                </div>
                {/* involved students + their statements (the new capability surfaced) */}
                {i.students && i.students.length > 0 && (
                  <div style={st.panel}>
                    <h4 style={st.panelH}>Involved students & statements</h4>
                    {i.students.map((stu: any) => (
                      <div key={stu.id} style={{ padding: '8px 0', borderBottom: '1px solid #1c2430' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ ...st.av, width: 36, height: 36, fontSize: 15, background: stu.color || '#46506a' }}>{stu.initials || stu.name?.[0]}</span>
                          <span style={{ fontSize: 20, fontWeight: 600 }}>{stu.name}</span>
                          <span style={{ fontSize: 16, color: '#9aa6b6' }}>· {stu.role} · {stu.severity}</span>
                        </div>
                        <div style={{ fontSize: 18, color: stu.statement ? '#dbe4f0' : '#8b97a8', fontStyle: stu.statement ? 'italic' : 'normal', marginTop: 4, paddingLeft: 46 }}>
                          {stu.statement ? '“' + stu.statement + '”' : 'no student statement recorded'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ ...st.panel, flex: 1 }}>
                  <h4 style={st.panelH}>Where it stands</h4>
                  {(STATUS_FLOW[i.status] || STATUS_FLOW.open).map((x, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 12, padding: '8px 0' }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 3, border: '2px solid #46506a', background: x.state === 'done' ? C.flatGreen : x.state === 'now' ? '#586CA7' : 'transparent', borderColor: x.state === 'done' ? C.flatGreen : x.state === 'now' ? '#9ab4e6' : '#46506a', boxShadow: x.state === 'now' ? '0 0 0 4px rgba(88,108,167,.3)' : 'none' }} />
                      <span style={{ fontSize: 20, fontWeight: x.state === 'now' ? 700 : 400, color: x.state === 'now' ? '#bcd0f5' : '#fff' }}>{x.t}<small style={{ display: 'block', fontSize: 14, color: '#8b97a8', fontWeight: 400 }}>{x.sub}</small></span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: 290, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ ...st.panel, padding: '12px 14px' }}><h4 style={{ ...st.panelH, margin: 0 }}>You can</h4></div>
                <button style={{ ...st.act, backgroundImage: C.blueGrad }}><FileText size={24} /> add a note</button>
                <button style={{ ...st.act, backgroundImage: C.blueGrad }} onClick={() => setHasPhoto(true)}><Camera size={24} /> add a photo</button>
                <button style={{ ...st.act, backgroundImage: C.blueGrad }} onClick={() => setScreen('messages')}><MessageSquare size={24} /> message coordinator</button>
                <button style={{ ...st.act, background: '#11161f' }}><FileText size={24} /> view office response</button>
              </div>
            </div>
          </div>
          <Footer><Btn kind="orange" onClick={() => setScreen('list')}>back to my incidents</Btn></Footer>
        </div>
      </>
    );
  };

  // ============================================================
  //  MESSAGES
  // ============================================================
  const [threads, setThreads] = useState<Record<string, any[]>>(DEFAULT_THREADS);
  const [draft, setDraft] = useState('');
  const activeThread = (active && threads[active.id]) || [];
  const sendMsg = (text: string) => {
    if (!text.trim() || !active) return;
    setThreads(prev => ({ ...prev, [active.id]: [...(prev[active.id] || []), { me: true, text, t: 'now' }] }));
    setDraft('');
  };
  const renderMessages = () => (
    <>
      <AppBar ctx={`messages · ${active?.id || ''}`} />
      <div style={st.screen}><div style={st.pad}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', padding: '4px 2px' }}>
          {activeThread.map((m, i) => (
            <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '74%', padding: '13px 18px', borderRadius: 12, fontSize: 21, lineHeight: 1.4, color: m.me ? '#fff' : '#16202e', backgroundImage: m.me ? C.blueGrad : 'none', background: m.me ? undefined : '#fff', borderBottomRightRadius: m.me ? 3 : 12, borderBottomLeftRadius: m.me ? 12 : 3 }}>
              {m.who && <div style={{ fontSize: 14, color: '#8b97a8', marginBottom: 3 }}>{m.who}</div>}
              <div>{m.text}</div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>{m.t}{m.me ? ' ✓✓' : ''}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '10px 0' }}>
          {['👍 understood', 'no injuries', 'photo attached', 'will follow up'].map(c => (
            <button key={c} onClick={() => sendMsg(c)} style={{ ...st.pill, background: '#141a23', color: '#cdd6e4', borderColor: '#38445a' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMsg(draft); }} placeholder="type a reply…" style={{ flex: 1, background: '#dcdcdc', color: '#333', borderRadius: 22, padding: '13px 20px', fontSize: 20, border: 'none', outline: 'none' }} />
          <Btn kind="green" onClick={() => sendMsg(draft)}>send</Btn>
        </div>
      </div>
      <Footer><Btn kind="blue" onClick={() => setScreen('detail')}>close</Btn></Footer>
      </div>
    </>
  );

  // ---------- render ----------
  return (
    <div style={st.viewport}>
      <div style={st.device}>
        {screen === 'home' && renderHome()}
        {screen === 'report' && renderReport()}
        {screen === 'list' && renderList()}
        {screen === 'detail' && renderDetail()}
        {screen === 'messages' && renderMessages()}
      </div>
    </div>
  );
}

// ============================================================
//  STYLES
// ============================================================
const st: Record<string, React.CSSProperties> = {
  viewport: { position: 'fixed', inset: 0, background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, fontFamily: 'Roboto, "Segoe UI", system-ui, sans-serif' },
  device: { width: '100%', maxWidth: 1280, height: '100%', maxHeight: 800, background: '#000', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  appbar: { height: 72, flexShrink: 0, background: '#fff', borderBottom: '1px solid #E4E4E4', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 18 },
  logoBtn: { display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 8 },
  dots: { position: 'relative', width: 28, height: 28, display: 'inline-block' },
  dot: { position: 'absolute', width: 11, height: 11, borderRadius: '50%' },
  logoText: { fontWeight: 700, fontSize: 24, color: '#3f5fa5', letterSpacing: '-.5px' },
  ctx: { flex: 1, textAlign: 'center', color: '#4f4f4f', fontSize: 18 },
  runChip: { display: 'inline-block', background: '#00BFD8', color: '#04323a', fontWeight: 700, fontSize: 13, padding: '3px 12px', borderRadius: 14, marginRight: 8 },
  driver: { color: '#4f4f4f', fontSize: 15, textAlign: 'right', lineHeight: 1.25 },
  welcome: { flex: 1, textAlign: 'center', color: '#333', fontSize: 30, fontWeight: 400 },
  // home (matches Tyler Drive home screen)
  homeBg: { flex: 1, background: '#C2C2C2', display: 'flex', flexDirection: 'column', padding: '26px 30px', overflow: 'hidden' },
  tileRow: { flex: 1, display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center' },
  homeTile: { width: 240, height: 360, border: 'none', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', boxShadow: '0 3px 8px rgba(0,0,0,.28)', position: 'relative', paddingTop: 34 },
  homeTileLabel: { fontSize: 28, fontWeight: 700 },
  homeBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 22 },
  logoutBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, backgroundImage: 'linear-gradient(to bottom,#3A57A0,#28407C)', color: '#fff', border: 'none', borderRadius: 10, padding: '0 34px', height: 80, fontSize: 26, cursor: 'pointer', minWidth: 240, textTransform: 'lowercase' },
  flashBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'linear-gradient(to bottom,#3A57A0,#28407C)', color: '#fff', border: 'none', borderRadius: 10, width: 130, height: 80, cursor: 'pointer' },
  screen: { flex: 1, background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  pad: { flex: 1, padding: '18px 26px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 },
  titleRow: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 30, color: '#fff', fontWeight: 500 },
  opt: { fontSize: 17, color: '#cbd5e1' },
  sub: { fontSize: 16, color: '#9aa6b6', marginTop: -2, marginBottom: 10 },
  footbar: { flexShrink: 0, display: 'flex', justifyContent: 'center', gap: 18, padding: 14, background: '#000' },
  btn: { border: '1px solid #959595', borderRadius: 5, fontSize: 24, fontWeight: 500, padding: '12px 30px', textTransform: 'lowercase', textAlign: 'center' },
  // home
  runBanner: { background: '#11161f', border: '1px solid #2a3342', borderRadius: 8, padding: '14px 18px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 18 },
  ws: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, flex: 1 },
  tile: { border: '1px solid #959595', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#fff', position: 'relative' },
  badge: { position: 'absolute', top: 14, right: 16, background: '#D83333', color: '#fff', fontSize: 18, fontWeight: 700, minWidth: 34, height: 34, borderRadius: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' },
  // lists
  search: { display: 'flex', alignItems: 'center', gap: 12, background: '#1a212c', border: '1px solid #38445a', borderRadius: 6, padding: '12px 16px', marginBottom: 12 },
  searchInput: { flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 21 },
  list: { display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' },
  row: { display: 'flex', alignItems: 'center', gap: 16, color: '#212121', borderRadius: 4, padding: '14px 18px', border: '1px solid #cfcfcf', cursor: 'pointer', textAlign: 'left', width: '100%' },
  chk: { width: 30, height: 30, border: '3px solid #8a8a8a', borderRadius: 5, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  av: { width: 46, height: 46, borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, flexShrink: 0 },
  rowName: { fontSize: 25, fontWeight: 500, flex: 1 },
  rowMeta: { fontSize: 16, color: '#5a5a5a' },
  sev: { padding: '10px 22px', borderRadius: 6, fontSize: 21, fontWeight: 600, border: 'none', color: '#fff', cursor: 'pointer', textTransform: 'lowercase' },
  // per-student
  pcard: { background: '#11161f', border: '1px solid #2a3342', borderRadius: 8, padding: '14px 16px', marginBottom: 12 },
  role: { padding: '9px 18px', borderRadius: 6, border: '2px solid #46506a', fontSize: 19, color: '#cdd6e4', cursor: 'pointer', textTransform: 'lowercase' },
  navIcon: { width: 52, height: 52, borderRadius: 8, border: '1px solid #38445a', background: '#141a23', color: '#cdd6e4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },
  textarea: { width: '100%', background: '#dcdcdc', color: '#1a1a1a', borderRadius: 6, padding: 16, fontSize: 22, lineHeight: 1.4, height: 200, border: 'none', outline: 'none', resize: 'none', fontFamily: 'inherit' },
  pill: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 18, border: '1px solid #38445a', fontSize: 17, cursor: 'pointer', textTransform: 'lowercase' },
  attach: { display: 'flex', alignItems: 'center', gap: 10, border: '1px dashed #4a5670', borderRadius: 6, padding: '10px 18px', fontSize: 18, background: 'none', cursor: 'pointer' },
  // summary
  sumH: { fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 4px' },
  sumLn: { fontSize: 22, color: '#e2e8f0', margin: '2px 0' },
  sumDim: { fontSize: 18, color: '#9aa6b6', margin: '2px 0' },
  sumList: { flex: 1, background: '#0c1016', border: '1px solid #232c3a', borderRadius: 8, overflow: 'auto' },
  sumItem: { color: '#fff', fontSize: 21, padding: '12px 16px', borderBottom: '1px solid #1c2430' },
  // confirm
  ring: { width: 140, height: 140, borderRadius: '50%', background: 'rgba(63,177,82,.15)', border: '5px solid #3FB152', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  // my incidents
  inc: { display: 'flex', alignItems: 'center', gap: 16, background: '#11161f', border: '1px solid #25303f', borderRadius: 8, padding: '14px 18px', marginBottom: 10, cursor: 'pointer', width: '100%' },
  incId: { fontFamily: 'monospace', fontSize: 17, color: '#7dd3fc', width: 150, flexShrink: 0, textAlign: 'left' },
  stat: { fontSize: 15, fontWeight: 700, padding: '6px 14px', borderRadius: 16, flexShrink: 0, whiteSpace: 'nowrap' },
  // detail
  panel: { background: '#11161f', border: '1px solid #25303f', borderRadius: 8, padding: '16px 18px' },
  panelH: { margin: '0 0 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: '.6px', color: '#8b97a8' },
  kv: { fontSize: 20, margin: '3px 0', color: '#e2e8f0' },
  act: { display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #959595', borderRadius: 6, padding: '16px 18px', fontSize: 21, color: '#fff', cursor: 'pointer', textAlign: 'left' },
};
