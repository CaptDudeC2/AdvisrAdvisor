import React, { useState, useEffect } from 'react';
import { VehicleRecord } from '../../types';
import { INITIAL_HOUSEHOLD_VEHICLES } from '../../data/sampleVehicles';
import { 
  Sparkles, 
  Car, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  FileText, 
  Plus, 
  Check, 
  Lock,
  Building2
} from 'lucide-react';

interface HouseholdSweepModalProps {
  initialVin?: string;
  onClose: () => void;
  onSelectVehicleForAudit: (vehicle: VehicleRecord) => void;
}

export const HouseholdSweepModal: React.FC<HouseholdSweepModalProps> = ({
  initialVin = '1HGCR2F83HA019482',
  onClose,
  onSelectVehicleForAudit
}) => {
  const [vinQuery, setVinQuery] = useState(initialVin);
  const [addressQuery, setAddressQuery] = useState('742 Evergreen Terrace, San Jose, CA');
  const [isSweeping, setIsSweeping] = useState(true);
  const [sweepProgress, setSweepProgress] = useState(0);
  const [sweepStatusText, setSweepStatusText] = useState('Querying State DMV Registry & National Title Data...');
  const [discoveredVehicles, setDiscoveredVehicles] = useState<VehicleRecord[]>([]);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setSweepProgress(35);
      setSweepStatusText('Decoding 17-digit VIN checksum & powertrain build specifications...');
    }, 500);

    let timer2 = setTimeout(() => {
      setSweepProgress(70);
      setSweepStatusText('Matching household address with DMV records for up to 10 vehicles...');
    }, 1100);

    let timer3 = setTimeout(() => {
      setSweepProgress(100);
      setSweepStatusText('Free CARFAX vehicle history & recall sweep unlocked!');
      setIsSweeping(false);
      setDiscoveredVehicles(INITIAL_HOUSEHOLD_VEHICLES);
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl relative">
        
        {/* Close Button */}
        <button
          id="sweep-modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Primary Onboarding Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Household Vehicle Sweep & Free CARFAX</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Discovered all active registered vehicles associated with your household. Up to 10 vehicles eligible for free continuous CARFAX monitoring and independent advocate repair auditing.
          </p>
        </div>

        {/* Progress State */}
        {isSweeping ? (
          <div className="py-12 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-white font-mono">{sweepStatusText}</p>
              <div className="w-64 bg-slate-950 rounded-full h-2 mx-auto overflow-hidden border border-slate-800">
                <div 
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${sweepProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Household Banner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Household Registry</span>
                  <p className="text-xs font-bold text-white">{addressQuery}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded font-bold border border-blue-500/20">
                  {discoveredVehicles.length} of 10 Slots Active
                </span>
              </div>
            </div>

            {/* Vehicle Cards List */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Discovered Household Vehicles:
              </label>

              <div className="space-y-3">
                {discoveredVehicles.map((veh) => (
                  <div
                    key={veh.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-white">
                          {veh.year} {veh.make} {veh.model}
                        </h4>
                        <span className="text-[11px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/20">
                          {veh.licensePlate} ({veh.state})
                        </span>
                        {veh.carfaxSummary.openRecalls > 0 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {veh.carfaxSummary.openRecalls} Open Recall
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            0 Recalls
                          </span>
                        )}
                      </div>

                      {/* CARFAX Micro stats */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span>VIN: <strong className="font-mono text-slate-300">{veh.vin}</strong></span>
                        <span>Mileage: <strong className="text-slate-300">{veh.mileage.toLocaleString()} mi</strong></span>
                        <span>Title: <strong className="text-blue-400">{veh.carfaxSummary.titleStatus}</strong></span>
                        <span>Service Records: <strong className="text-slate-300">{veh.carfaxSummary.serviceRecords} logged</strong></span>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => {
                        onSelectVehicleForAudit(veh);
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-transform active:scale-95 shadow-md shadow-blue-950/50"
                    >
                      <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Audit Estimate for This Car</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Synchronized with Supabase Vehicle Vault</span>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close & View Vault
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
