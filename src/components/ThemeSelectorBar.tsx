import React from 'react';
import { Palette, Shield, Sparkles, Check, Sun, Moon } from 'lucide-react';

export type ThemeKey = 'cobalt-dark' | 'clean-light-blue' | 'stealth-black-blue' | 'classic-emerald';

export interface ThemeConfig {
  id: ThemeKey;
  name: string;
  subtitle: string;
  tag: string;
  bgHex: string;
  accentHex: string;
  borderHex: string;
  textMode: 'dark' | 'light';
}

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: 'cobalt-dark',
    name: '1. Cobalt & Black (High-Trust Blue)',
    subtitle: 'Deep Obsidian with Electric Cobalt & Cyan',
    tag: 'Recommended Blue Dark',
    bgHex: '#030712',
    accentHex: '#2563eb',
    borderHex: '#1e3a8a',
    textMode: 'dark'
  },
  {
    id: 'clean-light-blue',
    name: '2. Clean Editorial Light (Pacific Blue)',
    subtitle: 'Crisp Porcelain with Sapphire Blue Accents',
    tag: 'Recommended Blue Light',
    bgHex: '#f8fafc',
    accentHex: '#0284c7',
    borderHex: '#cbd5e1',
    textMode: 'light'
  },
  {
    id: 'stealth-black-blue',
    name: '3. Midnight Steel & Neon Ice',
    subtitle: 'Pure Pitch Black with Vivid Neon Blue',
    tag: 'High Contrast Stealth',
    bgHex: '#000000',
    accentHex: '#38bdf8',
    borderHex: '#0c4a6e',
    textMode: 'dark'
  },
  {
    id: 'classic-emerald',
    name: '4. Classic Vault (Green & Slate)',
    subtitle: 'Original Advocate Dark Slate & Emerald',
    tag: 'Original Baseline',
    bgHex: '#020617',
    accentHex: '#10b981',
    borderHex: '#064e3b',
    textMode: 'dark'
  }
];

interface ThemeSelectorBarProps {
  currentTheme: ThemeKey;
  onSelectTheme: (theme: ThemeKey) => void;
}

export const ThemeSelectorBar: React.FC<ThemeSelectorBarProps> = ({
  currentTheme,
  onSelectTheme
}) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/30 px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Label */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-xs tracking-wide uppercase">
                Select Your Visual Design:
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-500/30">
                Live Switcher
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Click any button below to instantly transform the app preview:
            </p>
          </div>
        </div>

        {/* 4 Theme Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full md:w-auto">
          {THEME_PRESETS.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                id={`theme-btn-${t.id}`}
                onClick={() => onSelectTheme(t.id)}
                className={`px-3 py-2 rounded-xl text-left sm:text-center transition-all flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? t.id === 'classic-emerald'
                      ? 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-md ring-2 ring-emerald-400/50 scale-[1.02]'
                      : t.id === 'stealth-black-blue'
                      ? 'bg-sky-600 text-white font-bold border-sky-300 shadow-md ring-2 ring-sky-400/50 scale-[1.02]'
                      : t.id === 'clean-light-blue'
                      ? 'bg-blue-600 text-white font-bold border-blue-300 shadow-md ring-2 ring-blue-400/50 scale-[1.02]'
                      : 'bg-blue-600 text-white font-bold border-blue-400 shadow-md ring-2 ring-blue-400/50 scale-[1.02]'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
                }`}
              >
                {/* Visual Swatch */}
                <div 
                  className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center shrink-0 shadow-inner"
                  style={{ backgroundColor: t.bgHex }}
                >
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: t.accentHex }}
                  />
                </div>

                <div className="leading-tight text-left">
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>{t.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                  <span className={`text-[10px] block ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {t.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
