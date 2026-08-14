import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  BookOpenCheck, 
  Sparkles, 
  Camera, 
  Upload, 
  FileText, 
  Check, 
  X, 
  Car, 
  Calendar, 
  Wrench, 
  Receipt, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Lock, 
  Award,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Shield,
  FileSpreadsheet
} from 'lucide-react';
import { TierId } from '../../types';
import { TIERS_DATA } from '../../data/tiersData';

export interface ModernIntakeModalProps {
  isOpen?: boolean;
  initialTier?: TierId;
  initialStep?: 1 | 2 | 3 | 4 | 5;
  initialSampleId?: string;
  onClose: () => void;
  onSaveToVault?: (data: any) => void;
  onCompleteOnboarding?: (vaultData: {
    selectedTier: TierId;
    vinData: {
      vin: string;
      docFile: File | null;
      docFileName: string | null;
      docPreviewUrl: string | null;
    };
    inspectionDue: {
      month: string;
      year: string;
    };
    serviceRecords: Array<{
      id: string;
      file: File;
      name: string;
      size: string;
      type: string;
      category: 'DIY Parts Receipt' | 'Shop Invoice' | 'Oil & Filter' | 'Inspection' | 'Other';
      previewUrl?: string;
    }>;
    warrantyContracts: Array<{
      id: string;
      file: File;
      name: string;
      size: string;
      type: string;
      category: 'Extended Warranty' | 'Vehicle Protection Plan' | 'Powertrain Policy' | 'Other';
      previewUrl?: string;
    }>;
  }) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = ['2025', '2026', '2027', '2028', '2029', '2030'];

export const ModernIntakeModal: React.FC<ModernIntakeModalProps> = ({
  isOpen = true,
  initialTier = 'tier-1',
  initialStep = 1,
  onClose,
  onSaveToVault,
  onCompleteOnboarding
}) => {
  // Step State: 1 = Welcome & Tier, 2 = VIN Capture, 3 = State Compliance, 4 = Prep Screen, 5 = Vault Upload
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Step 1: Tier Selection
  const [selectedTier, setSelectedTier] = useState<TierId>(initialTier);

  // Step 2: VIN & Document Capture
  const [vinNumber, setVinNumber] = useState<string>('1HGCR2F83NA048912');
  const [vinDocFile, setVinDocFile] = useState<File | null>(null);
  const [vinDocFileName, setVinDocFileName] = useState<string | null>('insurance_card_front.jpg');
  const [vinDocPreview, setVinDocPreview] = useState<string | null>(null);
  const [isVinDragging, setIsVinDragging] = useState<boolean>(false);
  const [detectedVehicleInfo] = useState<{
    year: number;
    make: string;
    model: string;
    trim?: string;
  }>({
    year: 2022,
    make: 'Honda',
    model: 'Accord Sport',
    trim: '2.0T'
  });
  const vinFileInputRef = useRef<HTMLInputElement>(null);
  const vinCameraInputRef = useRef<HTMLInputElement>(null);

  // Step 3: State Inspection Due Date
  const currentMonthIdx = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [inspectionMonth, setInspectionMonth] = useState<string>(MONTHS[(currentMonthIdx + 2) % 12]);
  const [inspectionYear, setInspectionYear] = useState<string>(String(currentYear + (currentMonthIdx >= 10 ? 1 : 0)));
  const [stateInspectionState, setStateInspectionState] = useState<string>('Texas (TX)');
  const [exemptFromInspection, setExemptFromInspection] = useState<boolean>(false);

  // Step 5: Card 1 - Service Records & Receipts Upload
  const [uploadedServiceRecords, setUploadedServiceRecords] = useState<Array<{
    id: string;
    file: File;
    name: string;
    size: string;
    type: string;
    category: 'DIY Parts Receipt' | 'Shop Invoice' | 'Oil & Filter' | 'Inspection' | 'Other';
    previewUrl?: string;
  }>>([
    {
      id: 'demo-rec-1',
      file: new File(['demo'], 'AutoZone_Synthetic_Oil_Filter.pdf', { type: 'application/pdf' }),
      name: 'AutoZone_Synthetic_Oil_Filter.pdf',
      size: '245 KB',
      type: 'application/pdf',
      category: 'DIY Parts Receipt'
    },
    {
      id: 'demo-rec-2',
      file: new File(['demo'], 'Dealership_30k_Interval_Invoice.pdf', { type: 'application/pdf' }),
      name: 'Dealership_30k_Interval_Invoice.pdf',
      size: '1.2 MB',
      type: 'application/pdf',
      category: 'Shop Invoice'
    }
  ]);
  const [isServiceDragging, setIsServiceDragging] = useState<boolean>(false);
  const serviceRecordsFileInputRef = useRef<HTMLInputElement>(null);
  const serviceRecordsCameraInputRef = useRef<HTMLInputElement>(null);

  // Step 5: Card 2 - Extended Warranty Contracts Upload
  const [uploadedWarrantyContracts, setUploadedWarrantyContracts] = useState<Array<{
    id: string;
    file: File;
    name: string;
    size: string;
    type: string;
    category: 'Extended Warranty' | 'Vehicle Protection Plan' | 'Powertrain Policy' | 'Other';
    previewUrl?: string;
  }>>([
    {
      id: 'demo-warranty-1',
      file: new File(['demo'], 'CarShield_Platinum_Protection_Plan.pdf', { type: 'application/pdf' }),
      name: 'CarShield_Platinum_Protection_Plan.pdf',
      size: '2.4 MB',
      type: 'application/pdf',
      category: 'Extended Warranty'
    }
  ]);
  const [isWarrantyDragging, setIsWarrantyDragging] = useState<boolean>(false);
  const warrantyFileInputRef = useRef<HTMLInputElement>(null);
  const warrantyCameraInputRef = useRef<HTMLInputElement>(null);

  // Processing & Generating State (Step 5 submit)
  const [isSubmittingVault, setIsSubmittingVault] = useState<boolean>(false);
  const [submissionProgress, setSubmissionProgress] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Step 2: Handle VIN / Insurance card file
  const handleVinFileSelected = (file: File) => {
    setVinDocFile(file);
    setVinDocFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVinDocPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setVinDocPreview(null);
    }
  };

  const handleVinDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVinDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVinFileSelected(e.dataTransfer.files[0]);
    }
  };

  // Step 5: Card 1 - Service Records File Handling
  const handleServiceFilesAdded = (files: FileList | File[]) => {
    const newItems: Array<{
      id: string;
      file: File;
      name: string;
      size: string;
      type: string;
      category: 'DIY Parts Receipt' | 'Shop Invoice' | 'Oil & Filter' | 'Inspection' | 'Other';
      previewUrl?: string;
    }> = [];

    Array.from(files).forEach((file, idx) => {
      const isImg = file.type.startsWith('image/');
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      let preview: string | undefined = undefined;
      if (isImg) {
        preview = URL.createObjectURL(file);
      }

      let cat: 'DIY Parts Receipt' | 'Shop Invoice' | 'Oil & Filter' | 'Inspection' | 'Other' = 'Shop Invoice';
      const lower = file.name.toLowerCase();
      if (lower.includes('autozone') || lower.includes('receipt') || lower.includes('parts') || lower.includes('rockauto') || lower.includes('amazon')) {
        cat = 'DIY Parts Receipt';
      } else if (lower.includes('oil') || lower.includes('filter') || lower.includes('mobil')) {
        cat = 'Oil & Filter';
      } else if (lower.includes('inspection') || lower.includes('state') || lower.includes('sticker')) {
        cat = 'Inspection';
      }

      newItems.push({
        id: `rec-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        size: sizeStr,
        type: file.type,
        category: cat,
        previewUrl: preview
      });
    });

    setUploadedServiceRecords(prev => [...prev, ...newItems]);
  };

  const handleServiceRecordsDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsServiceDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleServiceFilesAdded(e.dataTransfer.files);
    }
  };

  const handleRemoveServiceRecord = (id: string) => {
    setUploadedServiceRecords(prev => prev.filter(r => r.id !== id));
  };

  // Step 5: Card 2 - Extended Warranty Contracts File Handling
  const handleWarrantyFilesAdded = (files: FileList | File[]) => {
    const newItems: Array<{
      id: string;
      file: File;
      name: string;
      size: string;
      type: string;
      category: 'Extended Warranty' | 'Vehicle Protection Plan' | 'Powertrain Policy' | 'Other';
      previewUrl?: string;
    }> = [];

    Array.from(files).forEach((file, idx) => {
      const isImg = file.type.startsWith('image/');
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      let preview: string | undefined = undefined;
      if (isImg) {
        preview = URL.createObjectURL(file);
      }

      let cat: 'Extended Warranty' | 'Vehicle Protection Plan' | 'Powertrain Policy' | 'Other' = 'Extended Warranty';
      const lower = file.name.toLowerCase();
      if (lower.includes('protection') || lower.includes('plan') || lower.includes('vsc')) {
        cat = 'Vehicle Protection Plan';
      } else if (lower.includes('powertrain') || lower.includes('drivetrain')) {
        cat = 'Powertrain Policy';
      }

      newItems.push({
        id: `warr-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        size: sizeStr,
        type: file.type,
        category: cat,
        previewUrl: preview
      });
    });

    setUploadedWarrantyContracts(prev => [...prev, ...newItems]);
  };

  const handleWarrantyDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWarrantyDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleWarrantyFilesAdded(e.dataTransfer.files);
    }
  };

  const handleRemoveWarrantyContract = (id: string) => {
    setUploadedWarrantyContracts(prev => prev.filter(w => w.id !== id));
  };

  // Submit Final Vault Creation & Carfax Generation
  const handleFinalSubmit = async () => {
    setIsSubmittingVault(true);
    setCurrentStep(5);

    setSubmissionProgress('Running OCR on registration document & extracting 17-digit VIN...');
    await new Promise(r => setTimeout(r, 650));

    setSubmissionProgress('Connecting to CARFAX Telemetry & Pulling National Title & Odometer records...');
    await new Promise(r => setTimeout(r, 750));

    setSubmissionProgress(`Indexing ${uploadedServiceRecords.length} historical service records & ${uploadedWarrantyContracts.length} warranty contract clauses into AI vault...`);
    await new Promise(r => setTimeout(r, 750));

    setSubmissionProgress(`Enforcing ${TIERS_DATA[selectedTier].shortTitle} advocate rules & scheduling compliance alerts...`);
    await new Promise(r => setTimeout(r, 600));

    const finalVaultData = {
      selectedTier,
      vinData: {
        vin: vinNumber,
        docFile: vinDocFile,
        docFileName: vinDocFileName,
        docPreviewUrl: vinDocPreview
      },
      inspectionDue: {
        month: inspectionMonth,
        year: inspectionYear
      },
      serviceRecords: uploadedServiceRecords,
      warrantyContracts: uploadedWarrantyContracts
    };

    if (onCompleteOnboarding) {
      onCompleteOnboarding(finalVaultData);
    }

    if (onSaveToVault) {
      onSaveToVault(finalVaultData);
    }

    setIsSubmittingVault(false);
    setIsCompleted(true);
  };

  return (
    <div 
      id="vault-onboarding-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div 
        id="vault-onboarding-modal-card"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Glowing Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Vehicle Vault Onboarding
                </h3>
                <span className="bg-blue-500/15 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/30">
                  History Capture
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="font-medium text-blue-400">The tech you need, the human you trust.</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="hidden sm:inline">Setup verified OEM schedule &amp; CARFAX records</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-vault-onboarding-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Step Visual Stepper Bar */}
        {!isCompleted && !isSubmittingVault && (
          <div className="px-4 sm:px-6 py-2.5 bg-slate-950/70 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-semibold">
              {[
                { step: 1, label: 'Tier' },
                { step: 2, label: 'VIN & Reg' },
                { step: 3, label: 'Inspection' },
                { step: 4, label: 'Records Prep' },
                { step: 5, label: 'Vault Upload' }
              ].map((s, idx, arr) => {
                const isActive = currentStep === s.step;
                const isPassed = currentStep > s.step;
                return (
                  <React.Fragment key={s.step}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(s.step)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isActive 
                          ? 'text-blue-400 font-bold' 
                          : isPassed 
                          ? 'text-slate-300 hover:text-white' 
                          : 'text-slate-500'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isPassed 
                          ? 'bg-blue-600 text-white' 
                          : isActive 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-400' 
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isPassed ? <Check className="w-3 h-3" /> : s.step}
                      </div>
                      <span className="text-[11px] hidden sm:inline">{s.label}</span>
                    </button>
                    {idx < arr.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1.5 sm:mx-2 ${currentStep > s.step ? 'bg-blue-600' : 'bg-slate-800'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ================================================================= */}
          {/* STEP 1: WELCOME & TIER SELECTION                                  */}
          {/* ================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Reassuring Welcome Message Banner */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-blue-950/30">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white tracking-wide">
                      The tech you need, the human you trust.
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Intelligent algorithms audit your records with licensed master technician human advocacy at every step.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900/40 border border-blue-500/30 text-[11px] font-semibold text-blue-300 shrink-0 self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Advocate Protected</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Step 1 of 5
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Welcome to AdvisrAdvisor • Choose Your Maintenance Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Select how our independent advocate should audit your upcoming service recommendations and build your vehicle history.
                </p>
              </div>

              {/* 3 Selectable Tier Cards */}
              <div className="space-y-3">
                {/* TIER 1 CARD */}
                <div
                  id="onboarding-tier-card-1"
                  onClick={() => setSelectedTier('tier-1')}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left relative ${
                    selectedTier === 'tier-1'
                      ? 'bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-950/50'
                      : 'bg-slate-950/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedTier === 'tier-1' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm sm:text-base font-bold text-white">
                            Tier 1: Minimalist Reactive
                          </h5>
                          <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">
                            Max Savings
                          </span>
                        </div>
                        <p className="text-xs text-blue-400/90 font-medium">
                          Fix Active Failures &amp; Safety Items Only
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      selectedTier === 'tier-1'
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'border-slate-700 bg-slate-900 text-transparent'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    Ideal for tight budgets. Eliminates all unnecessary chemical flushes and premature replacements. Approves only active breakdown risks and safety items.
                  </p>
                </div>

                {/* TIER 2 CARD */}
                <div
                  id="onboarding-tier-card-2"
                  onClick={() => setSelectedTier('tier-2')}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left relative ${
                    selectedTier === 'tier-2'
                      ? 'bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-950/50'
                      : 'bg-slate-950/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedTier === 'tier-2' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <BookOpenCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm sm:text-base font-bold text-white">
                            Tier 2: Strict OEM Schedule
                          </h5>
                          <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-500/30">
                            Factory Spec
                          </span>
                        </div>
                        <p className="text-xs text-sky-400/90 font-medium">
                          Adhere Strictly to the Manufacturer's Manual
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      selectedTier === 'tier-2'
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'border-slate-700 bg-slate-900 text-transparent'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    Maintains full factory warranty compliance without dealer markup. Follows exact owner's manual intervals while stripping padded shop labor.
                  </p>
                </div>

                {/* TIER 3 CARD */}
                <div
                  id="onboarding-tier-card-3"
                  onClick={() => setSelectedTier('tier-3')}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left relative ${
                    selectedTier === 'tier-3'
                      ? 'bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-950/50'
                      : 'bg-slate-950/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedTier === 'tier-3' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm sm:text-base font-bold text-white">
                            Tier 3: Optimal Care
                          </h5>
                          <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                            Longevity 200k+
                          </span>
                        </div>
                        <p className="text-xs text-amber-400/90 font-medium">
                          Proactive Care for Long-Term Vehicle Keepers
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      selectedTier === 'tier-3'
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'border-slate-700 bg-slate-900 text-transparent'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    Designed for 200,000+ mile mechanical longevity. Approves preventative fluid changes while strictly auditing parts prices and labor overlap.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 2: VIN CAPTURE & REGISTRATION CARD PHOTO                     */}
          {/* ================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Step 2 of 5
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  VIN Capture &amp; Vehicle Verification
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Snap a photo of your Registration or Insurance Card. We will automatically extract your 17-digit VIN and pull your factory build specifications.
                </p>
              </div>

              {/* Clean Camera / Upload Dropzone */}
              <div
                id="registration-vin-dropzone"
                onDragOver={(e) => { e.preventDefault(); setIsVinDragging(true); }}
                onDragLeave={() => setIsVinDragging(false)}
                onDrop={handleVinDrop}
                onClick={() => vinFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                  isVinDragging
                    ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
                    : vinDocFile || vinDocFileName
                    ? 'border-emerald-500/60 bg-emerald-950/15'
                    : 'border-slate-700 hover:border-blue-500/60 bg-slate-950/60 hover:bg-slate-900/80'
                }`}
              >
                <input
                  ref={vinFileInputRef}
                  type="file"
                  id="vin-doc-file-input"
                  accept="image/*,.pdf,application/pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleVinFileSelected(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <input
                  ref={vinCameraInputRef}
                  type="file"
                  id="vin-doc-camera-input"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleVinFileSelected(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {vinDocFile || vinDocFileName ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{vinDocFileName}</p>
                      <p className="text-xs text-emerald-400 font-medium mt-0.5">
                        ✓ Document Captured • OCR VIN Extraction Active
                      </p>
                    </div>

                    {vinDocPreview && (
                      <div className="max-h-32 rounded-lg overflow-hidden border border-slate-700 mx-auto inline-block shadow-md">
                        <img src={vinDocPreview} alt="Card Preview" className="h-28 object-contain bg-black/40" />
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          vinFileInputRef.current?.click();
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Snap a photo of your Registration or Insurance Card
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Drag &amp; drop file here, or tap to choose from your phone or desktop
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          vinCameraInputRef.current?.click();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Snap Photo
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          vinFileInputRef.current?.click();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4 text-blue-400" />
                        Browse File
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Or Manual VIN Input */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="onboarding-vin-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-blue-400" />
                    17-Digit Vehicle Identification Number (VIN)
                  </label>
                  <span className="text-[10px] text-slate-400">Standard NHTSA format</span>
                </div>

                <div className="relative">
                  <input
                    id="onboarding-vin-input"
                    type="text"
                    maxLength={17}
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. 1HGCR2F83NA048912"
                    className="w-full bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-base sm:text-lg font-mono font-bold text-white tracking-widest placeholder-slate-600 focus:outline-none uppercase"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-bold text-emerald-400">
                    {vinNumber.length === 17 ? '✓ 17 Digits' : `${vinNumber.length}/17`}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-slate-400">Identified Vehicle:</span>
                  <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {detectedVehicleInfo.year} {detectedVehicleInfo.make} {detectedVehicleInfo.model} {detectedVehicleInfo.trim}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 3: STATE COMPLIANCE & INSPECTION DUE DATE                   */}
          {/* ================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Step 3 of 5
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  State Compliance &amp; Inspection Schedule
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  When is your next state safety &amp; emissions inspection due? We will monitor your readiness monitors and alert you before compliance deadlines.
                </p>
              </div>

              {/* Inspection Date Picker Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-6">
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    When is your next state inspection due?
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Month Dropdown */}
                    <div className="space-y-1">
                      <label htmlFor="inspection-month-select" className="text-[11px] font-semibold text-slate-400 uppercase">
                        Month
                      </label>
                      <select
                        id="inspection-month-select"
                        value={inspectionMonth}
                        disabled={exemptFromInspection}
                        onChange={(e) => setInspectionMonth(e.target.value)}
                        className="w-full bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-3.5 py-3 text-sm font-bold text-white focus:outline-none cursor-pointer disabled:opacity-50"
                      >
                        {MONTHS.map((m) => (
                          <option key={m} value={m} className="bg-slate-900 text-white">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Year Dropdown */}
                    <div className="space-y-1">
                      <label htmlFor="inspection-year-select" className="text-[11px] font-semibold text-slate-400 uppercase">
                        Year
                      </label>
                      <select
                        id="inspection-year-select"
                        value={inspectionYear}
                        disabled={exemptFromInspection}
                        onChange={(e) => setInspectionYear(e.target.value)}
                        className="w-full bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-3.5 py-3 text-sm font-bold text-white focus:outline-none cursor-pointer disabled:opacity-50"
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y} className="bg-slate-900 text-white">
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* State Jurisdiction & Exemption checkbox */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-slate-300">Registration State</p>
                      <p className="text-[11px] text-slate-400">Calibrates statutory safety vs emissions criteria</p>
                    </div>
                    <select
                      id="registration-state-select"
                      value={stateInspectionState}
                      onChange={(e) => setStateInspectionState(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Texas (TX)">Texas (TX)</option>
                      <option value="California (CA)">California (CA)</option>
                      <option value="New York (NY)">New York (NY)</option>
                      <option value="Florida (FL)">Florida (FL - Exempt)</option>
                      <option value="Pennsylvania (PA)">Pennsylvania (PA)</option>
                      <option value="Ohio (OH)">Ohio (OH)</option>
                      <option value="Other / Non-US">Other Jurisdiction</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="exempt-state-inspection-checkbox"
                      checked={exemptFromInspection}
                      onChange={(e) => setExemptFromInspection(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-xs text-slate-400 select-none">
                      My county or vehicle does not require annual state safety/emissions inspections
                    </span>
                  </label>
                </div>
              </div>

              {/* Status indicator summary */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200 leading-snug">
                  {exemptFromInspection 
                    ? 'Inspection monitoring paused. Routine maintenance intervals will still trigger.'
                    : `Advisr will automatically run an OBD-II readiness check 30 days prior to ${inspectionMonth} ${inspectionYear}.`}
                </p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 4: PREP SCREEN (WARM, FRIENDLY INSTRUCTIONS)                 */}
          {/* ================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200 text-center sm:text-left">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Step 4 of 5
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Gather Your Past Service Records
                </h4>
              </div>

              {/* Friendly instructions card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto sm:mx-0">
                  <Receipt className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <p className="text-base sm:text-lg font-bold text-white leading-snug">
                    Take photos of any old receipts, DIY parts, or shop invoices.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    We will extract the data to build your permanent service history and link it directly to your vehicle's CARFAX timeline.
                  </p>
                </div>

                {/* Scannable checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left space-y-1">
                    <span className="text-lg">🛠️</span>
                    <p className="text-xs font-bold text-white">DIY Parts Receipts</p>
                    <p className="text-[11px] text-slate-400">AutoZone, RockAuto, Amazon parts orders &amp; fluids</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left space-y-1">
                    <span className="text-lg">📑</span>
                    <p className="text-xs font-bold text-white">Shop Invoices</p>
                    <p className="text-[11px] text-slate-400">Past dealer or independent repair receipts &amp; MPVI sheets</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left space-y-1">
                    <span className="text-lg">🛡️</span>
                    <p className="text-xs font-bold text-white">Warranty Contracts</p>
                    <p className="text-[11px] text-slate-400">Extended coverage plans to verify component protections</p>
                  </div>
                </div>
              </div>

              {/* Ready Button Callout */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-blue-950/30 border border-blue-500/30">
                <p className="text-xs text-slate-300 text-center sm:text-left">
                  Have files or physical receipts ready? Proceed to upload both service records and warranty paperwork.
                </p>
                <button
                  type="button"
                  id="im-ready-prep-btn"
                  onClick={() => setCurrentStep(5)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-md shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-100 shrink-0"
                >
                  <span>I'm Ready</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 5: VAULT UPLOAD (SPLIT INTO 2 DISTINCT UPLOAD CARDS)          */}
          {/* ================================================================= */}
          {currentStep === 5 && !isSubmittingVault && !isCompleted && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Step 5 of 5
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Vault Upload • Service Records &amp; Warranty Contracts
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Upload your past vehicle records and extended warranty coverage to unlock automated fine-print audit protection.
                </p>
              </div>

              {/* TWO DISTINCT UPLOAD CARDS (SPLIT LAYOUT) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ------------------------------------------------------------- */}
                {/* CARD 1: SERVICE RECORDS & RECEIPTS                            */}
                {/* ------------------------------------------------------------- */}
                <div 
                  id="vault-card-service-records"
                  className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Header with Distinct Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm sm:text-base font-bold text-white">
                              Service Records &amp; Receipts
                            </h5>
                          </div>
                          <p className="text-xs text-blue-400/90 font-medium">
                            Past Maintenance &amp; Shop Invoices
                          </p>
                        </div>
                      </div>
                      <span className="bg-blue-500/10 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/20 shrink-0">
                        {uploadedServiceRecords.length} Added
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      Upload past maintenance records, dealer invoices, oil changes, tire rotations, and DIY parts receipts from AutoZone or RockAuto.
                    </p>

                    {/* Secure Dropzone 1 */}
                    <div
                      id="dropzone-service-records"
                      onDragOver={(e) => { e.preventDefault(); setIsServiceDragging(true); }}
                      onDragLeave={() => setIsServiceDragging(false)}
                      onDrop={handleServiceRecordsDrop}
                      onClick={() => serviceRecordsFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
                        isServiceDragging
                          ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
                          : 'border-slate-700/90 hover:border-blue-500/60 bg-slate-950/80 hover:bg-slate-900/90'
                      }`}
                    >
                      <input
                        ref={serviceRecordsFileInputRef}
                        type="file"
                        multiple
                        id="service-records-file-input"
                        accept="image/*,.pdf,application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleServiceFilesAdded(e.target.files);
                          }
                        }}
                        className="hidden"
                      />
                      <input
                        ref={serviceRecordsCameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        id="service-records-camera-input"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleServiceFilesAdded(e.target.files);
                          }
                        }}
                        className="hidden"
                      />

                      <div className="space-y-2">
                        <div className="w-9 h-9 mx-auto rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            Drop receipts or shop invoices
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            PDF, JPG, PNG or HEIC (Multi-file)
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              serviceRecordsCameraInputRef.current?.click();
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            Snap Photo
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              serviceRecordsFileInputRef.current?.click();
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 transition-all flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5 text-blue-400" />
                            Add Files
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Uploaded service files list */}
                    {uploadedServiceRecords.length > 0 && (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {uploadedServiceRecords.map((rec) => (
                          <div
                            key={rec.id}
                            className="p-2 rounded-lg bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <FileCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-200 truncate text-[11px]">
                                  {rec.name}
                                </p>
                                <span className="text-[9px] text-slate-400">
                                  {rec.category} • {rec.size}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveServiceRecord(rec.id)}
                              className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* CARD 2: EXTENDED WARRANTY CONTRACTS                           */}
                {/* ------------------------------------------------------------- */}
                <div 
                  id="vault-card-warranty-contracts"
                  className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-emerald-900/40 flex flex-col justify-between space-y-4 hover:border-emerald-700/60 transition-colors shadow-lg relative overflow-hidden"
                >
                  {/* Subtle security background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="space-y-3 relative z-10">
                    {/* Header with Distinct Shield Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm sm:text-base font-bold text-white">
                              Extended Warranty Contracts
                            </h5>
                          </div>
                          <p className="text-xs text-emerald-400/90 font-medium flex items-center gap-1">
                            <Lock className="w-3 h-3 text-emerald-400" />
                            Automated Coverage Defense
                          </p>
                        </div>
                      </div>
                      <span className="bg-emerald-500/15 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                        {uploadedWarrantyContracts.length} Added
                      </span>
                    </div>

                    {/* Exact Requested Subtext */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Upload your warranty paperwork. Our AI will translate the fine print and tell you exactly what parts are covered before a shop ever tries to charge you.
                    </p>

                    {/* Secure Dropzone 2 */}
                    <div
                      id="dropzone-warranty-contracts"
                      onDragOver={(e) => { e.preventDefault(); setIsWarrantyDragging(true); }}
                      onDragLeave={() => setIsWarrantyDragging(false)}
                      onDrop={handleWarrantyDrop}
                      onClick={() => warrantyFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
                        isWarrantyDragging
                          ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
                          : 'border-emerald-800/60 hover:border-emerald-500/70 bg-slate-950/80 hover:bg-slate-900/90'
                      }`}
                    >
                      <input
                        ref={warrantyFileInputRef}
                        type="file"
                        multiple
                        id="warranty-contract-file-input"
                        accept="image/*,.pdf,application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleWarrantyFilesAdded(e.target.files);
                          }
                        }}
                        className="hidden"
                      />
                      <input
                        ref={warrantyCameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        id="warranty-contract-camera-input"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleWarrantyFilesAdded(e.target.files);
                          }
                        }}
                        className="hidden"
                      />

                      <div className="space-y-2">
                        <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            Upload warranty PDF or contract photos
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Protection plans, VSC agreements &amp; powertrain policies
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              warrantyCameraInputRef.current?.click();
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            Snap Contract
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              warrantyFileInputRef.current?.click();
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 transition-all flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5 text-emerald-400" />
                            Add Contract
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Uploaded warranty files list */}
                    {uploadedWarrantyContracts.length > 0 && (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {uploadedWarrantyContracts.map((warr) => (
                          <div
                            key={warr.id}
                            className="p-2 rounded-lg bg-emerald-950/25 border border-emerald-800/60 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-semibold text-emerald-200 truncate text-[11px]">
                                  {warr.name}
                                </p>
                                <span className="text-[9px] text-emerald-400/80">
                                  {warr.category} • {warr.size} • Fine-Print Parser Active
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveWarrantyContract(warr.id)}
                              className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* High-Trust Ingestion Telemetry Footer Note */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-emerald-950/50 border border-slate-700/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      Automated CARFAX Cross-Validation &amp; Defense Engine
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {uploadedServiceRecords.length + uploadedWarrantyContracts.length} document(s) queued for optical character recognition &amp; clause mapping.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 hidden sm:inline">
                  256-BIT ENCRYPTED
                </span>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* SUBMITTING / SPINNER STATE                                        */}
          {/* ================================================================= */}
          {isSubmittingVault && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-in fade-in duration-200">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  VAULT
                </div>
              </div>
              <div className="space-y-1.5 max-w-md">
                <p className="text-base font-bold text-white">Building Vehicle Vault &amp; Ingesting History</p>
                <p className="text-xs text-emerald-400 font-medium animate-pulse">{submissionProgress}</p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 6: COMPLETED SUCCESS STATE                                   */}
          {/* ================================================================= */}
          {isCompleted && (
            <div className="py-6 space-y-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/50">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
                  Vault Generated Successfully
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {detectedVehicleInfo.year} {detectedVehicleInfo.make} {detectedVehicleInfo.model}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your vehicle history is locked into your Household Vault with verified CARFAX telemetry, {TIERS_DATA[selectedTier].shortTitle} policy, {uploadedServiceRecords.length} service records, and {uploadedWarrantyContracts.length} warranty contract(s).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">VIN:</span>
                  <span className="font-mono font-bold text-white">{vinNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Advocate Tier:</span>
                  <span className="font-bold text-blue-400">{TIERS_DATA[selectedTier].shortTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next State Inspection:</span>
                  <span className="font-bold text-slate-200">{inspectionMonth} {inspectionYear} ({stateInspectionState})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service Records Indexed:</span>
                  <span className="font-bold text-blue-400">{uploadedServiceRecords.length} Records</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Warranty Protection Contracts:</span>
                  <span className="font-bold text-emerald-400">{uploadedWarrantyContracts.length} Contracts Active</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id="complete-onboarding-done-btn"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Enter Household Vault
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Controls (Steps 1 to 5) */}
        {!isCompleted && !isSubmittingVault && (
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between gap-3 sticky bottom-0 z-20">
            {currentStep > 1 ? (
              <button
                type="button"
                id="vault-onboarding-back-btn"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                id={`vault-onboarding-step-${currentStep}-next-btn`}
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-5 sm:px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="generate-carfax-build-vault-btn"
                onClick={handleFinalSubmit}
                className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white text-xs sm:text-sm font-black transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-100"
              >
                <Award className="w-4 h-4" />
                <span>Generate Free Carfax &amp; Build My Vault</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
