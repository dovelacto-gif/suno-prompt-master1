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
  lofiCafe: {
    label: "Lofi Cafe",
    icon: Music,
    genre: "Lofi / Jazzhop",
    mood: "Warm, relaxed, focused",
    tempo: "70–85 BPM",
    vibe: "Cozy cafe study music",
    instruments:
      "Jazz chords, soft piano, brushed drums with slight swing, subtle vinyl texture",
    vocals: "No vocal",
    theme: "Studying, writing, calm productivity",
    scene: "Warm cafe, soft light, quiet chatter, coffee",
    style: "Smooth groove, cafe ambience, not distracting",
  },
  cityPop: {
    label: "City Pop",
    icon: Car,
    genre: "City Pop / Modern Pop",
    mood: "Bright, stylish, nostalgic",
    tempo: "95–110 BPM",
    vibe: "Urban driving groove",
    instruments:
      "Funky bass, rhodes, clean guitar, glossy synths, tight drums",
    vocals: "Smooth male or female vocal",
    theme: "Driving, freedom, city life",
    scene: "Night drive, city lights, warm air",
    style: "Catchy chorus, clean groove",
  },
};

type PresetKey = keyof typeof presets;

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [ok, setOk] = useState(false);

  if (!ok) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-3 text-black"
          />
          <button
            onClick={() => {
              if (input === PASSWORD) setOk(true);
              else alert("틀림");
            }}
            className="ml-2 bg-white px-3 py-2 text-black"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default function Page() {
  const [presetKey, setPresetKey] = useState<PresetKey>("lofiCafe");
  const [customTheme, setCustomTheme] = useState("");
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const preset = presets[presetKey];

  // 🎧 음악 프롬프트
  const musicPrompt = useMemo(() => {
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

  // 🎤 가사 프롬프트
  const lyricsPrompt = useMemo(() => {
    const theme = customTheme.trim() || preset.theme;

    return `Write song lyrics with strong human emotion and vivid imagery.

Theme:
${theme}

Requirements:
- Do NOT use generic emotional words directly
- Show emotions through scenes, objects, and actions
- Every line should create a visual image

Style:
- Slightly poetic but natural
- Not overly complex
- Avoid cliché AI-style phrases

Structure:
Verse 1 / Pre-Chorus / Chorus / Verse 2 / Bridge / Final Chorus

Hook:
- Make a memorable, quotable line

Tone:
- Human, imperfect, real

Extra:
- Use contrast (light/dark, warm/cold)
- Create lines that feel like real life moments`;
  }, [preset, customTheme]);

  const copy1 = async () => {
    await navigator.clipboard.writeText(musicPrompt);
    setCopied1(true);
    setTimeout(() => setCopied1(false), 1200);
  };

  const copy2 = async () => {
    await navigator.clipboard.writeText(lyricsPrompt);
    setCopied2(true);
    setTimeout(() => setCopied2(false), 1200);
  };

  return (
    <PasswordGate>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Suno Prompt Tool</h1>

        <select
          value={presetKey}
          onChange={(e) => setPresetKey(e.target.value as any)}
          className="border p-2"
        >
          {Object.entries(presets).map(([key, p]) => (
            <option key={key} value={key}>
              {p.label}
            </option>
          ))}
        </select>

        <input
          placeholder="Theme (optional)"
          value={customTheme}
          onChange={(e) => setCustomTheme(e.target.value)}
          className="border p-2 w-full"
        />

        {/* 결과 영역 */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* 음악 */}
          <div>
            <div className="flex justify-between mb-2">
              <h2 className="font-bold">🎧 Music Prompt</h2>
              <button onClick={copy1}>
                {copied1 ? "복사됨" : "복사"}
              </button>
            </div>
            <pre className="bg-black text-white p-3 whitespace-pre-wrap">
              {musicPrompt}
            </pre>
          </div>

          {/* 가사 */}
          <div>
            <div className="flex justify-between mb-2">
              <h2 className="font-bold">🎤 Lyrics Prompt</h2>
              <button onClick={copy2}>
                {copied2 ? "복사됨" : "복사"}
              </button>
            </div>
            <pre className="bg-gray-100 p-3 whitespace-pre-wrap">
              {lyricsPrompt}
            </pre>
          </div>
        </div>
      </div>
    </PasswordGate>
  );
}
