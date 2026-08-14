import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  ChevronDown, 
  ChevronRight, 
  Calendar, 
  Gauge, 
  FileText, 
  Wrench, 
  DollarSign, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Filter,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { AdvisorServiceVisit, ServiceLineItem } from '../../types';

interface LeftPaneServiceHistoryProps {
  serviceVisits: AdvisorServiceVisit[];
  selectedRoNumber?: string;
  onSelectVisitForViewer?: (visit: AdvisorServiceVisit) => void;
}

export const LeftPaneServiceHistory: React.FC<LeftPaneServiceHistoryProps> = ({
  serviceVisits,
  selectedRoNumber,
  onSelectVisitForViewer
}) => {
  // Store expanded accordion IDs (default first one open)
  const [expandedVisitIds, setExpandedVisitIds] = useState<string[]>(
    serviceVisits.length > 0 ? [serviceVisits[0].id] : []
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'DEALERSHIP' | 'DIY' | 'DISPUTED'>('ALL');

  const toggleAccordion = (id: string) => {
    setExpandedVisitIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    if (expandedVisitIds.length === serviceVisits.length) {
      setExpandedVisitIds([]);
    } else {
      setExpandedVisitIds(serviceVisits.map(v => v.id));
    }
  };

  // Filter visits
  const filteredVisits = serviceVisits.filter(visit => {
    const matchesSearch = 
      visit.roNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.lineItems.some(item => 
        item.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (!matchesSearch) return false;

    if (filterType === 'DEALERSHIP') return visit.shopType === 'Dealership';
    if (filterType === 'DIY') return visit.shopType === 'DIY Owner Log';
    if (filterType === 'DISPUTED') return visit.paymentStatus === 'DISPUTED';
    return true;
  });

  const totalSpentAllTime = serviceVisits.reduce((acc, v) => acc + v.totalCost, 0);

  return (
    <div className="h-full flex flex-col bg-slate-900/95 border-r border-slate-800 text-slate-100 select-none">
      
      {/* Pane Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/70 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Service History</span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
                  {serviceVisits.length} Visits
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Timeline &amp; Itemized RO Ledger</p>
            </div>
          </div>

          <button
            onClick={handleExpandAll}
            className="text-[10px] font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-1 rounded border border-blue-500/20 transition-colors cursor-pointer"
          >
            {expandedVisitIds.length === serviceVisits.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        {/* Quick Search & Filter Controls */}
        <div className="mt-3 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search RO#, part, or shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[10px]">
            {[
              { id: 'ALL', label: 'All Records' },
              { id: 'DEALERSHIP', label: 'Dealer ROs' },
              { id: 'DIY', label: 'DIY Logs' },
              { id: 'DISPUTED', label: 'Disputed' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setFilterType(pill.id as any)}
                className={`px-2 py-0.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === pill.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Timeline List */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar">
        {filteredVisits.length === 0 ? (
          <div className="p-6 text-center text-slate-500 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
            <p className="text-xs font-semibold">No matching service visits found</p>
            <p className="text-[11px]">Try clearing your search query</p>
          </div>
        ) : (
          filteredVisits.map((visit, index) => {
            const isExpanded = expandedVisitIds.includes(visit.id);
            const isSelected = selectedRoNumber === visit.roNumber;

            return (
              <div
                key={visit.id}
                id={`history-ro-card-${visit.id}`}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-slate-950 ring-1 ring-blue-500/50 shadow-lg shadow-blue-950/40'
                    : 'border-slate-800 bg-slate-950/90 hover:border-slate-700'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleAccordion(visit.id)}
                  className="p-3 cursor-pointer hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Toggle details"
                        className="p-0.5 rounded text-slate-400 hover:text-white"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-blue-400 transition-transform" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500 transition-transform" />
                        )}
                      </button>

                      <div>
                        {/* RO Number & Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-extrabold text-white">
                            {visit.roNumber}
                          </span>
                          {visit.shopType === 'DIY Owner Log' && (
                            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              DIY Log
                            </span>
                          )}
                          {visit.paymentStatus === 'DISPUTED' && (
                            <span className="bg-red-500/15 text-red-400 border border-red-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded animate-pulse">
                              Disputed
                            </span>
                          )}
                          {visit.paymentStatus === 'WARRANTY_CLAIM' && (
                            <span className="bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              Warranty
                            </span>
                          )}
                        </div>

                        {/* Shop Name */}
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px] mt-0.5">
                          {visit.shopName}
                        </p>
                      </div>
                    </div>

                    {/* Total Job Cost */}
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-emerald-400 block">
                        ${visit.totalCost.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {visit.lineItems.length} items
                      </span>
                    </div>
                  </div>

                  {/* Metadata Row: Date & Mileage */}
                  <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      <span>{visit.date}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      <Gauge className="w-3 h-3 text-blue-400" />
                      <span>{visit.mileage.toLocaleString()} mi</span>
                    </div>
                    {visit.hasPdfInvoice && (
                      <div className="ml-auto flex items-center gap-1 text-[10px] text-blue-400">
                        <FileText className="w-2.5 h-2.5" />
                        <span>PDF Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Accordion Body (Itemized List: Part Numbers, Part Names, Labor $, Job Total) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-800 bg-slate-950/95"
                    >
                      <div className="p-3 space-y-2.5">
                        
                        {/* Advisor / Tech Info bar */}
                        {visit.advisorName && (
                          <div className="flex items-center justify-between text-[10px] bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-400">
                            <span>Service Writer: <strong className="text-slate-200">{visit.advisorName}</strong></span>
                            {onSelectVisitForViewer && (
                              <button
                                onClick={() => onSelectVisitForViewer(visit)}
                                className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Inspect in Viewer</span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Itemized Table */}
                        <div className="space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between px-1">
                            <span>Itemized Work Scope</span>
                            <span>Labor / Total</span>
                          </div>

                          <div className="space-y-1.5">
                            {visit.lineItems.map((item, idx) => (
                              <div
                                key={item.id || idx}
                                className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-1"
                              >
                                {/* Part Name & Job Total */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-slate-100 leading-tight">
                                      {item.partName}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="font-mono text-[10px] text-blue-400 bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-800/40">
                                        PN: {item.partNumber}
                                      </span>
                                      {item.isOem && (
                                        <span className="text-[9px] text-emerald-400 font-bold">
                                          OEM Spec
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-mono font-bold text-white">
                                      ${item.jobTotal.toFixed(2)}
                                    </span>
                                  </div>
                                </div>

                                {/* Part Cost vs Labor Cost breakdown */}
                                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/60 text-slate-400 font-mono">
                                  <span>
                                    Parts ({item.quantity}x): <strong className="text-slate-300">${item.partCost.toFixed(2)}</strong>
                                  </span>
                                  <span>
                                    Labor ({item.laborHours}h @ ${item.laborRate}): <strong className="text-blue-400">${item.laborTotal.toFixed(2)}</strong>
                                  </span>
                                </div>

                                {/* Technician Diagnostic Note */}
                                {item.technicianNotes && (
                                  <p className="text-[10px] text-slate-400 italic bg-slate-950/60 p-1.5 rounded border border-slate-800/40 mt-1">
                                    💬 "{item.technicianNotes}"
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visit Subtotal Footer */}
                        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                          <div className="flex justify-between text-slate-400">
                            <span>Labor Subtotal:</span>
                            <span className="font-mono text-slate-200">${visit.laborTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Parts Subtotal:</span>
                            <span className="font-mono text-slate-200">${visit.partsTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-800">
                            <span>Total Billed:</span>
                            <span className="font-mono text-emerald-400">${visit.totalCost.toFixed(2)}</span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Pane Sticky Footer Summary */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 text-xs shrink-0 flex items-center justify-between">
        <span className="text-slate-400 font-medium">Historical Lifecycle Spend:</span>
        <span className="font-mono font-bold text-emerald-400">${totalSpentAllTime.toFixed(2)}</span>
      </div>

    </div>
  );
};
