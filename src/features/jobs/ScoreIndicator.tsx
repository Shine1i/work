interface ScoreIndicatorProps {
  score: number; // Can be 0-1, 1-10, or 0-100
}

function normalizeScore(score: number): number {
  // Normalize to 0-1 range
  if (score <= 1) {
    // Already 0-1
    return score;
  } else if (score <= 10) {
    // 1-10 scale, convert to 0-1
    return score / 10;
  } else {
    // 0-100 scale, convert to 0-1
    return score / 100;
  }
}

function getScoreColor(normalizedScore: number): string {
  if (normalizedScore < 0.4) return "#ef4444"; // red
  if (normalizedScore < 0.7) return "#eab308"; // yellow
  return "#22c55e"; // green
}

export function ScoreIndicator({ score }: ScoreIndicatorProps) {
  const normalized = normalizeScore(score);
  const percentage = Math.round(normalized * 100);
  const color = getScoreColor(normalized);
  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDashoffset = circumference - (normalized * circumference);

  return (
    <div className="relative size-12" title={`Score: ${percentage}`}>
      <svg className="size-full -rotate-90 transform" viewBox="0 0 36 36">
        {/* Background circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold" style={{ color }}>
          {percentage}
        </span>
      </div>
    </div>
  );
}
