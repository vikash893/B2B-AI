import { Lead, Notification, DashboardStats, Product, UrgencyLevel, LeadStatus, Signal } from '../types';
import { mockLeads, mockNotifications, mockDashboardStats } from '../data/mockData';

type RemoteUser = {
  id: number;
  firstName: string;
  lastName: string;
  company?: { name?: string; department?: string; title?: string };
  address?: { city?: string; state?: string; address?: string };
  age?: number;
  birthDate?: string;
};

type RemoteProduct = { id: number; title: string; description?: string; rating?: number; category?: string };
type RemotePost = { id: number; title: string; body: string; tags?: string[] };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const urgencyLevels: UrgencyLevel[] = ['High', 'Medium', 'Low'];
const leadStatuses: LeadStatus[] = ['New', 'Accepted', 'Rejected', 'Converted'];

const fetchJson = async <T,>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
};

const toRecommendedProducts = (products: RemoteProduct[], seed: number): Product[] => {
  if (products.length === 0) return [];
  const startIndex = seed % products.length;
  return [0, 1, 2].map(offset => {
    const product = products[(startIndex + offset) % products.length];
    return {
      name: product.title,
      reasonCode: product.description ? product.description.slice(0, 80) : 'Product relevance derived from market demand.',
      confidence: Math.min(98, Math.round(70 + ((product.rating ?? 4) / 5) * 25))
    };
  });
};

const toSignals = (posts: RemotePost[], seed: number): Signal[] => {
  if (posts.length === 0) return [];
  const startIndex = seed % posts.length;
  return [0, 1].map(offset => {
    const post = posts[(startIndex + offset) % posts.length];
    return {
      type: offset % 2 === 0 ? 'news' : 'keyword',
      title: post.title,
      description: post.body,
      date: new Date(Date.now() - (seed + offset) * 86400000).toISOString().split('T')[0],
      source: post.tags?.[0] ?? 'Industry News'
    };
  });
};

const toLead = (user: RemoteUser, products: RemoteProduct[], posts: RemotePost[]): Lead => {
  const seed = user.id ?? Math.floor(Math.random() * 1000);
  const confidenceScore = Math.min(98, Math.round(60 + ((user.age ?? 30) / 100) * 35 + (seed % 10)));
  const urgency = urgencyLevels[seed % urgencyLevels.length];
  const status = leadStatuses[seed % leadStatuses.length];
  const companyName = user.company?.name ?? `${user.firstName} ${user.lastName} Holdings`;
  const industry = user.company?.department ?? 'Manufacturing';
  const locationParts = [user.address?.city, user.address?.state].filter(Boolean);
  const location = locationParts.join(', ') || 'Remote';
  const addressLine = user.address?.address ?? 'Corporate HQ';
  return {
    id: `L${String(user.id).padStart(3, '0')}`,
    companyName,
    industry,
    recommendedProducts: toRecommendedProducts(products, seed),
    confidenceScore,
    urgency,
    status,
    location,
    facilities: [`${companyName} - ${addressLine}`, `${companyName} - Distribution Center`],
    signals: toSignals(posts, seed),
    suggestedAction: `Reach out to ${companyName} with tailored ${industry.toLowerCase()} solutions and a quick audit offer.`,
    createdAt: user.birthDate ?? new Date(Date.now() - seed * 86400000).toISOString().split('T')[0],
    notes: []
  };
};

let cachedLeads: Lead[] | null = null;
let cachedNotifications: Notification[] | null = null;
let cachedDashboardStats: DashboardStats | null = null;

const loadRemoteData = async (): Promise<{
  leads: Lead[];
  notifications: Notification[];
  dashboardStats: DashboardStats;
}> => {
  if (cachedLeads && cachedNotifications && cachedDashboardStats) {
    return { leads: cachedLeads, notifications: cachedNotifications, dashboardStats: cachedDashboardStats };
  }

  const [{ users }, { products }, { posts }] = await Promise.all([
    fetchJson<{ users: RemoteUser[] }>('/users?limit=20'),
    fetchJson<{ products: RemoteProduct[] }>('/products?limit=20'),
    fetchJson<{ posts: RemotePost[] }>('/posts?limit=20')
  ]);

  const leads = users.map(user => toLead(user, products, posts));

  const notifications: Notification[] = posts.slice(0, 6).map(post => {
    const lead = leads[post.id % leads.length];
    return {
      id: `N${post.id}`,
      leadId: lead.id,
      leadName: lead.companyName,
      message: post.title,
      timestamp: new Date(Date.now() - post.id * 3600000).toISOString(),
      read: post.id % 2 === 0,
      channels: {
        whatsapp: post.id % 3 === 0,
        email: post.id % 2 === 0,
        app: true
      }
    };
  });

  const leadsPerWeek = Array.from({ length: 6 }, (_, index) => {
    const count = leads.filter(lead => lead.urgency === urgencyLevels[index % urgencyLevels.length]).length;
    return { week: `W${index + 1}`, leads: count };
  });

  const conversionFunnel = leadStatuses.map(status => ({
    stage: status,
    count: leads.filter(lead => lead.status === status).length
  }));

  const topProducts = products.slice(0, 5).map(product => ({
    product: product.title,
    count: leads.filter(lead => lead.recommendedProducts.some(p => p.name === product.title)).length
  }));

  const sectorCounts = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.industry] = (acc[lead.industry] ?? 0) + 1;
    return acc;
  }, {});

  const sectorDistribution = Object.entries(sectorCounts).map(([sector, count]) => ({
    sector,
    count
  }));

  const dashboardStats: DashboardStats = {
    leadsPerWeek,
    conversionFunnel,
    topProducts,
    sectorDistribution
  };

  cachedLeads = leads;
  cachedNotifications = notifications;
  cachedDashboardStats = dashboardStats;

  return { leads, notifications, dashboardStats };
};

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
    await delay(300);
    let leads: Lead[] = [];
    try {
      ({ leads } = await loadRemoteData());
    } catch (error) {
      console.warn('Falling back to local mock leads.', error);
      leads = [...mockLeads];
    }

    let filtered = [...leads];

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
    await delay(200);
    let leads: Lead[] = [];
    try {
      ({ leads } = await loadRemoteData());
    } catch (error) {
      console.warn('Falling back to local mock leads.', error);
      leads = [...mockLeads];
    }
    return leads.find(lead => lead.id === id);
  },

  updateLeadStatus: async (id: string, status: string) => {
    await delay(200);
    let leads: Lead[] = [];
    try {
      ({ leads } = await loadRemoteData());
    } catch (error) {
      console.warn('Falling back to local mock leads.', error);
      leads = [...mockLeads];
    }
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.status = status as any;
    }
    cachedLeads = leads;
    return { success: true };
  },

  addLeadNote: async (id: string, note: string) => {
    await delay(200);
    let leads: Lead[] = [];
    try {
      ({ leads } = await loadRemoteData());
    } catch (error) {
      console.warn('Falling back to local mock leads.', error);
      leads = [...mockLeads];
    }
    const lead = leads.find(l => l.id === id);
    if (lead) {
      if (!lead.notes) lead.notes = [];
      lead.notes.push(note);
    }
    cachedLeads = leads;
    return { success: true };
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    await delay(200);
    try {
      const { notifications } = await loadRemoteData();
      return notifications;
    } catch (error) {
      console.warn('Falling back to local mock notifications.', error);
      return mockNotifications;
    }
  },

  markNotificationRead: async (id: string) => {
    await delay(150);
    let notifications: Notification[] = [];
    try {
      ({ notifications } = await loadRemoteData());
    } catch (error) {
      console.warn('Falling back to local mock notifications.', error);
      notifications = [...mockNotifications];
    }
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
    cachedNotifications = notifications;
    return { success: true };
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(300);
    try {
      const { dashboardStats } = await loadRemoteData();
      return dashboardStats;
    } catch (error) {
      console.warn('Falling back to local mock dashboard stats.', error);
      return mockDashboardStats;
    }
  }
};
