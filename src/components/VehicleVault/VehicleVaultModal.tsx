import React, { useState } from 'react';
import { VehicleRecord, TierId } from '../../types';
import { TIERS_DATA } from '../../data/tiersData';
import { AddToVaultModal, VaultRecordType } from './AddToVaultModal';
import { 
  Car, 
  ShieldCheck, 
  X, 
  Sparkles, 
  FileText, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Wrench, 
  DollarSign,
  Receipt,
  FileCheck,
  ChevronRight
} from 'lucide-react';

interface VehicleVaultModalProps {
  vehicles: VehicleRecord[];
  onClose: () => void;
  onSelectVehicleForAudit: (vehicle: VehicleRecord) => void;
  onOpenSweep: () => void;
}

export const VehicleVaultModal: React.FC<VehicleVaultModalProps> = ({
  vehicles,
  onClose,
  onSelectVehicleForAudit,
  onOpenSweep
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord>(vehicles[0] || null);
  const [isAddToVaultOpen, setIsAddToVaultOpen] = useState<boolean>(false);
  const [recentVaultRecords, setRecentVaultRecords] = useState<Array<{
    id: string;
    vehicleId: string;
    type: 'diy' | 'shop';
    title: string;
    date: string;
    mileage: number;
    partsCost?: number;
    declinedServices?: string[];
  }>>([
    {
      id: 'rec-init-1',
      vehicleId: 'veh-01',
      type: 'diy',
      title: 'Mobil 1 Full Synthetic 0W-20 & OEM Filter Change',
      date: '2024-06-12',
      mileage: 38450,
      partsCost: 42.50
    },
    {
      id: 'rec-init-2',
      vehicleId: 'veh-01',
      type: 'shop',
      title: 'Dealership 30,000-Mile Factory Major Service & Multi-Point Inspection',
      date: '2024-01-18',
      mileage: 30200,
      declinedServices: ['Cabin Air Filter ($85 dealer price - deferred)']
    }
  ]);

  const handleSaveRecord = (record: {
    type: VaultRecordType;
    vehicleId: string;
    date: string;
    mileage: number;
    servicePerformed: string;
    partsCost?: number;
    declinedServices?: string[];
  }) => {
    const newRec = {
      id: `rec-${Date.now()}`,
      vehicleId: record.vehicleId,
      type: record.type,
      title: record.servicePerformed,
      date: record.date,
      mileage: record.mileage,
      partsCost: record.partsCost,
      declinedServices: record.declinedServices
    };
    setRecentVaultRecords(prev => [newRec, ...prev]);

    if (selectedVehicle && selectedVehicle.id === record.vehicleId) {
      setSelectedVehicle(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          mileage: Math.max(prev.mileage, record.mileage),
          carfaxSummary: {
            ...prev.carfaxSummary,
            serviceRecords: prev.carfaxSummary.serviceRecords + 1
          }
        };
      });
    }
  };

  const vehicleRecords = recentVaultRecords.filter(
    r => r.vehicleId === selectedVehicle?.id
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          id="vault-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Car className="w-3.5 h-3.5" />
              <span>Supabase Vehicle Vault &amp; CARFAX Telemetry</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Household Vehicle Vault</h2>
            <p className="text-xs text-slate-400">
              Manage your household vehicles, view continuous CARFAX records, and assign per-vehicle advocate preference tiers.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              id="open-add-to-vault-modal-btn"
              onClick={() => setIsAddToVaultOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Add to Vault</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenSweep();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>+ Sweep Vehicle</span>
            </button>
          </div>
        </div>

        {/* Vehicle Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {vehicles.map((v) => {
            const isSelected = selectedVehicle?.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-500/20 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-blue-400 font-bold">{v.licensePlate}</span>
                  <span className="text-[10px] text-slate-400">{v.mileage.toLocaleString()} mi</span>
                </div>
                <h4 className="text-sm font-bold text-white">{v.year} {v.make} {v.model}</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Assigned: <strong className="text-blue-400">{TIERS_DATA[v.currentTier]?.shortTitle}</strong>
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Vehicle Comprehensive Telemetry View */}
        {selectedVehicle && (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.trim}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  VIN: {selectedVehicle.vin} • License: {selectedVehicle.licensePlate} ({selectedVehicle.state})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="vehicle-view-add-record-btn"
                  onClick={() => setIsAddToVaultOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-400 stroke-[2.5]" />
                  <span>Add Record to Vault</span>
                </button>
                <button
                  onClick={() => {
                    onSelectVehicleForAudit(selectedVehicle);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-blue-950/50 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Audit Estimate for This Vehicle</span>
                </button>
              </div>
            </div>

            {/* CARFAX Report Snapshot */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Continuous CARFAX &amp; Vehicle Health Snapshot</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Title Status</span>
                  <span className="text-xs font-bold text-blue-400">{selectedVehicle.carfaxSummary.titleStatus}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Owners Logged</span>
                  <span className="text-xs font-bold text-white">{selectedVehicle.carfaxSummary.owners} Registered Owner(s)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Service History</span>
                  <span className="text-xs font-bold text-white">{selectedVehicle.carfaxSummary.serviceRecords} Records Tracked</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Open Recalls</span>
                  <span className={`text-xs font-bold ${selectedVehicle.carfaxSummary.openRecalls > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                    {selectedVehicle.carfaxSummary.openRecalls} Active Campaigns
                  </span>
                </div>
              </div>
            </div>

            {/* Advocate Savings to Date */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-300">Lifetime Advocate Audit Savings on This Vehicle:</span>
                <p className="text-xs text-slate-400">Eliminated unnecessary shop fluid flushes and labor padding.</p>
              </div>
              <span className="text-2xl font-black text-blue-400 font-mono">
                +${selectedVehicle.carfaxSummary.estimatedAuditSavingsToDate?.toFixed(2) || '0.00'}
              </span>
            </div>

            {/* Service & Receipt History Ledger */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-blue-400" />
                  <span>Vault Records &amp; Document Logs ({vehicleRecords.length})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddToVaultOpen(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Log DIY or Shop Invoice</span>
                </button>
              </div>

              {vehicleRecords.length > 0 ? (
                <div className="space-y-2">
                  {vehicleRecords.map(rec => (
                    <div 
                      key={rec.id} 
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          rec.type === 'diy' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {rec.type === 'diy' ? <Wrench className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs sm:text-sm font-bold text-white">{rec.title}</h5>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                              rec.type === 'diy' 
                                ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
                                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            }`}>
                              {rec.type === 'diy' ? 'DIY Log' : 'Shop Invoice (AI Ingested)'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Logged on {rec.date} • {rec.mileage.toLocaleString()} mi {rec.partsCost ? `• Parts: $${rec.partsCost.toFixed(2)}` : ''}
                          </p>
                          {rec.declinedServices && rec.declinedServices.length > 0 && (
                            <p className="text-[10px] text-amber-400/90 pt-0.5">
                              Budget Alert: {rec.declinedServices.join('; ')}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/30 self-start sm:self-center shrink-0">
                        ✓ Verified in CARFAX Vault
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">No manual records added yet for this vehicle.</p>
                  <button
                    type="button"
                    onClick={() => setIsAddToVaultOpen(true)}
                    className="text-xs text-blue-400 font-bold hover:underline"
                  >
                    + Add your first DIY log or shop receipt
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Embedded Add to Vault Modal with smooth conditional switching */}
        {isAddToVaultOpen && (
          <AddToVaultModal
            isOpen={isAddToVaultOpen}
            onClose={() => setIsAddToVaultOpen(false)}
            vehicles={vehicles}
            selectedVehicleId={selectedVehicle?.id}
            onSaveRecord={handleSaveRecord}
          />
        )}

      </div>
    </div>
  );
};
