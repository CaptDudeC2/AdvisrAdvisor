import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Car, 
  FileText, 
  Sparkles, 
  UserCheck, 
  LogOut, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink,
  ChevronDown,
  Building2,
  Lock,
  Layers,
  PhoneCall,
  Mail,
  Gauge
} from 'lucide-react';
import { SAMPLE_ADVISOR_VEHICLES } from '../../data/advisorData';
import { AdvisorVehicleProfile, AdvisorAiDiscrepancy, AdvisorChatMessage, AdvisorServiceVisit } from '../../types';
import { LeftPaneServiceHistory } from './LeftPaneServiceHistory';
import { CenterPaneActionCenter } from './CenterPaneActionCenter';
import { RightPaneUpcomingDeferred } from './RightPaneUpcomingDeferred';
import { OverrideAiModal } from './OverrideAiModal';

interface AdvisorControlRoomProps {
  onExitToCustomerApp: () => void;
  initialVin?: string;
}

export const AdvisorControlRoom: React.FC<AdvisorControlRoomProps> = ({
  onExitToCustomerApp,
  initialVin = '1HGCR2F83HA019482'
}) => {
  // VIN Search State
  const [vinQuery, setVinQuery] = useState<string>(initialVin);
  const [selectedVin, setSelectedVin] = useState<string>(initialVin);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Active Vehicle Data state
  const currentVehicle: AdvisorVehicleProfile = 
    SAMPLE_ADVISOR_VEHICLES[selectedVin] || SAMPLE_ADVISOR_VEHICLES['1HGCR2F83HA019482'];

  // Local state for interactive overrides, confirmations, and chat
  const [aiDiscrepancies, setAiDiscrepancies] = useState<AdvisorAiDiscrepancy[]>(
    currentVehicle.aiDiscrepancies
  );
  const [chatMessages, setChatMessages] = useState<AdvisorChatMessage[]>(
    currentVehicle.chatHistory
  );
  const [selectedRoForViewer, setSelectedRoForViewer] = useState<string>(
    currentVehicle.serviceVisits[0]?.roNumber || 'RO-94812-H'
  );

  // Modal State for Override AI
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState<boolean>(false);
  const [selectedDiscrepancyForOverride, setSelectedDiscrepancyForOverride] = useState<AdvisorAiDiscrepancy | null>(null);

  // When user switches VIN preset
  const handleSelectVinPreset = (vin: string) => {
    setVinQuery(vin);
    setSelectedVin(vin);
    if (SAMPLE_ADVISOR_VEHICLES[vin]) {
      setAiDiscrepancies(SAMPLE_ADVISOR_VEHICLES[vin].aiDiscrepancies);
      setChatMessages(SAMPLE_ADVISOR_VEHICLES[vin].chatHistory);
      setSelectedRoForViewer(SAMPLE_ADVISOR_VEHICLES[vin].serviceVisits[0]?.roNumber || '');
    }
  };

  const handleVinSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanVin = vinQuery.trim().toUpperCase();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (SAMPLE_ADVISOR_VEHICLES[cleanVin]) {
        setSelectedVin(cleanVin);
        setAiDiscrepancies(SAMPLE_ADVISOR_VEHICLES[cleanVin].aiDiscrepancies);
        setChatMessages(SAMPLE_ADVISOR_VEHICLES[cleanVin].chatHistory);
      } else {
        // Fallback or match partial
        const matched = Object.keys(SAMPLE_ADVISOR_VEHICLES).find(k => k.includes(cleanVin));
        if (matched) {
          setSelectedVin(matched);
          setAiDiscrepancies(SAMPLE_ADVISOR_VEHICLES[matched].aiDiscrepancies);
          setChatMessages(SAMPLE_ADVISOR_VEHICLES[matched].chatHistory);
        }
      }
    }, 200);
  };

  // Override AI handler
  const handleOpenOverrideModal = (discrepancy: AdvisorAiDiscrepancy) => {
    setSelectedDiscrepancyForOverride(discrepancy);
    setIsOverrideModalOpen(true);
  };

  const handleConfirmOverride = (
    discrepancyId: string, 
    reason: string, 
    adjustedLaborHours?: number, 
    adjustedPartsCost?: number
  ) => {
    setAiDiscrepancies(prev => prev.map(d => {
      if (d.id === discrepancyId) {
        return {
          ...d,
          status: 'OVERRIDDEN',
          overrideReason: reason,
          quotedLaborHours: adjustedLaborHours ?? d.quotedLaborHours,
          partsQuoted: adjustedPartsCost ?? d.partsQuoted,
          totalDiscrepancy: 0,
          updatedAt: new Date().toLocaleTimeString()
        };
      }
      return d;
    }));

    // Add note to chat
    const sysMsg: AdvisorChatMessage = {
      id: `sys-${Date.now()}`,
      sender: 'system',
      senderName: 'Audit System',
      text: `Master Tech recorded an override for "${selectedDiscrepancyForOverride?.lineItemDescription}": ${reason}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };
    setChatMessages(prev => [...prev, sysMsg]);
  };

  // Confirm Findings handler
  const handleConfirmDiscrepancy = (discrepancyId: string) => {
    const target = aiDiscrepancies.find(d => d.id === discrepancyId);
    setAiDiscrepancies(prev => prev.map(d => {
      if (d.id === discrepancyId) {
        return {
          ...d,
          status: 'CONFIRMED',
          advisorSignature: 'Dave Miller, ASE Master Tech #ASE-49021',
          updatedAt: new Date().toLocaleTimeString()
        };
      }
      return d;
    }));

    if (target) {
      const certifyMsg: AdvisorChatMessage = {
        id: `cert-${Date.now()}`,
        sender: 'advisor',
        senderName: 'Master Tech Dave (ASE-L1)',
        badge: 'Licensed Master Tech',
        text: `Certified Finding: We verified with Mitchell OEM labor manual that "${target.lineItemDescription}" was overbilled by $${target.totalDiscrepancy.toFixed(2)}. This item is confirmed for client dispute.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        actionCard: {
          type: 'DISPUTE_SAVINGS',
          title: 'Labor Overcharge Certified',
          amount: target.totalDiscrepancy,
          details: target.auditExplanation
        }
      };
      setChatMessages(prev => [...prev, certifyMsg]);
    }
  };

  // Send message from advisor
  const handleSendMessage = (text: string, actionCard?: any) => {
    const newMsg: AdvisorChatMessage = {
      id: `adv-${Date.now()}`,
      sender: 'advisor',
      senderName: 'Master Tech Dave (ASE-L1)',
      badge: 'Licensed Master Tech',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      actionCard
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* TOP BAR: VIN SEARCH BAR & VEHICLE CONTEXT (DRIVES ENTIRE DASHBOARD)       */}
      {/* ========================================================================= */}
      <header className="bg-slate-900 border-b border-slate-800 shrink-0 z-30 shadow-md">
        
        {/* Security & Access Sub-Header */}
        <div className="bg-slate-950 px-4 py-1 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold text-emerald-400">ADVISOR CONTROL ROOM v3.8</span>
            <span className="text-slate-600">•</span>
            <span>Master Tech Workstation (ASE-L1 Certified Direct Ingress)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Chilton / Mitchell 1 API Connected
            </span>
            <button
              onClick={onExitToCustomerApp}
              className="text-xs font-bold text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit to Customer App</span>
            </button>
          </div>
        </div>

        {/* Primary VIN Search & Summary Header Bar */}
        <div className="px-4 py-2.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* VIN Search Form */}
          <form onSubmit={handleVinSearchSubmit} className="flex items-center gap-2 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-blue-400" />
              </div>
              <input
                id="advisor-vin-search-input"
                type="text"
                value={vinQuery}
                onChange={(e) => setVinQuery(e.target.value.toUpperCase())}
                placeholder="Enter 17-character VIN to load live vehicle telematics..."
                className="w-full bg-slate-950 border-2 border-blue-500/40 focus:border-blue-400 rounded-xl pl-9 pr-24 py-2 text-xs sm:text-sm font-mono font-bold text-white placeholder-slate-500 shadow-inner focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute inset-y-1 right-1 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Fetch VIN</span>
              </button>
            </div>

            {/* Quick Sample Selector Chips */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Presets:</span>
              {Object.entries(SAMPLE_ADVISOR_VEHICLES).map(([vin, v]) => (
                <button
                  key={vin}
                  type="button"
                  onClick={() => handleSelectVinPreset(vin)}
                  className={`px-2 py-1 rounded-lg font-mono text-[10px] font-bold transition-all border cursor-pointer ${
                    selectedVin === vin
                      ? 'bg-blue-500 text-white border-blue-400 shadow'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {v.year} {v.make} ({vin.slice(-5)})
                </button>
              ))}
            </div>
          </form>

          {/* Active Vehicle & Customer Badges */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0">
            {/* Customer Pill */}
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                {currentVehicle.customerName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white leading-tight">{currentVehicle.customerName}</p>
                <p className="text-[10px] font-mono text-slate-400">{currentVehicle.customerPhone}</p>
              </div>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-500/40 uppercase">
                {currentVehicle.customerTier}
              </span>
            </div>

            {/* Vehicle Profile Pill */}
            <div className="flex items-center gap-2.5 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
              <Car className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <p className="font-bold text-white leading-tight">
                  {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{currentVehicle.trim}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{currentVehicle.currentMileage.toLocaleString()} mi</span>
                </div>
              </div>
            </div>

            {/* Live Service Drive Status Tag */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">Service Drive:</span>
              <span>{currentVehicle.liveServiceDriveStatus?.replace('_', ' ')}</span>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3-PANE DESKTOP LAYOUT (LEFT: HISTORY | CENTER: ACTION | RIGHT: UPCOMING)   */}
      {/* ========================================================================= */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT PANE (col-span-3): Service History Accordion Timeline */}
        <section className="lg:col-span-3 h-full overflow-hidden">
          <LeftPaneServiceHistory
            serviceVisits={currentVehicle.serviceVisits}
            selectedRoNumber={selectedRoForViewer}
            onSelectVisitForViewer={(visit) => setSelectedRoForViewer(visit.roNumber)}
          />
        </section>

        {/* CENTER PANE (col-span-6): The Action Center (Media Viewer Top / Chat & AI Log Bottom) */}
        <section className="lg:col-span-6 h-full overflow-hidden">
          <CenterPaneActionCenter
            vehicle={currentVehicle}
            aiDiscrepancies={aiDiscrepancies}
            chatMessages={chatMessages}
            onOpenOverrideModal={handleOpenOverrideModal}
            onConfirmDiscrepancy={handleConfirmDiscrepancy}
            onSendMessage={handleSendMessage}
          />
        </section>

        {/* RIGHT PANE (col-span-3): Upcoming Needs & Previously Declined Services Sidebar */}
        <section className="lg:col-span-3 h-full overflow-hidden">
          <RightPaneUpcomingDeferred
            upcomingNeeds={currentVehicle.upcomingNeeds}
            declinedServices={currentVehicle.declinedServices}
            currentMileage={currentVehicle.currentMileage}
            onSelectServiceToAdvise={(title, amount) => {
              handleSendMessage(
                `Regarding upcoming maintenance: "${title}" is due soon ($${amount.toFixed(2)} fair benchmark). We recommend bundling this with your visit if the shop matches our OEM labor rate.`
              );
            }}
          />
        </section>

      </main>

      {/* Override AI Modal */}
      <OverrideAiModal
        isOpen={isOverrideModalOpen}
        onClose={() => setIsOverrideModalOpen(false)}
        discrepancy={selectedDiscrepancyForOverride}
        onConfirmOverride={handleConfirmOverride}
      />

    </div>
  );
};
