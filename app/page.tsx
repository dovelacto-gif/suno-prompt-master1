"use client";

import React, { useState, useMemo } from "react";

const PASSWORD = "1334";

const presets = {
  lofi: {
    label: "Lofi Study",
    genre: "Lofi / Chillhop",
    mood: "Calm, cozy, focused",
    tempo: "60–80 BPM",
    vibe: "Study-friendly, warm",
    instruments: "Soft piano, vinyl noise, mellow drums",
    theme: "Quiet focus, night study",
  },
  citypop: {
    label: "City Pop",
    genre: "City Pop",
    mood: "Bright, nostalgic",
    tempo: "95–110 BPM",
    vibe: "Japanese city pop groove",
    instruments: "Funky bass, rhodes, clean guitar",
    theme: "Driving, freedom",
  },
};

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
  const [presetKey, setPresetKey] = useState<keyof typeof presets>("lofi");
  const [theme, setTheme] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [prompt, setPrompt] = useState("");

  const preset = presets[presetKey];

  // 🎤 가사 생성
  const generateLyrics = () => {
    const result = `
[Verse 1]
Walking through the quiet night
Lights are fading out of sight

[Pre-Chorus]
Something in the air feels right

[Chorus]
We keep moving, we keep going
Through the dark, our hearts are glowing

[Verse 2]
Every step a little clearer
Every dream is getting nearer

[Bridge]
Hold on, don’t let go

[Final Chorus]
We keep moving, we keep going
Now we finally start to show it
    `;
    setGeneratedLyrics(result);
  };

  // 🎧 음악 프롬프트 생성
  const generateMusicPrompt = () => {
    const finalLyrics = generatedLyrics || lyrics;

    const result = `
Genre: ${preset.genre}
Mood: ${preset.mood}
Tempo: ${preset.tempo}
Vibe: ${preset.vibe}

Instruments: ${preset.instruments}

Theme: ${theme || preset.theme}

Song Length:
- at least 2 minutes
- extended structure

Structure:
- Intro
- Verse 1
- Pre-Chorus
- Chorus
- Verse 2
- Chorus
- Bridge
- Final Chorus
- Outro

Use these lyrics:
${finalLyrics}
    `;

    setPrompt(result);
  };

  return (
    <PasswordGate>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Suno Prompt Tool</h1>

        {/* 프리셋 */}
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

        {/* 주제 */}
        <input
          placeholder="Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border p-2 w-full"
        />

        {/* 가사 입력 */}
        <textarea
          placeholder="직접 가사 입력"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          className="border p-2 w-full h-32"
        />

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={generateLyrics}
            className="bg-blue-500 text-white px-4 py-2"
          >
            🎤 가사 생성
          </button>

          <button
            onClick={generateMusicPrompt}
            className="bg-green-500 text-white px-4 py-2"
          >
            🎧 음악 생성
          </button>
        </div>

        {/* 생성된 가사 */}
        <pre className="bg-gray-100 p-3 whitespace-pre-wrap">
          {generatedLyrics}
        </pre>

        {/* 최종 프롬프트 */}
        <pre className="bg-black text-white p-3 whitespace-pre-wrap">
          {prompt}
        </pre>
      </div>
    </PasswordGate>
  );
}
