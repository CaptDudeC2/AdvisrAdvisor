'use client';

import React, { useState } from 'react';

// Import types
import { TierId, VehicleRecord } from '@/types';

// Import components
import { ThemeSelectorBar } from '@/components/ThemeSelectorBar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/LandingPage/HeroSection';
import { LiveAuditSimulator } from '@/components/LandingPage/LiveAuditSimulator';
import { TierExplainerSection } from '@/components/LandingPage/TierExplainerSection';
import { HowItWorks } from '@/components/LandingPage/HowItWorks';
import { AdvocateCharter } from '@/components/LandingPage/AdvocateCharter';
import { TestimonialsAndAudits } from '@/components/LandingPage/TestimonialsAndAudits';
import { Footer } from '@/components/Footer';
import { IntakeWizard } from '@/components/IntakeFlow/IntakeWizard';
import { HouseholdSweepModal } from '@/components/HouseholdSweep/HouseholdSweepModal';
import { VehicleVaultModal } from '@/components/VehicleVault/VehicleVaultModal';
import { ServiceDriveEmergencyModal } from '@/components/ServiceDriveEmergencyModal';
import { INITIAL_HOUSEHOLD_VEHICLES } from '@/data/sampleVehicles';

export default function Home() {
  const [theme, setTheme] = useState<any>('cobalt-dark');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSweepOpen, setIsSweepOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_HOUSEHOLD_VEHICLES);

  const handleOpenIntake = (sampleId?: string) => {
    setIsWizardOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      <ThemeSelectorBar currentTheme={theme} onSelectTheme={setTheme} />
      <Header 
        onOpenIntake={() => handleOpenIntake()} 
        onOpenSweep={() => setIsSweepOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        vaultCount={vehicles.length}
        currentView="landing"
        onNavigateHome={() => {}}
      />

      <main>
        <HeroSection 
          onOpenIntake={handleOpenIntake} 
          onStartVinSweep={() => setIsSweepOpen(true)}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />
        <LiveAuditSimulator onOpenFullIntake={handleOpenIntake} />
        <TierExplainerSection onSelectTierForIntake={(tierId: TierId) => handleOpenIntake()} />
        <HowItWorks onOpenIntake={handleOpenIntake} />
        <AdvocateCharter />
        <TestimonialsAndAudits />
      </main>

      <Footer />

      {/* Modals */}
      {isWizardOpen && (
        <IntakeWizard onClose={() => setIsWizardOpen(false)} />
      )}

      {isSweepOpen && (
        <HouseholdSweepModal 
          onClose={() => setIsSweepOpen(false)} 
          onSelectVehicleForAudit={(vehicle) => handleOpenIntake()}
        />
      )}

      {isVaultOpen && (
        <VehicleVaultModal 
          onClose={() => setIsVaultOpen(false)} 
          vehicles={vehicles}
          onSelectVehicleForAudit={(vehicle) => handleOpenIntake()}
          onOpenSweep={() => setIsSweepOpen(true)}
        />
      )}

      {isEmergencyOpen && (
        <ServiceDriveEmergencyModal
          onClose={() => setIsEmergencyOpen(false)}
          onOpenIntake={(sampleId?: string) => handleOpenIntake(sampleId)}
        />
      )}
    </div>
  );
}
