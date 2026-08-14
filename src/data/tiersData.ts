import { TierDefinition, TierId } from '../types';

export const TIERS_DATA: Record<TierId, TierDefinition> = {
  'tier-1': {
    id: 'tier-1',
    name: 'Tier 1: Minimalist Reactive',
    shortTitle: 'Minimalist Reactive',
    subtitle: 'Fix Active Failures & Safety Items Only',
    tagline: 'Maximum immediate cash preservation. Zero unneeded upsells.',
    philosophy: 'Automotive shops routinely push high-margin chemical flushes, premature component replacements, and preventative packages that have no bearing on immediate vehicle drivability or DOT safety. Tier 1 establishes an unyielding independent advocate filter: if it is not actively broken, failing diagnostic tests, or presenting a direct safety hazard, it is rejected.',
    coreRule: 'Approve only active mechanical failures, verified DTC trouble codes, and primary safety/braking hazards.',
    idealFor: [
      'Older or high-mileage daily drivers (>100k miles)',
      'Budget-conscious owners seeking to avoid unnecessary service drive bills',
      'Short-term vehicle leases or vehicles slated for sale within 12 months',
      'Drivers who want absolute zero-tolerance on dealer upsell pressure'
    ],
    whatWeApprove: [
      'Worn brake pads below 3mm DOT threshold & grooved rotors',
      'Active mechanical faults (misfiring coils, failed alternators, water pump leaks)',
      'Critical suspension failure (severely torn ball joints, leaking struts affecting control)',
      'Mandatory standard oil & oil filter change'
    ],
    whatWeReject: [
      'Preventative chemical flushes (fuel induction decarb, power steering flush, AC refresh)',
      'Premature fluid exchanges without verified test-strip degradation',
      'Non-critical cosmetic or minor seepage recommendations',
      'Dealer "courtesy packages" billed as mandatory inspection hours'
    ],
    estimatedCostReduction: '40% – 65% off dealership quotes',
    badgeColor: 'blue',
    iconName: 'ShieldAlert'
  },
  'tier-2': {
    id: 'tier-2',
    name: 'Tier 2: Strict OEM Schedule',
    shortTitle: 'Strict OEM Schedule',
    subtitle: "Adhere Strictly to the Manufacturer's Manual",
    tagline: 'Preserve factory warranty & OEM integrity. Eliminate shop inflation.',
    philosophy: "Dealerships frequently 'recommend' severe-service schedules or proprietary dealer packages that exceed the factory engineers' official service manuals by tens of thousands of miles. Tier 2 benchmarks the vehicle's exact VIN, mileage, and operating history against official OEM maintenance intervals, ensuring you pay only for what the manufacturer actually engineered.",
    coreRule: 'Enforce exact factory owner’s manual maintenance intervals and official OEM part specifications.',
    idealFor: [
      'Vehicles currently under factory powertrain or bumper-to-bumper warranty',
      'Certified Pre-Owned (CPO) vehicles needing pristine logbook compliance',
      'Owners who want to maintain optimal OEM resale value without paying dealer fluff',
      'Drivers who trust factory engineering over dealership service advisor quotas'
    ],
    whatWeApprove: [
      'All scheduled OEM interval items at exact mileage (e.g. spark plugs at 60k/100k)',
      'Factory recommended brake fluid exchanges per OEM time/mileage rule (e.g. 3 yrs / 36k)',
      'Transmission fluid / differential service according to factory manual schedule',
      'Genuine OEM or equivalent OES parts meeting factory tolerances'
    ],
    whatWeReject: [
      'Proprietary dealer-branded "value packages" not listed in OEM manual',
      'Premature fluid replacements scheduled 30,000 miles before factory recommendation',
      'Aftermarket additives and chemical treatments prohibited by OEM warranties',
      'Labor hours quoted above AllData / Mitchell 1 standard warranty book times'
    ],
    estimatedCostReduction: '25% – 45% off dealership quotes',
    badgeColor: 'blue',
    iconName: 'BookOpenCheck'
  },
  'tier-3': {
    id: 'tier-3',
    name: 'Tier 3: Optimal Care',
    shortTitle: 'Optimal Care',
    subtitle: 'Aggressive Preventative Care & Maximum Longevity',
    tagline: 'Keep your vehicle operating in peak mechanical condition past 200k miles.',
    philosophy: 'For automotive enthusiasts and long-term keepers who view their vehicle as an asset. Tier 3 incorporates fleet longevity data, thermal degradation analytics, and preventative component cycling (such as preventative cooling system refreshes or direct-injection intake valve cleaning) while rigorously auditing labor rates to prevent overcharging.',
    coreRule: 'Approve proactive preventative maintenance based on fluid chemistry, thermal stress, and long-term reliability engineering.',
    idealFor: [
      'Vehicle owners planning to keep the car for 10+ years or 200,000+ miles',
      'High-performance, turbocharged, or luxury European vehicles (BMW, Porsche, Audi)',
      'Severe duty cycles (heavy towing, extreme mountain climates, stop-and-go rideshare)',
      'Owners wanting pristine mechanical health with verified fair labor rates'
    ],
    whatWeApprove: [
      'Proactive fluid changes (shorter interval transmission & differential fluid exchanges)',
      'Direct-injection walnut blasting / intake valve cleaning for carbon buildup',
      'Proactive cooling system component replacements (thermostat, water pump) before failure',
      'Premium high-tier brake pads & rotors, high-performance synthetic fluids'
    ],
    whatWeReject: [
      'Inflated labor rates and book-hour padding (we still enforce fair flat-rate hours)',
      'Part prices marked up >30% over wholesale MSRP',
      'Duplicate labor charges (e.g. charging full labor for water pump during timing belt job)',
      'Ineffective generic aerosol spray cleaners billed as comprehensive service'
    ],
    estimatedCostReduction: '15% – 30% via labor & parts price auditing',
    badgeColor: 'amber',
    iconName: 'Sparkles'
  }
};
