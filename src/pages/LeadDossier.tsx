import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lead } from '../types';
import { api } from '../services/api';
import { Badge } from '../components/Badge';
import { ConfidenceBar } from '../components/ConfidenceBar';
import {
  ArrowLeft,
  Building2,
  MapPin,
  TrendingUp,
  Bell,
  FileText,
  CheckCircle,
  XCircle,
  Package,
  Loader2,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function LeadDossier() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    if (id) {
      loadLead(id);
    }
  }, [id]);

  const loadLead = async (leadId: string) => {
    setLoading(true);
    try {
      const data = await api.getLeadById(leadId);
      setLead(data || null);
    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!lead) return;
    try {
      await api.updateLeadStatus(lead.id, status);
      setLead({ ...lead, status: status as any });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddNote = async () => {
    if (!lead || !note.trim()) return;
    setAddingNote(true);
    try {
      await api.addLeadNote(lead.id, note);
      const updatedNotes = [...(lead.notes || []), note];
      setLead({ ...lead, notes: updatedNotes });
      setNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Lead not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'tender':
        return <FileText className="w-4 h-4" />;
      case 'news':
        return <Bell className="w-4 h-4" />;
      case 'keyword':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{lead.companyName}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {lead.location}
                    </span>
                    <span>•</span>
                    <span>{lead.industry}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Added {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge urgency={lead.urgency} variant="urgency" />
                <Badge status={lead.status} variant="status" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusUpdate('Accepted')}
                disabled={lead.status === 'Accepted'}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate('Rejected')}
                disabled={lead.status === 'Rejected'}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate('Converted')}
                disabled={lead.status === 'Converted'}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Package className="w-4 h-4" />
                Mark Converted
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confidence Score */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">AI Confidence Score</h2>
              <ConfidenceBar score={lead.confidenceScore} height="lg" />
            </div>

            {/* Recommended Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Recommended HPCL Products
              </h2>
              <div className="space-y-4">
                {lead.recommendedProducts.map((product, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <span className="text-sm font-semibold text-blue-600">
                        {product.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{product.reasonCode}</p>
                    <ConfidenceBar score={product.confidence} showLabel={false} height="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Detected Signals */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Detected Signals
              </h2>
              <div className="space-y-3">
                {lead.signals.map((signal, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-blue-600">
                        {getSignalIcon(signal.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{signal.title}</h3>
                          <Badge label={signal.type.toUpperCase()} variant="custom" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{signal.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {new Date(signal.date).toLocaleDateString()}
                          {signal.source && (
                            <>
                              <span>•</span>
                              <span>{signal.source}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Action */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                AI Suggested Next Action
              </h2>
              <p className="text-gray-700">{lead.suggestedAction}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Facilities */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Facility Locations
              </h2>
              <div className="space-y-2">
                {lead.facilities.map((facility, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Sales Notes
              </h2>

              {/* Add Note */}
              <div className="mb-4">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!note.trim() || addingNote}
                  className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {addingNote ? 'Adding...' : 'Add Note'}
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-2">
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.map((n, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      {n}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No notes yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
