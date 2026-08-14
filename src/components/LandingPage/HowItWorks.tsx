import React from 'react';
import { Camera, Layers, ShieldCheck, MessageSquare, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onOpenIntake: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenIntake }) => {
  const steps = [
    {
      number: '01',
      title: 'Snap Photo or Upload Estimate',
      subtitle: 'Zero friction from the service drive',
      description: 'Take a photo of your printed repair order, upload a PDF invoice, or forward the digital SMS estimate link sent by your service advisor.',
      icon: Camera,
      badge: 'Takes 15 Seconds'
    },
    {
      number: '02',
      title: 'Choose Your Advocacy Tier',
      subtitle: 'Minimalist, OEM Schedule, or Optimal Care',
      description: 'Set your financial and maintenance philosophy. Our engine custom-aligns the audit to your exact risk tolerance and warranty needs.',
      icon: Layers,
      badge: 'Zero Upsell Pressure'
    },
    {
      number: '03',
      title: 'Real-Time Labor & Parts Benchmark',
      subtitle: 'Mitchell 1 / AllData Book Time Scraped',
      description: 'Our engine audits every line item against standard flat-rate labor times, OEM parts list prices, and checks for duplicate labor overlap.',
      icon: ShieldCheck,
      badge: 'Under 60 Seconds'
    },
    {
      number: '04',
      title: 'Use Pushback Script or Advocate Call',
      subtitle: 'Never negotiate blindly again',
      description: 'Hand the revised advocate itemization or read our exact technical pushback script to your service advisor to get the fair price authorized.',
      icon: MessageSquare,
      badge: 'Guaranteed Confidence'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Standing in the Service Drive?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How AdvisrAdvisor Protects You in 4 Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Designed for mobile use while your service advisor is waiting for your signature. Fast, objective, and backed by automotive technical standards.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between relative group"
              >
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
                      {s.number}
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {s.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-blue-400 font-semibold mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-900 flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Instant digital audit</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Have a live estimate on your phone right now?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Snap a picture of the paper quote or paste the repair URL. We will audit it before you approve.
            </p>
          </div>
          <button
            id="how-it-works-start-btn"
            onClick={onOpenIntake}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-950/60 shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            <span>Start Free Quote Audit</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
