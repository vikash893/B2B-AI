import { Lead, Notification, DashboardStats } from '../types';
import { mockLeads, mockNotifications, mockDashboardStats } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    await delay(800);
    // Mock authentication - accept any email/password
    return {
      user: {
        email,
        role: email.includes('admin') ? 'Admin' : 'Sales Officer',
        name: email.split('@')[0]
      },
      token: 'mock-jwt-token'
    };
  },

  // Leads
  getLeads: async (filters?: {
    industry?: string;
    product?: string;
    urgency?: string;
    search?: string;
  }): Promise<Lead[]> => {
    await delay(500);
    let filtered = [...mockLeads];

    if (filters?.industry && filters.industry !== 'All') {
      filtered = filtered.filter(lead => lead.industry === filters.industry);
    }

    if (filters?.product && filters.product !== 'All') {
      filtered = filtered.filter(lead =>
        lead.recommendedProducts.some(p => p.name.includes(filters.product))
      );
    }

    if (filters?.urgency && filters.urgency !== 'All') {
      filtered = filtered.filter(lead => lead.urgency === filters.urgency);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.companyName.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  },

  getLeadById: async (id: string): Promise<Lead | undefined> => {
    await delay(400);
    return mockLeads.find(lead => lead.id === id);
  },

  updateLeadStatus: async (id: string, status: string) => {
    await delay(500);
    const lead = mockLeads.find(l => l.id === id);
    if (lead) {
      lead.status = status as any;
    }
    return { success: true };
  },

  addLeadNote: async (id: string, note: string) => {
    await delay(400);
    const lead = mockLeads.find(l => l.id === id);
    if (lead) {
      if (!lead.notes) lead.notes = [];
      lead.notes.push(note);
    }
    return { success: true };
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    await delay(300);
    return mockNotifications;
  },

  markNotificationRead: async (id: string) => {
    await delay(200);
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
    return { success: true };
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(600);
    return mockDashboardStats;
  }
};
