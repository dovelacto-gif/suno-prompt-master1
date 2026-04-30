"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  Sparkles,
  Copy,
  RefreshCw,
  Wand2,
  Car,
  Moon,
  Waves,
  Trees,
  Cloud,
  Piano,
  Film,
  Stars,
} from "lucide-react";

const PASSWORD = "1334";

const presets = {
  lofiStudy: {
    label: "Lofi Study",
    icon: Moon,
    genre: "Lofi / Chillhop",
    mood: "Calm, focused, cozy",
    tempo: "65–80 BPM",
    vibe: "Warm study-friendly lofi",
    instruments: "Soft piano, mellow drums, vinyl noise, subtle bass",
    vocals: "No vocal",
    theme: "Quiet focus and calm concentration",
    scene: "Desk at night, warm lamp, notebook",
    style: "Minimal, cozy, not too sleepy",
  },
  lofiRain: {
    label: "Lofi Rain",
    icon: Cloud,
    genre: "Lofi / Chillhop",
    mood: "Rainy, calm, emotional",
    tempo: "60–75 BPM",
    vibe: "Rainy night reflection",
    instruments: "Soft piano, vinyl noise, rain ambience, mellow drums",
    vocals: "No vocal",
    theme: "Comfort, solitude, quiet thoughts",
    scene: "Rain outside window, dim room, warm light",
    style: "Immersive, soft, emotional but not sad",
  },
  lofiSleep: {
    label: "Lofi Sleep",
    icon: Moon,
    genre: "Lofi / Ambient Chill",
    mood: "Sleepy, peaceful, soft",
    tempo: "55–70 BPM",
    vibe: "Gentle bedtime lofi",
    instruments: "Soft keys, warm pads, light drums, tape noise",
    vocals: "No vocal",
    theme: "Rest, night calm, peaceful sleep",
    scene: "Late night bedroom, soft blanket, quiet air",
    style: "Very soft, no sharp sounds, relaxing",
  },
  lofiCafe: {
    label: "Lofi Cafe",
    icon: Music,
    genre: "Lofi / Jazzhop",
    mood: "Warm, relaxed, focused",
    tempo: "70–85 BPM",
    vibe: "Cozy cafe study music",
    instruments: "Jazz chords, soft piano, brushed drums with slight swing, subtle vinyl texture",
    vocals: "No vocal",
    theme: "Studying, writing, calm productivity",
    scene: "Warm cafe, soft light, quiet chatter, coffee",
    style: "Smooth groove, cafe ambience, not distracting",
  },
  lofiJazz: {
    label: "Lofi Jazz",
    icon: Piano,
    genre: "Lofi Jazz / Jazzhop",
    mood: "Smooth, classy, warm",
    tempo: "70–90 BPM",
    vibe: "Vintage jazz lounge meets lofi beat",
    instruments: "Jazz piano, upright bass, soft drums, saxophone accents",
    vocals: "No vocal",
    theme: "Relaxed evening, classy mood",
    scene: "Small jazz bar, warm lights, rainy street",
    style: "Jazzy chords, tasteful groove, not too busy",
  },
  ambientDream: {
    label: "Ambient Dream",
    icon: Stars,
    genre: "Ambient / Dream Pop",
    mood: "Dreamy, floating, soft",
    tempo: "Slow, free-flowing",
    vibe: "Ethereal dreamscape",
    instruments: "Soft pads, distant piano, airy textures, long reverb",
    vocals: "No vocal or soft ambient layers",
    theme: "Dreams, memory, floating emotion",
    scene: "Cloudy sky, slow motion, soft light",
    style: "Wide space, gentle layering, evolving texture",
  },
  ambientSpace: {
    label: "Ambient Space",
    icon: Stars,
    genre: "Ambient / Space Music",
    mood: "Cosmic, vast, mysterious",
    tempo: "Slow, atmospheric",
    vibe: "Floating through deep space",
    instruments: "Wide synth pads, deep drones, subtle pulses, shimmer textures",
    vocals: "No vocal",
    theme: "Space, stars, silence, wonder",
    scene: "Stars, galaxy, slow orbit, infinite darkness",
    style: "Expansive, minimal, immersive, not scary",
  },
  ambientForest: {
    label: "Ambient Forest",
    icon: Trees,
    genre: "Ambient / Nature Soundscape",
    mood: "Peaceful, organic, healing",
    tempo: "Very slow, natural flow",
    vibe: "Forest meditation atmosphere",
    instruments: "Soft pads, wooden textures, light piano, forest ambience",
    vocals: "No vocal",
    theme: "Nature, breathing, quiet healing",
    scene: "Deep forest, morning mist, birds, leaves",
    style: "Natural, calm, spacious, organic textures",
  },
  ambientSea: {
    label: "Ambient Sea / Beach",
    icon: Waves,
    genre: "Ambient / Chill",
    mood: "Relaxing, warm, peaceful",
    tempo: "Slow, wave-like rhythm",
    vibe: "Ocean waves and sunset beach",
    instruments: "Soft pads, gentle guitar, ocean ambience, warm textures",
    vocals: "No vocal",
    theme: "Sea, peace, rest, open horizon",
    scene: "Beach at sunset, waves, sea breeze, golden light",
    style: "Calming ocean mood, warm and spacious",
  },
  cityPop: {
    label: "City Pop",
    icon: Car,
    genre: "City Pop / Modern Pop",
    mood: "Bright, stylish, groovy, nostalgic",
    tempo: "95–110 BPM",
    vibe: "Japanese city pop with modern polish",
    instruments: "Funky bass, Rhodes piano, clean guitar, glossy synths, tight drums",
    vocals: "Smooth male or female vocal",
    theme: "Driving, freedom, city lights, good energy",
    scene: "City road, warm night air, passing lights",
    style: "Catchy chorus, clean groove, not too dark",
  },
  jpop: {
    label: "J-Pop",
    icon: Sparkles,
    genre: "J-Pop / Pop Rock",
    mood: "Bright, emotional, energetic",
    tempo: "Mid to up-tempo",
    vibe: "Anime opening energy with heartfelt pop melody",
    instruments: "Electric guitars, bright synths, energetic drums, melodic bass",
    vocals: "Clear, expressive, youthful vocal",
    theme: "Hope, youth, courage, moving forward",
    scene: "Blue sky, city streets, running toward tomorrow",
    style: "Big melodic chorus, emotional lift, catchy hook",
  },
  rnb: {
    label: "RnB",
    icon: Moon,
    genre: "R&B / Pop",
    mood: "Smooth, sensual, emotional",
    tempo: "Slow to mid-tempo",
    vibe: "Modern late-night R&B",
    instruments: "Deep bass, soft drums, atmospheric synths, warm keys",
    vocals: "Breathy, intimate, emotional vocal",
    theme: "Desire, memory, late-night emotions",
    scene: "Dim room, city night, quiet tension",
    style: "Smooth flow, minimal but impactful lyrics",
  },
  neoClassic: {
    label: "Neo Classic",
    icon: Piano,
    genre: "Neo Classical / Minimal Piano",
    mood: "Elegant, emotional, cinematic",
    tempo: "Slow to medium",
    vibe: "Modern classical with intimate piano",
    instruments: "Solo piano, soft strings, subtle ambient textures",
    vocals: "No vocal",
    theme: "Memory, solitude, beauty, quiet emotion",
    scene: "Empty hall, soft light, falling dust, stillness",
    style: "Minimal, graceful, emotional, not overly dramatic",
  },
  cinematicClassic: {
    label: "Cinematic Classic",
    icon: Film,
    genre: "Cinematic Classical / Film Score",
    mood: "Grand, emotional, dramatic",
    tempo: "Slow build",
    vibe: "Movie soundtrack with orchestral emotion",
    instruments: "Piano, strings, brass, orchestral percussion",
    vocals: "No vocal or choir texture",
    theme: "Journey, destiny, farewell, hope",
    scene: "Wide landscape, final scene, emotional climax",
    style: "Dynamic build, strong climax, memorable main theme",
  },
};

type PresetKey = keyof typeof presets;

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-white">
        <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-2xl">
          <h1 className="mb-3 text-2xl font-black">🔒 Suno Prompt Master</h1>
          <p className="mb-6 text-sm text-zinc-300">비밀번호를 입력하세요.</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input === PASSWORD) setUnlocked(true);
            }}
            className="mb-4 w-full rounded-2xl px-4 py-3 text-center text-zinc-950 outline-none"
            placeholder="Password"
          />
          <button
            onClick={() => {
              if (input === PASSWORD) setUnlocked(true);
              else alert("비밀번호가 틀렸습니다.");
            }}
            className="w-full rounded-2xl bg-white px-4 py-3 font-bold text-zinc-950 transition hover:bg-zinc-200"
          >
            Enter
          </button>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

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
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
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

function MainApp() {
  const [presetKey, setPresetKey] = useState<PresetKey>("lofiCafe");
  const [customTheme, setCustomTheme] = useState("");
  const [copied, setCopied] = useState(false);

  const preset = presets[presetKey];

  const prompt = useMemo(() => {
    const theme = customTheme.trim() || preset.theme;

    return `Generate a catchy, non-generic song title.

Genre: ${preset.genre}
Mood: ${preset.mood}
Tempo: ${preset.tempo}
Vibe: ${preset.vibe}

Instruments:
${preset.instruments}

Vocals:
${preset.vocals}

Theme:
${theme}

Scene:
${preset.scene}

Style:
${preset.style}
Not loop-based, avoid repetition
Humanized timing and slight imperfections
Add variations every 8–16 bars
Evolving arrangement with natural dynamics

Length:
At least 3 minutes.
Target duration: 3:00–3:30.
Use a full extended arrangement and do not end early.

Structure:
Intro (8 bars), Verse 1, Build,
Hook, Verse 2, Hook,
Bridge / Instrumental Break,
Final extended Hook,
Outro (fade out)`;
  }, [preset, customTheme]);

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
              원하는 음악을
              <br />
              프롬프트로 정확하게.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 md:text-lg">
              3분 길이를 목표로 하는 Suno용 장르별 프롬프트를 만듭니다.
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
                options={Object.entries(presets).map(([value, item]) => ({
                  value,
                  label: item.label,
                }))}
              />

              <TextField
                label="커스텀 주제"
                value={customTheme}
                onChange={setCustomTheme}
                placeholder="비워두면 프리셋 주제를 사용해요"
              />

              <button
                onClick={() => {
                  setPresetKey("lofiCafe");
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

export default function SunoPromptMaster() {
  return (
    <PasswordGate>
      <MainApp />
    </PasswordGate>
  );
}
