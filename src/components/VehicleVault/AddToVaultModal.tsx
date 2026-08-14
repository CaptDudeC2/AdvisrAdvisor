import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  FileText,
  Calendar,
  Gauge,
  Upload,
  Camera,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  Car,
  DollarSign,
  TrendingDown,
  FileCheck
} from 'lucide-react';
import { VehicleRecord } from '../../types';

export type VaultRecordType = 'diy' | 'shop';

export interface AddToVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles?: VehicleRecord[];
  selectedVehicleId?: string;
  onSaveRecord?: (record: {
    type: VaultRecordType;
    vehicleId: string;
    date: string;
    mileage: number;
    servicePerformed: string;
    partsCost?: number;
    receiptFile?: File | null;
    invoiceFile?: File | null;
    declinedServices?: string[];
    isAiExtracted?: boolean;
  }) => void;
}

export const AddToVaultModal: React.FC<AddToVaultModalProps> = ({
  isOpen,
  onClose,
  vehicles = [],
  selectedVehicleId,
  onSaveRecord
}) => {
  // Dropdown Selection State: 'diy' = DIY Part & Service Log | 'shop' = Repair Shop Invoice or Estimate
  const [recordType, setRecordType] = useState<VaultRecordType>('diy');
  
  // Target vehicle state
  const [targetVehicleId, setTargetVehicleId] = useState<string>(
    selectedVehicleId || (vehicles[0]?.id ?? 'veh-01')
  );

  // Path A: DIY Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [diyDate, setDiyDate] = useState<string>(todayStr);
  const [diyMileage, setDiyMileage] = useState<string>('38450');
  const [diyReceiptFile, setDiyReceiptFile] = useState<File | null>(null);
  const [diyReceiptPreview, setDiyReceiptPreview] = useState<string | null>(null);
  const [isDiyDragging, setIsDiyDragging] = useState<boolean>(false);
  const diyFileInputRef = useRef<HTMLInputElement>(null);
  const diyCameraInputRef = useRef<HTMLInputElement>(null);

  // Path B: Repair Shop Invoice State
  const [shopInvoiceFile, setShopInvoiceFile] = useState<File | null>(null);
  const [shopInvoicePreview, setShopInvoicePreview] = useState<string | null>(null);
  const [isShopDragging, setIsShopDragging] = useState<boolean>(false);
  const shopFileInputRef = useRef<HTMLInputElement>(null);
  const shopCameraInputRef = useRef<HTMLInputElement>(null);

  // Submission & Processing States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<{
    date: string;
    mileage: number;
    completedServices: string[];
    declinedServices: string[];
    shopName: string;
    totalAmount: number;
  } | null>(null);
  const [extractedDiyData, setExtractedDiyData] = useState<{
    date: string;
    mileage: number;
    parts: Array<{ name: string; partNumber: string; cost: number }>;
    totalCost: number;
  } | null>(null);

  if (!isOpen) return null;

  const currentVehicle = vehicles.find(v => v.id === targetVehicleId) || vehicles[0];

  // DIY Receipt Handlers
  const handleDiyFileSelected = (file: File) => {
    setDiyReceiptFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDiyReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setDiyReceiptPreview(null);
    }
  };

  const handleDiyDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDiyDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleDiyFileSelected(e.dataTransfer.files[0]);
    }
  };

  // Shop Invoice Handlers
  const handleShopFileSelected = (file: File) => {
    setShopInvoiceFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopInvoicePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setShopInvoicePreview(null);
    }
  };

  const handleShopDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShopDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleShopFileSelected(e.dataTransfer.files[0]);
    }
  };

  // Submit Handler for DIY
  const handleSubmitDiy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStatus('AI scanning parts receipt for part numbers, descriptions, and costs...');
    await new Promise(r => setTimeout(r, 650));

    setProcessingStatus('Extracting OEM part specs and verifying warranty compliance...');
    await new Promise(r => setTimeout(r, 550));

    const mockDiyExtracted = {
      date: diyDate,
      mileage: parseInt(diyMileage) || (currentVehicle?.mileage ?? 38450),
      parts: [
        {
          name: 'Mobil 1 Advanced Full Synthetic 0W-20 (5-Quart Jug)',
          partNumber: 'PN: 120760 / API SP',
          cost: 29.98
        },
        {
          name: 'OEM Engine Oil Filter & Crush Washer',
          partNumber: 'PN: 15400-PLM-A02',
          cost: 12.52
        }
      ],
      totalCost: 42.50
    };

    setExtractedDiyData(mockDiyExtracted);

    if (onSaveRecord) {
      onSaveRecord({
        type: 'diy',
        vehicleId: targetVehicleId,
        date: mockDiyExtracted.date,
        mileage: mockDiyExtracted.mileage,
        servicePerformed: 'Mobil 1 Full Synthetic 0W-20 & OEM Filter Change (AI Receipt Extracted)',
        partsCost: mockDiyExtracted.totalCost,
        receiptFile: diyReceiptFile,
        isAiExtracted: true
      });
    }

    setIsProcessing(false);
    setIsSuccess(true);
  };

  // Submit Handler for Shop Invoice
  const handleSubmitShop = async () => {
    setIsProcessing(true);
    setProcessingStatus('Scanning repair shop invoice with multimodal AI OCR...');
    await new Promise(r => setTimeout(r, 700));

    setProcessingStatus('Extracting date, recorded mileage, and completed repair items...');
    await new Promise(r => setTimeout(r, 700));

    setProcessingStatus('Detecting recommended but declined services for future budget alerts...');
    await new Promise(r => setTimeout(r, 600));

    const mockExtracted = {
      date: todayStr,
      mileage: (currentVehicle?.mileage ?? 38450) + 120,
      completedServices: [
        'Full Synthetic Oil & Filter Service (5W-20)',
        'Multi-Point Vehicle Inspection (Passed 28-pt check)',
        'Four-Wheel Tire Rotation & Pressure Calibration'
      ],
      declinedServices: [
        'Cabin Air Filter Replacement (Due next visit ~45,000 mi)',
        'Front Brake Pad Replacement (Pads at 4mm - Estimated $280 due in ~5,000 mi)'
      ],
      shopName: 'Metro Honda Service Center',
      totalAmount: 118.45
    };

    setExtractedData(mockExtracted);

    if (onSaveRecord) {
      onSaveRecord({
        type: 'shop',
        vehicleId: targetVehicleId,
        date: mockExtracted.date,
        mileage: mockExtracted.mileage,
        servicePerformed: mockExtracted.completedServices.join(', '),
        invoiceFile: shopInvoiceFile,
        declinedServices: mockExtracted.declinedServices,
        isAiExtracted: true
      });
    }

    setIsProcessing(false);
    setIsSuccess(true);
  };

  return (
    <div 
      id="add-to-vault-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div 
        id="add-to-vault-modal-card"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Glowing Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Add to Vault
                </h3>
                <span className="bg-blue-500/15 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/30">
                  Vehicle History
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="font-medium text-blue-400">The tech you need, the human you trust.</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="hidden sm:inline">Log maintenance, store receipts &amp; build verified records</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-add-to-vault-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Target Vehicle Info Pill (if vehicles exist) */}
          {vehicles.length > 0 && !isSuccess && !isProcessing && (
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs text-slate-400">Target Vehicle:</span>
                <span className="text-xs font-bold text-white">
                  {currentVehicle?.year} {currentVehicle?.make} {currentVehicle?.model}
                </span>
              </div>
              {vehicles.length > 1 && (
                <select
                  id="target-vehicle-select"
                  value={targetVehicleId}
                  onChange={(e) => setTargetVehicleId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} ({v.licensePlate || v.vin.slice(-6)})
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* MAIN DROPDOWN SELECTION: Path A vs Path B */}
          {!isSuccess && !isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="vault-record-type-select" 
                  className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
                >
                  <span>Select Record Type to Log</span>
                </label>
                <span className="text-[11px] text-blue-400 font-medium">
                  {recordType === 'diy' ? 'Manual Form Mode' : 'AI Auto-Extract Mode'}
                </span>
              </div>

              {/* Native Dropdown Selector */}
              <div className="relative">
                <select
                  id="vault-record-type-select"
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value as VaultRecordType)}
                  className="w-full bg-slate-950 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none cursor-pointer appearance-none transition-colors shadow-inner"
                >
                  <option value="diy" className="bg-slate-900 text-white font-medium py-2">
                    DIY Part &amp; Service Log
                  </option>
                  <option value="shop" className="bg-slate-900 text-white font-medium py-2">
                    Repair Shop Invoice or Estimate
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              {/* Visual Segmented Tabs for fast one-tap switching */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
                <button
                  type="button"
                  id="select-path-a-diy-btn"
                  onClick={() => setRecordType('diy')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    recordType === 'diy'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>DIY Part &amp; Service Log</span>
                </button>
                <button
                  type="button"
                  id="select-path-b-shop-btn"
                  onClick={() => setRecordType('shop')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    recordType === 'shop'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Repair Shop Invoice</span>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SMOOTH ANIMATED CONDITIONAL RENDER PATHS                         */}
          {/* ================================================================= */}
          <AnimatePresence mode="wait">

            {/* --------------------------------------------------------------- */}
            {/* PATH A: DIY PART & SERVICE LOG FORM (FRICTIONLESS 3-ITEM INPUT) */}
            {/* --------------------------------------------------------------- */}
            {recordType === 'diy' && !isSuccess && !isProcessing && (
              <motion.form
                key="path-a-diy"
                id="diy-service-log-form"
                onSubmit={handleSubmitDiy}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
                  
                  {/* Two-Column Responsive Row: Date & Mileage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Item 1: Date Picker */}
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="diy-date-performed" 
                        className="text-xs font-bold text-slate-300 flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>Date</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        id="diy-date-performed"
                        required
                        value={diyDate}
                        onChange={(e) => setDiyDate(e.target.value)}
                        className="w-full bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none transition-colors cursor-pointer"
                      />
                    </div>

                    {/* Item 2: Mileage Number Input */}
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="diy-current-mileage" 
                        className="text-xs font-bold text-slate-300 flex items-center gap-1.5"
                      >
                        <Gauge className="w-3.5 h-3.5 text-blue-400" />
                        <span>Mileage</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="diy-current-mileage"
                          required
                          min={0}
                          max={999999}
                          placeholder="e.g. 38450"
                          value={diyMileage}
                          onChange={(e) => setDiyMileage(e.target.value)}
                          className="w-full bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-white focus:outline-none transition-colors placeholder-slate-600"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                          mi
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Item 3: File Upload Dropzone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-blue-400" />
                        <span>Parts Receipt / Proof of Purchase</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">PDF, photo, or invoice screenshot</span>
                    </label>

                    <div
                      id="diy-parts-receipt-dropzone"
                      onDragOver={(e) => { e.preventDefault(); setIsDiyDragging(true); }}
                      onDragLeave={() => setIsDiyDragging(false)}
                      onDrop={handleDiyDrop}
                      onClick={() => diyFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all duration-200 ${
                        isDiyDragging
                          ? 'border-blue-400 bg-blue-500/15 scale-[1.01] shadow-xl shadow-blue-900/30'
                          : diyReceiptFile
                          ? 'border-emerald-500/60 bg-emerald-950/20'
                          : 'border-slate-700 hover:border-blue-500/60 bg-slate-900/90 hover:bg-slate-850'
                      }`}
                    >
                      <input
                        ref={diyFileInputRef}
                        type="file"
                        id="diy-receipt-file-input"
                        accept="image/*,.pdf,application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleDiyFileSelected(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                      <input
                        ref={diyCameraInputRef}
                        type="file"
                        id="diy-receipt-camera-input"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleDiyFileSelected(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />

                      {diyReceiptFile ? (
                        <div className="flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-white truncate">{diyReceiptFile.name}</p>
                              <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                                ✓ Receipt Attached • {(diyReceiptFile.size / 1024).toFixed(0)} KB (Ready for AI Scan)
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDiyReceiptFile(null);
                              setDiyReceiptPreview(null);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
                            aria-label="Remove receipt"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs sm:text-sm font-bold text-white">
                              Drop your parts receipt here, or browse
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Supports AutoZone, RockAuto, OEM invoice PDFs, and phone photos
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                diyCameraInputRef.current?.click();
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5 text-blue-400" />
                              Snap Photo
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                diyFileInputRef.current?.click();
                              }}
                              className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              Browse File
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* REQUIRED SUBTEXT BELOW DROPZONE */}
                    <div 
                      id="diy-parts-receipt-subtext"
                      className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-2.5 shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        Upload your parts receipt. Our AI will automatically scan it to extract the part names, numbers, and costs to build your vault.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="save-diy-record-btn"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-100"
                  >
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Scan Receipt &amp; Save to Vault</span>
                  </button>
                </div>
              </motion.form>
            )}

            {/* --------------------------------------------------------------- */}
            {/* PATH B: REPAIR SHOP INVOICE OR ESTIMATE (FRICTIONLESS UPLOAD)   */}
            {/* --------------------------------------------------------------- */}
            {recordType === 'shop' && !isSuccess && !isProcessing && (
              <motion.div
                key="path-b-shop"
                id="shop-invoice-upload-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-5"
              >
                {/* LARGE SINGLE-STEP FILE DROPZONE */}
                <div
                  id="shop-invoice-large-dropzone"
                  onDragOver={(e) => { e.preventDefault(); setIsShopDragging(true); }}
                  onDragLeave={() => setIsShopDragging(false)}
                  onDrop={handleShopDrop}
                  onClick={() => shopFileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
                    isShopDragging
                      ? 'border-blue-400 bg-blue-500/15 scale-[1.01] shadow-2xl shadow-blue-900/30'
                      : shopInvoiceFile
                      ? 'border-emerald-500/70 bg-emerald-950/20'
                      : 'border-slate-700 hover:border-blue-500/70 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 hover:bg-slate-900/90 shadow-xl'
                  }`}
                >
                  <input
                    ref={shopFileInputRef}
                    type="file"
                    id="shop-invoice-file-input"
                    accept="image/*,.pdf,application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleShopFileSelected(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <input
                    ref={shopCameraInputRef}
                    type="file"
                    id="shop-invoice-camera-input"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleShopFileSelected(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  {shopInvoiceFile ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">{shopInvoiceFile.name}</p>
                        <p className="text-xs text-emerald-400 font-medium mt-1">
                          ✓ Ready for AI Extraction • {(shopInvoiceFile.size / 1024).toFixed(0)} KB
                        </p>
                      </div>

                      {shopInvoicePreview && (
                        <div className="max-h-36 rounded-xl overflow-hidden border border-slate-700 mx-auto inline-block shadow-lg">
                          <img src={shopInvoicePreview} alt="Invoice Preview" className="h-32 object-contain bg-black/40" />
                        </div>
                      )}

                      <div className="flex items-center justify-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            shopFileInputRef.current?.click();
                          }}
                          className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline"
                        >
                          Replace Document
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base sm:text-lg font-extrabold text-white">
                          Drag &amp; drop shop invoice, estimate, or MPVI inspection sheet
                        </p>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                          Accepts dealership paperwork, independent repair invoices, PDFs, and camera phone photos
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            shopCameraInputRef.current?.click();
                          }}
                          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-900/40 flex items-center gap-2 cursor-pointer"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Snap Photo with Camera</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            shopFileInputRef.current?.click();
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-blue-400" />
                          <span>Browse Files</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* EXACT REASSURING SUBTEXT REQUIRED BY SPEC */}
                <div 
                  id="reassuring-ai-extraction-subtext"
                  className="p-4 sm:p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3.5 shadow-lg"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      Just upload the document. Our AI will automatically extract the date, mileage, and completed work. We will also log any declined services to help you budget for your next visit.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-blue-300/80 font-medium">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Auto Date &amp; Mileage
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Completed Repairs Logged
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Declined Service Budget Planner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    id="extract-shop-invoice-btn"
                    onClick={handleSubmitShop}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-100"
                  >
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Extract &amp; Add to Vault</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* ================================================================= */}
          {/* PROCESSING & SIMULATION STATE                                    */}
          {/* ================================================================= */}
          {isProcessing && (
            <div className="py-12 px-4 text-center space-y-5 animate-in fade-in duration-200">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  {recordType === 'diy' ? 'Saving DIY Record to Vault' : 'AI Ingesting Repair Shop Document'}
                </h4>
                <p className="text-xs text-blue-400 font-medium">
                  {processingStatus}
                </p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SUCCESS STATE                                                     */}
          {/* ================================================================= */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 px-4 space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-extrabold text-white">
                  {recordType === 'diy' ? 'DIY Parts & Service Logged' : 'Invoice Analyzed & Added to Vault'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  {recordType === 'diy'
                    ? `Logged DIY maintenance performed on ${diyDate} at ${parseInt(diyMileage || '0').toLocaleString()} mi.`
                    : `Extracted work order for ${currentVehicle?.year} ${currentVehicle?.make} ${currentVehicle?.model}.`}
                </p>
              </div>

              {/* Extracted Details Card for DIY Parts Receipt */}
              {recordType === 'diy' && extractedDiyData && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3.5 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">AI Receipt OCR: <strong className="text-emerald-400">Verified Proof of Purchase</strong></span>
                    <span className="font-mono text-blue-400 font-bold">{extractedDiyData.mileage.toLocaleString()} mi</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Extracted Parts &amp; Numbers ({extractedDiyData.parts.length} items):
                    </span>
                    <div className="space-y-1.5">
                      {extractedDiyData.parts.map((part, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-semibold text-white">{part.name}</p>
                            <p className="text-[10px] font-mono text-slate-400">{part.partNumber}</p>
                          </div>
                          <span className="font-mono font-bold text-emerald-400 ml-2 shrink-0">
                            ${part.cost.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-bold">
                    <span className="text-slate-400">Total Parts Vault Value:</span>
                    <span className="font-mono text-emerald-400 text-sm">${extractedDiyData.totalCost.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Extracted Details Card for Shop Invoice */}
              {recordType === 'shop' && extractedData && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3.5 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">Extracted Shop: <strong className="text-white">{extractedData.shopName}</strong></span>
                    <span className="font-mono text-blue-400 font-bold">{extractedData.mileage.toLocaleString()} mi</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed Work Extracted ({extractedData.completedServices.length} items):
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {extractedData.completedServices.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {extractedData.declinedServices.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        Declined Services Logged for Next Visit Budget:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {extractedData.declinedServices.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400">⏳</span>
                            <span className="text-slate-300">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Close / Finish Button */}
              <div className="pt-2">
                <button
                  type="button"
                  id="finish-vault-record-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40 transition-all cursor-pointer"
                >
                  Done &amp; View Vault
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};
