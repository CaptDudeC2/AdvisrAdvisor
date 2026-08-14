import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, CheckCircle2, FileSignature, AlertTriangle, ArrowRight } from 'lucide-react';
import { AdvisorAiDiscrepancy } from '../../types';

interface OverrideAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  discrepancy: AdvisorAiDiscrepancy | null;
  onConfirmOverride: (discrepancyId: string, reason: string, adjustedLaborHours?: number, adjustedPartsCost?: number) => void;
}

export const OverrideAiModal: React.FC<OverrideAiModalProps> = ({
  isOpen,
  onClose,
  discrepancy,
  onConfirmOverride
}) => {
  const [overrideCategory, setOverrideCategory] = useState<string>('Rusted or Seized Hardware (Extra Extraction Time Justified)');
  const [customReason, setCustomReason] = useState<string>('');
  const [adjustedLaborHours, setAdjustedLaborHours] = useState<string>(
    discrepancy ? discrepancy.quotedLaborHours.toString() : '1.8'
  );
  const [advisorNotes, setAdvisorNotes] = useState<string>('Visual inspection of technician video confirmed severe road salt corrosion on caliper bracket mounting bolts.');
  const [techSignature, setTechSignature] = useState<string>('Dave Miller, ASE Master Tech #ASE-49021');

  if (!isOpen || !discrepancy) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = customReason.trim() 
      ? `${overrideCategory}: ${customReason.trim()} (${advisorNotes})`
      : `${overrideCategory} (${advisorNotes})`;
    
    onConfirmOverride(
      discrepancy.id, 
      finalReason, 
      parseFloat(adjustedLaborHours) || discrepancy.quotedLaborHours,
      discrepancy.partsQuoted
    );
    onClose();
  };

  const presetReasons = [
    'Rusted or Seized Hardware (Extra Extraction Time Justified)',
    'Customer Requested Non-OEM Upgrade / Specialty Fluid',
    'OEM Technical Service Bulletin (TSB) Scope Revision',
    'Dual-Component Access Overlap Already Discounted by Shop',
    'Dealer Validated Diagnostic Code (DTC) Present',
    'Other Specialized Mechanical Circumstance'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    Human Expert Authority
                  </span>
                  <span className="text-xs text-slate-400">Override AI Algorithmic Flag</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Advisor Override: {discrepancy.lineItemDescription}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-5">
            {/* Current AI Detection Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400">Current AI Discrepancy Calculation:</span>
                <span className="text-red-400 font-mono font-bold">
                  +${discrepancy.totalDiscrepancy.toFixed(2)} Flagged Overcharge
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center pt-1">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Shop Quoted Labor</span>
                  <p className="text-sm font-mono font-bold text-red-400">{discrepancy.quotedLaborHours} hrs</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">OEM Mitchell Standard</span>
                  <p className="text-sm font-mono font-bold text-emerald-400">{discrepancy.oemBenchmarkHours} hrs</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Shop Labor Rate</span>
                  <p className="text-sm font-mono font-bold text-blue-400">${discrepancy.laborRate}/hr</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 italic">
                "{discrepancy.auditExplanation}"
              </p>
            </div>

            {/* Override Rationale Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Primary Reason for Overriding Algorithmic Flag</span>
                <span className="text-red-400">*</span>
              </label>
              <select
                value={overrideCategory}
                onChange={(e) => setOverrideCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                {presetReasons.map((reason, idx) => (
                  <option key={idx} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {/* Adjusted Allowable Labor Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span>Adjusted Approved Labor Hours</span>
                  <span className="text-[10px] text-amber-400 font-mono">Expert Approved</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={adjustedLaborHours}
                    onChange={(e) => setAdjustedLaborHours(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-amber-300 focus:border-amber-500 focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-slate-400">
                    hours
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  Master Tech Certification ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={techSignature}
                    onChange={(e) => setTechSignature(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Detailed Technical Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">
                Technical Justification &amp; Notes (Appears on Customer Certified Report)
              </label>
              <textarea
                rows={3}
                value={advisorNotes}
                onChange={(e) => setAdvisorNotes(e.target.value)}
                placeholder="Explain physical inspection or environmental conditions justifying the adjustment..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <FileSignature className="w-4 h-4" />
                <span>Override will be logged to immutable audit ledger</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-950/60 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Advisor Override</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
