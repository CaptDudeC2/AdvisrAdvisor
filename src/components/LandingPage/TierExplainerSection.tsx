import React, { useState } from 'react';
import { TIERS_DATA } from '../../data/tiersData';
import { TierId } from '../../types';
import { 
  ShieldAlert, 
  BookOpenCheck, 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  Info,
  CheckCircle2,
  TrendingDown,
  Layers
} from 'lucide-react';

interface TierExplainerSectionProps {
  onSelectTierForIntake: (tierId: TierId) => void;
}

export const TierExplainerSection: React.FC<TierExplainerSectionProps> = ({ onSelectTierForIntake }) => {
  const [activeTab, setActiveTab] = useState<TierId>('tier-1');

  const comparisonRows = [
    {
      label: 'Primary Objective',
      tier1: 'Immediate cash preservation & active safety',
      tier2: 'Exact OEM manual compliance & warranty preservation',
      tier3: 'Maximum vehicle lifespan past 200,000 miles'
    },
    {
      label: 'Worn Brake Pads (<3mm) & Rotors',
      tier1: 'Approved (Safety Mandatory)',
      tier2: 'Approved (OEM Standard)',
      tier3: 'Approved (Premium Rotor Match)'
    },
    {
      label: 'Preventative Chemical Flushes (Fuel, Steering)',
      tier1: 'REJECTED (Non-essential)',
      tier2: 'REJECTED (Not in OEM Manual)',
      tier3: 'Approved (Fair rate only)'
    },
    {
      label: 'Brake Fluid Exchange',
      tier1: 'Rejected unless moisture >4%',
      tier2: 'Approved strictly at OEM 3yr/36k mi',
      tier3: 'Approved proactively (DOT 4 LV)'
    },
    {
      label: 'Spark Plugs & Ignition Coils',
      tier1: 'Only if active misfire DTC code',
      tier2: 'Approved at exact manual mileage',
      tier3: 'Approved proactively with iridium plugs'
    },
    {
      label: 'Labor Hours Benchmarking',
      tier1: 'Mitchell 1 Flat-Rate Enforced',
      tier2: 'Mitchell 1 Flat-Rate Enforced',
      tier3: 'Mitchell 1 Flat-Rate Enforced'
    },
    {
      label: 'Estimated Shop Bill Reduction',
      tier1: '40% – 65% Reduction',
      tier2: '25% – 45% Reduction',
      tier3: '15% – 30% Reduction'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Advocate Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The 3 Customer Tiers: You Set the Boundary, We Enforce It
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Automotive repair is rarely all-or-nothing. By selecting your preference tier before submitting an estimate, you instruct our independent advocate engine on exactly how aggressively to audit your repair order.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Tier 1 Card */}
          <div className="rounded-2xl bg-slate-900 border-2 border-slate-700/80 hover:border-blue-500/80 p-6 flex flex-col justify-between shadow-xl transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 text-blue-300 border border-blue-500/30">
                  40% – 65% Savings
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Tier 1
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Minimalist Reactive
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fix active mechanical failures and safety items only.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                &quot;If my vehicle drives safely without warning lights or immediate hazard, do not charge me for it.&quot;
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Approve:</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Active safety items (brake pads &lt;3mm)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Verified DTC check engine failures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Standard engine oil & filter service</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Reject:</p>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Preventative chemical flushes & decarbonizing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Premature fluid changes without test strips</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              id="tier-1-select-btn"
              onClick={() => onSelectTierForIntake('tier-1')}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
            >
              <span>Select Tier 1 for Intake</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Tier 2 Card (Recommended / Most Common) */}
          <div className="rounded-2xl bg-slate-900 border-2 border-blue-500 p-6 flex flex-col justify-between shadow-2xl relative transition-all ring-1 ring-blue-500/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
              Most Popular • Warranty Preserving
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <BookOpenCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30">
                  25% – 45% Savings
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Tier 2
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Strict OEM Schedule
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adhere strictly to manufacturer service manual by exact mileage.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                &quot;Do exactly what the factory engineers prescribed—no more, no dealer packages.&quot;
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Approve:</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Exact OEM owner manual mileage intervals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Factory scheduled spark plugs & transmission fluids</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Genuine OEM / OES replacement parts</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Reject:</p>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Dealer-invented severe service add-ons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Padded labor hours above standard book time</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              id="tier-2-select-btn"
              onClick={() => onSelectTierForIntake('tier-2')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-950/50"
            >
              <span>Select Tier 2 for Intake</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Tier 3 Card */}
          <div className="rounded-2xl bg-slate-900 border-2 border-amber-500/40 hover:border-amber-500 p-6 flex flex-col justify-between shadow-xl transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                  15% – 30% Savings
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Tier 3
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Optimal Care
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Aggressive preventative care & fleet longevity engineering.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                &quot;I want my car to run in pristine condition to 250k miles, but charge me honest labor.&quot;
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Approve:</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Proactive cooling system & thermostat refresh</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Direct-injection carbon cleaning & premium fluids</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Proactive fluid cycling before thermal breakdown</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Reject:</p>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Labor hour padding (we strictly benchmark hours)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Parts price gouging &gt;30% over wholesale MSRP</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              id="tier-3-select-btn"
              onClick={() => onSelectTierForIntake('tier-3')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Select Tier 3 for Intake</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-x-auto text-left">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Full Tier Side-by-Side Comparison Matrix</span>
            </h4>
            <span className="text-xs text-slate-400">
              Auditor standard across all makes & models
            </span>
          </div>

          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-3 font-semibold uppercase tracking-wider">Service Scope</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-blue-400">Tier 1 (Minimalist)</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-sky-400">Tier 2 (Strict OEM)</th>
                <th className="py-3 px-3 font-semibold uppercase tracking-wider text-indigo-400">Tier 3 (Optimal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{row.label}</td>
                  <td className="py-3 px-3 text-blue-300">{row.tier1}</td>
                  <td className="py-3 px-3 text-sky-300">{row.tier2}</td>
                  <td className="py-3 px-3 text-indigo-300">{row.tier3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
