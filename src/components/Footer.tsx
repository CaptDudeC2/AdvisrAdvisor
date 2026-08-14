import React from 'react';
import { ShieldCheck, Lock, Building2, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md shadow-blue-950/50 border border-blue-400/40">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Advisr<span className="text-blue-400">Advisor</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Intelligent Tech. Human Advocacy. An independent automotive advocacy platform dedicated to eliminating repair overcharging and protecting vehicle owners.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
              <span>Cloudflare DNS Protected</span>
              <span>•</span>
              <span>FastAPI &amp; Supabase Vault</span>
            </div>
          </div>

          {/* Advocacy Standards */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Advocacy Standards
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Tier 1: Minimalist Reactive</li>
              <li>Tier 2: Strict OEM Schedule</li>
              <li>Tier 3: Optimal Longevity</li>
              <li>Mitchell 1 Labor Benchmarking</li>
              <li>AllData Standard Times</li>
            </ul>
          </div>

          {/* Legal & Advocacy */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Advocacy Charter
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Zero-Commission Policy</li>
              <li>No Shop Referral Fees</li>
              <li>Encrypted Vehicle Vault</li>
              <li>Household Vehicle Sweep</li>
              <li>Terms of Service &amp; Privacy</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-left">
          <p>© {new Date().getFullYear()} AdvisrAdvisor Inc. All rights reserved. Operating as an independent customer advocate and ally.</p>
          <div className="flex items-center gap-4">
            <span>256-bit SSL Security</span>
            <span>Mitchell 1™ / AllData™ Calibrated</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
