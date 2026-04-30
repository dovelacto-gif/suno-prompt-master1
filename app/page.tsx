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
  Sun,
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
    tempo: "Slow to mid-slow, 65–80 BPM",
    vibe: "Study-friendly, warm and minimal",
    instruments: "Soft piano, mellow drums, vinyl noise, subtle bass",
    vocals: "No vocal or very soft humming",
    theme: "Quiet focus and calm concentration",
    scene: "Desk at night, warm lamp, notebook, gentle silence",
    special: "background-friendly, loopable, not too sleepy",
  },
  lofiRain: {
    label: "Lofi Rain",
    icon: Cloud,
    genre: "Lofi / Chillhop",
    mood: "Rainy, calm, emotional, cozy",
    tempo: "Slow, 60–75 BPM",
    vibe: "Rainy night focus with warm atmosphere",
    instruments: "Soft piano, vinyl noise, rain ambience, mellow drums",
    vocals: "No vocal or soft vocal chops",
    theme: "Comfort, reflection, quiet emotions",
    scene: "Rain outside the window, dim room, warm light",
    special: "immersive rain mood, emotional but not sad",
  },
  lofiSleep: {
    label: "Lofi Sleep",
    icon: Moon,
    genre: "Lofi / Ambient Chill",
    mood: "Sleepy, peaceful, soft, warm",
    tempo: "Very slow, 55–70 BPM",
    vibe: "Gentle bedtime lofi",
    instruments: "Soft keys, warm pads, very light drums, tape noise",
    vocals: "No vocal",
    theme: "Rest, night calm, peaceful sleep",
    scene: "Late night bedroom, soft blanket, quiet air",
    special: "very soft, no sharp sounds, relaxing and loop-friendly",
  },
  lofiCafe: {
    label: "Lofi Cafe",
    icon: Music,
    genre: "Lofi / Jazzhop",
    mood: "Warm, relaxed, focused",
    tempo: "70–85 BPM",
    vibe: "Cozy cafe study music",
    instruments: "Jazz chords, soft piano, brushed drums, vinyl texture",
    vocals: "No vocal",
    theme: "Studying, writing, calm productivity",
    scene: "Cafe, warm light, quiet chatter, coffee cup",
    special: "not distracting, smooth groove, cafe ambience",
  },
  lofiJazz: {
    label: "Lofi Jazz",
    icon: Piano,
    genre: "Lofi Jazz / Jazzhop",
    mood: "Smooth, classy, warm",
    tempo: "70–90 BPM",
    vibe: "Vintage jazz lounge meets lofi beat",
    instruments: "Jazz piano, upright bass, soft drums, saxophone accents",
    vocals: "No vocal or subtle vocal texture",
    theme: "Relaxed evening, classy mood",
    scene: "Small jazz bar, warm lights, rainy street outside",
    special: "jazzy chords, tasteful groove, not too busy",
  },
  ambientDream: {
    label: "Ambient Dream",
    icon: Stars,
    genre: "Ambient / Dream Pop",
    mood: "Dreamy, floating, soft",
    tempo: "Slow, free-flowing",
    vibe: "Ethereal dreamscape",
    instruments: "Soft pads, distant piano, airy textures, gentle reverb",
    vocals: "No vocal or distant angelic vocal layers",
    theme: "Dreams, memory, floating emotion",
    scene: "Cloudy dream world, soft light, slow motion",
    special: "wide space, gentle movement, cinematic softness",
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
    special: "expansive, minimal, immersive, not scary",
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
    scene: "Deep forest, morning mist, birds, leaves moving",
    special: "natural, calm, spacious, organic textures",
  },
  ambientSea: {
    label: "Ambient Sea / Beach",
    icon: Waves,
    genre: "Ambient / Chill",
    mood: "Relaxing, warm, peaceful",
    tempo: "Slow, wave-like rhythm",
    vibe: "Ocean waves and sunset beach",
    instruments: "Soft pads, gentle guitar, ocean ambience, warm textures",
    vocals: "No vocal or soft distant humming",
    theme: "Sea, peace, rest, open horizon",
    scene: "Beach at sunset, waves, sea breeze, golden light",
    special: "calming ocean mood, warm and spacious",
  },
  cityPop: {
    label: "City Pop",
    icon: Car,
    genre: "City Pop / Modern Pop",
    mood: "Bright, stylish, groovy, slightly nostalgic",
    tempo: "Mid-tempo, 95–110 BPM",
    vibe: "Japanese city pop with modern pop polish",
    instruments: "Funky bassline, Rhodes piano, clean guitar, glossy synths, tight drums",
    vocals: "Smooth male or female vocal, airy and stylish",
    theme: "Driving, freedom, city lights, good energy",
    scene: "City road, warm night air, passing lights",
    special: "catchy chorus, clean groove, not too dark",
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
    special: "big melodic chorus, emotional lift, catchy hook",
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
    special: "smooth flow, minimal but impactful lyrics",
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
    special: "minimal, emotional, graceful, not overly dramatic",
  },
  cinematicClassic: {
    label: "Cinematic Classic",
    icon: Film,
    genre: "Cinematic Classical / Film Score",
    mood: "Grand, emotional, dramatic",
    tempo: "Slow build to powerful climax",
    vibe: "Movie soundtrack with orchestral emotion",
    instruments: "Piano, strings, brass, timpani, cinematic percussion",
    vocals: "No vocal or choir-like background texture",
    theme: "Journey, destiny, farewell, hope",
    scene: "Wide landscape, final scene, emotional climax",
    special: "cinematic build, strong emotional arc, memorable main theme",
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

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
        checked
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
      }`}
    >
      <span>{label}</span>
      <span>{checked ? "ON" : "OFF"}</span>
    </button>
  );
}

function MainApp() {
  const [presetKey, setPresetKey] = useState<PresetKey>("lofiStudy");
  const [songTitle, setSongTitle] = useState("Untitled Lofi Track");
  const [hook, setHook] = useState("");
  const [language, setLanguage] = useState("Instrumental");
  const [customTheme, setCustomTheme] = useState("");
  const [autoTitle, setAutoTitle] = useState(true);
  const [autoLyrics, setAutoLyrics] = useState(true);
  const [longSong, setLongSong] = useState(true);
  const [copied, setCopied] = useState(false);

  const preset = presets[presetKey];

  const prompt = useMemo(() => {
  const theme = customTheme.trim() || preset.theme;

  return `${autoTitle ? "Generate a catchy, non-generic song title." : `Title: ${songTitle}`}

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
${preset.special}
Not loop-based, avoid repetition
Humanized timing and slight imperfections
Add variations every 8–16 bars
Evolving arrangement with natural dynamics

Length:
${longSong ? "At least 2 min (target 2.5–3 min)" : "Around 2 min"}

Structure:
Intro (8 bars), Verse, Build, Hook,
Verse 2, Hook, Bridge,
Final extended section, Outro (fade out)${
    hook.trim() ? `\n\nHook / Keyword:\n${hook}` : ""
  }`;
}, [
  preset,
  songTitle,
  hook,
  customTheme,
  autoTitle,
  longSong,
]);
