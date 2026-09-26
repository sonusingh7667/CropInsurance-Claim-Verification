// Realistic mock claims data with pre/post disaster satellite metadata

export const initialClaims = [
  {
    id: "CS-2026-8891",
    farmerId: "FARM-9921",
    farmerName: "Rameshwar Patil (रामेश्वर पाटिल)",
    farmerPhone: "+91 98231 44021",
    district: "Satara",
    village: "Patan",
    state: "Maharashtra",
    crop: "Soybean",
    cropHindi: "सोयाबीन",
    surveyNumber: "142/A/2",
    areaAcres: 3.5,
    disasterType: "Unseasonal Heavy Rainfall & Flash Flooding",
    disasterTypeHindi: "अतिवृष्टि एवं अचानक बाढ़",
    dateOfIncident: "2026-08-14",
    filingDate: "16 Aug 2026",
    estimatedLoss: 52000,
    approvedPayout: 48500,
    status: "satellite_verified", // submitted | under_review | satellite_verified | approved | rejected | paid
    damagePercentage: 74,
    aiConfidence: 96,
    fieldInspectionRequested: false,
    officerRemarks: "Satellite Sentinel-2 multispectral reflectance confirmed 74% vegetative index drop. Waterlogged depressions visible in Near-Infrared band.",
    satelliteImages: {
      before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      after: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200",
      ndviBefore: 0.78,
      ndviAfter: 0.22,
      differenceNdvi: -0.56,
      damageZonePercentage: 74,
      cloudCover: "2.1%",
      satellitePassDate: "2026-08-15 (Sentinel-2B)"
    },
    timeline: [
      {
        stage: "submitted",
        title: "Claim Submitted by Farmer",
        titleHindi: "किसान द्वारा दावा दर्ज",
        date: "16 Aug 2026, 10:30 AM",
        completed: true,
        notes: "Form submitted with survey number 142/A/2."
      },
      {
        stage: "satellite_verified",
        title: "Satellite Damage Scan Completed",
        titleHindi: "उपग्रह क्षति आंकलन पूर्ण",
        date: "17 Aug 2026, 04:15 PM",
        completed: true,
        notes: "Sentinel-2 IR analysis detects 74% canopy reduction due to water inundation."
      },
      {
        stage: "officer_review",
        title: "Nodal Officer Verification",
        titleHindi: "कृषि अधिकारी सत्यापन",
        date: "18 Aug 2026, 11:00 AM",
        completed: true,
        notes: "Audited by Dr. Anjali Deshmukh. Recommended for instant DBT payout."
      },
      {
        stage: "paid",
        title: "Direct Benefit Bank Transfer (DBT)",
        titleHindi: "सीधा बैंक में भुगतान (DBT)",
        date: "Scheduled (within 24 hrs)",
        completed: false,
        notes: "Payment order queued to SBI account ending in 4109."
      }
    ]
  },
  {
    id: "CS-2026-8892",
    farmerId: "FARM-9921",
    farmerName: "Rameshwar Patil (रामेश्वर पाटिल)",
    farmerPhone: "+91 98231 44021",
    district: "Satara",
    village: "Patan",
    state: "Maharashtra",
    crop: "Wheat",
    cropHindi: "गेहूं",
    surveyNumber: "89/1/B",
    areaAcres: 2.0,
    disasterType: "Severe Hailstorm & Lodging",
    disasterTypeHindi: "ओलावृष्टि एवं फसल गिरना",
    dateOfIncident: "2026-03-22",
    filingDate: "24 Mar 2026",
    estimatedLoss: 34000,
    approvedPayout: 32000,
    status: "paid",
    damagePercentage: 82,
    aiConfidence: 98,
    fieldInspectionRequested: false,
    officerRemarks: "Severe crop lodging confirmed via high-resolution satellite SAR texture & optical difference.",
    satelliteImages: {
      before: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200",
      after: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
      ndviBefore: 0.81,
      ndviAfter: 0.18,
      differenceNdvi: -0.63,
      damageZonePercentage: 82,
      cloudCover: "0.5%",
      satellitePassDate: "2026-03-23 (Sentinel-2A)"
    },
    timeline: [
      {
        stage: "submitted",
        title: "Claim Submitted",
        titleHindi: "दावा दर्ज हुआ",
        date: "24 Mar 2026",
        completed: true,
        notes: "Hailstorm reported in village cluster."
      },
      {
        stage: "satellite_verified",
        title: "Satellite Verified",
        titleHindi: "उपग्रह द्वारा सत्यापित",
        date: "25 Mar 2026",
        completed: true,
        notes: "Lodging signature mapped across survey plot."
      },
      {
        stage: "officer_review",
        title: "Officer Approved",
        titleHindi: "अधिकारी द्वारा स्वीकृत",
        date: "26 Mar 2026",
        completed: true,
        notes: "Approved for full claim settlement."
      },
      {
        stage: "paid",
        title: "₹32,000 Transferred to Bank",
        titleHindi: "₹32,000 बैंक खाते में जमा",
        date: "28 Mar 2026",
        completed: true,
        notes: "UTR: SBIN2026032890123 - Transferred via PFMS DBT."
      }
    ]
  },
  {
    id: "CS-2026-7730",
    farmerId: "FARM-4402",
    farmerName: "Kailash Verma (कैलाश वर्मा)",
    farmerPhone: "+91 97554 11209",
    district: "Vidisha",
    village: "Gulabganj",
    state: "Madhya Pradesh",
    crop: "Cotton",
    cropHindi: "कपास",
    surveyNumber: "210/3",
    areaAcres: 5.0,
    disasterType: "Prolonged Drought & Moisture Stress",
    disasterTypeHindi: "सूखा एवं नमी की कमी",
    dateOfIncident: "2026-07-28",
    filingDate: "02 Aug 2026",
    estimatedLoss: 75000,
    approvedPayout: 62000,
    status: "under_review",
    damagePercentage: 58,
    aiConfidence: 89,
    fieldInspectionRequested: true,
    officerRemarks: "NDMI (Moisture Index) shows moderate stress. Soil moisture anomaly needs secondary field cross-check.",
    satelliteImages: {
      before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      after: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200",
      ndviBefore: 0.72,
      ndviAfter: 0.35,
      differenceNdvi: -0.37,
      damageZonePercentage: 58,
      cloudCover: "4.8%",
      satellitePassDate: "2026-08-01 (Sentinel-2A)"
    },
    timeline: [
      {
        stage: "submitted",
        title: "Claim Submitted",
        titleHindi: "दावा दर्ज हुआ",
        date: "02 Aug 2026",
        completed: true,
        notes: "Rain deficiency reported in Vidisha block."
      },
      {
        stage: "satellite_verified",
        title: "Satellite Scan: 58% Moisture Stress",
        titleHindi: "उपग्रह स्कैन: 58% नमी की कमी",
        date: "04 Aug 2026",
        completed: true,
        notes: "NDMI threshold triggered."
      },
      {
        stage: "officer_review",
        title: "Assigned for Officer Audit",
        titleHindi: "अधिकारी समीक्षाधीन",
        date: "05 Aug 2026",
        completed: false,
        notes: "Pending final sign-off."
      },
      {
        stage: "paid",
        title: "DBT Payment",
        titleHindi: "बैंक भुगतान",
        date: "Pending",
        completed: false,
        notes: "Queued upon approval."
      }
    ]
  },
  {
    id: "CS-2026-6641",
    farmerId: "FARM-3190",
    farmerName: "Gurpreet Singh (गुरप्रीत सिंह)",
    farmerPhone: "+91 94172 88390",
    district: "Ludhiana",
    village: "Samrala",
    state: "Punjab",
    crop: "Paddy / Rice",
    cropHindi: "धान / चावल",
    surveyNumber: "45/2",
    areaAcres: 6.0,
    disasterType: "Inundation & Bund Breach",
    disasterTypeHindi: "नहर टूटने से जलभराव",
    dateOfIncident: "2026-08-10",
    filingDate: "12 Aug 2026",
    estimatedLoss: 88000,
    approvedPayout: 85000,
    status: "approved",
    damagePercentage: 88,
    aiConfidence: 97,
    fieldInspectionRequested: false,
    officerRemarks: "Clear standing water signature verified through Sentinel-2 NDWI (Water Index). Immediate relief approved.",
    satelliteImages: {
      before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      after: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200",
      ndviBefore: 0.85,
      ndviAfter: 0.12,
      differenceNdvi: -0.73,
      damageZonePercentage: 88,
      cloudCover: "1.2%",
      satellitePassDate: "2026-08-11 (Sentinel-2B)"
    },
    timeline: [
      {
        stage: "submitted",
        title: "Claim Submitted",
        titleHindi: "दावा दर्ज हुआ",
        date: "12 Aug 2026",
        completed: true,
        notes: "High-priority flood alert claim."
      },
      {
        stage: "satellite_verified",
        title: "Satellite Scan: 88% Damage",
        titleHindi: "उपग्रह स्कैन: 88% नुकसान",
        date: "13 Aug 2026",
        completed: true,
        notes: "Water index confirmed submerged crop canopy."
      },
      {
        stage: "officer_review",
        title: "Approved by Nodal Officer",
        titleHindi: "अधिकारी द्वारा स्वीकृत",
        date: "14 Aug 2026",
        completed: true,
        notes: "Approved without physical visit requirement."
      },
      {
        stage: "paid",
        title: "Payment Mandate Generated",
        titleHindi: "भुगतान आदेश जारी",
        date: "Processing DBT",
        completed: false,
        notes: "Disbursement in progress."
      }
    ]
  },
  {
    id: "CS-2026-5510",
    farmerId: "FARM-8120",
    farmerName: "Lakshmi Narayana (लक्ष्मी नारायण)",
    farmerPhone: "+91 94401 77210",
    district: "Guntur",
    village: "Tenali",
    state: "Andhra Pradesh",
    crop: "Chilli / Spices",
    cropHindi: "मिर्च",
    surveyNumber: "318/4",
    areaAcres: 1.5,
    disasterType: "Invasive Pest / Thrips Damage",
    disasterTypeHindi: "कीट व थ्रिप्स प्रकोप",
    dateOfIncident: "2026-07-15",
    filingDate: "19 Jul 2026",
    estimatedLoss: 40000,
    approvedPayout: 0,
    status: "rejected",
    damagePercentage: 18,
    aiConfidence: 91,
    fieldInspectionRequested: false,
    officerRemarks: "Spectral response indicates damage is under the 33% mandatory threshold specified under PMFBY guidelines.",
    satelliteImages: {
      before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      after: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200",
      ndviBefore: 0.74,
      ndviAfter: 0.61,
      differenceNdvi: -0.13,
      damageZonePercentage: 18,
      cloudCover: "3.5%",
      satellitePassDate: "2026-07-18 (Sentinel-2A)"
    },
    timeline: [
      {
        stage: "submitted",
        title: "Claim Submitted",
        titleHindi: "दावा दर्ज हुआ",
        date: "19 Jul 2026",
        completed: true,
        notes: "Pest attack reported."
      },
      {
        stage: "satellite_verified",
        title: "Satellite Scan: 18% Minor Loss",
        titleHindi: "उपग्रह स्कैन: 18% मामूली क्षति",
        date: "20 Jul 2026",
        completed: true,
        notes: "Chlorophyll retention remains above normal threshold."
      },
      {
        stage: "officer_review",
        title: "Claim Inadmissible",
        titleHindi: "दावा अमान्य घोषित",
        date: "21 Jul 2026",
        completed: true,
        notes: "Loss is less than minimum 33% scheme requirement."
      },
      {
        stage: "paid",
        title: "Closed Without Payment",
        titleHindi: "बिना भुगतान बंद",
        date: "21 Jul 2026",
        completed: true,
        notes: "Grievance redressal available under Kisan Helpdesk."
      }
    ]
  }
];
