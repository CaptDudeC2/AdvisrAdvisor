export type TierId = 'tier-1' | 'tier-2' | 'tier-3';

export interface TierDefinition {
  id: TierId;
  name: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  philosophy: string;
  coreRule: string;
  idealFor: string[];
  whatWeApprove: string[];
  whatWeReject: string[];
  estimatedCostReduction: string;
  badgeColor: string;
  iconName: string;
}

export interface VehicleRecord {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage: number;
  licensePlate?: string;
  state?: string;
  isPrimary?: boolean;
  carfaxSummary: {
    owners: number;
    accidentFree: boolean;
    serviceRecords: number;
    openRecalls: number;
    titleStatus: string;
    lastOdometerDate: string;
    marketValue: number;
    estimatedAuditSavingsToDate?: number;
    lastReportDate?: string;
    fuelEconomy?: string;
    engineType?: string;
  };
  warrantyStatus: string;
  currentTier: TierId;
  notes?: string;
}

export type LineItemRecommendation = 
  | 'APPROVE' 
  | 'DISPUTE_LABOR' 
  | 'OVERPRICED_PARTS' 
  | 'UNNECESSARY_UPSELL' 
  | 'REVISE_SCOPE'
  | 'DEFERRED';

export type TierApprovalStatus = 
  | 'APPROVED_BY_TIER' 
  | 'REJECTED_BY_TIER' 
  | 'OPTIONAL_BY_TIER';

export interface EstimateLineItem {
  id: string;
  itemDescription: string;
  category: 'Brakes & Safety' | 'Fluids & Maintenance' | 'Engine & Powertrain' | 'Electrical & Diagnostic' | 'Suspension & Steering' | 'Filters & Air' | 'Tires & Wheels' | 'Fuel & Intake';
  quotedTotal: number;
  fairTotal: number;
  quotedLaborHours: number;
  fairLaborHours: number;
  quotedPartsPrice?: number;
  fairPartsPrice?: number;
  laborRate?: number;
  recommendation: LineItemRecommendation;
  tierStatus: TierApprovalStatus;
  potentialSavings: number;
  auditorNote: string;
  isCriticalSafety: boolean;
  oemReferenceCode?: string;
  includedInTiers: TierId[];
}

export interface EstimateAuditResult {
  shopName: string;
  shopLocation?: string;
  vehicleEvaluated: string;
  vehicleVin?: string;
  vehicleMileage?: number;
  selectedTier: TierId;
  overallVerdict: string;
  riskScore: number; // 0 - 100
  totalQuoted: number;
  fairAdvocateTotal: number;
  totalEstimatedSavings: number;
  quotedLaborHoursTotal: number;
  fairLaborHoursTotal: number;
  laborPaddedHours: number;
  partsOverchargeAmount: number;
  lineItems: EstimateLineItem[];
  counterScript: string[];
  advocateSummary: string;
  auditTimestamp: string;
  auditorId: string;
}

export interface SampleEstimate {
  id: string;
  title: string;
  shopName: string;
  shopType: 'Dealership' | 'National Franchise' | 'Independent Mechanic';
  vehicle: {
    year: number;
    make: string;
    model: string;
    vin: string;
    mileage: number;
  };
  quotedTotal: number;
  scenarioDescription: string;
  lineItems: EstimateLineItem[];
}

// ==========================================
// ADVISOR CONTROL ROOM (INTERNAL BACKEND)
// ==========================================

export interface ServiceLineItem {
  id: string;
  partNumber: string;
  partName: string;
  quantity: number;
  partCost: number;
  laborHours: number;
  laborRate: number;
  laborTotal: number;
  jobTotal: number;
  category: string;
  isOem: boolean;
  warrantyCovered?: boolean;
  technicianNotes?: string;
}

export interface AdvisorServiceVisit {
  id: string;
  roNumber: string;
  date: string;
  mileage: number;
  shopName: string;
  shopType: 'Dealership' | 'National Franchise' | 'Independent Master Shop' | 'DIY Owner Log';
  advisorName?: string;
  technicianId?: string;
  totalCost: number;
  laborTotal: number;
  partsTotal: number;
  lineItems: ServiceLineItem[];
  paymentStatus: 'PAID' | 'PENDING' | 'DISPUTED' | 'WARRANTY_CLAIM';
  hasPdfInvoice: boolean;
  pdfInvoiceUrl?: string;
  hasInspectionMedia: boolean;
}

export interface AdvisorUpcomingNeed {
  id: string;
  title: string;
  dueMileage: number;
  dueDate: string;
  estimatedCost: number;
  urgency: 'IMMEDIATE' | 'NEXT_30_DAYS' | 'UPCOMING_MAINTENANCE' | 'MONITOR_ONLY';
  category: string;
  isCriticalSafety: boolean;
  oemScheduleCode: string;
  description: string;
}

export interface AdvisorDeclinedService {
  id: string;
  title: string;
  dateDeclined: string;
  mileageDeclined: number;
  roNumber: string;
  quotedAmount: number;
  fairBenchmark: number;
  declineReason: string;
  riskAssessment: 'LOW' | 'MEDIUM' | 'HIGH_SAFETY' | 'POWERTRAIN_FAILURE_RISK';
  shopRecommended: string;
  potentialDamage: string;
}

export interface AdvisorAiDiscrepancy {
  id: string;
  lineItemDescription: string;
  partNumber?: string;
  category: string;
  quotedLaborHours: number;
  oemBenchmarkHours: number;
  laborRate: number;
  laborOvercharge: number;
  partsQuoted: number;
  partsFairMSRP: number;
  partsOvercharge: number;
  totalDiscrepancy: number;
  flagType: 'LABOR_PADDING' | 'EXCESSIVE_PARTS_MARKUP' | 'UNWARRANTED_UPSELL' | 'DUPLICATE_OVERLAPPING_LABOR' | 'NON_OEM_SPEC_FLUID';
  severity: 'HIGH' | 'MEDIUM' | 'WARNING';
  aiConfidence: number; // 0 - 100
  oemReferenceSource: string;
  auditExplanation: string;
  status: 'PENDING_REVIEW' | 'CONFIRMED' | 'OVERRIDDEN';
  overrideReason?: string;
  advisorSignature?: string;
  updatedAt?: string;
}

export interface AdvisorChatMessage {
  id: string;
  sender: 'customer' | 'advisor' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  badge?: string;
  actionCard?: {
    type: 'DISPUTE_SAVINGS' | 'ESTIMATE_CONFIRMATION' | 'MEDIA_SHARE';
    title: string;
    amount?: number;
    details: string;
  };
}

export interface AdvisorInspectionBookmark {
  timeSeconds: number;
  timestampLabel: string;
  title: string;
  findingSeverity: 'PASS' | 'WARNING' | 'FAIL';
  measurement?: string;
  description: string;
}

export interface AdvisorVehicleProfile {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  currentMileage: number;
  licensePlate: string;
  state: string;
  color: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerTier: TierId;
  membershipActiveSince: string;
  liveServiceDriveStatus?: 'CURRENTLY_AT_SHOP' | 'QUOTE_RECEIVED' | 'PREVENTATIVE_AUDIT' | 'COMPLETED';
  activeShopName?: string;
  serviceVisits: AdvisorServiceVisit[];
  upcomingNeeds: AdvisorUpcomingNeed[];
  declinedServices: AdvisorDeclinedService[];
  aiDiscrepancies: AdvisorAiDiscrepancy[];
  chatHistory: AdvisorChatMessage[];
  inspectionBookmarks: AdvisorInspectionBookmark[];
  rawInvoicePages: number;
}
