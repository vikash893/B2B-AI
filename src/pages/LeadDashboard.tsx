import { useState, useEffect } from 'react';
import { Lead } from '../types';
import { api } from '../services/api';
import { LeadCard } from '../components/LeadCard';
import { Search, Filter, Loader2 } from 'lucide-react';

export default function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  const industries = ['All', 'Manufacturing', 'Logistics', 'Construction', 'Agriculture', 'Energy', 'Real Estate', 'Marine', 'Textile'];
  const urgencies = ['All', 'High', 'Medium', 'Low'];

  useEffect(() => {
    loadLeads();
  }, [industryFilter, urgencyFilter, search]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await api.getLeads({
        industry: industryFilter === 'All' ? undefined : industryFilter,
        urgency: urgencyFilter === 'All' ? undefined : urgencyFilter,
        search: search || undefined
      });
      setLeads(data);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: leads.length,
    high: leads.filter(l => l.urgency === 'High').length,
    new: leads.filter(l => l.status === 'New').length,
    avgConfidence: leads.length > 0
      ? Math.round(leads.reduce((sum, l) => sum + l.confidenceScore, 0) / leads.length)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Dashboard</h1>
          <p className="text-gray-600">AI-powered B2B lead intelligence and recommendations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-red-200 bg-red-50">
            <p className="text-sm text-red-700 mb-1">High Urgency</p>
            <p className="text-3xl font-bold text-red-900">{stats.high}</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-blue-200 bg-blue-50">
            <p className="text-sm text-blue-700 mb-1">New Leads</p>
            <p className="text-3xl font-bold text-blue-900">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-green-200 bg-green-50">
            <p className="text-sm text-green-700 mb-1">Avg. Confidence</p>
            <p className="text-3xl font-bold text-green-900">{stats.avgConfidence}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Company
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by company name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Urgency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency
              </label>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {urgencies.map(urgency => (
                  <option key={urgency} value={urgency}>{urgency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No leads found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {leads.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
