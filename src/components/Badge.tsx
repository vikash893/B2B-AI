import { UrgencyLevel } from '../types';

interface BadgeProps {
  urgency?: UrgencyLevel;
  status?: string;
  label?: string;
  variant?: 'urgency' | 'status' | 'custom';
}

export function Badge({ urgency, status, label, variant = 'urgency' }: BadgeProps) {
  const getUrgencyStyles = (level: UrgencyLevel) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getStatusStyles = (s: string) => {
    switch (s) {
      case 'New':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Accepted':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'Rejected':
        return 'bg-gray-100 text-gray-700 border border-gray-200';
      case 'Converted':
        return 'bg-green-100 text-green-700 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  let displayText = '';
  let styles = '';

  if (variant === 'urgency' && urgency) {
    displayText = urgency;
    styles = getUrgencyStyles(urgency);
  } else if (variant === 'status' && status) {
    displayText = status;
    styles = getStatusStyles(status);
  } else if (variant === 'custom' && label) {
    displayText = label;
    styles = 'bg-gray-100 text-gray-700 border border-gray-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {displayText}
    </span>
  );
}
