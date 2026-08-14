import React, { useState } from 'react';
import { 
  SAMPLE_ESTIMATES, 
  computeAuditForTier 
} from '../../data/sampleAudits';
import { TIERS_DATA } from '../../data/tiersData';
import { TierId } from '../../types';
import { 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  X, 
  Copy, 
  ArrowRight, 
  HelpCircle, 
  Wrench, 
  FileText, 
  DollarSign, 
  Clock, 
  Sparkles 
} from 'lucide-react';

interface LiveAuditSimulatorProps {
  onOpenFullIntake: (sampleId: string, tier: TierId) => void;
}

export const LiveAuditSimulator: React.FC<LiveAuditSimulatorProps> = ({ onOpenFullIntake }) => {
  const [selectedEstimateId, setSelectedEstimateId] = useState<string>('sample-1');
  const [selectedTier, setSelectedTier] = useState<TierId>('tier-1');
  const [copiedScript, setCopiedScript] = useState(false);

  const currentEstimate = SAMPLE_ESTIMATES.find(e => e.id === selectedEstimateId) || SAMPLE_ESTIMATES[0];
  const auditResult = computeAuditForTier(currentEstimate, selectedTier);
  const tierInfo = TIERS_DATA[selectedTier];

  const handleCopyScript = () => {
    const fullScript = auditResult.counterScript.join('\n\n');
    navigator.clipboard.writeText(fullScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <section className="py-16 bg-slate-900/60 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Advocate Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See How Your Chosen Tier Reshapes Any Repair Quote
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Select a real-world repair estimate below and toggle between customer tiers to observe how our independent advocate engine filters non-essential items and corrects labor padding in real time.
          </p>
        </div>

        {/* 1. Select Estimate Preset Tabs */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-left">
            1. Select a Sample Repair Quote:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SAMPLE_ESTIMATES.map((est) => {
              const isSelected = est.id === selectedEstimateId;
              return (
                <button
                  key={est.id}
                  id={`simulator-select-${est.id}`}
                  onClick={() => setSelectedEstimateId(est.id)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-950/50 text-white ring-1 ring-blue-500/30'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-blue-400 font-bold">
                      ${est.quotedTotal.toFixed(2)} Quoted
                    </span>
                    <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {est.shopType}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{est.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {est.vehicle.year} {est.vehicle.make} {est.vehicle.model} ({est.vehicle.mileage.toLocaleString()} mi)
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Select Customer Tier Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 text-left">
              2. Select Customer Preference Tier:
            </label>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Every tier enforces standard labor book times
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(['tier-1', 'tier-2', 'tier-3'] as TierId[]).map((tId) => {
              const tier = TIERS_DATA[tId];
              const isSelected = selectedTier === tId;
              
              let borderClass = 'border-slate-800 hover:border-slate-700';
              let activeBg = 'bg-slate-800';
              let badgeColor = 'text-blue-400 bg-blue-950/80 border-blue-500/30';
              
              if (tId === 'tier-2') {
                badgeColor = 'text-sky-400 bg-sky-950/80 border-sky-500/30';
              } else if (tId === 'tier-3') {
                badgeColor = 'text-indigo-400 bg-indigo-950/80 border-indigo-500/30';
              }

              if (isSelected) {
                borderClass = tId === 'tier-1' ? 'border-blue-500 ring-2 ring-blue-500/20' : tId === 'tier-2' ? 'border-sky-500 ring-2 ring-sky-500/20' : 'border-indigo-500 ring-2 ring-indigo-500/20';
                activeBg = 'bg-slate-800/90';
              }

              return (
                <button
                  key={tId}
                  id={`simulator-tier-${tId}`}
                  onClick={() => setSelectedTier(tId)}
                  className={`p-4 rounded-xl text-left transition-all border ${borderClass} ${activeBg} ${
                    isSelected ? 'shadow-xl' : 'bg-slate-950/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                      {tier.shortTitle}
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {tier.estimatedCostReduction}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{tier.subtitle}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {tier.coreRule}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Live Audited Results Dashboard */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-8 text-left space-y-6">
          
          {/* Top Metric Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Original Shop Quote</p>
              <p className="text-2xl font-black text-slate-300 font-mono mt-0.5">
                ${auditResult.totalQuoted.toFixed(2)}
              </p>
              <p className="text-[11px] text-slate-500">{auditResult.lineItems.length} total items listed</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Audited Fair Total</p>
              <p className="text-2xl font-black text-white font-mono mt-0.5">
                ${auditResult.fairAdvocateTotal.toFixed(2)}
              </p>
              <p className="text-[11px] text-blue-400 font-semibold">
                Under {tierInfo.shortTitle}
              </p>
            </div>

            <div className="sm:border-l sm:border-slate-800 sm:pl-4">
              <p className="text-xs text-blue-400 uppercase font-semibold">Your Advocate Savings</p>
              <p className="text-2xl font-black text-blue-400 font-mono mt-0.5">
                -${auditResult.totalEstimatedSavings.toFixed(2)}
              </p>
              <p className="text-[11px] text-slate-400">
                {Math.round((auditResult.totalEstimatedSavings / auditResult.totalQuoted) * 100)}% instant reduction
              </p>
            </div>

            <div className="sm:border-l sm:border-slate-800 sm:pl-4">
              <p className="text-xs text-amber-400 uppercase font-semibold">Labor Hours Benchmarked</p>
              <p className="text-2xl font-black text-amber-300 font-mono mt-0.5">
                {auditResult.fairLaborHoursTotal} <span className="text-xs font-normal text-slate-400">/ {auditResult.quotedLaborHoursTotal} hrs</span>
              </p>
              <p className="text-[11px] text-amber-400 font-semibold">
                -{auditResult.laborPaddedHours} hrs padded labor removed
              </p>
            </div>
          </div>

          {/* Line Item Detailed Inspection Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Line-by-Line Advocate Audit Breakdown</span>
              </h4>
              <span className="text-xs text-slate-400">
                Audited against OEM Flat-Rate Book Times
              </span>
            </div>

            <div className="space-y-2.5">
              {auditResult.lineItems.map((item) => {
                const isRejected = item.tierStatus === 'REJECTED_BY_TIER';
                const isLaborDispute = item.recommendation === 'DISPUTE_LABOR';
                const isPartsOverpriced = item.recommendation === 'OVERPRICED_PARTS';
                
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isRejected
                        ? 'bg-slate-900/40 border-red-500/30 opacity-80'
                        : isLaborDispute || isPartsOverpriced
                        ? 'bg-slate-900 border-amber-500/40'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-white">
                            {item.itemDescription}
                          </span>
                          
                          {isRejected ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                              <X className="w-3 h-3" />
                              Rejected by {tierInfo.shortTitle}
                            </span>
                          ) : isLaborDispute ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Clock className="w-3 h-3" />
                              Labor Time Padded (-{(item.quotedLaborHours - item.fairLaborHours).toFixed(1)} hrs)
                            </span>
                          ) : isPartsOverpriced ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <DollarSign className="w-3 h-3" />
                              Parts Markup Inflated
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <Check className="w-3 h-3" />
                              Approved Fair Price
                            </span>
                          )}

                          <span className="text-[11px] text-slate-500 font-mono">
                            {item.category}
                          </span>
                        </div>

                        {/* Auditor explanation note */}
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.auditorNote}
                        </p>
                      </div>

                      {/* Pricing Comparison */}
                      <div className="text-right shrink-0 font-mono">
                        <div className="text-xs text-slate-400">
                          Quoted: <s className="text-slate-500">${item.quotedTotal.toFixed(2)}</s>
                        </div>
                        <div className="text-sm font-bold text-white">
                          Fair: <span className={isRejected ? 'text-slate-500' : 'text-blue-400'}>${item.fairTotal.toFixed(2)}</span>
                        </div>
                        {item.potentialSavings > 0 && (
                          <div className="text-xs font-bold text-blue-400">
                            Save ${item.potentialSavings.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shop Counter Script Section */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <h4 className="text-sm font-bold text-white">
                  Generated Service Advisor Pushback Script (Read Verbatim)
                </h4>
              </div>
              <button
                id="simulator-copy-script-btn"
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-400 font-bold">Copied Script!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy All Talking Points</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2">
              {auditResult.counterScript.map((scriptPoint, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono text-[11px] shrink-0 font-bold">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-sans">{scriptPoint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400">
              Standing in a dealership service drive? Upload your own custom estimate in 30 seconds.
            </p>
            <button
              id="simulator-audit-custom-quote-btn"
              onClick={() => onOpenFullIntake(currentEstimate.id, selectedTier)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Audit Your Real Quote With This Tier</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
