import React from 'react';
import { ShieldCheck, Car, FileText, Zap, ChevronRight, Sparkles, Building2, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenIntake: (initialSampleId?: string) => void;
  onOpenVault: () => void;
  onOpenSweep: () => void;
  onOpenEmergency: () => void;
  onOpenControlRoom?: () => void;
  vaultCount: number;
  currentView: 'landing' | 'intake' | 'vault';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenIntake,
  onOpenVault,
  onOpenSweep,
  onOpenEmergency,
  onOpenControlRoom,
  vaultCount,
  currentView,
  onNavigateHome
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top micro-banner for Advocate Trust */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-semibold text-blue-400">Independent Advocate:</span>
            <span className="hidden sm:inline text-slate-400">We never accept shop commissions, kickbacks, or referral fees.</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            {onOpenControlRoom && (
              <button
                id="header-advisor-control-room-btn"
                onClick={onOpenControlRoom}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-2 py-0.5 rounded cursor-pointer transition-colors shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Advisor Control Room</span>
              </button>
            )}
            <span className="hidden md:flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              Mitchell 1 & AllData OEM Benchmarked
            </span>
            <span className="text-slate-200 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700 hidden sm:inline">
              Cloudflare DNS Protected
            </span>
          </div>
        </div>
      </div>


      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <button 
          id="brand-logo-btn"
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-950/60 border border-blue-400/40 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                Advisr<span className="text-blue-400">Advisor</span>
              </span>
              <span className="bg-blue-500/15 text-blue-400 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border border-blue-500/30">
                Advocate
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Intelligent Tech. Human Advocacy.
            </p>
          </div>
        </button>

        {/* Center/Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Household Sweep Hook Button */}
          <button
            id="nav-household-sweep-btn"
            onClick={onOpenSweep}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all hover:border-blue-500/40 hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Household VIN Sweep</span>
            <span className="bg-blue-500/20 text-blue-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
              Free CARFAX
            </span>
          </button>

          {/* Vehicle Vault Button */}
          <button
            id="nav-vehicle-vault-btn"
            onClick={onOpenVault}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all"
          >
            <Car className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Vehicle Vault</span>
            <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {vaultCount}
            </span>
          </button>

          {/* Standing in Service Drive? Emergency Fast Action */}
          <button
            id="nav-service-drive-emergency-btn"
            onClick={onOpenEmergency}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-300 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Standing in Service Drive?</span>
          </button>

          {/* Primary Audit Quote Button */}
          <button
            id="nav-audit-quote-primary-btn"
            onClick={() => onOpenIntake()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText className="w-4 h-4 stroke-[2.5]" />
            <span>Audit My Quote</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </header>
  );
};
