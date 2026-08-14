import React, { useState } from 'react';
import { Zap, Camera, Phone, ShieldCheck, X, ArrowRight, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

interface ServiceDriveEmergencyModalProps {
  onClose: () => void;
  onOpenIntake: (sampleId?: string) => void;
}

export const ServiceDriveEmergencyModal: React.FC<ServiceDriveEmergencyModalProps> = ({
  onClose,
  onOpenIntake
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sentSms, setSentSms] = useState(false);

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSms(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Emergency Pill */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            <span>Service Drive Fast Protocol (Under 60 Seconds)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Standing at the Service Counter?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Don’t sign until you get your independent advocate audit. Choose the fastest intake method below:
          </p>
        </div>

        {/* Fast Action Options */}
        <div className="space-y-3">
          
          {/* Option 1: Direct Mobile Camera Snap */}
          <div 
            onClick={() => {
              onClose();
              onOpenIntake();
            }}
            className="p-4 rounded-xl bg-slate-950 border border-blue-500/40 hover:border-blue-500 cursor-pointer transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Camera className="w-4 h-4" />
                <span>Option 1: Snap Photo of Paper Estimate Now</span>
              </div>
              <span className="text-[10px] bg-blue-600 text-white font-extrabold px-2 py-0.5 rounded">
                FASTEST
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Opens your camera. Instant line-item breakdown &amp; book labor check in 30 seconds.
            </p>
          </div>

          {/* Option 2: Forward Digital Quote / SMS */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Option 2: Forward Dealership SMS Estimate Link</span>
            </div>
            <p className="text-xs text-slate-400">
              Forward the text message your service advisor sent you to our secure advocate audit line:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs text-white">
              <span>SMS to: <strong>(888) 492-3847</strong></span>
              <span className="text-[11px] text-blue-400 font-bold">24/7 Live Intake</span>
            </div>
          </div>

          {/* Option 3: Test with Demo Estimate */}
          <div 
            onClick={() => {
              onClose();
              onOpenIntake('sample-1');
            }}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Option 3: Run Interactive Benchmark Sample</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              See how a typical 60k service estimate is audited down from $1,845 to $865.
            </p>
          </div>

        </div>

        {/* Counter Reassurance */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Tell your advisor: <em>&quot;Give me two minutes to review this with my records before I authorize.&quot;</em></span>
        </div>

      </div>
    </div>
  );
};
