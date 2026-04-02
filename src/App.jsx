import { useState } from "react";
import * as mammoth from "mammoth";

const LM = {
  D: { label: "Developing", tc: "#633806", bg: "#FAEEDA", bc: "#F0C27A" },
  C: { label: "Competent",  tc: "#0C447C", bg: "#E6F1FB", bc: "#85B7EB" },
  A: { label: "Advanced",   tc: "#085041", bg: "#E1F5EE", bc: "#5DCAA5" },
  E: { label: "Expert",     tc: "#3C3489", bg: "#EEEDFE", bc: "#AFA9EC" },
};
const LEVELS = ["D", "C", "A", "E"];

function Badge({ level }) {
  const m = LM[level] || LM.D;
  return (
    <span style={{ background: m.bg, color: m.tc, border: `1px solid ${m.bc}`, padding: "2px 7px", borderRadius: 4, fontSize: 11, fontWeight: 500, display: "inline-block", whiteSpace: "nowrap" }}>
      {level} — {m.label}
    </span>
  );
}

function Spinner({ size = 14 }) {
  return <span style={{ display: "inline-block", width: size, height: size, border: "2px solid var(--color-border-secondary)", borderTopColor: "var(--color-text-primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />;
}

function Metric({ label, value, accent }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: accent || "var(--color-text-primary)" }}>{value}</div>
    </div>
  );
}

function SectionLabel({ title }) {
  return <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-secondary)", marginBottom: 10 }}>{title}</div>;
}

function Card({ children, style = {} }) {
  return <div style={{ padding: "12px 14px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", marginBottom: 8, ...style }}>{children}</div>;
}

function EmptyState({ icon, title, body }) {
  return (
    <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--color-text-secondary)" }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function Btn({ onClick, disabled, children, variant = "default", style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, display: "inline-flex", alignItems: "center", gap: 7, borderRadius: "var(--border-radius-md)", border: variant === "ghost" ? "none" : "0.5px solid var(--color-border-secondary)", background: variant === "ghost" ? "none" : "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)", ...style }}>
      {children}
    </button>
  );
}

function ScoreBar({ score, label, timeline }) {
  const color = score >= 75 ? "#0F6E56" : score >= 50 ? "#BA7517" : "#A32D2D";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 38, fontWeight: 500, color, lineHeight: 1 }}>{Math.round(score)}</span>
        <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>/ 100</span>
        <span style={{ fontSize: 14, fontWeight: 500, color }}>{label}</span>
      </div>
      <div style={{ height: 5, background: "var(--color-border-tertiary)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
        <div style={{ height: "100%", width: `${Math.min(score, 100)}%`, background: color, borderRadius: 3 }} />
      </div>
      {timeline && <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Estimated timeline: {timeline}</div>}
    </div>
  );
}

function ReadinessGauge({ score, label, timeline, verdict }) {
  const color = score >= 75 ? "#0F6E56" : score >= 50 ? "#BA7517" : "#A32D2D";
  const r = 46, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  const filled = (Math.min(score, 100) / 100) * circ;
  return (
    <div style={{ padding: "16px", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border-tertiary)" strokeWidth="8" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round" transform="rotate(-90 60 60)" />
          <text x={cx} y={cy - 6} textAnchor="middle" fill={color} fontSize="22" fontWeight="500" fontFamily="var(--font-sans)">{Math.round(score)}</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--font-sans)">/ 100</text>
        </svg>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontSize: 18, fontWeight: 500, color, marginBottom: 6 }}>{label}</div>
          {timeline && <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: verdict ? 8 : 0 }}>Timeline: {timeline}</div>}
          {verdict && <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{verdict}</div>}
        </div>
      </div>
    </div>
  );
}

// ─── File reading ─────────────────────────────────────────────────────────────
function readAsText(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(new Error("Could not read file as text"));
    r.readAsText(file);
  });
}

function readAsBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Could not read file as base64"));
    r.readAsDataURL(file);
  });
}

function readAsArrayBuffer(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(new Error("Could not read file as ArrayBuffer"));
    r.readAsArrayBuffer(file);
  });
}

// ─── JSON extraction ──────────────────────────────────────────────────────────
function extractJSON(raw) {
  const s = raw.replace(/```json\n?|```/g, "").trim();
  try { return JSON.parse(s); } catch (_) {}
  const start = s.indexOf("{");
  const end   = s.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try { return JSON.parse(s.slice(start, end + 1)); } catch (_) {}
  }
  throw new Error("Could not parse response. Preview: " + s.slice(0, 200));
}

// ─── API ──────────────────────────────────────────────────────────────────────
async function callClaude(system, userText, maxTokens = 3500) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userText }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
  return extractJSON(text);
}

async function callClaudeWithPDF(system, base64Data) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3500,
      system,
      messages: [{
        role: "user",
        content: [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64Data } },
          { type: "text", text: "Extract all competencies from this job description. Apply the standards-author test rigorously. Return ONLY valid JSON." },
        ],
      }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  const text = data.content.filter(b => b.type === "text").map(b => b.text).join("");
  return extractJSON(text);
}

// ─── Prompts ──────────────────────────────────────────────────────────────────
const PROMPTS = {
  extraction: `You are a competency extraction agent for a cyber SaaS company (Tenable). Analyze job descriptions and extract competencies with proficiency levels.

PROFICIENCY FRAMEWORK (4 tiers):
- D (Developing): Learning with guidance. Foundational knowledge. Needs help. Verbs: participate in, assist with, familiar with, learn, develop understanding
- C (Competent): Performs independently. Applies knowledge. Verbs: perform, apply, support, manage, deliver, implement
- A (Advanced): Goes beyond execution. Coaches others. Recognized internally as go-to. Verbs: advise, lead, optimize, design, coach, independently manage
- E (Expert): Recognized authority. Creates standards and reference materials that others across the org use. Verbs: architect, govern, pioneer, author standards, define frameworks, recognized authority

CRITICAL CALIBRATION: Seniority does NOT equal Expert. Apply the standards-author test:
- Creating methodology/framework others use? Expert
- Performing at high level, coaching, strategic discussions? Advanced
- A Sr. Director typically has 2-4 Expert competencies. 8 Expert is almost always wrong.
- "Support" / "assist" = max A-level. "Lead/drive" = A-level. "Define standards/architect frameworks" = E-level.

Respond ONLY in valid JSON, no markdown, no backticks:
{
  "role_title": "string",
  "role_level": "string",
  "department": "string",
  "competencies": [{"name":"string","category":"T or B","level":"D|C|A|E","confidence":0-100,"definition":"string","evidence":"string","signal":"string"}],
  "summary": {"total":number,"expert_count":number,"advanced_count":number,"competent_count":number,"developing_count":number,"notes":"string"}
}`,

  careerMap: `You are a world-class career architecture expert. Generate a complete, realistic career ladder for the given role family. Include both IC and Management tracks (4-6 levels each). Use the D/C/A/E proficiency framework. Be realistic about titles, years of experience, and compensation.

Respond ONLY in valid JSON, no markdown:
{
  "role_family": "string",
  "description": "string",
  "tracks": {
    "ic": [{"level_name":"string","level_code":"string","seniority":"string","typical_years":"string","comp_range":"string","key_competencies":[{"name":"string","level":"D|C|A|E","category":"T|B"}],"promotion_criteria":"string","typical_titles":["string"]}],
    "management": [{"level_name":"string","level_code":"string","seniority":"string","typical_years":"string","comp_range":"string","key_competencies":[{"name":"string","level":"D|C|A|E","category":"T|B"}],"promotion_criteria":"string","typical_titles":["string"]}]
  },
  "ic_to_mgmt_note": "string"
}`,

  gap: `You are a career development strategist with Fortune 100 expertise. Analyze the competency gap between a current and target role. Be specific, actionable, and honest.

Respond ONLY in valid JSON, no markdown:
{
  "from_role": "string",
  "to_role": "string",
  "overall_readiness": number,
  "readiness_label": "string",
  "estimated_timeline": "string",
  "gaps": [{"competency":"string","current_level":"D|C|A|E","required_level":"D|C|A|E","gap_steps":number,"priority":"critical|high|medium","development_action":"string"}],
  "strengths": [{"competency":"string","note":"string"}],
  "recommendations": "string",
  "action_plan": [{"quarter":"Q1|Q2|Q3|Q4","theme":"string","actions":["string"]}]
}`,

  readiness: `You are a talent management expert and executive coach. Assess promotion readiness from self-rated competencies vs requirements. Score: 0-30 Not ready, 31-50 Early development, 51-70 Building, 71-85 Nearly ready, 86-100 Ready now.

Respond ONLY in valid JSON, no markdown:
{
  "readiness_score": number,
  "readiness_label": "string",
  "verdict": "string",
  "strengths": [{"competency":"string","impact":"string"}],
  "critical_gaps": [{"competency":"string","current":"D|C|A|E","required":"D|C|A|E","development_action":"string"}],
  "nice_to_have_gaps": [{"competency":"string","current":"D|C|A|E","required":"D|C|A|E"}],
  "timeline_estimate": "string",
  "action_plan": [{"quarter":"string","focus_area":"string","specific_actions":["string"]}],
  "coaching_insight": "string"
}`
};

// ════════════════════════════════════════════════════════════════════════════════
// TAB 1 — JD ANALYZER
// ════════════════════════════════════════════════════════════════════════════════
function AnalyzerTab({ library, addToLibrary }) {
  const [mode, setMode]           = useState("upload");
  const [jd, setJd]               = useState("");
  const [file, setFile]           = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const [result, setResult]       = useState(null);
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading]     = useState(false);
  const [step, setStep]           = useState("");
  const [error, setError]         = useState(null);

  function handleFile(f) {
    if (!f) return;
    const extOk = /\.(txt|md|pdf|docx|doc)$/i.test(f.name);
    const typeOk = ["text/plain","text/markdown","application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"].includes(f.type);
    if (!extOk && !typeOk) { setError("Unsupported file. Please upload PDF, DOCX, TXT, or MD."); return; }
    setFile(f); setError(null);
  }

  async function analyze() {
    setLoading(true); setError(null); setStep("");
    try {
      const isPDF  = /\.pdf$/i.test(file?.name) || file?.type === "application/pdf";
      const isDOCX = /\.(docx|doc)$/i.test(file?.name) ||
        ["application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/msword"].includes(file?.type);

      if (mode === "paste") {
        setStep("Extracting competencies...");
        const data = await callClaude(PROMPTS.extraction,
          `Extract all competencies from this job description. Apply the standards-author test rigorously. Return ONLY valid JSON.\n\nJOB DESCRIPTION:\n${jd}`
        );
        setResult(data); setOverrides({});
      } else if (isPDF) {
        setStep("Reading PDF...");
        const b64 = await readAsBase64(file);
        setStep("Extracting competencies from PDF...");
        const data = await callClaudeWithPDF(PROMPTS.extraction, b64);
        setResult(data); setOverrides({});
      } else if (isDOCX) {
        setStep("Parsing DOCX...");
        const arrayBuffer = await readAsArrayBuffer(file);
        let extracted;
        try {
          extracted = await mammoth.extractRawText({ arrayBuffer });
        } catch (err) {
          throw new Error("Could not parse DOCX (" + err.message + "). Try saving as PDF or TXT.");
        }
        const jdText = (extracted && extracted.value) ? extracted.value : "";
        if (jdText.trim().length < 40) {
          throw new Error("No readable text found in this DOCX. The file may be protected or image-based. Try saving it as a PDF.");
        }
        setStep("Extracting competencies...");
        const data = await callClaude(PROMPTS.extraction,
          `Extract all competencies from this job description. Apply the standards-author test rigorously. Return ONLY valid JSON.\n\nJOB DESCRIPTION:\n${jdText}`
        );
        setResult(data); setOverrides({});
      } else {
        setStep("Reading file...");
        const jdText = await readAsText(file);
        setStep("Extracting competencies...");
        const data = await callClaude(PROMPTS.extraction,
          `Extract all competencies from this job description. Apply the standards-author test rigorously. Return ONLY valid JSON.\n\nJOB DESCRIPTION:\n${jdText}`
        );
        setResult(data); setOverrides({});
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false); setStep("");
  }

  const canRun = mode === "paste" ? jd.trim().length > 20 : !!file;

  function CompRow({ comp }) {
    const [open, setOpen] = useState(false);
    const currentLevel    = overrides[comp.name] ?? comp.level;
    const isEdited        = !!(overrides[comp.name] && overrides[comp.name] !== comp.level);
    const conf            = comp.confidence;
    const confColor       = conf >= 85 ? "#0F6E56" : conf >= 70 ? "#BA7517" : "#A32D2D";

    function setLevel(l) {
      if (l === comp.level) { setOverrides(prev => { const n = { ...prev }; delete n[comp.name]; return n; }); }
      else { setOverrides(prev => ({ ...prev, [comp.name]: l })); }
    }

    return (
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div onClick={() => setOpen(!open)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 7, cursor: "pointer", minWidth: 120 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{comp.name}</span>
            {isEdited && <span style={{ fontSize: 10, color: "#BA7517", background: "#FAEEDA", border: "1px solid #F0C27A", borderRadius: 3, padding: "1px 5px", fontWeight: 500 }}>edited</span>}
            <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{open ? "▲" : "▼"}</span>
          </div>
          <span style={{ fontSize: 11, color: confColor, fontWeight: 500, flexShrink: 0 }}>{conf}%</span>
          <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
            {LEVELS.map(l => {
              const m = LM[l];
              const sel    = currentLevel === l;
              const isOrig = comp.level === l && !isEdited;
              return (
                <button key={l} onClick={() => setLevel(l)} title={`${l} — ${m.label}`} style={{ padding: "3px 8px", fontSize: 11, fontWeight: sel ? 500 : 400, background: sel ? m.bg : "none", color: sel ? m.tc : "var(--color-text-tertiary)", border: sel ? `1px solid ${m.bc}` : isOrig ? "0.5px dashed var(--color-border-secondary)" : "0.5px solid var(--color-border-tertiary)", borderRadius: 4, cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.1s" }}>{l}</button>
              );
            })}
          </div>
          {isEdited && <button onClick={() => setLevel(comp.level)} title="Reset" style={{ fontSize: 12, color: "var(--color-text-tertiary)", background: "none", border: "none", cursor: "pointer", padding: "2px", fontFamily: "var(--font-sans)" }}>↺</button>}
        </div>
        {open && (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "0.5px solid var(--color-border-tertiary)", fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            {isEdited && <div style={{ marginBottom: 8, padding: "5px 10px", background: "#FAEEDA", borderRadius: 4, color: "#633806" }}>Changed: <strong>{comp.level} ({LM[comp.level].label})</strong> → <strong>{currentLevel} ({LM[currentLevel].label})</strong></div>}
            <div><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Definition:</span> {comp.definition}</div>
            <div style={{ marginTop: 4 }}><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>JD evidence:</span> <em>{comp.evidence}</em></div>
            <div style={{ marginTop: 4 }}><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Signal:</span> {comp.signal}</div>
          </div>
        )}
      </Card>
    );
  }

  function resolvedResult() {
    if (!result) return null;
    return { ...result, competencies: result.competencies.map(c => ({ ...c, level: overrides[c.name] ?? c.level })) };
  }

  const editCount  = Object.keys(overrides).length;
  const saved      = result && library.some(r => r.role_title === result.role_title);
  const techComps  = result?.competencies?.filter(c => c.category === "T") || [];
  const behComps   = result?.competencies?.filter(c => c.category === "B") || [];
  const s          = result?.summary || {};
  const liveCounts = { D: 0, C: 0, A: 0, E: 0 };
  (result?.competencies || []).forEach(c => { const l = overrides[c.name] ?? c.level; if (l in liveCounts) liveCounts[l]++; });

  if (result) return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 500 }}>{result.role_title}</h2>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{result.role_level} · {result.department}</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap", alignItems: "center" }}>
          {editCount > 0 && <span style={{ fontSize: 12, color: "#BA7517", fontWeight: 500 }}>{editCount} edit{editCount !== 1 ? "s" : ""}</span>}
          <Btn onClick={() => addToLibrary(resolvedResult())}>{saved ? "Update library" : "+ Save to library"}</Btn>
          <Btn onClick={() => { setResult(null); setFile(null); setJd(""); setOverrides({}); }} variant="ghost">← New JD</Btn>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
        <Metric label="Total"      value={result.competencies?.length || 0} />
        <Metric label="Expert"     value={liveCounts.E} accent={LM.E.tc} />
        <Metric label="Advanced"   value={liveCounts.A} accent={LM.A.tc} />
        <Metric label="Competent"  value={liveCounts.C} accent={LM.C.tc} />
        <Metric label="Developing" value={liveCounts.D} accent={LM.D.tc} />
      </div>
      <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 14 }}>
        Click <strong style={{ fontWeight: 500 }}>D · C · A · E</strong> on any row to change the level. Click the name to see evidence. Click ↺ to reset.
      </div>
      {techComps.length > 0 && (<><SectionLabel title="Technical competencies" />{techComps.map((c, i) => <CompRow key={i} comp={c} />)}<div style={{ marginBottom: 16 }} /></>)}
      {behComps.length  > 0 && (<><SectionLabel title="Behavioral & leadership"  />{behComps.map((c, i)  => <CompRow key={i} comp={c} />)}</>)}
      {s.notes && <div style={{ fontSize: 12, color: "var(--color-text-secondary)", padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginTop: 12, lineHeight: 1.6 }}><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Agent notes:</span> {s.notes}</div>}
    </div>
  );

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
        Upload a job description or paste the text. Claude extracts and classifies every competency using the D/C/A/E framework with standards-author calibration.
      </p>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[["upload","Upload file"],["paste","Paste text"]].map(([id, label]) => (
          <button key={id} onClick={() => { setMode(id); setError(null); }} style={{ padding: "6px 14px", fontSize: 12, fontWeight: mode === id ? 500 : 400, borderRadius: 20, cursor: "pointer", border: "0.5px solid var(--color-border-secondary)", background: mode === id ? "var(--color-text-primary)" : "var(--color-background-primary)", color: mode === id ? "var(--color-background-primary)" : "var(--color-text-secondary)", fontFamily: "var(--font-sans)", transition: "all 0.15s" }}>{label}</button>
        ))}
      </div>

      {mode === "upload" && (
        <>
          <input id="jd-file-input" type="file" accept=".pdf,.txt,.md,.docx,.doc" style={{ display: "none" }}
            onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />
          <label htmlFor="jd-file-input"
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            style={{ display: "block", border: `1.5px dashed ${dragOver ? "var(--color-border-primary)" : "var(--color-border-secondary)"}`, borderRadius: "var(--border-radius-lg)", background: dragOver ? "var(--color-background-secondary)" : "var(--color-background-primary)", padding: "32px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.15s", marginBottom: 12 }}>
            {file ? (
              <div>
                <div style={{ width: 36, height: 36, borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-secondary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 16 }}>&#128196;</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{file.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>{(file.size / 1024).toFixed(1)} KB</div>
                <button onClick={e => { e.preventDefault(); setFile(null); setError(null); }} style={{ marginTop: 10, fontSize: 12, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-sans)" }}>Remove</button>
              </div>
            ) : (
              <div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--color-background-info)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 18, color: "var(--color-text-info)" }}>+</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Drop your JD here</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>or click to browse — PDF, DOCX, TXT, MD</div>
              </div>
            )}
          </label>
          {!file && <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 8 }}>Select a file to enable the pipeline.</div>}
        </>
      )}

      {mode === "paste" && (
        <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste job description here..."
          style={{ width: "100%", minHeight: 180, resize: "vertical", boxSizing: "border-box", padding: 12, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }} />
      )}

      {loading && step && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 10 }}>
          <Spinner /> {step}
        </div>
      )}
      {error && (
        <div style={{ fontSize: 13, color: "var(--color-text-danger)", background: "var(--color-background-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", marginBottom: 10, lineHeight: 1.6 }}>
          {error}
        </div>
      )}
      <Btn onClick={analyze} disabled={loading || !canRun}>
        {loading ? <><Spinner /> {step || "Running..."}</> : "Run pipeline"}
      </Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// TAB 2 — CAREER MAP
// ════════════════════════════════════════════════════════════════════════════════
function CareerMapTab() {
  const [query, setQuery]     = useState("");
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [track, setTrack]     = useState("ic");

  async function generate() {
    if (!query.trim()) return;
    setLoading(true); setError(null);
    try {
      const data = await callClaude(PROMPTS.careerMap,
        `Generate a complete, realistic career ladder for this role family. Include all levels for both IC and Management tracks.\n\nROLE FAMILY: ${query}`, 4000
      );
      setResult(data); setTrack("ic");
    } catch (e) { setError(e.message); }
    setLoading(false);
  }

  function LevelCard({ level }) {
    const [open, setOpen] = useState(false);
    const counts = { D: 0, C: 0, A: 0, E: 0 };
    (level.key_competencies || []).forEach(c => { if (c.level in counts) counts[c.level]++; });
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "C";
    const m = LM[dominant];
    return (
      <div onClick={() => setOpen(!open)} style={{ padding: "14px 16px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", borderLeft: `3px solid ${m.bc}`, background: "var(--color-background-primary)", marginBottom: 8, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: m.bg, color: m.tc, border: `1px solid ${m.bc}`, borderRadius: 4, padding: "3px 8px", fontSize: 11, fontWeight: 500, flexShrink: 0 }}>{level.level_code}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{level.level_name}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>{level.seniority} · {level.typical_years}{level.comp_range ? ` · ${level.comp_range}` : ""}</div>
          </div>
          <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
        </div>
        {open && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
            {level.typical_titles?.length > 0 && <div style={{ marginBottom: 10 }}><div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Typical titles</div><div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{level.typical_titles.join(", ")}</div></div>}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Key competencies</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(level.key_competencies || []).map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{c.name}</span><Badge level={c.level} />
                  </div>
                ))}
              </div>
            </div>
            <div><div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Promotion criteria</div><div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{level.promotion_criteria}</div></div>
          </div>
        )}
      </div>
    );
  }

  if (result) return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 500 }}>{result.role_family}</h2>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{result.description}</div>
        </div>
        <Btn onClick={() => { setResult(null); setQuery(""); }} variant="ghost">← New map</Btn>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[["ic",`IC track (${result.tracks?.ic?.length||0} levels)`],["management",`Management (${result.tracks?.management?.length||0} levels)`]].map(([id,label]) => (
          <button key={id} onClick={() => setTrack(id)} style={{ padding: "6px 14px", fontSize: 12, fontWeight: track===id?500:400, borderRadius: 20, cursor: "pointer", border: "0.5px solid var(--color-border-secondary)", background: track===id?"var(--color-text-primary)":"var(--color-background-primary)", color: track===id?"var(--color-background-primary)":"var(--color-text-secondary)", fontFamily: "var(--font-sans)", transition: "all 0.15s" }}>{label}</button>
        ))}
      </div>
      {(result.tracks?.[track]||[]).map((level,i) => <LevelCard key={i} level={level}/>)}
      {result.ic_to_mgmt_note && <div style={{ fontSize: 12, color: "var(--color-text-secondary)", padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", marginTop: 8, lineHeight: 1.6 }}><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>IC → Management pivot:</span> {result.ic_to_mgmt_note}</div>}
    </div>
  );

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 14, lineHeight: 1.6 }}>Enter a role family to generate a complete career ladder — IC and management tracks, competency requirements, promotion criteria, titles, and comp ranges.</p>
      <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key==="Enter"&&query.trim()&&!loading&&generate()} placeholder="e.g. Security Analyst, Product Manager, Software Engineer..." style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", fontSize: 13, marginBottom: 10 }} />
      {error && <div style={{ color: "var(--color-text-danger)", fontSize: 13, marginBottom: 8 }}>{error}</div>}
      <Btn onClick={generate} disabled={loading||!query.trim()}>
        {loading ? <><Spinner /> Building...</> : "Generate career map"}
      </Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// TAB 3 — GAP ANALYSIS
// ════════════════════════════════════════════════════════════════════════════════
function GapTab({ library }) {
  const [fromId, setFromId]   = useState("");
  const [toId, setToId]       = useState("");
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const fromRole = library.find(r => r.role_title === fromId);
  const toRole   = library.find(r => r.role_title === toId);

  async function analyze() {
    setLoading(true); setError(null);
    try {
      const data = await callClaude(PROMPTS.gap,
        `Perform a detailed gap analysis between these two roles.\n\nCURRENT ROLE:\n${JSON.stringify({title:fromRole.role_title,level:fromRole.role_level,competencies:fromRole.competencies},null,2)}\n\nTARGET ROLE:\n${JSON.stringify({title:toRole.role_title,level:toRole.role_level,competencies:toRole.competencies},null,2)}\n\nReturn ONLY valid JSON.`
      );
      setResult(data);
    } catch (e) { setError(e.message); }
    setLoading(false);
  }

  const pColors = { critical:{bg:"#FCEBEB",tc:"#A32D2D",bc:"#F09595"}, high:{bg:"#FAEEDA",tc:"#633806",bc:"#F0C27A"}, medium:{bg:"#E6F1FB",tc:"#0C447C",bc:"#85B7EB"} };

  if (library.length < 2) return <EmptyState icon="⧖" title="Gap Analysis needs two roles in your library" body={`Analyze ${library.length===0?"two job descriptions":"one more job description"} in the JD Analyzer and save them.`} />;

  if (result) return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,gap:12,flexWrap:"wrap" }}>
        <div style={{ fontSize:13 }}><strong style={{fontWeight:500}}>{result.from_role}</strong><span style={{margin:"0 10px",color:"var(--color-text-secondary)",fontSize:16}}>→</span><strong style={{fontWeight:500}}>{result.to_role}</strong></div>
        <Btn onClick={() => setResult(null)} variant="ghost">← New analysis</Btn>
      </div>
      <Card style={{ marginBottom:20 }}><ScoreBar score={result.overall_readiness} label={result.readiness_label} timeline={result.estimated_timeline}/></Card>
      {result.gaps?.length>0 && <div style={{marginBottom:20}}><SectionLabel title={`${result.gaps.length} competency gaps`}/>{result.gaps.map((g,i)=>{const pc=pColors[g.priority]||pColors.medium;return(<Card key={i}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}><span style={{fontWeight:500,fontSize:13,flex:1,minWidth:120}}>{g.competency}</span><Badge level={g.current_level}/><span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>→</span><Badge level={g.required_level}/><span style={{background:pc.bg,color:pc.tc,border:`1px solid ${pc.bc}`,fontSize:11,padding:"2px 7px",borderRadius:4,fontWeight:500}}>{g.priority}</span></div><div style={{fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{g.development_action}</div></Card>);})}</div>}
      {result.strengths?.length>0 && <div style={{marginBottom:20}}><SectionLabel title={`${result.strengths.length} transferable strengths`}/>{result.strengths.map((s,i)=><Card key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}><span style={{color:"#0F6E56",fontSize:14,marginTop:1,flexShrink:0}}>✓</span><div><div style={{fontWeight:500,fontSize:13}}>{s.competency}</div><div style={{fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.5}}>{s.note}</div></div></Card>)}</div>}
      {result.action_plan?.length>0 && <div style={{marginBottom:20}}><SectionLabel title="Development action plan"/>{result.action_plan.map((q,i)=><Card key={i}><div style={{display:"flex",gap:10,alignItems:"baseline",marginBottom:8}}><span style={{fontWeight:500,fontSize:11,color:"var(--color-text-secondary)",minWidth:24,textTransform:"uppercase",letterSpacing:"0.04em"}}>{q.quarter}</span><span style={{fontWeight:500,fontSize:13}}>{q.theme}</span></div><ul style={{margin:0,paddingLeft:18}}>{(q.actions||[]).map((a,j)=><li key={j} style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:3,lineHeight:1.6}}>{a}</li>)}</ul></Card>)}</div>}
      {result.recommendations && <div style={{fontSize:12,color:"var(--color-text-secondary)",padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",lineHeight:1.6}}><span style={{fontWeight:500,color:"var(--color-text-primary)"}}>Strategic view:</span> {result.recommendations}</div>}
    </div>
  );

  return (
    <div>
      <p style={{fontSize:13,color:"var(--color-text-secondary)",marginBottom:16,lineHeight:1.6}}>Select a current and target role from your library to get a gap analysis, priority ranking, transferable strengths, and a quarterly development plan.</p>
      <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-end",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180}}><div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:6}}>Current role</div><select value={fromId} onChange={e=>setFromId(e.target.value)} style={{width:"100%",padding:"8px 10px",fontSize:13}}><option value="">Select from library...</option>{library.map(r=><option key={r.role_title} value={r.role_title}>{r.role_title}</option>)}</select></div>
        <div style={{paddingBottom:10,fontSize:20,color:"var(--color-text-tertiary)"}}>→</div>
        <div style={{flex:1,minWidth:180}}><div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:6}}>Target role</div><select value={toId} onChange={e=>setToId(e.target.value)} style={{width:"100%",padding:"8px 10px",fontSize:13}}><option value="">Select from library...</option>{library.filter(r=>r.role_title!==fromId).map(r=><option key={r.role_title} value={r.role_title}>{r.role_title}</option>)}</select></div>
      </div>
      {error && <div style={{color:"var(--color-text-danger)",fontSize:13,marginBottom:8}}>{error}</div>}
      <Btn onClick={analyze} disabled={loading||!fromId||!toId}>
        {loading ? <><Spinner/> Analyzing...</> : "Analyze gap"}
      </Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// TAB 4 — READINESS
// ════════════════════════════════════════════════════════════════════════════════
function ReadinessTab({ library }) {
  const [targetId, setTargetId] = useState("");
  const [ratings, setRatings]   = useState({});
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const targetRole = library.find(r => r.role_title === targetId);

  async function assess() {
    setLoading(true); setError(null);
    try {
      const ratedComps = (targetRole.competencies||[]).map(c=>({ name:c.name, category:c.category, self_rated_level:ratings[c.name]||"D", required_level:c.level, gap:Math.max(0,LEVELS.indexOf(c.level)-LEVELS.indexOf(ratings[c.name]||"D")) }));
      const data = await callClaude(PROMPTS.readiness,
        `Assess promotion readiness.\n\nTARGET ROLE: ${targetRole.role_title} (${targetRole.role_level})\nDEPARTMENT: ${targetRole.department}\n\nCOMPETENCY SELF-RATINGS:\n${JSON.stringify(ratedComps,null,2)}\n\nReturn ONLY valid JSON.`
      );
      setResult(data);
    } catch (e) { setError(e.message); }
    setLoading(false);
  }

  if (library.length===0) return <EmptyState icon="◎" title="No roles in library yet" body="Analyze a job description in the JD Analyzer tab and save it to your library."/>;

  if (result) return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,gap:12,flexWrap:"wrap"}}>
        <div style={{fontSize:13,color:"var(--color-text-secondary)"}}>Readiness for: <strong style={{fontWeight:500,color:"var(--color-text-primary)"}}>{targetRole?.role_title}</strong></div>
        <Btn onClick={()=>setResult(null)} variant="ghost">← Re-assess</Btn>
      </div>
      <ReadinessGauge score={result.readiness_score} label={result.readiness_label} timeline={result.timeline_estimate} verdict={result.verdict}/>
      {result.strengths?.length>0 && <div style={{marginBottom:20}}><SectionLabel title={`${result.strengths.length} strengths`}/>{result.strengths.map((s,i)=><Card key={i} style={{display:"flex",gap:10}}><span style={{color:"#0F6E56",flexShrink:0,marginTop:1}}>✓</span><div><div style={{fontWeight:500,fontSize:13}}>{s.competency}</div><div style={{fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.5}}>{s.impact}</div></div></Card>)}</div>}
      {result.critical_gaps?.length>0 && <div style={{marginBottom:20}}><SectionLabel title={`${result.critical_gaps.length} critical gaps`}/>{result.critical_gaps.map((g,i)=><Card key={i}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}><span style={{fontWeight:500,fontSize:13,flex:1,minWidth:120}}>{g.competency}</span><Badge level={g.current}/><span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>→</span><Badge level={g.required}/></div><div style={{fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{g.development_action}</div></Card>)}</div>}
      {result.nice_to_have_gaps?.length>0 && <div style={{marginBottom:20}}><SectionLabel title="Nice-to-have gaps"/>{result.nice_to_have_gaps.map((g,i)=><Card key={i} style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}><span style={{fontWeight:500,fontSize:13,flex:1}}>{g.competency}</span><Badge level={g.current}/><span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>→</span><Badge level={g.required}/></Card>)}</div>}
      {result.action_plan?.length>0 && <div style={{marginBottom:20}}><SectionLabel title="Your development plan"/>{result.action_plan.map((q,i)=><Card key={i}><div style={{display:"flex",gap:10,alignItems:"baseline",marginBottom:8}}><span style={{fontWeight:500,fontSize:11,color:"var(--color-text-secondary)",minWidth:24,textTransform:"uppercase",letterSpacing:"0.04em"}}>{q.quarter}</span><span style={{fontWeight:500,fontSize:13}}>{q.focus_area}</span></div><ul style={{margin:0,paddingLeft:18}}>{(q.specific_actions||[]).map((a,j)=><li key={j} style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:3,lineHeight:1.6}}>{a}</li>)}</ul></Card>)}</div>}
      {result.coaching_insight && <div style={{fontSize:12,color:"var(--color-text-secondary)",padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",lineHeight:1.6}}><span style={{fontWeight:500,color:"var(--color-text-primary)"}}>Coach's note:</span> {result.coaching_insight}</div>}
    </div>
  );

  return (
    <div>
      <p style={{fontSize:13,color:"var(--color-text-secondary)",marginBottom:16,lineHeight:1.6}}>Select a target role, rate your current proficiency for each competency, and get an honest readiness score with a personalized development plan.</p>
      <div style={{marginBottom:18}}>
        <div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:6}}>Target role</div>
        <select value={targetId} onChange={e=>{setTargetId(e.target.value);setRatings({});}} style={{width:"100%",padding:"8px 10px",fontSize:13}}>
          <option value="">Select a role from your library...</option>
          {library.map(r=><option key={r.role_title} value={r.role_title}>{r.role_title}</option>)}
        </select>
      </div>
      {targetRole && (
        <div>
          <SectionLabel title="Rate your current proficiency for each competency"/>
          {(targetRole.competencies||[]).map((c,i)=>(
            <Card key={i} style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <span style={{flex:1,fontSize:13,fontWeight:500,minWidth:140}}>{c.name}</span>
              <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:11,color:"var(--color-text-tertiary)"}}>Required:</span><Badge level={c.level}/></div>
              <div style={{display:"flex",gap:4}}>
                {LEVELS.map(l=>{const m=LM[l];const sel=(ratings[c.name]||"D")===l;return(<button key={l} onClick={()=>setRatings(prev=>({...prev,[c.name]:l}))} style={{padding:"3px 9px",fontSize:11,fontWeight:sel?500:400,background:sel?m.bg:"none",color:sel?m.tc:"var(--color-text-tertiary)",border:sel?`1px solid ${m.bc}`:"0.5px solid var(--color-border-tertiary)",borderRadius:4,cursor:"pointer",fontFamily:"var(--font-sans)",transition:"all 0.1s"}}>{l}</button>);})}
              </div>
            </Card>
          ))}
          {error && <div style={{color:"var(--color-text-danger)",fontSize:13,margin:"8px 0"}}>{error}</div>}
          <Btn onClick={assess} disabled={loading} style={{marginTop:16}}>
            {loading ? <><Spinner/> Assessing...</> : "Assess my readiness"}
          </Btn>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab]         = useState("analyzer");
  const [library, setLibrary] = useState([]);

  function addToLibrary(role) {
    setLibrary(prev => {
      const exists = prev.find(r => r.role_title === role.role_title);
      return exists ? prev.map(r => r.role_title === role.role_title ? role : r) : [...prev, role];
    });
  }

  const tabs = [
    { id: "analyzer",  label: "JD Analyzer", desc: "Extract & classify competencies from any JD" },
    { id: "career",    label: "Career Map",   desc: "Generate IC & management career ladders" },
    { id: "gap",       label: "Gap Analysis", desc: "Compare two roles, surface critical gaps" },
    { id: "readiness", label: "Readiness",    desc: "Self-rate competencies, get your score" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", paddingBottom: 48 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}button{font-family:var(--font-sans)}select,input,textarea{font-family:var(--font-sans);color:var(--color-text-primary);background:var(--color-background-primary);border:0.5px solid var(--color-border-secondary);border-radius:var(--border-radius-md);outline:none}select:focus,input:focus,textarea:focus{border-color:var(--color-border-primary);box-shadow:0 0 0 2px var(--color-border-tertiary)}`}</style>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 4 }}>Career Intelligence Platform</div>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0, lineHeight: 1.2 }}>{tabs.find(t => t.id === tab)?.label}</h1>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 4 }}>{tabs.find(t => t.id === tab)?.desc}</div>
      </div>
      <div style={{ display: "flex", borderBottom: "0.5px solid var(--color-border-tertiary)", marginBottom: 24, alignItems: "center" }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "9px 14px", fontSize: 13, fontWeight: tab===t.id?500:400, background: "none", border: "none", cursor: "pointer", color: tab===t.id?"var(--color-text-primary)":"var(--color-text-secondary)", borderBottom: `2px solid ${tab===t.id?"var(--color-text-primary)":"transparent"}`, marginBottom: -1, transition: "color 0.15s" }}>{t.label}</button>)}
        {library.length > 0 && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--color-text-tertiary)", padding: "0 4px" }}><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 3, background: "#0F6E56" }}/>{library.length} role{library.length!==1?"s":""} in library</div>}
      </div>
      {tab === "analyzer"  && <AnalyzerTab library={library} addToLibrary={addToLibrary} />}
      {tab === "career"    && <CareerMapTab />}
      {tab === "gap"       && <GapTab library={library} />}
      {tab === "readiness" && <ReadinessTab library={library} />}
    </div>
  );
}
