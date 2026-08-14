import React from 'react';
import { TierId, EstimateAuditResult } from '../../types';
import { ModernIntakeModal } from './ModernIntakeModal';

export { ModernIntakeModal } from './ModernIntakeModal';

export interface IntakeWizardProps {
  initialSampleId?: string;
  initialTier?: TierId;
  onClose: () => void;
  onSaveToVault?: (audit: EstimateAuditResult) => void;
}

export const IntakeWizard: React.FC<IntakeWizardProps> = ({
  initialSampleId = 'sample-1',
  initialTier = 'tier-1',
  onClose,
  onSaveToVault
}) => {
  return (
    <ModernIntakeModal
      isOpen={true}
      initialStep={1}
      initialSampleId={initialSampleId}
      initialTier={initialTier}
      onClose={onClose}
      onSaveToVault={onSaveToVault}
    />
  );
};
