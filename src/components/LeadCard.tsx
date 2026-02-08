import { Lead } from '../types';
import { Badge } from './Badge';
import { ConfidenceBar } from './ConfidenceBar';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, MapPin, Building2 } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lead/${lead.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            {lead.companyName}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {lead.industry} • {lead.location}
          </p>
        </div>
        <Badge urgency={lead.urgency} variant="urgency" />
      </div>

      {/* Recommended Products */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1.5">Top Recommendations</p>
        <div className="space-y-1">
          {lead.recommendedProducts.slice(0, 3).map((product, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                <p className="text-xs text-gray-500 truncate">{product.reasonCode}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-3">
        <ConfidenceBar score={lead.confidenceScore} showLabel={false} height="sm" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Badge status={lead.status} variant="status" />
          <span className="text-xs text-gray-400">
            {new Date(lead.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className="text-xs font-semibold text-blue-600">
          {lead.confidenceScore}% match
        </span>
      </div>
    </div>
  );
}
