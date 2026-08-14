import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Video, 
  Image as ImageIcon, 
  MessageSquare, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ShieldAlert, 
  AlertTriangle, 
  Send, 
  Paperclip, 
  HelpCircle, 
  Eye, 
  Sliders, 
  FileSignature, 
  ShieldCheck, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  DollarSign,
  Tag,
  Check,
  Flame,
  ArrowRight,
  TrendingDown,
  Layers
} from 'lucide-react';
import { 
  AdvisorVehicleProfile, 
  AdvisorAiDiscrepancy, 
  AdvisorChatMessage, 
  AdvisorInspectionBookmark 
} from '../../types';

interface CenterPaneActionCenterProps {
  vehicle: AdvisorVehicleProfile;
  aiDiscrepancies: AdvisorAiDiscrepancy[];
  chatMessages: AdvisorChatMessage[];
  onOpenOverrideModal: (discrepancy: AdvisorAiDiscrepancy) => void;
  onConfirmDiscrepancy: (discrepancyId: string) => void;
  onSendMessage: (text: string, actionCard?: any) => void;
}

export const CenterPaneActionCenter: React.FC<CenterPaneActionCenterProps> = ({
  vehicle,
  aiDiscrepancies,
  chatMessages,
  onOpenOverrideModal,
  onConfirmDiscrepancy,
  onSendMessage
}) => {
  // Top Half Media Viewer state
  const [activeMediaTab, setActiveMediaTab] = useState<'PDF' | 'VIDEO' | 'PHOTOS'>('PDF');
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [showOcrBoxes, setShowOcrBoxes] = useState<boolean>(true);
  const [hoveredOcrItem, setHoveredOcrItem] = useState<string | null>(null);

  // Video Inspection Player state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(14);
  const [videoDuration] = useState<number>(90); // 1:30 video
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Bottom Half Tab state
  const [bottomTab, setBottomTab] = useState<'AUDIT_LOG' | 'CHAT'>('AUDIT_LOG');
  const [chatInputText, setChatInputText] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat on new message
  useEffect(() => {
    if (bottomTab === 'CHAT') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, bottomTab]);

  // Video progress loop simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoCurrentTime(prev => {
          if (prev >= videoDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoDuration]);

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    onSendMessage(chatInputText.trim());
    setChatInputText('');
  };

  const handleQuickCannedMacro = (macroText: string, card?: any) => {
    onSendMessage(macroText, card);
  };

  const totalFlaggedSavings = aiDiscrepancies
    .filter(d => d.status !== 'OVERRIDDEN')
    .reduce((sum, d) => sum + d.totalDiscrepancy, 0);

  const pendingReviewCount = aiDiscrepancies.filter(d => d.status === 'PENDING_REVIEW').length;
  const confirmedCount = aiDiscrepancies.filter(d => d.status === 'CONFIRMED').length;
  const overriddenCount = aiDiscrepancies.filter(d => d.status === 'OVERRIDDEN').length;

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 divide-y divide-slate-800/90 select-none overflow-hidden">

      {/* ========================================================================= */}
      {/* TOP HALF: MEDIA & DOCUMENT VIEWER (PDF INVOICE / VIDEO INSPECTION)        */}
      {/* ========================================================================= */}
      <div className="h-[48%] flex flex-col bg-slate-900/60 overflow-hidden">
        
        {/* Media Viewer Toolbar */}
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          
          {/* Media Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveMediaTab('PDF')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeMediaTab === 'PDF'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Raw PDF Invoice</span>
              <span className="text-[10px] opacity-80 font-mono">({vehicle.rawInvoicePages} pgs)</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('VIDEO')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeMediaTab === 'VIDEO'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span>MPI Inspection Video</span>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveMediaTab('PHOTOS')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeMediaTab === 'PHOTOS'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Shop Photos</span>
            </button>
          </div>

          {/* Contextual Toolbar Controls */}
          {activeMediaTab === 'PDF' && (
            <div className="flex items-center gap-2 text-xs">
              {/* OCR Toggle */}
              <button
                onClick={() => setShowOcrBoxes(!showOcrBoxes)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  showOcrBoxes
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Toggle AI OCR Bounding Boxes"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>OCR Boxes: {showOcrBoxes ? 'ON' : 'OFF'}</span>
              </button>

              {/* Page Controls */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5 text-slate-300 font-mono text-xs">
                <button
                  disabled={pdfPage <= 1}
                  onClick={() => setPdfPage(p => Math.max(1, p - 1))}
                  className="disabled:opacity-30 hover:text-white p-0.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span>{pdfPage} / {vehicle.rawInvoicePages}</span>
                <button
                  disabled={pdfPage >= vehicle.rawInvoicePages}
                  onClick={() => setPdfPage(p => Math.min(vehicle.rawInvoicePages, p + 1))}
                  className="disabled:opacity-30 hover:text-white p-0.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPdfZoom(z => Math.max(70, z - 15))}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 w-9 text-center">{pdfZoom}%</span>
                <button
                  onClick={() => setPdfZoom(z => Math.min(150, z + 15))}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeMediaTab === 'VIDEO' && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">
                {Math.floor(videoCurrentTime / 60)}:{(videoCurrentTime % 60).toString().padStart(2, '0')} / {Math.floor(videoDuration / 60)}:{(videoDuration % 60).toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            </div>
          )}
        </div>

        {/* Media Canvas Viewport */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/80 custom-scrollbar relative">

          {/* 1. RAW PDF INVOICE SIMULATION WITH OCR BOUNDING BOXES */}
          {activeMediaTab === 'PDF' && (
            <div 
              style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'center top' }}
              className="w-full max-w-2xl bg-white text-slate-900 rounded-lg shadow-2xl p-6 transition-transform duration-150 font-sans select-text border border-slate-300 relative text-xs"
            >
              {/* PDF Document Header */}
              <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-950">
                    {vehicle.activeShopName || 'Metro West Honda & Acura'}
                  </h3>
                  <p className="text-[10px] text-slate-600">8940 Automotive Parkway • Service Drive #2</p>
                  <p className="text-[10px] text-slate-600 font-mono">BAR Registration #CA-294801 • EPA ID #09412</p>
                </div>
                <div className="text-right">
                  <span className="bg-slate-900 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                    ESTIMATE / RO: 94812
                  </span>
                  <p className="text-[10px] text-slate-600 mt-1 font-mono">DATE: 2024-06-12 09:42 AM</p>
                  <p className="text-[10px] text-slate-600">WRITER: Derek Simmons (#409)</p>
                </div>
              </div>

              {/* Customer & Vehicle Header Box */}
              <div className="grid grid-cols-2 gap-3 p-2 my-2.5 bg-slate-100 rounded border border-slate-300 text-[10px]">
                <div>
                  <span className="font-bold text-slate-700">CUSTOMER: </span>
                  <span className="font-semibold text-slate-900">{vehicle.customerName}</span>
                  <br />
                  <span className="font-bold text-slate-700">PHONE: </span>
                  <span className="font-mono">{vehicle.customerPhone}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">VEHICLE: </span>
                  <span className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</span>
                  <br />
                  <span className="font-bold text-slate-700">VIN: </span>
                  <span className="font-mono text-slate-900 font-bold">{vehicle.vin}</span>
                  <br />
                  <span className="font-bold text-slate-700">ODOMETER: </span>
                  <span className="font-mono text-slate-900 font-bold">{vehicle.currentMileage.toLocaleString()} mi</span>
                </div>
              </div>

              {/* Itemized Estimate Table */}
              <table className="w-full text-[10px] border-collapse mt-2">
                <thead>
                  <tr className="border-b border-slate-400 text-slate-700 font-bold text-left bg-slate-50">
                    <th className="py-1 px-1.5">LINE</th>
                    <th className="py-1 px-1.5">PART # / OPERATION</th>
                    <th className="py-1 px-1.5">DESCRIPTION</th>
                    <th className="py-1 px-1.5 text-right">LABOR (HRS)</th>
                    <th className="py-1 px-1.5 text-right">PARTS</th>
                    <th className="py-1 px-1.5 text-right">EXT TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  
                  {/* Line 1: Front Brake Pads (OCR Flagged: Labor Padding) */}
                  <tr className={`relative transition-colors ${showOcrBoxes ? 'bg-red-50/70' : ''}`}>
                    <td className="py-1.5 px-1.5 font-mono">01</td>
                    <td className="py-1.5 px-1.5 font-mono">45022-TVA-A01</td>
                    <td className="py-1.5 px-1.5 font-semibold">
                      FRONT CERAMIC PADS &amp; ROTOR RESURFACING
                      {showOcrBoxes && (
                        <span className="block text-[9px] text-red-600 font-bold">
                          ⚠️ OCR FLAG: Billed 2.4 hrs vs OEM 1.2 hrs ($222.00 Overcharge)
                        </span>
                      )}
                    </td>
                    <td className="py-1.5 px-1.5 text-right font-mono font-bold text-red-700">2.4h @ $185</td>
                    <td className="py-1.5 px-1.5 text-right font-mono">$145.00</td>
                    <td className="py-1.5 px-1.5 text-right font-mono font-bold">$589.00</td>
                  </tr>

                  {/* Line 2: Fuel Injector Additive (OCR Flagged: Unwarranted Upsell) */}
                  <tr className={`relative transition-colors ${showOcrBoxes ? 'bg-amber-50/70' : ''}`}>
                    <td className="py-1.5 px-1.5 font-mono">02</td>
                    <td className="py-1.5 px-1.5 font-mono">08798-9034</td>
                    <td className="py-1.5 px-1.5 font-semibold">
                      PRO-CLEAN FUEL INJECTOR &amp; INDUCTION FLUSH
                      {showOcrBoxes && (
                        <span className="block text-[9px] text-amber-700 font-bold">
                          ⚠️ OCR FLAG: Honda TSB 15-024 Non-OEM Flush ($258.00 Upsell)
                        </span>
                      )}
                    </td>
                    <td className="py-1.5 px-1.5 text-right font-mono text-amber-700">0.8h @ $185</td>
                    <td className="py-1.5 px-1.5 text-right font-mono">$110.00</td>
                    <td className="py-1.5 px-1.5 text-right font-mono font-bold">$258.00</td>
                  </tr>

                  {/* Line 3: Brake Fluid Hydraulic Flush (OCR Flagged: Labor Overcharge) */}
                  <tr className={`relative transition-colors ${showOcrBoxes ? 'bg-blue-50/50' : ''}`}>
                    <td className="py-1.5 px-1.5 font-mono">03</td>
                    <td className="py-1.5 px-1.5 font-mono">08200-9014</td>
                    <td className="py-1.5 px-1.5 font-semibold">
                      DOT 3 HYDRAULIC BRAKE FLUID EXCHANGE
                      {showOcrBoxes && (
                        <span className="block text-[9px] text-blue-700 font-medium">
                          ℹ️ OCR NOTE: Valid 3-Yr Schedule, but Labor Padded by 0.4h
                        </span>
                      )}
                    </td>
                    <td className="py-1.5 px-1.5 text-right font-mono text-blue-700">1.0h @ $185</td>
                    <td className="py-1.5 px-1.5 text-right font-mono">$48.00</td>
                    <td className="py-1.5 px-1.5 text-right font-mono font-bold">$233.00</td>
                  </tr>

                  {/* Line 4: Oil Change (Approved) */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-1.5 px-1.5 font-mono">04</td>
                    <td className="py-1.5 px-1.5 font-mono">08798-9008</td>
                    <td className="py-1.5 px-1.5 font-semibold">0W-20 FULL SYNTHETIC &amp; OEM FILTER 15400-PLM</td>
                    <td className="py-1.5 px-1.5 text-right font-mono">0.5h @ $185</td>
                    <td className="py-1.5 px-1.5 text-right font-mono">$45.00</td>
                    <td className="py-1.5 px-1.5 text-right font-mono font-bold">$137.50</td>
                  </tr>
                </tbody>
              </table>

              {/* Estimate Totals Footer */}
              <div className="mt-4 pt-3 border-t-2 border-slate-900 flex justify-between items-end text-right">
                <div className="text-left text-[9px] text-slate-500 max-w-[280px]">
                  *Estimate valid for 30 days. Shop supplies and hazardous waste disposal fee: $26.50. Customer signature authorizes diagnostic teardown.
                </div>
                <div className="space-y-0.5 text-xs font-mono">
                  <div className="flex justify-between gap-4 text-slate-700">
                    <span>LABOR TOTAL:</span>
                    <span>$740.00</span>
                  </div>
                  <div className="flex justify-between gap-4 text-slate-700">
                    <span>PARTS TOTAL:</span>
                    <span>$348.00</span>
                  </div>
                  <div className="flex justify-between gap-4 text-slate-700">
                    <span>SUPPLIES &amp; TAX:</span>
                    <span>$157.00</span>
                  </div>
                  <div className="flex justify-between gap-4 text-sm font-extrabold text-slate-950 pt-1 border-t border-slate-300">
                    <span>TOTAL QUOTE:</span>
                    <span className="text-red-700">$1,245.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MPI INSPECTION VIDEO VIEWER */}
          {activeMediaTab === 'VIDEO' && (
            <div className="w-full h-full max-w-2xl bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col">
              {/* Simulated Video Canvas */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                
                {/* Simulated Technician Camera Feed */}
                <div className="text-center space-y-2 p-6 z-10">
                  <div className="w-14 h-14 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center mx-auto text-blue-300 shadow-xl shadow-blue-900/50">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-red-400 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      LIVE SHOP MPVI INSPECTION RECORDING
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">
                      Front Left Caliper &amp; Rotor Micrometer Inspection
                    </h4>
                    <p className="text-xs text-slate-300">Tech: Steve M. • Metro West Bay #4</p>
                  </div>
                </div>

                {/* Video Play/Pause Overlay Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 active:scale-95 cursor-pointer z-20"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>

                {/* Active Bookmark Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Micrometer: 2.4mm Front Brake Pad (Wear Limit 2.0mm)
                  </span>
                  <span className="font-mono text-slate-300">
                    {Math.floor(videoCurrentTime / 60)}:{(videoCurrentTime % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Video Timeline Scrubber & Timestamp Bookmarks */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2 shrink-0">
                {/* Scrubber Bar */}
                <div 
                  className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    setVideoCurrentTime(Math.floor(pos * videoDuration));
                  }}
                >
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full"
                    style={{ width: `${(videoCurrentTime / videoDuration) * 100}%` }}
                  />
                </div>

                {/* Timestamp Bookmark Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                  {vehicle.inspectionBookmarks.map((bm, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setVideoCurrentTime(bm.timeSeconds);
                        setIsPlaying(true);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold border transition-all whitespace-nowrap cursor-pointer ${
                        Math.abs(videoCurrentTime - bm.timeSeconds) < 6
                          ? 'bg-blue-600 text-white border-blue-400 shadow'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono text-blue-300 font-bold">{bm.timestampLabel}</span>
                      <span>{bm.title}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        bm.findingSeverity === 'FAIL' ? 'bg-red-400' : bm.findingSeverity === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. HIGH-RES INSPECTION PHOTOS */}
          {activeMediaTab === 'PHOTOS' && (
            <div className="w-full max-w-2xl grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="h-36 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 relative overflow-hidden">
                  <div className="text-center p-3">
                    <span className="font-mono text-2xl font-black text-amber-400">2.4 mm</span>
                    <p className="text-[11px] text-slate-400 font-semibold mt-1">Digital Vernier Caliper Measurement</p>
                    <span className="text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                      WARNING (2.0mm Safety Limit)
                    </span>
                  </div>
                </div>
                <p className="text-xs font-bold text-white">Front Driver Inner Pad</p>
                <p className="text-[11px] text-slate-400">Measured by master tech with digital gauge on car lift.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="h-36 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 relative overflow-hidden">
                  <div className="text-center p-3">
                    <span className="font-mono text-2xl font-black text-red-400">3.8% H₂O</span>
                    <p className="text-[11px] text-slate-400 font-semibold mt-1">Optical Moisture Test Strip</p>
                    <span className="text-[10px] text-red-300 bg-red-500/20 px-2 py-0.5 rounded font-bold mt-1 inline-block">
                      FAIL (&gt;3.0% Moisture)
                    </span>
                  </div>
                </div>
                <p className="text-xs font-bold text-white">Brake Fluid Moisture Strip</p>
                <p className="text-[11px] text-slate-400">Test strip turned dark purple indicating boiling point degradation.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM HALF: CUSTOMER CHAT & AI AUDIT LOG (SPLIT/TABBED VIEW)              */}
      {/* ========================================================================= */}
      <div className="h-[52%] flex flex-col bg-slate-900/95 overflow-hidden">
        
        {/* Bottom Half Tab Selector Header */}
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {/* AI Audit Log Tab */}
            <button
              onClick={() => setBottomTab('AUDIT_LOG')}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                bottomTab === 'AUDIT_LOG'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>AI Audit Log &amp; Discrepancies</span>
              {pendingReviewCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingReviewCount} Flagged
                </span>
              )}
            </button>

            {/* Customer Live Chat Tab */}
            <button
              onClick={() => setBottomTab('CHAT')}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                bottomTab === 'CHAT'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Customer Chat</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          {/* Quick Action Statistics */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden sm:inline">
              Flags: <strong className="text-red-400">{pendingReviewCount} Pending</strong> • <strong className="text-emerald-400">{confirmedCount} Certified</strong> • <strong className="text-amber-400">{overriddenCount} Overridden</strong>
            </span>
            <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
              <DollarSign className="w-3.5 h-3.5" />
              <span>${totalFlaggedSavings.toFixed(2)} Savings Unlocked</span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SUB-VIEW A: AI AUDIT LOG & FLAGGED LABOR DISCREPANCIES                */}
        {/* ===================================================================== */}
        {bottomTab === 'AUDIT_LOG' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            
            {aiDiscrepancies.map((discrepancy) => {
              const isPending = discrepancy.status === 'PENDING_REVIEW';
              const isConfirmed = discrepancy.status === 'CONFIRMED';
              const isOverridden = discrepancy.status === 'OVERRIDDEN';

              return (
                <div
                  key={discrepancy.id}
                  id={`discrepancy-card-${discrepancy.id}`}
                  className={`p-4 rounded-xl border transition-all duration-200 space-y-3 ${
                    isPending
                      ? 'bg-slate-950 border-red-500/40 hover:border-red-500 shadow-md shadow-red-950/20'
                      : isConfirmed
                      ? 'bg-slate-950/90 border-emerald-500/50'
                      : 'bg-slate-950/80 border-amber-500/50'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                          discrepancy.flagType === 'LABOR_PADDING'
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : discrepancy.flagType === 'UNWARRANTED_UPSELL'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        }`}>
                          {discrepancy.flagType.replace('_', ' ')}
                        </span>

                        <span className="text-xs font-bold text-white">
                          {discrepancy.lineItemDescription}
                        </span>

                        {discrepancy.partNumber && (
                          <span className="font-mono text-[10px] text-blue-400 bg-blue-950/70 px-1.5 py-0.2 rounded border border-blue-800/40">
                            {discrepancy.partNumber}
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 pt-0.5">
                        {isPending && (
                          <span className="text-[11px] text-red-400 font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                            Requires Advisor Certification or Override
                          </span>
                        )}
                        {isConfirmed && (
                          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Confirmed &amp; Human Certified by Master Tech
                          </span>
                        )}
                        {isOverridden && (
                          <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            Advisor Overridden: {discrepancy.overrideReason}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Discrepancy Amount */}
                    <div className="text-right shrink-0">
                      <span className="font-mono text-base font-extrabold text-red-400 block">
                        +${discrepancy.totalDiscrepancy.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        OCR Detected Overcharge
                      </span>
                    </div>
                  </div>

                  {/* Quantitative Benchmark Comparison Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Quoted Labor</span>
                      <span className="font-bold text-red-400">{discrepancy.quotedLaborHours} hrs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">OEM Standard</span>
                      <span className="font-bold text-emerald-400">{discrepancy.oemBenchmarkHours} hrs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Shop Rate</span>
                      <span className="font-bold text-slate-200">${discrepancy.laborRate}/hr</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">AI Confidence</span>
                      <span className="font-bold text-blue-400">{discrepancy.aiConfidence}% Match</span>
                    </div>
                  </div>

                  {/* Source Reference & Explanation */}
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                    <p>{discrepancy.auditExplanation}</p>
                    <p className="text-[11px] text-blue-400 font-mono pt-0.5">
                      📖 OEM Source: {discrepancy.oemReferenceSource}
                    </p>
                  </div>

                  {/* Action Buttons: Override AI vs Confirm Findings */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-medium">
                      Advisor Action Gate • Human-in-the-loop Certification
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Override AI Button */}
                      <button
                        onClick={() => onOpenOverrideModal(discrepancy)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isOverridden
                            ? 'bg-amber-600/30 text-amber-200 border-amber-500/50'
                            : 'bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border-slate-700 hover:border-amber-500/40'
                        }`}
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isOverridden ? 'Edit Override' : 'Override AI'}</span>
                      </button>

                      {/* Confirm Findings Button */}
                      <button
                        onClick={() => onConfirmDiscrepancy(discrepancy.id)}
                        disabled={isConfirmed}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isConfirmed
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-950/60 hover:scale-[1.02]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isConfirmed ? 'Certified & Logged' : 'Confirm Findings'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===================================================================== */}
        {/* SUB-VIEW B: LIVE CUSTOMER CHAT THREAD                                */}
        {/* ===================================================================== */}
        {bottomTab === 'CHAT' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Quick Canned Advisor Macros Bar */}
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
              <span className="text-slate-400 font-bold text-[10px] uppercase shrink-0">Quick Macros:</span>
              <button
                onClick={() => handleQuickCannedMacro(
                  `Christopher, our master technician reviewed your RO against the Mitchell OEM standard. Your front brake pads are worn (2.4mm), so we recommend approving the pads. However, the shop is overcharging by 1.2 hrs of labor ($222) and the $258 fuel flush is completely unnecessary per Honda Bulletin 15-024.`
                )}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap border border-slate-700 font-medium cursor-pointer"
              >
                + Send Certified Audit Summary
              </button>
              <button
                onClick={() => handleQuickCannedMacro(
                  `Here is your exact word-for-word counter script for the service writer: "I authorized the front brake pads, but Mitchell book time is 1.2 hours. Please adjust the labor charge from 2.4 hrs to 1.2 hrs. Also, please remove the fuel flush chemical treatment as my vehicle has no misfire codes."`
                )}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap border border-slate-700 font-medium cursor-pointer"
              >
                + Send Counter-Offer Script
              </button>
            </div>

            {/* Scrollable Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {chatMessages.map((msg) => {
                const isAdvisor = msg.sender === 'advisor';
                const isCustomer = msg.sender === 'customer';
                const isSystem = msg.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="text-center my-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                        ⚙️ {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdvisor ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                      <span className="font-bold text-slate-300">{msg.senderName}</span>
                      {msg.badge && (
                        <span className="bg-blue-500/20 text-blue-300 text-[9px] px-1.5 py-0.2 rounded border border-blue-500/40 font-bold">
                          {msg.badge}
                        </span>
                      )}
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isAdvisor
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-950/40'
                        : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                    }`}>
                      <p>{msg.text}</p>

                      {/* Attached Action Card */}
                      {msg.actionCard && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950/80 border border-white/20 text-slate-100 space-y-1">
                          <div className="flex items-center justify-between font-bold text-[11px]">
                            <span className="text-emerald-300 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {msg.actionCard.title}
                            </span>
                            {msg.actionCard.amount && (
                              <span className="font-mono text-emerald-300">
                                +${msg.actionCard.amount.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-300">
                            {msg.actionCard.details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSendMessageSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
              <input
                type="text"
                placeholder="Type response to vehicle owner (Christopher Vance)..."
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInputText.trim()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
