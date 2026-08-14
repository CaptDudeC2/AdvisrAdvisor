import { VehicleRecord } from '../types';

export const INITIAL_HOUSEHOLD_VEHICLES: VehicleRecord[] = [
  {
    id: 'veh-01',
    vin: '1HGCR2F83HA019482',
    year: 2022,
    make: 'Honda',
    model: 'Accord Hybrid EX-L',
    trim: '2.0L 4-Cyl Hybrid e-CVT',
    mileage: 38450,
    licensePlate: '7XYZ890',
    state: 'CA',
    isPrimary: true,
    carfaxSummary: {
      owners: 1,
      accidentFree: true,
      serviceRecords: 9,
      openRecalls: 0,
      titleStatus: 'Guaranteed Clean Title',
      lastOdometerDate: '2024-06-12',
      marketValue: 26400,
      estimatedAuditSavingsToDate: 640,
      lastReportDate: '2024-07-28',
      fuelEconomy: '48 MPG City / 47 MPG Hwy',
      engineType: '2.0L 16V DOHC i-VTEC Hybrid'
    },
    warrantyStatus: 'Powertrain Active (3yr/60k mi remaining)',
    currentTier: 'tier-2',
    notes: 'Primary household commuter. Scheduled for 40k inspection next month.'
  },
  {
    id: 'veh-02',
    vin: '5NMS33AD4NH119044',
    year: 2021,
    make: 'Hyundai',
    model: 'Santa Fe SEL',
    trim: '2.5L Smartstream AWD',
    mileage: 51200,
    licensePlate: '8ABC123',
    state: 'CA',
    isPrimary: false,
    carfaxSummary: {
      owners: 1,
      accidentFree: true,
      serviceRecords: 12,
      openRecalls: 1, // Active safety recall: Fuel line clamp inspection
      titleStatus: 'Guaranteed Clean Title',
      lastOdometerDate: '2024-05-18',
      marketValue: 22800,
      estimatedAuditSavingsToDate: 890,
      lastReportDate: '2024-07-15',
      fuelEconomy: '25 MPG City / 28 MPG Hwy',
      engineType: '2.5L Inline-4 DOHC'
    },
    warrantyStatus: 'Factory 10-Yr / 100k Powertrain Active',
    currentTier: 'tier-1',
    notes: 'Family road trip vehicle. Recall campaign NHTSA #23V-420 needs complimentary dealer booking.'
  },
  {
    id: 'veh-03',
    vin: 'WBA33AY08KFP81923',
    year: 2019,
    make: 'BMW',
    model: '330i xDrive Sedan',
    trim: 'M Sport Package B48 2.0T',
    mileage: 64100,
    licensePlate: '6KLM456',
    state: 'CA',
    isPrimary: false,
    carfaxSummary: {
      owners: 2,
      accidentFree: true,
      serviceRecords: 16,
      openRecalls: 0,
      titleStatus: 'Guaranteed Clean Title',
      lastOdometerDate: '2024-07-02',
      marketValue: 24500,
      estimatedAuditSavingsToDate: 1420,
      lastReportDate: '2024-07-20',
      fuelEconomy: '25 MPG City / 34 MPG Hwy',
      engineType: '2.0L TwinPower Turbocharged Inline-4'
    },
    warrantyStatus: 'Out of Factory Warranty (Third-Party Eligible)',
    currentTier: 'tier-2',
    notes: 'Recently audited 60k service, eliminated $740 in dealer chemical flush recommendations.'
  }
];

export const POPULAR_VEHICLE_MAKES = [
  'Honda', 'Toyota', 'Ford', 'Chevrolet', 'BMW', 'Hyundai', 'Subaru', 'Audi', 'Tesla', 'Kia', 'Mercedes-Benz', 'Jeep', 'Nissan', 'Lexus', 'Mazda', 'Volkswagen'
];
