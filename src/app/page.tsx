'use client';

import React, { useState } from 'react';

// Import types
import { TierId, VehicleRecord } from '@/types';

// Import components
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
import { AdvisorControlRoom } from '@/components/AdvisorControlRoom/AdvisorControlRoom';
import { INITIAL_HOUSEHOLD_VEHICLES } from '@/data/sampleVehicles';

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'control-room'>('landing');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isSweepOpen, setIsSweepOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_HOUSEHOLD_VEHICLES);

  const handleOpenIntake = (sampleId?: string) => {
    setIsWizardOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Header 
        onOpenIntake={() => handleOpenIntake()} 
        onOpenSweep={() => setIsSweepOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        vaultCount={vehicles.length}
        currentView={currentView as any}
        onNavigateHome={() => setCurrentView('landing')}
      />

      {currentView === 'control-room' ? (
        <AdvisorControlRoom onExitToCustomerApp={() => setCurrentView('landing')} />
      ) : (
        <main>
          {/* Quick Access Control Room Toggle Banner */}
          <div className="bg-slate-900 border-b border-slate-800 py-2 px-4 text-center text-xs">
            <span className="text-slate-400">Advisor Portal: </span>
            <button 
              onClick={() => setCurrentView('control-room')}
              className="text-blue-400 hover:text-blue-300 font-semibold underline ml-1"
            >
              Launch Control Room &rarr;
            </button>
          </div>

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
      )}

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
