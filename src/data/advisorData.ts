import { AdvisorVehicleProfile } from '../types';

export const SAMPLE_ADVISOR_VEHICLES: Record<string, AdvisorVehicleProfile> = {
  '1HGCR2F83HA019482': {
    vin: '1HGCR2F83HA019482',
    year: 2022,
    make: 'Honda',
    model: 'Accord Hybrid EX-L',
    trim: '2.0L 4-Cyl Hybrid e-CVT',
    engine: '2.0L 16V DOHC i-VTEC Atkinson-Cycle Hybrid (143 hp + 181 hp motor)',
    transmission: 'Electronic Continuously Variable (e-CVT)',
    drivetrain: 'Front-Wheel Drive (FWD)',
    currentMileage: 38450,
    licensePlate: '7XYZ890',
    state: 'CA',
    color: 'Sonic Gray Pearl',
    customerName: 'Christopher Vance',
    customerPhone: '(415) 890-2194',
    customerEmail: 'christopher.v@example.com',
    customerTier: 'tier-2',
    membershipActiveSince: 'March 2023',
    liveServiceDriveStatus: 'CURRENTLY_AT_SHOP',
    activeShopName: 'Metro West Honda & Acura Service Center',
    rawInvoicePages: 2,
    serviceVisits: [
      {
        id: 'vis-01',
        roNumber: 'RO-94812-H',
        date: '2024-06-12',
        mileage: 38450,
        shopName: 'Metro West Honda Service Center',
        shopType: 'Dealership',
        advisorName: 'Derek Simmons (SA #409)',
        technicianId: 'Tech 18 (Master Cert)',
        totalCost: 1245.00,
        laborTotal: 740.00,
        partsTotal: 505.00,
        paymentStatus: 'DISPUTED',
        hasPdfInvoice: true,
        hasInspectionMedia: true,
        lineItems: [
          {
            id: 'li-01',
            partNumber: '45022-TVA-A01',
            partName: 'Front Ceramic Brake Pad Set OEM',
            quantity: 1,
            partCost: 145.00,
            laborHours: 2.4,
            laborRate: 185.00,
            laborTotal: 444.00,
            jobTotal: 589.00,
            category: 'Brakes & Safety',
            isOem: true,
            technicianNotes: 'Front pads measured at 2.4mm inner / 2.8mm outer. Rotors grooved. Labor billed 2.4 hrs.'
          },
          {
            id: 'li-02',
            partNumber: '08798-9034',
            partName: 'Honda Pro Clean Fuel Injector Cleaner Additive',
            quantity: 1,
            partCost: 110.00,
            laborHours: 0.8,
            laborRate: 185.00,
            laborTotal: 148.00,
            jobTotal: 258.00,
            category: 'Fuel & Intake',
            isOem: false,
            technicianNotes: 'Recommended preventive intake decarbonization service.'
          },
          {
            id: 'li-03',
            partNumber: '08200-9014',
            partName: 'Honda DOT 3 Heavy Duty Brake Fluid (32oz)',
            quantity: 2,
            partCost: 48.00,
            laborHours: 1.0,
            laborRate: 185.00,
            laborTotal: 185.00,
            jobTotal: 233.00,
            category: 'Fluids & Hydraulics',
            isOem: true,
            technicianNotes: 'Hydraulic fluid moisture measured >3.5%. Scheduled 3-year factory replacement.'
          },
          {
            id: 'li-04',
            partNumber: '08798-9008',
            partName: 'Full Synthetic 0W-20 & Filter Service (5-Quarts)',
            quantity: 1,
            partCost: 45.00,
            laborHours: 0.5,
            laborRate: 185.00,
            laborTotal: 92.50,
            jobTotal: 137.50,
            category: 'Fluids & Maintenance',
            isOem: true,
            technicianNotes: 'Oil life monitor at 15%. Oil & crush washer replaced.'
          }
        ]
      },
      {
        id: 'vis-02',
        roNumber: 'DIY-LOG-3109',
        date: '2023-11-19',
        mileage: 29100,
        shopName: 'Owner DIY Service Log',
        shopType: 'DIY Owner Log',
        advisorName: 'Owner Self-Log',
        totalCost: 42.50,
        laborTotal: 0.00,
        partsTotal: 42.50,
        paymentStatus: 'PAID',
        hasPdfInvoice: true,
        hasInspectionMedia: false,
        lineItems: [
          {
            id: 'li-05',
            partNumber: 'MOBIL1-0W20-5QT',
            partName: 'Mobil 1 Advanced Fuel Economy 0W-20 & OEM Filter 15400-PLM-A02',
            quantity: 1,
            partCost: 42.50,
            laborHours: 0.0,
            laborRate: 0.0,
            laborTotal: 0.0,
            jobTotal: 42.50,
            category: 'Fluids & Maintenance',
            isOem: true,
            technicianNotes: 'Owner logged AutoZone purchase receipt. Verified warranty compliance.'
          }
        ]
      },
      {
        id: 'vis-03',
        roNumber: 'RO-77312-C',
        date: '2023-05-04',
        mileage: 19800,
        shopName: 'Metro West Honda Service Center',
        shopType: 'Dealership',
        advisorName: 'Sarah Lin (SA #210)',
        totalCost: 185.00,
        laborTotal: 135.00,
        partsTotal: 50.00,
        paymentStatus: 'PAID',
        hasPdfInvoice: true,
        hasInspectionMedia: false,
        lineItems: [
          {
            id: 'li-06',
            partNumber: 'TIRE-ROT-BAL',
            partName: 'Four-Wheel Cross Rotation & Computer Road-Force Balance',
            quantity: 1,
            partCost: 0.00,
            laborHours: 0.6,
            laborRate: 175.00,
            laborTotal: 105.00,
            jobTotal: 105.00,
            category: 'Tires & Wheels',
            isOem: true
          },
          {
            id: 'li-07',
            partNumber: '17220-6A0-A00',
            partName: 'Engine Air Intake Filter Element OEM',
            quantity: 1,
            partCost: 35.00,
            laborHours: 0.2,
            laborRate: 175.00,
            laborTotal: 35.00,
            jobTotal: 70.00,
            category: 'Filters & Air',
            isOem: true
          }
        ]
      },
      {
        id: 'vis-04',
        roNumber: 'RO-69104-A',
        date: '2022-10-15',
        mileage: 9850,
        shopName: 'Metro West Honda Service Center',
        shopType: 'Dealership',
        advisorName: 'Derek Simmons (SA #409)',
        totalCost: 0.00,
        laborTotal: 0.00,
        partsTotal: 0.00,
        paymentStatus: 'WARRANTY_CLAIM',
        hasPdfInvoice: true,
        hasInspectionMedia: false,
        lineItems: [
          {
            id: 'li-08',
            partNumber: 'HONDA-PASS-10K',
            partName: 'Honda Service Pass Complimentary 10k A1 Maintenance + TSB 22-019 ECM Flash',
            quantity: 1,
            partCost: 0.00,
            laborHours: 1.0,
            laborRate: 0.0,
            laborTotal: 0.0,
            jobTotal: 0.0,
            category: 'Factory Warranty & TSB',
            isOem: true
          }
        ]
      }
    ],
    upcomingNeeds: [
      {
        id: 'un-01',
        title: 'Brake Fluid Hydraulic Flush (Factory 3-Year Time Interval)',
        dueMileage: 40000,
        dueDate: 'Due in 30 Days (36 Mos)',
        estimatedCost: 135.00,
        urgency: 'IMMEDIATE',
        category: 'Fluids & Hydraulics',
        isCriticalSafety: true,
        oemScheduleCode: 'HONDA-MAIN-CODE-07',
        description: 'Honda specifies replacement every 36 months regardless of mileage to prevent ABS accumulator corrosion.'
      },
      {
        id: 'un-02',
        title: '45,000-Mile Cabin Dust & Pollen HEPA Filter Element',
        dueMileage: 45000,
        dueDate: 'Estimated Dec 2024',
        estimatedCost: 35.00,
        urgency: 'UPCOMING_MAINTENANCE',
        category: 'Filters & Air',
        isCriticalSafety: false,
        oemScheduleCode: 'HONDA-MAIN-CODE-02',
        description: 'DIY recommended ($18 part online, takes 3 minutes behind glovebox without shop labor).'
      },
      {
        id: 'un-03',
        title: 'Inverter & Motor Cooling Circuit Dual-Loop Level & Specific Gravity Check',
        dueMileage: 45000,
        dueDate: 'Estimated Dec 2024',
        estimatedCost: 45.00,
        urgency: 'MONITOR_ONLY',
        category: 'Hybrid Powertrain',
        isCriticalSafety: false,
        oemScheduleCode: 'HONDA-HYBRID-HEV-01',
        description: 'Inspect secondary hybrid inverter coolant loop for air pockets and clarity.'
      }
    ],
    declinedServices: [
      {
        id: 'ds-01',
        title: 'Dealer Transmission Chemical Power Flush',
        dateDeclined: '2023-11-19',
        mileageDeclined: 29100,
        roNumber: 'RO-88301',
        quotedAmount: 345.00,
        fairBenchmark: 0.00,
        declineReason: 'AdvisrAdvisor identified unapproved aftermarket flush chemical that voids Honda e-CVT warranty.',
        riskAssessment: 'LOW',
        shopRecommended: 'Metro West Honda',
        potentialDamage: 'Power flush machines dislodge internal clutch material in hybrid planetary gearset.'
      },
      {
        id: 'ds-02',
        title: 'Fuel Rail Decarbonization & Throttle Body Chemical Soak',
        dateDeclined: '2023-05-04',
        mileageDeclined: 19800,
        roNumber: 'RO-77312',
        quotedAmount: 258.00,
        fairBenchmark: 0.00,
        declineReason: 'Vehicle had zero misfire codes (DTC P0300-P0304) and normal fuel trims (+1.2%).',
        riskAssessment: 'LOW',
        shopRecommended: 'Metro West Honda',
        potentialDamage: 'Unnecessary expense. Honda TSB 15-024 recommends against chemical flushes.'
      }
    ],
    aiDiscrepancies: [
      {
        id: 'disc-01',
        lineItemDescription: 'Front Brake Pads & Rotor Resurfacing / Replacement Labor',
        partNumber: '45022-TVA-A01',
        category: 'Brakes & Safety',
        quotedLaborHours: 2.4,
        oemBenchmarkHours: 1.2,
        laborRate: 185.00,
        laborOvercharge: 222.00,
        partsQuoted: 145.00,
        partsFairMSRP: 118.00,
        partsOvercharge: 27.00,
        totalDiscrepancy: 249.00,
        flagType: 'LABOR_PADDING',
        severity: 'HIGH',
        aiConfidence: 97,
        oemReferenceSource: 'Mitchell 1 Labor Guide #BRK-402 (Honda Accord Hybrid 2018-2023)',
        auditExplanation: 'Shop billed 2.4 hours for standard front disc brake service. Standard Mitchell & Chilton book labor time is 1.2 hours for pad set replacement + rotor machining ($222.00 padded labor).',
        status: 'PENDING_REVIEW'
      },
      {
        id: 'disc-02',
        lineItemDescription: 'Honda Pro Clean Fuel Injector Flush & Induction Solvent',
        partNumber: '08798-9034',
        category: 'Fuel & Intake',
        quotedLaborHours: 0.8,
        oemBenchmarkHours: 0.0,
        laborRate: 185.00,
        laborOvercharge: 148.00,
        partsQuoted: 110.00,
        partsFairMSRP: 0.00,
        partsOvercharge: 110.00,
        totalDiscrepancy: 258.00,
        flagType: 'UNWARRANTED_UPSELL',
        severity: 'HIGH',
        aiConfidence: 99,
        oemReferenceSource: 'Honda Factory Service Bulletin #15-024 (Avoid Non-OEM Chemical Flushes)',
        auditExplanation: 'Aftermarket chemical flush package with zero diagnostic trouble codes. Direct violation of Honda OEM guidelines. Recommend complete removal from quote.',
        status: 'PENDING_REVIEW'
      },
      {
        id: 'disc-03',
        lineItemDescription: 'Brake Fluid Hydraulic Exchange Labor Time',
        partNumber: '08200-9014',
        category: 'Fluids & Hydraulics',
        quotedLaborHours: 1.0,
        oemBenchmarkHours: 0.6,
        laborRate: 185.00,
        laborOvercharge: 74.00,
        partsQuoted: 48.00,
        partsFairMSRP: 32.00,
        partsOvercharge: 16.00,
        totalDiscrepancy: 90.00,
        flagType: 'LABOR_PADDING',
        severity: 'MEDIUM',
        aiConfidence: 92,
        oemReferenceSource: 'AllData OEM Honda Maintenance Benchmark #FLUID-BRK-01',
        auditExplanation: 'Brake fluid exchange is valid (due by 3-year time interval), but labor time of 1.0 hr exceeds OEM benchmark of 0.6 hr pressure bleed.',
        status: 'PENDING_REVIEW'
      }
    ],
    chatHistory: [
      {
        id: 'msg-01',
        sender: 'system',
        senderName: 'AdvisrAdvisor AI Dispatch',
        text: 'Live Repair Order RO-94812 uploaded from Metro West Honda. Total estimate: $1,245.00. OCR engine detected $597.00 in labor padding and unauthorized flushes.',
        timestamp: '10:14 AM',
        isRead: true
      },
      {
        id: 'msg-02',
        sender: 'customer',
        senderName: 'Christopher Vance',
        text: 'Hey guys, I am sitting in the waiting area at Metro West Honda right now. The advisor told me I need front brakes today and said something about a fuel system flush. Can you look at this before I authorize anything?',
        timestamp: '10:16 AM',
        isRead: true
      },
      {
        id: 'msg-03',
        sender: 'advisor',
        senderName: 'Master Tech Dave (ASE-L1)',
        badge: 'Licensed Master Tech',
        text: 'Hi Christopher! Looking at your live RO and video right now. Your front brake pads are indeed low (2.4mm, which is near the 2.0mm safety threshold), so we DO approve the pads. HOWEVER, they billed you 2.4 hours of labor when OEM standard is only 1.2 hours ($222 overcharge). Also, the $258 fuel flush is 100% unnecessary per Honda Bulletin 15-024.',
        timestamp: '10:18 AM',
        isRead: true,
        actionCard: {
          type: 'DISPUTE_SAVINGS',
          title: 'Immediate Savings Found',
          amount: 480.00,
          details: 'Dispute 1.2 hrs padded brake labor ($222) + Decline fuel induction flush ($258).'
        }
      },
      {
        id: 'msg-04',
        sender: 'customer',
        senderName: 'Christopher Vance',
        text: 'Wow, thank goodness I asked! What exact script should I say to the service writer when he comes over?',
        timestamp: '10:20 AM',
        isRead: true
      }
    ],
    inspectionBookmarks: [
      {
        timeSeconds: 14,
        timestampLabel: '0:14',
        title: 'Front Left Brake Pad Digital Micrometer Measurement',
        findingSeverity: 'WARNING',
        measurement: '2.4 mm (Replace Recommended Soon)',
        description: 'Pad friction material measured with digital gauge. Even wear across rotor.'
      },
      {
        timeSeconds: 38,
        timestampLabel: '0:38',
        title: 'Front Brake Rotor Thickness & Runout Inspection',
        findingSeverity: 'PASS',
        measurement: '25.8 mm (Min discard 24.0 mm)',
        description: 'Rotors have sufficient thickness for on-car lathe resurfacing, no replacement needed.'
      },
      {
        timeSeconds: 58,
        timestampLabel: '0:58',
        title: 'Underbody & High-Voltage Battery Shield Inspection',
        findingSeverity: 'PASS',
        measurement: 'Clean / No Impact Damage',
        description: 'Orange HV harness secure, CV axle boots intact, no fluid leaks from transaxle.'
      },
      {
        timeSeconds: 76,
        timestampLabel: '1:16',
        title: 'Brake Fluid Moisture Strip Test',
        findingSeverity: 'FAIL',
        measurement: 'Moisture 3.8% (Fail >3.0%)',
        description: 'Optical test strip turned purple indicating moisture saturation. Factory flush recommended.'
      }
    ]
  },

  '7FARW2H88ME049182': {
    vin: '7FARW2H88ME049182',
    year: 2021,
    make: 'Honda',
    model: 'CR-V EX-L Turbo AWD',
    trim: '1.5L VTEC Turbo CVT AWD',
    engine: '1.5L Turbocharged DOHC 16-Valve I-4 (190 hp)',
    transmission: 'CVT with Sport Mode',
    drivetrain: 'Real Time AWD with Intelligent Control',
    currentMileage: 61400,
    licensePlate: '8TYU901',
    state: 'WA',
    color: 'Platinum White Pearl',
    customerName: 'Sarah Jenkins',
    customerPhone: '(206) 555-8392',
    customerEmail: 's.jenkins@example.com',
    customerTier: 'tier-1',
    membershipActiveSince: 'January 2024',
    liveServiceDriveStatus: 'QUOTE_RECEIVED',
    activeShopName: 'Bellevue Honda Master Care',
    rawInvoicePages: 3,
    serviceVisits: [
      {
        id: 'vis-crv-01',
        roNumber: 'RO-10492-B',
        date: '2024-07-10',
        mileage: 61400,
        shopName: 'Bellevue Honda Master Care',
        shopType: 'Dealership',
        advisorName: 'Marcus Vance',
        totalCost: 1845.00,
        laborTotal: 1020.00,
        partsTotal: 825.00,
        paymentStatus: 'PENDING',
        hasPdfInvoice: true,
        hasInspectionMedia: true,
        lineItems: [
          {
            id: 'crv-li-01',
            partNumber: '45022-TLA-A01',
            partName: 'Front & Rear Brake Pad Set & Rotors OEM',
            quantity: 2,
            partCost: 480.00,
            laborHours: 4.2,
            laborRate: 195.00,
            laborTotal: 819.00,
            jobTotal: 1299.00,
            category: 'Brakes & Safety',
            isOem: true
          },
          {
            id: 'crv-li-02',
            partNumber: 'CHEM-FLUSH-4PK',
            partName: 'Fuel Injection & Throttle Body Multi-Stage Carbon Clean',
            quantity: 1,
            partCost: 175.00,
            laborHours: 1.0,
            laborRate: 195.00,
            laborTotal: 195.00,
            jobTotal: 370.00,
            category: 'Fuel & Intake',
            isOem: false
          },
          {
            id: 'crv-li-03',
            partNumber: '08200-9007',
            partName: 'Dual Pump Fluid II Rear Differential Service',
            quantity: 1,
            partCost: 45.00,
            laborHours: 0.7,
            laborRate: 195.00,
            laborTotal: 136.50,
            jobTotal: 181.50,
            category: 'Fluids & Drivetrain',
            isOem: true
          }
        ]
      }
    ],
    upcomingNeeds: [
      {
        id: 'crv-un-01',
        title: '60,000-Mile Spark Plug OEM Iridium Laser Replacement',
        dueMileage: 60000,
        dueDate: 'Overdue by 1,400 mi',
        estimatedCost: 160.00,
        urgency: 'IMMEDIATE',
        category: 'Engine & Ignition',
        isCriticalSafety: false,
        oemScheduleCode: 'HONDA-TURBO-SPK-04',
        description: 'Turbo 1.5L direct injection engines require high heat-range iridium plugs every 60k mi.'
      }
    ],
    declinedServices: [
      {
        id: 'crv-ds-01',
        title: 'Coolant Flush with Aftermarket Universal Green Antifreeze',
        dateDeclined: '2024-07-10',
        mileageDeclined: 61400,
        roNumber: 'RO-10492-B',
        quotedAmount: 265.00,
        fairBenchmark: 0.00,
        declineReason: 'Honda Type 2 Blue Coolant is factory rated for 10 years / 100k miles. Non-OEM green coolant corrodes water pump impeller.',
        riskAssessment: 'HIGH_SAFETY',
        shopRecommended: 'Bellevue Honda',
        potentialDamage: 'Universal green coolant introduces silicate drop-out in Honda aluminum block.'
      }
    ],
    aiDiscrepancies: [
      {
        id: 'crv-disc-01',
        lineItemDescription: 'Front & Rear Brake Service Labor Padded by 1.8 hrs',
        category: 'Brakes & Safety',
        quotedLaborHours: 4.2,
        oemBenchmarkHours: 2.4,
        laborRate: 195.00,
        laborOvercharge: 351.00,
        partsQuoted: 480.00,
        partsFairMSRP: 390.00,
        partsOvercharge: 90.00,
        totalDiscrepancy: 441.00,
        flagType: 'LABOR_PADDING',
        severity: 'HIGH',
        aiConfidence: 98,
        oemReferenceSource: 'Mitchell 1 Honda CR-V 4-Wheel Brake Guide',
        auditExplanation: 'Dealer billed 4.2 hrs. Factory Mitchell benchmark for all 4 corners with parking brake electronic retraction mode is 2.4 hrs total.',
        status: 'PENDING_REVIEW'
      }
    ],
    chatHistory: [
      {
        id: 'crv-msg-01',
        sender: 'customer',
        senderName: 'Sarah Jenkins',
        text: 'Hi team, is the 4-wheel brake price reasonable? The dealer wants $1,300 just for brakes.',
        timestamp: '11:02 AM',
        isRead: true
      },
      {
        id: 'crv-msg-02',
        sender: 'advisor',
        senderName: 'Advisor Mike (Master Tech)',
        badge: 'Licensed Master Tech',
        text: 'Sarah, we found a $351 labor overcharge on the brakes. Mitchell OEM book time is 2.4 hrs, but they charged 4.2 hrs. Let us prepare your counter-offer script right now.',
        timestamp: '11:05 AM',
        isRead: true
      }
    ],
    inspectionBookmarks: [
      {
        timeSeconds: 22,
        timestampLabel: '0:22',
        title: 'Rear Brake Pad Thickness Measurement',
        findingSeverity: 'FAIL',
        measurement: '1.8 mm (Service Required)',
        description: 'Rear inner pad worn to 1.8mm. Backing plate squealer tab making contact.'
      }
    ]
  },

  'WBA33AY08KFP81923': {
    vin: 'WBA33AY08KFP81923',
    year: 2019,
    make: 'BMW',
    model: '330i xDrive Sedan',
    trim: 'M Sport B48 2.0T AWD',
    engine: '2.0L TwinPower Turbo Inline-4 (255 hp / 295 lb-ft)',
    transmission: 'ZF 8-Speed Sport Automatic Steptronic',
    drivetrain: 'xDrive Intelligent All-Wheel Drive',
    currentMileage: 64100,
    licensePlate: '6KLM456',
    state: 'CA',
    color: 'Portimao Blue Metallic',
    customerName: 'David Miller',
    customerPhone: '(650) 412-9011',
    customerEmail: 'd.miller@example.com',
    customerTier: 'tier-3',
    membershipActiveSince: 'November 2023',
    liveServiceDriveStatus: 'PREVENTATIVE_AUDIT',
    activeShopName: 'Silicon Valley BMW Certified Service',
    rawInvoicePages: 4,
    serviceVisits: [
      {
        id: 'vis-bmw-01',
        roNumber: 'RO-BMW-8819',
        date: '2024-07-02',
        mileage: 64100,
        shopName: 'Silicon Valley BMW Certified Service',
        shopType: 'Dealership',
        advisorName: 'Christian Keller',
        totalCost: 2840.00,
        laborTotal: 1750.00,
        partsTotal: 1090.00,
        paymentStatus: 'DISPUTED',
        hasPdfInvoice: true,
        hasInspectionMedia: true,
        lineItems: [
          {
            id: 'bmw-li-01',
            partNumber: '34-11-6-874-431',
            partName: 'M-Sport Front 4-Piston Caliper Brake Disc & Pad Set',
            quantity: 1,
            partCost: 680.00,
            laborHours: 3.2,
            laborRate: 245.00,
            laborTotal: 784.00,
            jobTotal: 1464.00,
            category: 'Brakes & Safety',
            isOem: true
          },
          {
            id: 'bmw-li-02',
            partNumber: 'BMW-OIL-ENG-LL01FE',
            partName: 'BMW Longlife-01 FE 0W-30 & Microfilter Housing Service',
            quantity: 1,
            partCost: 145.00,
            laborHours: 0.8,
            laborRate: 245.00,
            laborTotal: 196.00,
            jobTotal: 341.00,
            category: 'Fluids & Maintenance',
            isOem: true
          },
          {
            id: 'bmw-li-03',
            partNumber: 'FLUSH-PACKAGE-PREM',
            partName: 'Executive Fuel & Crankcase Ultrasonic Vapor Flush',
            quantity: 1,
            partCost: 265.00,
            laborHours: 1.5,
            laborRate: 245.00,
            laborTotal: 367.50,
            jobTotal: 632.50,
            category: 'Engine & Fuel',
            isOem: false
          }
        ]
      }
    ],
    upcomingNeeds: [
      {
        id: 'bmw-un-01',
        title: 'ZF 8HP Transmission Pan & Mechatronic Fluid Service',
        dueMileage: 70000,
        dueDate: 'Due at 70,000 mi',
        estimatedCost: 650.00,
        urgency: 'NEXT_30_DAYS',
        category: 'Transmission & Driveline',
        isCriticalSafety: false,
        oemScheduleCode: 'ZF-8HP-SERVICE-GUIDE',
        description: 'ZF manufacturer recommends oil pan filter & Lifeguard 8 fluid change between 60k-75k mi.'
      }
    ],
    declinedServices: [
      {
        id: 'bmw-ds-01',
        title: 'Executive Fuel & Crankcase Ultrasonic Vapor Flush',
        dateDeclined: '2024-07-02',
        mileageDeclined: 64100,
        roNumber: 'RO-BMW-8819',
        quotedAmount: 632.50,
        fairBenchmark: 0.00,
        declineReason: 'Dealership proprietary chemical package. BMW TIS warns against crankcase flush solvents.',
        riskAssessment: 'POWERTRAIN_FAILURE_RISK',
        shopRecommended: 'Silicon Valley BMW',
        potentialDamage: 'Solvents damage composite oil pump seals in B48 engine.'
      }
    ],
    aiDiscrepancies: [
      {
        id: 'bmw-disc-01',
        lineItemDescription: 'Front M-Sport Brakes Labor Billed 3.2 hrs vs BMW KSD 1.4 hrs',
        category: 'Brakes & Safety',
        quotedLaborHours: 3.2,
        oemBenchmarkHours: 1.4,
        laborRate: 245.00,
        laborOvercharge: 441.00,
        partsQuoted: 680.00,
        partsFairMSRP: 540.00,
        partsOvercharge: 140.00,
        totalDiscrepancy: 581.00,
        flagType: 'LABOR_PADDING',
        severity: 'HIGH',
        aiConfidence: 99,
        oemReferenceSource: 'BMW KSD Factory Labor Flat Rate Manual #34-11-000',
        auditExplanation: 'BMW official factory flat-rate guide (KSD) specifies 14 Flat Rate Units (FRUs) = 1.4 hours for front brake overhaul. Overbilled by 1.8 hours ($441 labor padding).',
        status: 'PENDING_REVIEW'
      }
    ],
    chatHistory: [
      {
        id: 'bmw-msg-01',
        sender: 'customer',
        senderName: 'David Miller',
        text: 'The dealer quoted $2,840 for my 60k service. I attached the 4-page invoice.',
        timestamp: '9:15 AM',
        isRead: true
      },
      {
        id: 'bmw-msg-02',
        sender: 'advisor',
        senderName: 'Master Tech Dave (ASE-L1)',
        badge: 'Licensed Master Tech',
        text: 'David, we caught $1,213.50 in total excess charges. The $632.50 crankcase flush is harmful to your B48 engine, and the front brake labor was padded by $441.',
        timestamp: '9:22 AM',
        isRead: true
      }
    ],
    inspectionBookmarks: [
      {
        timeSeconds: 30,
        timestampLabel: '0:30',
        title: 'Oil Filter Housing & Heat Exchanger Inspection',
        findingSeverity: 'PASS',
        measurement: 'Dry / No Coolant Seepage',
        description: 'B48 plastic oil filter housing checked for classic hairline cracking. Clean and dry.'
      }
    ]
  },

  '5NMS33AD4NH119044': {
    vin: '5NMS33AD4NH119044',
    year: 2021,
    make: 'Hyundai',
    model: 'Santa Fe SEL AWD',
    trim: '2.5L Smartstream AWD',
    engine: '2.5L Smartstream GDI/MPI 4-Cylinder (191 hp)',
    transmission: '8-Speed Automatic with SHIFTRONIC',
    drivetrain: 'HTRAC All-Wheel Drive',
    currentMileage: 51200,
    licensePlate: '8ABC123',
    state: 'CA',
    color: 'Twilight Black',
    customerName: 'Marcus Brody',
    customerPhone: '(510) 902-3114',
    customerEmail: 'm.brody@example.com',
    customerTier: 'tier-1',
    membershipActiveSince: 'August 2023',
    liveServiceDriveStatus: 'CURRENTLY_AT_SHOP',
    activeShopName: 'Bay Area Hyundai & Genesis Service',
    rawInvoicePages: 2,
    serviceVisits: [
      {
        id: 'vis-hy-01',
        roNumber: 'RO-HY-49021',
        date: '2024-05-18',
        mileage: 51200,
        shopName: 'Bay Area Hyundai & Genesis Service',
        shopType: 'Dealership',
        advisorName: 'Tony Ramirez',
        totalCost: 780.00,
        laborTotal: 490.00,
        partsTotal: 290.00,
        paymentStatus: 'DISPUTED',
        hasPdfInvoice: true,
        hasInspectionMedia: true,
        lineItems: [
          {
            id: 'hy-li-01',
            partNumber: 'NHTSA-23V-420',
            partName: 'Safety Recall: Fuel Line Quick-Connector Inspection & Clip (Campaign 240)',
            quantity: 1,
            partCost: 0.00,
            laborHours: 0.5,
            laborRate: 0.00,
            laborTotal: 0.00,
            jobTotal: 0.00,
            category: 'Safety Recall',
            isOem: true
          },
          {
            id: 'hy-li-02',
            partNumber: 'HY-TRANS-FLUID-SP4',
            partName: 'Automatic Transmission ATF SP-IV Multi-Vehicle Flush',
            quantity: 1,
            partCost: 195.00,
            laborHours: 1.5,
            laborRate: 185.00,
            laborTotal: 277.50,
            jobTotal: 472.50,
            category: 'Fluids & Drivetrain',
            isOem: false
          }
        ]
      }
    ],
    upcomingNeeds: [
      {
        id: 'hy-un-01',
        title: '50,000-Mile Accessory Drive Serpentine Belt Inspection',
        dueMileage: 52000,
        dueDate: 'Due within 800 mi',
        estimatedCost: 110.00,
        urgency: 'NEXT_30_DAYS',
        category: 'Engine & Belts',
        isCriticalSafety: false,
        oemScheduleCode: 'HYUNDAI-BELT-INSPECT',
        description: 'Inspect micro-rib belt for cracking (more than 3 cracks per inch requires replacement).'
      }
    ],
    declinedServices: [
      {
        id: 'hy-ds-01',
        title: 'Transmission Machine Flush at 50,000 Miles',
        dateDeclined: '2024-05-18',
        mileageDeclined: 51200,
        roNumber: 'RO-HY-49021',
        quotedAmount: 472.50,
        fairBenchmark: 0.00,
        declineReason: 'Hyundai Owner Manual specifies transmission fluid is lifetime under normal service or simple drain/fill at 60k mi under severe service.',
        riskAssessment: 'MEDIUM',
        shopRecommended: 'Bay Area Hyundai',
        potentialDamage: 'Chemical flush voids Hyundai 10-Yr / 100k Factory Powertrain Warranty.'
      }
    ],
    aiDiscrepancies: [
      {
        id: 'hy-disc-01',
        lineItemDescription: 'Transmission Flush Unnecessary & Voids Factory 10-Yr Warranty',
        category: 'Fluids & Drivetrain',
        quotedLaborHours: 1.5,
        oemBenchmarkHours: 0.0,
        laborRate: 185.00,
        laborOvercharge: 277.50,
        partsQuoted: 195.00,
        partsFairMSRP: 0.00,
        partsOvercharge: 195.00,
        totalDiscrepancy: 472.50,
        flagType: 'UNWARRANTED_UPSELL',
        severity: 'HIGH',
        aiConfidence: 99,
        oemReferenceSource: 'Hyundai Factory Warranty Manual Page 14 (Unauthorized Transmission Chemicals)',
        auditExplanation: 'Customer is within the 10-year / 100,000-mile factory powertrain warranty. Third-party chemical transmission flushes jeopardize warranty claims.',
        status: 'PENDING_REVIEW'
      }
    ],
    chatHistory: [
      {
        id: 'hy-msg-01',
        sender: 'customer',
        senderName: 'Marcus Brody',
        text: 'The dealer told me I must get the transmission flush to keep my 100k warranty. Is that true??',
        timestamp: '2:15 PM',
        isRead: true
      },
      {
        id: 'hy-msg-02',
        sender: 'advisor',
        senderName: 'Master Tech Dave (ASE-L1)',
        badge: 'Licensed Master Tech',
        text: 'Marcus, that is FALSE and illegal under the Magnuson-Moss Warranty Act. In fact, third-party flush solvents can VOID your factory warranty. We will dispute this immediately.',
        timestamp: '2:17 PM',
        isRead: true
      }
    ],
    inspectionBookmarks: [
      {
        timeSeconds: 15,
        timestampLabel: '0:15',
        title: 'Safety Recall Campaign 240 Fuel Line Clamp Verification',
        findingSeverity: 'PASS',
        measurement: 'Safety Clip Installed',
        description: 'Complimentary recall clip secured over fuel line quick-connector under driver floor pan.'
      }
    ]
  }
};
