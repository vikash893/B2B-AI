interface ConfidenceBarProps {
  score: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ConfidenceBar({ score, showLabel = true, height = 'md' }: ConfidenceBarProps) {
  const getColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getHeightClass = () => {
    switch (height) {
      case 'sm':
        return 'h-1.5';
      case 'md':
        return 'h-2.5';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2.5';
    }
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Confidence Score</span>
          <span className="text-sm font-semibold text-gray-900">{score}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getHeightClass()}`}>
        <div
          className={`${getColor(score)} ${getHeightClass()} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
