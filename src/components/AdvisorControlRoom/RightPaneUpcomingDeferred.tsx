import React, { useState } from 'react';
import { 
  CalendarClock, 
  AlertOctagon, 
  DollarSign, 
  ShieldCheck, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { AdvisorUpcomingNeed, AdvisorDeclinedService } from '../../types';

interface RightPaneUpcomingDeferredProps {
  upcomingNeeds: AdvisorUpcomingNeed[];
  declinedServices: AdvisorDeclinedService[];
  currentMileage: number;
  onSelectServiceToAdvise?: (serviceTitle: string, amount: number) => void;
}

export const RightPaneUpcomingDeferred: React.FC<RightPaneUpcomingDeferredProps> = ({
  upcomingNeeds,
  declinedServices,
  currentMileage,
  onSelectServiceToAdvise
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'UPCOMING' | 'DECLINED'>('ALL');

  const totalUpcomingCost = upcomingNeeds.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalDeclinedSavings = declinedServices.reduce((sum, item) => sum + item.quotedAmount, 0);

  return (
    <div className="h-full flex flex-col bg-slate-900/95 border-l border-slate-800 text-slate-100 select-none">
      
      {/* Pane Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/70 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CalendarClock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Upcoming &amp; Deferred</h2>
              <p className="text-[11px] text-slate-400">Future Liabilities &amp; Prior Declines</p>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 mt-3 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
              activeTab === 'ALL'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({upcomingNeeds.length + declinedServices.length})
          </button>
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
              activeTab === 'UPCOMING'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upcoming ({upcomingNeeds.length})
          </button>
          <button
            onClick={() => setActiveTab('DECLINED')}
            className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
              activeTab === 'DECLINED'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Declined ({declinedServices.length})
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 custom-scrollbar">

        {/* SECTION 1: UPCOMING NEEDS */}
        {(activeTab === 'ALL' || activeTab === 'UPCOMING') && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Upcoming Needs ({upcomingNeeds.length})
              </span>
              <span className="font-mono text-xs font-bold text-slate-300">
                Est. ${totalUpcomingCost.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              {upcomingNeeds.map((need) => (
                <div
                  key={need.id}
                  id={`upcoming-card-${need.id}`}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-white leading-snug">
                          {need.title}
                        </h4>
                        {need.isCriticalSafety && (
                          <span className="bg-red-500/15 text-red-400 border border-red-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded">
                            Safety Critical
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span className="font-mono text-blue-400 font-semibold">
                          {need.dueDate}
                        </span>
                        <span>•</span>
                        <span>Due @ {need.dueMileage.toLocaleString()} mi</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-emerald-400 block">
                        ${need.estimatedCost.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">
                        Fair Benchmark
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/90 p-2 rounded-lg border border-slate-800/80">
                    {need.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="font-mono text-slate-500">
                      OEM Code: {need.oemScheduleCode}
                    </span>
                    {onSelectServiceToAdvise && (
                      <button
                        onClick={() => onSelectServiceToAdvise(need.title, need.estimatedCost)}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Send in Chat</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: PREVIOUSLY DECLINED SERVICES */}
        {(activeTab === 'ALL' || activeTab === 'DECLINED') && (
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" />
                Previously Declined Services ({declinedServices.length})
              </span>
              <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                Saved ${totalDeclinedSavings.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              {declinedServices.map((declined) => (
                <div
                  key={declined.id}
                  id={`declined-card-${declined.id}`}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-white leading-snug">
                          {declined.title}
                        </h4>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                          declined.riskAssessment === 'POWERTRAIN_FAILURE_RISK'
                            ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                            : declined.riskAssessment === 'HIGH_SAFETY'
                            ? 'bg-red-500/15 text-red-400 border-red-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {declined.riskAssessment === 'POWERTRAIN_FAILURE_RISK' ? 'Avoided Risk' : 'Protected Upsell'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>Declined {declined.dateDeclined}</span>
                        <span>•</span>
                        <span className="font-mono">{declined.mileageDeclined.toLocaleString()} mi</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-slate-300 line-through">
                        ${declined.quotedAmount.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-bold block">
                        Saved 100%
                      </span>
                    </div>
                  </div>

                  {/* Decline Rationale */}
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-amber-400">Advocate Rationale:</strong> {declined.declineReason}
                    </p>
                    <p className="text-[10px] text-slate-400 italic">
                      Shop: {declined.shopRecommended} • RO: {declined.roNumber}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Liability & Advocacy Summary */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950 text-xs shrink-0 space-y-2">
        <div className="flex items-center justify-between text-slate-300">
          <span className="font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Next 12-Mo Estimated Liability:
          </span>
          <span className="font-mono font-bold text-white">${totalUpcomingCost.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-emerald-400">
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Total Protected from Upsells:
          </span>
          <span className="font-mono font-bold">${totalDeclinedSavings.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
};
