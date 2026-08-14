import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  Car, 
  CheckCircle2, 
  FileCheck2, 
  AlertTriangle, 
  Clock, 
  Upload,
  Lock,
  ChevronRight,
  Wrench,
  Receipt,
  History
} from 'lucide-react';

interface HeroSectionProps {
  onStartVinSweep: (vin: string) => void;
  onOpenIntake: (sampleId?: string) => void;
  onOpenEmergency: () => void;
  onOpenVehicleVault?: () => void;
  onOpenAddToVault?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartVinSweep,
  onOpenIntake,
  onOpenEmergency,
  onOpenVehicleVault,
  onOpenAddToVault
}) => {
  const [vinInput, setVinInput] = useState('');
  const [inputMode, setInputMode] = useState<'vin' | 'plate' | 'upload'>('vin');
  const [plateInput, setPlateInput] = useState('');
  const [stateInput, setStateInput] = useState('CA');

  const handleSweepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMode === 'vin') {
      onStartVinSweep(vinInput || '1HGCR2F83HA019482');
    } else if (inputMode === 'plate') {
      onStartVinSweep(plateInput || '7XYZ890');
    } else {
      onOpenIntake();
    }
  };

  const sampleVins = [
    { label: 'Honda Accord Hybrid', vin: '1HGCR2F83HA019482' },
    { label: 'BMW 330i xDrive', vin: 'WBA33AY08KFP81923' },
    { label: 'Hyundai Santa Fe', vin: '5NMS33AD4NH119044' }
  ];

  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(37,99,235,0.18),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(30,58,138,0.2),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Primary Hooks */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Advocate Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-semibold text-blue-400">Independent Automotive Advocate</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Intelligent Tech. Human Advocacy.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Never Overpay at the Repair Shop Again.
            </h1>

            {/* Subhead with clear value proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              We audit dealer and mechanic estimates against <strong className="text-white">OEM labor book times</strong> and your chosen <strong className="text-blue-400">preference tier</strong> to eliminate labor padding, inflated parts, and predatory upsells.
            </p>

            {/* Primary Hook Container: Frictionless VIN & Household Vehicle Sweep */}
            <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl shadow-slate-950/80 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Primary Onboarding Hook
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free CARFAX for Up to 10 Household Vehicles</span>
                </div>
              </div>

              {/* Mode Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl mb-4 text-xs font-medium border border-slate-800">
                <button
                  id="tab-vin-mode"
                  type="button"
                  onClick={() => setInputMode('vin')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    inputMode === 'vin'
                      ? 'bg-slate-800 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>1. Enter VIN</span>
                </button>
                <button
                  id="tab-upload-mode"
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    inputMode === 'upload'
                      ? 'bg-slate-800 text-blue-400 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>2. Snap Quote / MPVI</span>
                </button>
                <button
                  id="tab-plate-mode"
                  type="button"
                  onClick={() => setInputMode('plate')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    inputMode === 'plate'
                      ? 'bg-slate-800 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>3. License Plate</span>
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSweepSubmit} className="space-y-3">
                {inputMode === 'vin' && (
                  <div className="space-y-2">
                    {/* Sleek, medium-weight sub-headline to reinforce trust */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>The tech you need, the human you trust.</span>
                      </p>
                      <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                        Instant OEM Labor Audit
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          id="hero-vin-input"
                          type="text"
                          value={vinInput}
                          onChange={(e) => setVinInput(e.target.value)}
                          placeholder="Enter 17-character VIN (e.g. 1HGCR2F83HA019482)"
                          className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 uppercase"
                          maxLength={17}
                        />
                        <button
                          type="button"
                          onClick={() => setVinInput('1HGCR2F83HA019482')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-blue-400 hover:text-blue-300 bg-slate-800 px-2 py-1 rounded border border-slate-700"
                        >
                          Try Demo VIN
                        </button>
                      </div>
                      <button
                        id="hero-run-sweep-btn"
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Sparkles className="w-4 h-4 stroke-[2.5]" />
                        <span>Run Household Sweep</span>
                      </button>
                    </div>

                    {/* Quick Demo VIN Pills */}
                    <div className="flex flex-wrap items-center gap-2 mt-2 pt-1 text-xs text-slate-400">
                      <span className="text-slate-500">Quick Test VINs:</span>
                      {sampleVins.map((s) => (
                        <button
                          key={s.vin}
                          type="button"
                          onClick={() => setVinInput(s.vin)}
                          className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60 text-[11px]"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {inputMode === 'upload' && (
                  <div className="space-y-3">
                    <div 
                      onClick={() => onOpenIntake()}
                      className="border-2 border-dashed border-blue-500/40 hover:border-blue-500 bg-blue-950/20 hover:bg-blue-950/30 rounded-xl p-4 text-center cursor-pointer transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            Tap to Upload Quote, PDF, or Snap Inspection Photo
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Standing in service drive? Snap photo now for instant line-item audit
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      id="hero-launch-intake-btn"
                      type="button"
                      onClick={() => onOpenIntake()}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                    >
                      <FileCheck2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Launch Full Intake Flow (Zero Friction)</span>
                    </button>
                  </div>
                )}

                {inputMode === 'plate' && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex gap-2 flex-1">
                      <select
                        value={stateInput}
                        onChange={(e) => setStateInput(e.target.value)}
                        className="w-20 px-2 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="CA">CA</option>
                        <option value="TX">TX</option>
                        <option value="FL">FL</option>
                        <option value="NY">NY</option>
                        <option value="IL">IL</option>
                        <option value="WA">WA</option>
                      </select>
                      <input
                        type="text"
                        value={plateInput}
                        onChange={(e) => setPlateInput(e.target.value)}
                        placeholder="e.g. 7XYZ890"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-blue-500 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                      <span>Lookup Plate</span>
                    </button>
                  </div>
                )}
              </form>

              {/* Bottom Guarantee Micro-copy */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>256-bit encrypted • Zero sales calls</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400 font-medium">
                  <span>Auditing 100% of major vehicle makes</span>
                </div>
              </div>
            </div>

            {/* Quick Advocate Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Labor Book Benchmarked</p>
                  <p className="text-[11px] text-slate-400">Mitchell1 & AllData standard warranty hours</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">3 Advocate Tiers</p>
                  <p className="text-[11px] text-slate-400">Reactive, Strict OEM, or Optimal Care</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Under 90 Seconds</p>
                  <p className="text-[11px] text-slate-400">Get pushback script while standing in the drive</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Mobile Advocate Audit Card Preview */}
          <div className="lg:col-span-5 space-y-4">
            {/* DIY Service Work & Warranty Vault Secondary Card Badge */}
            <div className="mx-auto max-w-sm sm:max-w-md">
              <button
                type="button"
                id="diy-service-warranty-card"
                onClick={() => {
                  if (onOpenAddToVault) {
                    onOpenAddToVault();
                  } else if (onOpenVehicleVault) {
                    onOpenVehicleVault();
                  } else {
                    onOpenIntake();
                  }
                }}
                className="w-full group relative p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 hover:from-slate-850 hover:to-slate-900 border border-slate-700/80 hover:border-blue-500/60 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 flex items-center justify-between text-left cursor-pointer hover:-translate-y-1 active:translate-y-0"
              >
                {/* Subtle corner badge / indicator */}
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-400 transition-all">
                    <span role="img" aria-label="gear">⚙️</span>
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm sm:text-[15px] font-bold text-white group-hover:text-blue-300 transition-colors">
                        Do your own service work?
                      </p>
                      <span className="bg-blue-500/15 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-blue-500/30 shrink-0">
                        DIY Vault
                      </span>
                    </div>
                    <p className="text-xs text-slate-300/90 leading-snug">
                      Log receipts &amp; build your verified warranty history
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 group-hover:bg-blue-600 group-hover:border-blue-500 text-slate-300 group-hover:text-white transition-all shrink-0">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>

            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Glow Accent */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-3xl blur-xl opacity-75 animate-pulse" />
              
              {/* Mock Mobile Device / Advocate Card */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 space-y-4 text-left">
                
                {/* Header of Audit Card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Live Estimate Audit Result
                    </span>
                  </div>
                  <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2 py-0.5 rounded border border-red-500/20">
                    68% Risk: Overcharged
                  </span>
                </div>

                {/* Vehicle & Shop Badge */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">2021 Honda CR-V AWD (61.4k mi)</span>
                    <span className="text-slate-400 font-mono text-[11px]">Metro Honda Center</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                      Selected: <strong>Tier 1 (Minimalist Reactive)</strong>
                    </span>
                  </div>
                </div>

                {/* Savings Summary Banner */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Advocate Audit Savings</p>
                    <p className="text-2xl font-black text-blue-400 font-mono">-$980.00</p>
                    <p className="text-[11px] text-slate-400">Shop Quote: <s className="text-slate-500">$1,845.00</s> → Fair: <strong className="text-white">$865.00</strong></p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-xs">
                      53% Reduced
                    </span>
                  </div>
                </div>

                {/* Flagged Line Items Mock */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-red-500/30 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="font-bold text-slate-200">Fuel Induction Decarb Flush</span>
                      </div>
                      <p className="text-[11px] text-red-300 mt-0.5">
                        Tier 1 Rejection: Non-OEM chemical flush. Zero misfire codes.
                      </p>
                    </div>
                    <span className="font-mono font-bold text-red-400 shrink-0">-$345</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-amber-500/30 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-bold text-slate-200">Front Brake Pads & Rotors Labor</span>
                      </div>
                      <p className="text-[11px] text-amber-300 mt-0.5">
                        Labor Padded: Quoted 2.4 hrs vs Mitchell Book 1.3 hrs.
                      </p>
                    </div>
                    <span className="font-mono font-bold text-amber-400 shrink-0">-$187</span>
                  </div>
                </div>

                {/* Action Script Preview */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <p className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Service Drive Pushback Script:
                  </p>
                  <p className="text-slate-400 italic text-[11px] leading-relaxed">
                    &quot;Please remove the $345 fuel decarb flush as my independent advocate guidelines follow OEM specifications, and adjust the front brake labor from 2.4 to the standard Mitchell 1.3 book hours.&quot;
                  </p>
                </div>

                {/* CTA Button in Card */}
                <button
                  id="hero-card-test-btn"
                  onClick={() => onOpenIntake('sample-1')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <span>Test Interactive Audit Demo</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
