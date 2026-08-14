import React from 'react';
import { ShieldCheck, Star, ArrowUpRight, TrendingDown, DollarSign } from 'lucide-react';

export const TestimonialsAndAudits: React.FC = () => {
  const recentAudits = [
    {
      vehicle: '2021 Honda Accord Hybrid',
      shopType: 'Dealership Service Drive',
      original: 1485.00,
      fair: 620.00,
      saved: 865.00,
      tier: 'Tier 1: Minimalist',
      flagged: 'Removed unnecessary fuel decarb flush & reduced brake labor from 2.5 to 1.4 hrs.',
      location: 'San Jose, CA'
    },
    {
      vehicle: '2019 BMW 330i xDrive',
      shopType: 'Independent Euro Shop',
      original: 2650.00,
      fair: 1400.00,
      saved: 1250.00,
      tier: 'Tier 2: Strict OEM',
      flagged: 'Contested valve cover sweating repair; verified only hairline coolant hose was required.',
      location: 'Dallas, TX'
    },
    {
      vehicle: '2020 Toyota RAV4 XLE',
      shopType: 'National Franchise Chain',
      original: 960.00,
      fair: 120.00,
      saved: 840.00,
      tier: 'Tier 1: Minimalist',
      flagged: 'Discovered fraudulent quote for hydraulic power steering flush on electric EPS rack.',
      location: 'Chicago, IL'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/30 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Verified Customer Audits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recent Service Drive Overcharges Eliminated
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Every audit generates real, verified savings using industry book times and strict tier filtering.
          </p>
        </div>

        {/* 3 Audit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAudits.map((audit, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all text-left flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{audit.location}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-blue-500/20">
                    {audit.tier}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{audit.vehicle}</h3>
                  <p className="text-xs text-slate-400">{audit.shopType}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Saved</span>
                    <span className="text-xl font-black text-blue-400 font-mono">-${audit.saved.toFixed(2)}</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-slate-500 line-through">${audit.original.toFixed(2)}</span>
                    <span className="text-white font-bold block">${audit.fair.toFixed(2)} Fair</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-900">
                  <strong className="text-slate-200">Audit Finding:</strong> {audit.flagged}
                </p>
              </div>

              <div className="flex items-center gap-1 text-blue-400 text-xs font-semibold pt-2 border-t border-slate-900">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Independent Audit</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
