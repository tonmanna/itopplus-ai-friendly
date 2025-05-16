export default function ScoreBadge({ score }) {
  const getScoreColor = (score) => {
    if (score >= 81) return "bg-score-green";
    if (score >= 61) return "bg-score-yellow";
    return "bg-score-red";
  };

  const getScoreLabel = (score) => {
    if (score >= 81) return "Excellent";
    if (score >= 61) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`${getScoreColor(
          score
        )} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg`}
      >
        {score}
      </div>
      <span className="text-sm font-medium text-gray-600">
        {getScoreLabel(score)}
      </span>
    </div>
  );
}
