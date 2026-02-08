export type UrgencyLevel = 'High' | 'Medium' | 'Low';
export type LeadStatus = 'New' | 'Accepted' | 'Rejected' | 'Converted';
export type UserRole = 'Sales Officer' | 'Admin';

export interface Product {
  name: string;
  reasonCode: string;
  confidence: number;
}

export interface Signal {
  type: 'keyword' | 'tender' | 'news';
  title: string;
  description: string;
  date: string;
  source?: string;
}

export interface Lead {
  id: string;
  companyName: string;
  industry: string;
  recommendedProducts: Product[];
  confidenceScore: number;
  urgency: UrgencyLevel;
  status: LeadStatus;
  location: string;
  facilities: string[];
  signals: Signal[];
  suggestedAction: string;
  createdAt: string;
  notes?: string[];
}

export interface Notification {
  id: string;
  leadId: string;
  leadName: string;
  message: string;
  timestamp: string;
  read: boolean;
  channels: {
    whatsapp: boolean;
    email: boolean;
    app: boolean;
  };
}

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

export interface DashboardStats {
  leadsPerWeek: { week: string; leads: number }[];
  conversionFunnel: { stage: string; count: number }[];
  topProducts: { product: string; count: number }[];
  sectorDistribution: { sector: string; count: number }[];
}
