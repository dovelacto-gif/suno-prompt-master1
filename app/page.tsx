"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Music, Sparkles, Copy, RefreshCw, Wand2, Car, Moon, Mic2 } from "lucide-react";

const presets = {
  citypop: {
    label: "City Pop Drive",
    icon: Car,
    genre: "City Pop / Modern Pop",
    mood: "Bright, refreshing, slightly nostalgic",
    tempo: "Mid-tempo, 95–110 BPM",
    vibe: "The Weeknd meets Japanese City Pop, clean and groovy",
    instruments: "Funky bassline, Rhodes electric piano, clean guitar, soft synth pads, light drums",
    vocals: "Smooth male or female vocal, slightly airy, natural pop tone",
    theme: "Driving freely, feeling alive, escaping daily routine",
    scene: "Open road, wind, sunlight, city and nature blending together",
    special: "Strong memorable chorus hook, smooth flow, avoid clichés like neon and lonely night",
  },
  acappella: {
    label: "A Cappella Pop",
    icon: Mic2,
    genre: "A cappella / Pop",
    mood: "Warm, uplifting, emotional",
    tempo: "Medium tempo",
    vibe: "The Real Group meets modern pop harmony",
    instruments: "No instruments, only vocal arrangement: vocal bass, chords, vocal percussion",
    vocals: "Layered harmonies, clear lead melody, natural groove-based vocal percussion",
    theme: "Hope, connection, shining together",
    scene: "People singing together, shared moments, light and warmth",
    special: "Harmony-friendly phrasing, rich final chorus, strong hook like Shine Your Light",
  },
  lofi: {
    label: "Lofi Study",
    icon: Moon,
    genre: "Lofi / Chillhop",
    mood: "Calm, cozy, slightly dreamy",
    tempo: "Slow to medium-slow, 60–80 BPM",
    vibe: "Late-night study music, warm and focused",
    instruments: "Soft piano, mellow drums, vinyl noise, subtle rain or snow ambience",
    vocals: "Optional soft humming or no vocal",
    theme: "Quiet focus, studying, calm concentration",
    scene: "Night desk, warm lamp, notebook, window, gentle weather outside",
    special: "Background-friendly, not too sleepy, keep a gentle rhythm",
  },
};

type PresetKey = keyof typeof presets;

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-zinc-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
      />
    </label>
  );
}

export default function SunoPromptMaster() {
  const [presetKey, setPresetKey] = useState<PresetKey>("citypop");
  const [songTitle, setSongTitle] = useState("Untitled Drive Song");
  const [hook, setHook] = useState("Shine Your Light");
  const [language, setLanguage] = useState("English");
  const [customTheme, setCustomTheme] = useState("");
  const [copied, setCopied] = useState(false);

  const preset = presets[presetKey];

  const prompt = useMemo(() => {
    const theme = customTheme.trim() || preset.theme;

    return `Title: ${songTitle}

Genre: ${preset.genre}
Mood: ${preset.mood}
Tempo: ${preset.tempo}
Vibe: ${preset.vibe}

Instruments: ${preset.instruments}
Vocals: ${preset.vocals}

Theme: ${theme}
Scene: ${preset.scene}

Structure:
- Intro: short and atmospheric
- Verse 1: calm and descriptive
- Pre-Chorus: emotional lift
- Chorus: catchy, repetitive hook using "${hook}"
- Verse 2: more energy and movement
- Bridge: dreamy and minimal
- Final Chorus: fuller, uplifting, memorable

Lyrics Style:
- ${language}, natural pop phrasing
- concise, not too long
- image-based and singable
- avoid overly generic lines

Special Instructions:
- ${preset.special}
- make the chorus feel instantly memorable
- keep the melody smooth and radio-friendly`;
  }, [preset, songTitle, hook, language, customTheme]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const PresetIcon = preset.icon;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_34%),linear-gradient(135deg,#fafafa,#f4f4f5)] px-5 py-8 text-zinc-900">
      <section className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-end"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200">
              <Sparkles className="h-4 w-4" /> Suno Prompt Master
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              원하는 음악을<br />프롬프트로 정확하게.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
              장르, 무드, 보컬, 장면을 고르면 Suno에 바로 넣을 수 있는 완성형 프롬프트를 만들어주는 간단한 제작 도구입니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white/85 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-zinc-900 p-3 text-white">
                <PresetIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Current Preset</p>
                <h2 className="text-2xl font-bold">{preset.label}</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{preset.vibe}</p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              <h2 className="text-xl font-bold">프롬프트 설정</h2>
            </div>

            <div className="space-y-5">
              <SelectField
                label="스타일 프리셋"
                value={presetKey}
                onChange={(value) => setPresetKey(value as PresetKey)}
                options={Object.entries(presets).map(([value, item]) => ({ value, label: item.label }))}
              />

              <TextField label="곡 제목" value={songTitle} onChange={setSongTitle} placeholder="예: Summer Drive" />
              <TextField label="후렴 Hook" value={hook} onChange={setHook} placeholder="예: Shine Your Light" />

              <SelectField
                label="가사 언어"
                value={language}
                onChange={setLanguage}
                options={[
                  { value: "English", label: "English" },
                  { value: "Korean", label: "Korean" },
                  { value: "Korean-English mixed", label: "Korean-English mixed" },
                  { value: "Instrumental", label: "Instrumental" },
                ]}
              />

              <TextField
                label="커스텀 주제"
                value={customTheme}
                onChange={setCustomTheme}
                placeholder="비워두면 프리셋 주제를 사용해요"
              />

              <button
                onClick={() => {
                  setSongTitle("Untitled Drive Song");
                  setHook("Shine Your Light");
                  setLanguage("English");
                  setCustomTheme("");
                }}
                className="flex w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> 초기화
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                <h2 className="text-xl font-bold">완성 프롬프트</h2>
              </div>
              <button
                onClick={copyPrompt}
                className="flex items-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                <Copy className="mr-2 h-4 w-4" /> {copied ? "복사됨" : "복사"}
              </button>
            </div>
            <pre className="min-h-[520px] whitespace-pre-wrap rounded-[1.5rem] bg-white/10 p-5 text-sm leading-7 text-zinc-100 ring-1 ring-white/10">
              {prompt}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
