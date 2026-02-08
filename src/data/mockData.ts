import { Lead, Notification, DashboardStats } from '../types';

export const mockLeads: Lead[] = [
  {
    id: 'L001',
    companyName: 'Apex Steel Industries Ltd.',
    industry: 'Manufacturing',
    recommendedProducts: [
      { name: 'Industrial Lubricants', reasonCode: 'Heavy machinery operations detected', confidence: 92 },
      { name: 'Furnace Oil', reasonCode: 'High-temperature furnace usage', confidence: 88 },
      { name: 'Hydraulic Oil', reasonCode: 'Press machinery identified', confidence: 85 }
    ],
    confidenceScore: 92,
    urgency: 'High',
    status: 'New',
    location: 'Mumbai, Maharashtra',
    facilities: ['Main Plant - Turbhe MIDC', 'Warehouse - Bhiwandi', 'Corporate Office - BKC'],
    signals: [
      {
        type: 'tender',
        title: 'Tender for Industrial Lubricants',
        description: 'Public tender issued for 50,000L industrial grade lubricants',
        date: '2026-02-05',
        source: 'Government e-Marketplace'
      },
      {
        type: 'news',
        title: 'Apex Steel announces capacity expansion',
        description: 'Company plans to increase production by 40% in next quarter',
        date: '2026-02-01',
        source: 'Economic Times'
      },
      {
        type: 'keyword',
        title: 'Maintenance Upgrade Project',
        description: 'Keywords detected: "lubrication system upgrade", "machinery maintenance"',
        date: '2026-01-28',
        source: 'LinkedIn Posts'
      }
    ],
    suggestedAction: 'Schedule immediate demo call with Production Head. Highlight cost savings from premium lubricants.',
    createdAt: '2026-02-06',
    notes: ['Initial contact made via email', 'Waiting for procurement team response']
  },
  {
    id: 'L002',
    companyName: 'GreenTech Logistics Pvt Ltd',
    industry: 'Logistics',
    recommendedProducts: [
      { name: 'Diesel - High Speed', reasonCode: 'Fleet of 200+ vehicles', confidence: 95 },
      { name: 'Engine Oil - Commercial', reasonCode: 'Heavy-duty truck operations', confidence: 91 },
      { name: 'Fleet Management Services', reasonCode: 'Large fleet optimization needs', confidence: 87 }
    ],
    confidenceScore: 95,
    urgency: 'High',
    status: 'Accepted',
    location: 'Bangalore, Karnataka',
    facilities: ['HQ - Whitefield', 'Warehouse - Peenya', 'Service Center - Hosur Road'],
    signals: [
      {
        type: 'news',
        title: 'GreenTech expands to 5 new cities',
        description: 'Logistics firm adds 100 vehicles to fleet for pan-India operations',
        date: '2026-02-03',
        source: 'Business Standard'
      },
      {
        type: 'keyword',
        title: 'Fuel partnership inquiry',
        description: 'Keywords: "bulk diesel supply", "fleet fuel cards", "long-term contract"',
        date: '2026-02-02',
        source: 'Company Website Contact Form'
      }
    ],
    suggestedAction: 'Present fleet management package with volume discounts. Emphasize fuel quality and network coverage.',
    createdAt: '2026-02-05',
    notes: ['Meeting scheduled for Feb 10', 'CFO interested in cost analysis']
  },
  {
    id: 'L003',
    companyName: 'Royal Textile Mills',
    industry: 'Textile',
    recommendedProducts: [
      { name: 'Steam Coal', reasonCode: 'Boiler operations for dyeing', confidence: 78 },
      { name: 'Industrial LPG', reasonCode: 'Heat treatment processes', confidence: 75 },
      { name: 'Power Backup Solutions', reasonCode: 'Frequent power cuts reported', confidence: 72 }
    ],
    confidenceScore: 78,
    urgency: 'Medium',
    status: 'New',
    location: 'Surat, Gujarat',
    facilities: ['Manufacturing Unit - GIDC Sachin', 'Dyeing Unit - Pandesara'],
    signals: [
      {
        type: 'keyword',
        title: 'Energy cost concerns',
        description: 'Keywords: "reduce energy costs", "alternative fuel sources"',
        date: '2026-01-30',
        source: 'Industry Forum Posts'
      }
    ],
    suggestedAction: 'Offer energy audit and propose LPG conversion for cost optimization.',
    createdAt: '2026-02-04'
  },
  {
    id: 'L004',
    companyName: 'Metro Construction Corp',
    industry: 'Construction',
    recommendedProducts: [
      { name: 'Diesel - Light', reasonCode: 'Construction equipment and generators', confidence: 89 },
      { name: 'Bitumen', reasonCode: 'Road construction projects', confidence: 86 },
      { name: 'Lubricants - Construction', reasonCode: 'Heavy machinery maintenance', confidence: 83 }
    ],
    confidenceScore: 89,
    urgency: 'Medium',
    status: 'New',
    location: 'Delhi NCR',
    facilities: ['Head Office - Connaught Place', 'Equipment Yard - Ghaziabad'],
    signals: [
      {
        type: 'tender',
        title: 'Highway project contract won',
        description: 'Awarded 25km highway construction project in Haryana',
        date: '2026-02-04',
        source: 'NHAI Portal'
      },
      {
        type: 'news',
        title: 'Metro Construction bags govt contract',
        description: 'Company secures Rs 500Cr infrastructure project',
        date: '2026-02-02',
        source: 'The Hindu BusinessLine'
      }
    ],
    suggestedAction: 'Connect with project manager. Offer on-site fuel delivery and bitumen supply for highway project.',
    createdAt: '2026-02-03'
  },
  {
    id: 'L005',
    companyName: 'FreshFarms Agro Ltd',
    industry: 'Agriculture',
    recommendedProducts: [
      { name: 'Diesel - Agricultural', reasonCode: 'Tractor and pump operations', confidence: 70 },
      { name: 'Lubricants - Farm Equipment', reasonCode: 'Machinery maintenance needs', confidence: 68 },
      { name: 'Solar Pumping Solutions', reasonCode: 'Irrigation modernization', confidence: 65 }
    ],
    confidenceScore: 70,
    urgency: 'Low',
    status: 'New',
    location: 'Nashik, Maharashtra',
    facilities: ['Farm - Nashik Road', 'Processing Unit - Satpur MIDC'],
    signals: [
      {
        type: 'keyword',
        title: 'Farm mechanization plans',
        description: 'Keywords: "new tractors", "irrigation pumps", "fuel efficiency"',
        date: '2026-01-25',
        source: 'Agricultural Forum'
      }
    ],
    suggestedAction: 'Introduce agricultural diesel package with seasonal discounts.',
    createdAt: '2026-02-01'
  },
  {
    id: 'L006',
    companyName: 'TechPark Developers',
    industry: 'Real Estate',
    recommendedProducts: [
      { name: 'Diesel Generators', reasonCode: 'Power backup for IT parks', confidence: 82 },
      { name: 'CNG Solutions', reasonCode: 'Eco-friendly transit systems', confidence: 79 },
      { name: 'EV Charging Stations', reasonCode: 'Green building certifications', confidence: 76 }
    ],
    confidenceScore: 82,
    urgency: 'High',
    status: 'New',
    location: 'Pune, Maharashtra',
    facilities: ['Project Site - Hinjewadi Phase 3', 'Sales Office - Koregaon Park'],
    signals: [
      {
        type: 'news',
        title: 'TechPark launches green IT hub',
        description: 'Developer focuses on sustainable infrastructure with EV facilities',
        date: '2026-02-06',
        source: 'Indian Express'
      },
      {
        type: 'tender',
        title: 'RFP for EV charging infrastructure',
        description: 'Request for proposal for 50 EV charging points',
        date: '2026-02-05',
        source: 'Company Website'
      }
    ],
    suggestedAction: 'Pitch integrated energy solution with EV charging and power backup. Highlight sustainability credentials.',
    createdAt: '2026-02-06'
  },
  {
    id: 'L007',
    companyName: 'Ocean Fisheries Exports',
    industry: 'Marine',
    recommendedProducts: [
      { name: 'Marine Diesel Oil', reasonCode: 'Fishing vessel fleet operations', confidence: 88 },
      { name: 'Lubricants - Marine', reasonCode: 'Engine maintenance for boats', confidence: 84 },
      { name: 'Refrigeration Fuel', reasonCode: 'Cold storage facilities', confidence: 80 }
    ],
    confidenceScore: 88,
    urgency: 'Medium',
    status: 'Converted',
    location: 'Kochi, Kerala',
    facilities: ['Processing Plant - Vypeen', 'Cold Storage - Willingdon Island'],
    signals: [
      {
        type: 'keyword',
        title: 'Fleet expansion inquiry',
        description: 'Keywords: "marine fuel supply", "bulk purchase", "coastal delivery"',
        date: '2026-01-20',
        source: 'Industry Contact'
      }
    ],
    suggestedAction: 'Contract signed. Focus on service excellence and upselling opportunities.',
    createdAt: '2026-01-28',
    notes: ['Contract signed on Feb 1', '6-month supply agreement', 'Monthly review scheduled']
  },
  {
    id: 'L008',
    companyName: 'PowerGrid Solutions',
    industry: 'Energy',
    recommendedProducts: [
      { name: 'Transformer Oil', reasonCode: 'Substation maintenance', confidence: 93 },
      { name: 'Insulation Oil', reasonCode: 'Electrical equipment care', confidence: 90 },
      { name: 'Cable Lubricants', reasonCode: 'Installation operations', confidence: 87 }
    ],
    confidenceScore: 93,
    urgency: 'High',
    status: 'Accepted',
    location: 'Hyderabad, Telangana',
    facilities: ['Regional Office - Gachibowli', 'Equipment Depot - Uppal'],
    signals: [
      {
        type: 'tender',
        title: 'Transformer oil procurement',
        description: 'Tender for 100KL transformer oil for grid expansion',
        date: '2026-02-04',
        source: 'Company Tender Portal'
      },
      {
        type: 'news',
        title: 'PowerGrid invests in grid modernization',
        description: 'Rs 200Cr investment for infrastructure upgrade',
        date: '2026-01-31',
        source: 'Financial Express'
      }
    ],
    suggestedAction: 'Submit technical proposal with quality certifications. Arrange sample testing.',
    createdAt: '2026-02-05',
    notes: ['Technical team visit scheduled', 'Samples sent for approval']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    leadId: 'L001',
    leadName: 'Apex Steel Industries Ltd.',
    message: 'High-confidence lead detected with 92% match. Tender issued for industrial lubricants.',
    timestamp: '2026-02-06T09:30:00',
    read: false,
    channels: { whatsapp: true, email: true, app: true }
  },
  {
    id: 'N002',
    leadId: 'L006',
    leadName: 'TechPark Developers',
    message: 'New RFP published for EV charging infrastructure. Urgency: High',
    timestamp: '2026-02-06T08:15:00',
    read: false,
    channels: { whatsapp: true, email: true, app: true }
  },
  {
    id: 'N003',
    leadId: 'L002',
    leadName: 'GreenTech Logistics Pvt Ltd',
    message: 'Meeting reminder: Demo scheduled for Feb 10 with CFO',
    timestamp: '2026-02-05T16:45:00',
    read: true,
    channels: { whatsapp: false, email: true, app: true }
  },
  {
    id: 'N004',
    leadId: 'L008',
    leadName: 'PowerGrid Solutions',
    message: 'Technical team visit confirmed. Sample approval pending.',
    timestamp: '2026-02-05T14:20:00',
    read: true,
    channels: { whatsapp: true, email: true, app: true }
  },
  {
    id: 'N005',
    leadId: 'L004',
    leadName: 'Metro Construction Corp',
    message: 'Company won highway project. Immediate fuel supply opportunity.',
    timestamp: '2026-02-04T11:00:00',
    read: true,
    channels: { whatsapp: false, email: true, app: true }
  }
];

export const mockDashboardStats: DashboardStats = {
  leadsPerWeek: [
    { week: 'Week 1', leads: 12 },
    { week: 'Week 2', leads: 18 },
    { week: 'Week 3', leads: 25 },
    { week: 'Week 4', leads: 31 },
    { week: 'Week 5', leads: 28 },
    { week: 'Week 6', leads: 35 }
  ],
  conversionFunnel: [
    { stage: 'New Leads', count: 150 },
    { stage: 'Accepted', count: 95 },
    { stage: 'In Discussion', count: 62 },
    { stage: 'Proposal Sent', count: 38 },
    { stage: 'Converted', count: 24 }
  ],
  topProducts: [
    { product: 'Diesel - High Speed', count: 45 },
    { product: 'Industrial Lubricants', count: 38 },
    { product: 'Furnace Oil', count: 32 },
    { product: 'Engine Oil', count: 28 },
    { product: 'Bitumen', count: 22 }
  ],
  sectorDistribution: [
    { sector: 'Manufacturing', count: 42 },
    { sector: 'Logistics', count: 35 },
    { sector: 'Construction', count: 28 },
    { sector: 'Agriculture', count: 18 },
    { sector: 'Energy', count: 15 },
    { sector: 'Others', count: 12 }
  ]
};
