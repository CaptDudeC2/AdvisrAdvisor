'use client';

import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Car, FileText, Sparkles, UserCheck, LogOut, Sliders, Zap, CheckCircle2, AlertTriangle, RefreshCw, ExternalLink, ChevronDown, Building2, Lock, Layers, PhoneCall, Mail, Gauge 
} from 'lucide-react';
import { SAMPLE_ADVISOR_VEHICLES } from '../../src/data/advisorData';
import { AdvisorVehicleProfile, AdvisorAiDiscrepancy, AdvisorChatMessage } from '../../src/types';
import { LeftPaneServiceHistory } from '../../src/components/AdvisorControlRoom/LeftPaneServiceHistory';
import { CenterPaneActionCenter } from '../../src/components/AdvisorControlRoom/CenterPaneActionCenter';
import { RightPaneUpcomingDeferred } from '../../src/components/AdvisorControlRoom/RightPaneUpcomingDeferred';
import { OverrideAiModal } from '../../src/components/AdvisorControlRoom/OverrideAiModal';

import { AddToVaultModal } from '../src/components/VehicleVault/AddToVaultModal';
import { ServiceDriveEmergencyModal } from '../src/components/ServiceDriveEmergencyModal';
import { AdvisorControlRoom } from '../src/components/AdvisorControlRoom/AdvisorControlRoom';
import { INITIAL_HOUSEHOLD_VEHICLES } from '../src/data/sampleVehicles';
import { TierId, VehicleRecord, EstimateAuditResult } from '../src/types';

export default function App() {
  // Theme State: defaults to cobalt-dark (Blue and Black)
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(() => {
    return (localStorage.getItem('advisr_theme_selection') as ThemeKey) || 'cobalt-dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('theme-cobalt-dark', 'theme-clean-light-blue', 'theme-stealth-black-blue', 'theme-classic-emerald');
    document.documentElement.classList.add(`theme-${currentTheme}`);
    document.body.classList.remove('theme-cobalt-dark', 'theme-clean-light-blue', 'theme-stealth-black-blue', 'theme-classic-emerald');
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  const handleSelectTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme);
    localStorage.setItem('advisr_theme_selection', theme);
  };

  // Modal & Navigation States
  const [isControlRoomActive, setIsControlRoomActive] = useState<boolean>(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);
  const [intakeInitialSampleId, setIntakeInitialSampleId] = useState<string>('sample-1');
  const [intakeInitialTier, setIntakeInitialTier] = useState<TierId>('tier-1');

  const [isSweepOpen, setIsSweepOpen] = useState<boolean>(false);
  const [sweepVinQuery, setSweepVinQuery] = useState<string>('1HGCR2F83HA019482');

  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [isAddToVaultOpen, setIsAddToVaultOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  // Household Vehicles state
  const [householdVehicles, setHouseholdVehicles] = useState<VehicleRecord[]>(INITIAL_HOUSEHOLD_VEHICLES);

  // Open Intake with parameters
  const handleOpenIntake = (sampleId?: string, tier?: TierId) => {
    if (sampleId) setIntakeInitialSampleId(sampleId);
    if (tier) setIntakeInitialTier(tier);
    setIsIntakeOpen(true);
  };

  // Open Sweep with initial VIN
  const handleStartVinSweep = (vin: string) => {
    setSweepVinQuery(vin);
    setIsSweepOpen(true);
  };

  // When a vehicle is picked from Sweep or Vault for audit
  const handleSelectVehicleForAudit = (vehicle: VehicleRecord) => {
    setIntakeInitialTier(vehicle.currentTier || 'tier-1');
    setIsIntakeOpen(true);
  };

  // Save an audited estimate to the vehicle's history
  const handleSaveAuditToVault = (audit: EstimateAuditResult) => {
    setHouseholdVehicles(prev => prev.map(v => {
      if (v.vin === audit.vehicleVin || v.model.includes(audit.vehicleEvaluated)) {
        return {
          ...v,
          carfaxSummary: {
            ...v.carfaxSummary,
            estimatedAuditSavingsToDate: (v.carfaxSummary.estimatedAuditSavingsToDate || 0) + audit.totalEstimatedSavings
          }
        };
      }
      return v;
    }));
  };

  // Save a DIY or Shop record to vehicle history
  const handleSaveRecordToVault = (record: {
    vehicleId: string;
    mileage: number;
  }) => {
    setHouseholdVehicles(prev => prev.map(v => {
      if (v.id === record.vehicleId) {
        return {
          ...v,
          mileage: Math.max(v.mileage, record.mileage),
          carfaxSummary: {
            ...v.carfaxSummary,
            serviceRecords: v.carfaxSummary.serviceRecords + 1
          }
        };
      }
      return v;
    }));
  };

  if (isControlRoomActive) {
    return (
      <AdvisorControlRoom
        onExitToCustomerApp={() => setIsControlRoomActive(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans transition-colors duration-200 theme-${currentTheme}`}>
      
      {/* 4-Look Visual Theme Switcher Bar */}
      <ThemeSelectorBar
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Persistent Navigation Header */}
      <Header
        onOpenIntake={() => handleOpenIntake()}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenSweep={() => setIsSweepOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenControlRoom={() => setIsControlRoomActive(true)}
        vaultCount={householdVehicles.length}
        currentView="landing"
        onNavigateHome={() => {
          setIsIntakeOpen(false);
          setIsSweepOpen(false);
          setIsVaultOpen(false);
          setIsAddToVaultOpen(false);
          setIsEmergencyOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Primary VIN & Household Sweep Hook */}
        <HeroSection
          onStartVinSweep={handleStartVinSweep}
          onOpenIntake={(sampleId) => handleOpenIntake(sampleId)}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenVehicleVault={() => setIsVaultOpen(true)}
          onOpenAddToVault={() => setIsAddToVaultOpen(true)}
        />

        {/* 2. Interactive Live Audit Simulator with Tier Toggling */}
        <LiveAuditSimulator
          onOpenFullIntake={(sampleId, tier) => handleOpenIntake(sampleId, tier)}
        />

        {/* 3. The 3 Customer Tiers Explainer & Comparison Matrix */}
        <TierExplainerSection
          onSelectTierForIntake={(tierId) => handleOpenIntake('sample-1', tierId)}
        />

        {/* 4. How It Works: 4-Step Zero Friction Flow */}
        <HowItWorks
          onOpenIntake={() => handleOpenIntake()}
        />

        {/* 5. Independent Advocate Legal Charter & Pledge */}
        <AdvocateCharter />

        {/* 6. Verified Customer Audits & Savings Feed */}
        <TestimonialsAndAudits />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal 1: Zero-Friction Customer Intake Wizard */}
      {isIntakeOpen && (
        <IntakeWizard
          initialSampleId={intakeInitialSampleId}
          initialTier={intakeInitialTier}
          onClose={() => setIsIntakeOpen(false)}
          onSaveToVault={handleSaveAuditToVault}
        />
      )}

      {/* Modal 2: Household Vehicle Sweep & Free CARFAX Modal */}
      {isSweepOpen && (
        <HouseholdSweepModal
          initialVin={sweepVinQuery}
          onClose={() => setIsSweepOpen(false)}
          onSelectVehicleForAudit={handleSelectVehicleForAudit}
        />
      )}

      {/* Modal 3: Supabase Vehicle Vault Modal */}
      {isVaultOpen && (
        <VehicleVaultModal
          vehicles={householdVehicles}
          onClose={() => setIsVaultOpen(false)}
          onSelectVehicleForAudit={handleSelectVehicleForAudit}
          onOpenSweep={() => setIsSweepOpen(true)}
        />
      )}

      {/* Modal 4: Add to Vault Conditional Modal (Path A: DIY Form vs Path B: Repair Shop AI Ingest) */}
      {isAddToVaultOpen && (
        <AddToVaultModal
          isOpen={isAddToVaultOpen}
          onClose={() => setIsAddToVaultOpen(false)}
          vehicles={householdVehicles}
          onSaveRecord={handleSaveRecordToVault}
        />
      )}

      {/* Modal 5: Service Drive Emergency Fast Action Modal */}
      {isEmergencyOpen && (
        <ServiceDriveEmergencyModal
          onClose={() => setIsEmergencyOpen(false)}
          onOpenIntake={(sampleId) => handleOpenIntake(sampleId)}
        />
      )}

    </div>
  );
}
