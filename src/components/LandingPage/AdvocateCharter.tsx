import React from 'react';
import { ShieldCheck, CheckCircle, Scale } from 'lucide-react';

export const AdvocateCharter: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Independent Advocate Standard Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Scale className="w-3.5 h-3.5" />
              <span>The AdvisrAdvisor Legal Standard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Why We Are an Independent Advocate, Not a Lead-Gen Directory
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Most online repair tools take commissions from mechanics, sell repair leads, or charge shops a monthly directory fee. <strong>AdvisrAdvisor refuses all shop revenue.</strong>
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Our allegiance is 100% to the vehicle owner. When we audit a repair quote, our sole mandate as your independent guide is ensuring you pay strictly for necessary OEM work at industry-standard labor book rates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>Zero Shop Kickbacks</span>
                </div>
                <p className="text-xs text-slate-400">
                  We never take affiliate percentages from repair invoices.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>Objective Labor Times</span>
                </div>
                <p className="text-xs text-slate-400">
                  Audited against Mitchell 1 & AllData standard warranty flat-rate guides.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>Parts MSRP Whitelist</span>
                </div>
                <p className="text-xs text-slate-400">
                  We flag and contest predatory markups exceeding fair wholesale margins.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>Data Vault Privacy</span>
                </div>
                <p className="text-xs text-slate-400">
                  Your repair history and CARFAX data stay encrypted in your private Vehicle Vault.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Independent Advocate Seal / Pledge Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-blue-500/40 shadow-2xl space-y-6 text-left relative">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  SEAL OF ADVOCACY
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">The AdvisrAdvisor Pledge</h3>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &quot;We act as your independent automotive ally and guardian. We will never recommend unneeded work, we will contest labor padding, and we will arm you with the exact technical language required to stop service drive overcharging.&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-blue-400 font-bold">AdvisrAdvisor Core Protocol</span>
                <span>FastAPI + Supabase Vault</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

