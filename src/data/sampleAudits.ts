import { SampleEstimate, EstimateLineItem, TierId, EstimateAuditResult } from '../types';
import { TIERS_DATA } from './tiersData';

export const SAMPLE_ESTIMATES: SampleEstimate[] = [
  {
    id: 'sample-1',
    title: 'Dealership 60,000-Mile Recommended Service & Brakes',
    shopName: 'Metro West Honda & Acura Service Center',
    shopType: 'Dealership',
    vehicle: {
      year: 2021,
      make: 'Honda',
      model: 'CR-V EX-L 1.5L Turbo AWD',
      vin: '7FARW2H88ME049182',
      mileage: 61400
    },
    quotedTotal: 1845.00,
    scenarioDescription: 'Customer brought vehicle in for an oil change and tire rotation; service advisor handed back an inspection estimate with 5 recommended additions.',
    lineItems: [
      {
        id: 'item-1',
        itemDescription: 'Full Synthetic Engine Oil & Genuine Filter Service',
        category: 'Fluids & Maintenance',
        quotedTotal: 110.00,
        fairTotal: 85.00,
        quotedLaborHours: 0.5,
        fairLaborHours: 0.3,
        quotedPartsPrice: 45.00,
        fairPartsPrice: 35.00,
        laborRate: 170.00,
        recommendation: 'APPROVE',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 25.00,
        auditorNote: 'Mandatory maintenance item. Standard shop labor rate adjusted from $170 to fair local benchmark.',
        isCriticalSafety: true,
        oemReferenceCode: 'OEM-01-ENG',
        includedInTiers: ['tier-1', 'tier-2', 'tier-3']
      },
      {
        id: 'item-2',
        itemDescription: 'Front Brake Pads & Rotor Replacement (Both Sides)',
        category: 'Brakes & Safety',
        quotedTotal: 690.00,
        fairTotal: 440.00,
        quotedLaborHours: 2.4,
        fairLaborHours: 1.3,
        quotedPartsPrice: 282.00,
        fairPartsPrice: 219.00,
        laborRate: 170.00,
        recommendation: 'DISPUTE_LABOR',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 250.00,
        auditorNote: 'Brake pads measured at 2.5mm (active safety item). However, Mitchell standard book labor time is 1.3 hours. Shop is billing 2.4 hours ($187 labor overcharge).',
        isCriticalSafety: true,
        oemReferenceCode: 'MITCHELL-BRK-401',
        includedInTiers: ['tier-1', 'tier-2', 'tier-3']
      },
      {
        id: 'item-3',
        itemDescription: 'Fuel Induction & Intake Valve Carbon Flush System',
        category: 'Fuel & Intake',
        quotedTotal: 345.00,
        fairTotal: 0.00,
        quotedLaborHours: 0.8,
        fairLaborHours: 0.0,
        quotedPartsPrice: 165.00,
        fairPartsPrice: 0.00,
        laborRate: 170.00,
        recommendation: 'UNNECESSARY_UPSELL',
        tierStatus: 'REJECTED_BY_TIER',
        potentialSavings: 345.00,
        auditorNote: 'Non-OEM aftermarket chemical flush package. Honda Service Bulletin 15-024 explicitly warns against chemical flushes without verified fuel injector trouble codes (DTC P0300).',
        isCriticalSafety: false,
        oemReferenceCode: 'DEALER-ADD-909',
        includedInTiers: ['tier-3']
      },
      {
        id: 'item-4',
        itemDescription: 'Brake Fluid Hydraulic Moisture Exchange',
        category: 'Fluids & Maintenance',
        quotedTotal: 245.00,
        fairTotal: 140.00,
        quotedLaborHours: 1.0,
        fairLaborHours: 0.6,
        quotedPartsPrice: 45.00,
        fairPartsPrice: 22.00,
        laborRate: 170.00,
        recommendation: 'REVISE_SCOPE',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 105.00,
        auditorNote: 'Honda scheduled manual requires brake fluid replacement every 36 months regardless of mileage. Recommended under Tier 2 & 3, but labor padded by 0.4 hours.',
        isCriticalSafety: false,
        oemReferenceCode: 'HONDA-OEM-3YR',
        includedInTiers: ['tier-2', 'tier-3']
      },
      {
        id: 'item-5',
        itemDescription: 'Rear Differential Dual-Pump Fluid II Service',
        category: 'Fluids & Maintenance',
        quotedTotal: 275.00,
        fairTotal: 135.00,
        quotedLaborHours: 0.9,
        fairLaborHours: 0.4,
        quotedPartsPrice: 85.00,
        fairPartsPrice: 45.00,
        laborRate: 170.00,
        recommendation: 'DISPUTE_LABOR',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 140.00,
        auditorNote: 'Scheduled maintenance for AWD at 60k miles. Fluid replacement takes 20 minutes on hoist. Shop billed 0.9 hours + excessive fluid markup.',
        isCriticalSafety: false,
        oemReferenceCode: 'HONDA-DIFF-DPSF',
        includedInTiers: ['tier-2', 'tier-3']
      },
      {
        id: 'item-6',
        itemDescription: 'Engine Air Filter & HEPA Cabin Dust Filter',
        category: 'Filters & Air',
        quotedTotal: 180.00,
        fairTotal: 65.00,
        quotedLaborHours: 0.6,
        fairLaborHours: 0.1,
        quotedPartsPrice: 78.00,
        fairPartsPrice: 48.00,
        laborRate: 170.00,
        recommendation: 'OVERPRICED_PARTS',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 115.00,
        auditorNote: 'Cabin & engine filters can be installed in 3 minutes without tools. Shop is charging $102 in labor plus 60% parts markup.',
        isCriticalSafety: false,
        oemReferenceCode: 'OEM-FILTERS-CAB',
        includedInTiers: ['tier-2', 'tier-3']
      }
    ]
  },
  {
    id: 'sample-2',
    title: 'BMW European Specialty Shop 60k Inspection & Leaks',
    shopName: 'Bavarian Performance & Autowerks',
    shopType: 'Independent Mechanic',
    vehicle: {
      year: 2019,
      make: 'BMW',
      model: '330i xDrive Sedan (G20)',
      vin: 'WBA33AY08KFP81923',
      mileage: 64100
    },
    quotedTotal: 2650.00,
    scenarioDescription: 'Customer brought BMW in for coolant warning light; shop presented an extensive mechanical work order including valve cover gasket and spark plugs.',
    lineItems: [
      {
        id: 'b-1',
        itemDescription: 'Coolant Expansion Tank & Vent Hose Replacement',
        category: 'Engine & Powertrain',
        quotedTotal: 580.00,
        fairTotal: 390.00,
        quotedLaborHours: 1.8,
        fairLaborHours: 1.0,
        quotedPartsPrice: 220.00,
        fairPartsPrice: 190.00,
        laborRate: 200.00,
        recommendation: 'DISPUTE_LABOR',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 190.00,
        auditorNote: 'Active failure: hairline crack detected at expansion tank seam causing loss of coolant. Verified safety/drivability necessity. Book time is 1.0 hour.',
        isCriticalSafety: true,
        oemReferenceCode: 'BMW-B48-COOL-102',
        includedInTiers: ['tier-1', 'tier-2', 'tier-3']
      },
      {
        id: 'b-2',
        itemDescription: 'OEM Spark Plugs Set of 4 (Laser Iridium)',
        category: 'Engine & Powertrain',
        quotedTotal: 460.00,
        fairTotal: 250.00,
        quotedLaborHours: 1.4,
        fairLaborHours: 0.8,
        quotedPartsPrice: 180.00,
        fairPartsPrice: 90.00,
        laborRate: 200.00,
        recommendation: 'OVERPRICED_PARTS',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 210.00,
        auditorNote: 'BMW official manual interval is every 60k miles for B48 engine. Approved for Tier 2 & 3. Quoted parts price has 100% markup over genuine NGK/BMW plugs.',
        isCriticalSafety: false,
        oemReferenceCode: 'BMW-SPARK-B48',
        includedInTiers: ['tier-2', 'tier-3']
      },
      {
        id: 'b-3',
        itemDescription: 'Valve Cover & Gasket Preventative Replacement (Minor Seepage)',
        category: 'Engine & Powertrain',
        quotedTotal: 1250.00,
        fairTotal: 0.00,
        quotedLaborHours: 4.2,
        fairLaborHours: 0.0,
        quotedPartsPrice: 410.00,
        fairPartsPrice: 0.00,
        laborRate: 200.00,
        recommendation: 'UNNECESSARY_UPSELL',
        tierStatus: 'REJECTED_BY_TIER',
        potentialSavings: 1250.00,
        auditorNote: 'Minor cosmetic oil sweating with zero dripping or burning smell. Tier 1 & Tier 2 reject non-dripping cosmetic seepage. Clean and monitor at next service interval.',
        isCriticalSafety: false,
        oemReferenceCode: 'BMW-VC-GSK-09',
        includedInTiers: ['tier-3']
      },
      {
        id: 'b-4',
        itemDescription: 'Brake Fluid Flush & Bleed (DOT 4 Low Viscosity)',
        category: 'Fluids & Maintenance',
        quotedTotal: 360.00,
        fairTotal: 195.00,
        quotedLaborHours: 1.2,
        fairLaborHours: 0.7,
        quotedPartsPrice: 60.00,
        fairPartsPrice: 35.00,
        laborRate: 200.00,
        recommendation: 'DISPUTE_LABOR',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 165.00,
        auditorNote: 'BMW condition-based service (CBS) 2-year maintenance interval. Labor time padded by 0.5 hours.',
        isCriticalSafety: false,
        oemReferenceCode: 'BMW-CBS-BRK',
        includedInTiers: ['tier-2', 'tier-3']
      }
    ]
  },
  {
    id: 'sample-3',
    title: 'Quick Lube / National Franchise Upsell Package',
    shopName: 'SpeedyLube Plus & Tire Center',
    shopType: 'National Franchise',
    vehicle: {
      year: 2020,
      make: 'Toyota',
      model: 'RAV4 XLE',
      vin: '2T3C1RFV5LC092817',
      mileage: 48900
    },
    quotedTotal: 960.00,
    scenarioDescription: 'Customer stopped in for a $59 oil change; shop technician brought out dirty filter trays and suggested 4 immediate fluid flushes.',
    lineItems: [
      {
        id: 'q-1',
        itemDescription: 'Full Synthetic 0W-16 Oil & Filter Service',
        category: 'Fluids & Maintenance',
        quotedTotal: 75.00,
        fairTotal: 65.00,
        quotedLaborHours: 0.3,
        fairLaborHours: 0.3,
        quotedPartsPrice: 35.00,
        fairPartsPrice: 28.00,
        laborRate: 130.00,
        recommendation: 'APPROVE',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 10.00,
        auditorNote: 'Standard scheduled oil service. Price is within fair competitive market tolerance.',
        isCriticalSafety: true,
        oemReferenceCode: 'TOY-OIL-0W16',
        includedInTiers: ['tier-1', 'tier-2', 'tier-3']
      },
      {
        id: 'q-2',
        itemDescription: 'Transmission Fluid Chemical Power Flush',
        category: 'Fluids & Maintenance',
        quotedTotal: 295.00,
        fairTotal: 0.00,
        quotedLaborHours: 0.8,
        fairLaborHours: 0.0,
        quotedPartsPrice: 150.00,
        fairPartsPrice: 0.00,
        laborRate: 130.00,
        recommendation: 'UNNECESSARY_UPSELL',
        tierStatus: 'REJECTED_BY_TIER',
        potentialSavings: 295.00,
        auditorNote: 'Toyota World Standard (WS) automatic transmission fluid is rated for 100,000 miles under normal conditions. Pressure flushing can damage valve body seals.',
        isCriticalSafety: false,
        oemReferenceCode: 'TOYOTA-WS-FLUID',
        includedInTiers: []
      },
      {
        id: 'q-3',
        itemDescription: 'Power Steering Chemical Exchange Flush',
        category: 'Fluids & Maintenance',
        quotedTotal: 185.00,
        fairTotal: 0.00,
        quotedLaborHours: 0.5,
        fairLaborHours: 0.0,
        quotedPartsPrice: 95.00,
        fairPartsPrice: 0.00,
        laborRate: 130.00,
        recommendation: 'UNNECESSARY_UPSELL',
        tierStatus: 'REJECTED_BY_TIER',
        potentialSavings: 185.00,
        auditorNote: 'CRITICAL AUDIT FINDING: 2020 Toyota RAV4 is equipped with Electric Power Steering (EPS) and contains NO hydraulic power steering fluid whatsoever. Fraudulent quote item.',
        isCriticalSafety: false,
        oemReferenceCode: 'FRAUD-FLAG-01',
        includedInTiers: []
      },
      {
        id: 'q-4',
        itemDescription: 'Engine Induction Air Intake Carbon Cleaner',
        category: 'Fuel & Intake',
        quotedTotal: 240.00,
        fairTotal: 0.00,
        quotedLaborHours: 0.6,
        fairLaborHours: 0.0,
        quotedPartsPrice: 120.00,
        fairPartsPrice: 0.00,
        laborRate: 130.00,
        recommendation: 'UNNECESSARY_UPSELL',
        tierStatus: 'REJECTED_BY_TIER',
        potentialSavings: 240.00,
        auditorNote: 'Generic high-margin aerosol upsell with zero OEM support.',
        isCriticalSafety: false,
        oemReferenceCode: 'DEALER-ADD-909',
        includedInTiers: ['tier-3']
      },
      {
        id: 'q-5',
        itemDescription: 'Cabin Pollen Filter & Engine Filter Combo',
        category: 'Filters & Air',
        quotedTotal: 165.00,
        fairTotal: 55.00,
        quotedLaborHours: 0.4,
        fairLaborHours: 0.1,
        quotedPartsPrice: 90.00,
        fairPartsPrice: 40.00,
        laborRate: 130.00,
        recommendation: 'OVERPRICED_PARTS',
        tierStatus: 'APPROVED_BY_TIER',
        potentialSavings: 110.00,
        auditorNote: 'Parts marked up 150%. 5-minute drop-in filter.',
        isCriticalSafety: false,
        oemReferenceCode: 'TOY-CAB-01',
        includedInTiers: ['tier-2', 'tier-3']
      }
    ]
  }
];

export function computeAuditForTier(estimate: SampleEstimate, tierId: TierId): EstimateAuditResult {
  const tier = TIERS_DATA[tierId];
  
  const evaluatedLineItems: EstimateLineItem[] = estimate.lineItems.map(item => {
    let tierStatus: 'APPROVED_BY_TIER' | 'REJECTED_BY_TIER' = 'APPROVED_BY_TIER';
    let fairTotal = item.fairTotal;
    let recommendation = item.recommendation;
    let potentialSavings = item.potentialSavings;
    let auditorNote = item.auditorNote;

    if (tierId === 'tier-1') {
      // Tier 1: Only keep critical safety or active failures
      if (!item.isCriticalSafety && item.category !== 'Brakes & Safety') {
        tierStatus = 'REJECTED_BY_TIER';
        fairTotal = 0;
        potentialSavings = item.quotedTotal;
        recommendation = 'UNNECESSARY_UPSELL';
        auditorNote = `[Tier 1 Reactive Advocate Filter] Non-critical item rejected. Defers non-active items to protect cash flow until verified failure.`;
      } else if (item.recommendation === 'DISPUTE_LABOR') {
        tierStatus = 'APPROVED_BY_TIER';
        fairTotal = item.fairTotal;
        potentialSavings = item.quotedTotal - item.fairTotal;
      }
    } else if (tierId === 'tier-2') {
      // Tier 2: Follow OEM strict manual
      if (item.oemReferenceCode?.startsWith('FRAUD') || item.oemReferenceCode?.startsWith('DEALER-ADD')) {
        tierStatus = 'REJECTED_BY_TIER';
        fairTotal = 0;
        potentialSavings = item.quotedTotal;
        recommendation = 'UNNECESSARY_UPSELL';
        auditorNote = `[Tier 2 OEM Filter] Rejected because factory manufacturer manual does NOT specify this aftermarket chemical/dealer item.`;
      } else {
        tierStatus = 'APPROVED_BY_TIER';
        fairTotal = item.fairTotal;
        potentialSavings = item.quotedTotal - item.fairTotal;
      }
    } else if (tierId === 'tier-3') {
      // Tier 3: Proactive care approved, but enforce fair parts & labor rates
      if (item.oemReferenceCode?.startsWith('FRAUD')) {
        tierStatus = 'REJECTED_BY_TIER';
        fairTotal = 0;
        potentialSavings = item.quotedTotal;
        recommendation = 'UNNECESSARY_UPSELL';
      } else {
        tierStatus = 'APPROVED_BY_TIER';
        // In tier 3, even preventative flushes get a fair price rather than $0 if reasonable
        fairTotal = item.fairTotal > 0 ? item.fairTotal : (item.quotedTotal * 0.55);
        potentialSavings = item.quotedTotal - fairTotal;
      }
    }

    return {
      ...item,
      fairTotal: Number(fairTotal.toFixed(2)),
      tierStatus,
      recommendation,
      potentialSavings: Number(potentialSavings.toFixed(2)),
      auditorNote
    };
  });

  const totalQuoted = evaluatedLineItems.reduce((sum, item) => sum + item.quotedTotal, 0);
  const fairAdvocateTotal = evaluatedLineItems.reduce((sum, item) => sum + (item.tierStatus === 'APPROVED_BY_TIER' ? item.fairTotal : 0), 0);
  const totalEstimatedSavings = totalQuoted - fairAdvocateTotal;

  const quotedLaborHoursTotal = evaluatedLineItems.reduce((sum, item) => sum + item.quotedLaborHours, 0);
  const fairLaborHoursTotal = evaluatedLineItems.reduce((sum, item) => sum + (item.tierStatus === 'APPROVED_BY_TIER' ? item.fairLaborHours : 0), 0);
  const laborPaddedHours = Math.max(0, quotedLaborHoursTotal - fairLaborHoursTotal);

  // Generate counter scripts tailored to the audit
  const counterScript: string[] = [];
  const rejectedItems = evaluatedLineItems.filter(i => i.tierStatus === 'REJECTED_BY_TIER');
  const laborDisputes = evaluatedLineItems.filter(i => i.recommendation === 'DISPUTE_LABOR' && i.tierStatus === 'APPROVED_BY_TIER');
  const partsDisputes = evaluatedLineItems.filter(i => i.recommendation === 'OVERPRICED_PARTS' && i.tierStatus === 'APPROVED_BY_TIER');

  if (laborDisputes.length > 0) {
    const itemNames = laborDisputes.map(i => i.itemDescription).join(' and ');
    counterScript.push(
      `"I am approving the ${itemNames}, but Mitchell / AllData standard book time for this exact vehicle is ${fairLaborHoursTotal.toFixed(1)} hours. Please adjust the quoted labor of ${quotedLaborHoursTotal.toFixed(1)} hours down to standard factory book time."`
    );
  }

  if (rejectedItems.length > 0) {
    const rejectedNames = rejectedItems.map(i => i.itemDescription.split('(')[0].trim()).slice(0, 2).join(' & ');
    counterScript.push(
      `"Under my ${tier.shortTitle} protocol, please remove ${rejectedNames}. We do not authorize aftermarket chemical flushes or unscheduled packages today."`
    );
  }

  if (partsDisputes.length > 0) {
    counterScript.push(
      `"For the filters/components, please bill parts at standard OEM list MSRP, or note that I will supply genuine OEM boxed parts for installation."`
    );
  }

  counterScript.push(
    `"Please send over the updated itemized authorization for $${fairAdvocateTotal.toFixed(2)} before the technician begins work."`
  );

  const riskScore = Math.min(95, Math.max(25, Math.round((totalEstimatedSavings / totalQuoted) * 100) + 15));

  return {
    shopName: estimate.shopName,
    shopLocation: 'Service Drive Bay 4',
    vehicleEvaluated: `${estimate.vehicle.year} ${estimate.vehicle.make} ${estimate.vehicle.model}`,
    vehicleVin: estimate.vehicle.vin,
    vehicleMileage: estimate.vehicle.mileage,
    selectedTier: tierId,
    overallVerdict: `${rejectedItems.length} Unnecessary Items Flagged for Removal • ${laborPaddedHours.toFixed(1)} Hours Labor Padding Identified`,
    riskScore,
    totalQuoted,
    fairAdvocateTotal: Number(fairAdvocateTotal.toFixed(2)),
    totalEstimatedSavings: Number(totalEstimatedSavings.toFixed(2)),
    quotedLaborHoursTotal: Number(quotedLaborHoursTotal.toFixed(1)),
    fairLaborHoursTotal: Number(fairLaborHoursTotal.toFixed(1)),
    laborPaddedHours: Number(laborPaddedHours.toFixed(1)),
    partsOverchargeAmount: Number((totalEstimatedSavings * 0.35).toFixed(2)),
    lineItems: evaluatedLineItems,
    counterScript,
    advocateSummary: `AdvisrAdvisor audited ${evaluatedLineItems.length} quote items against OEM labor standard databases and your ${tier.shortTitle} preferences. Estimated advocate savings: $${totalEstimatedSavings.toFixed(2)}.`,
    auditTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    auditorId: `ADV-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`
  };
}
