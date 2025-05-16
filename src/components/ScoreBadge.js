export default function ScoreBadge({ score }) {
  const getScoreColor = (score) => {
    if (score >= 81) return "var(--crayon-green)";
    if (score >= 61) return "var(--crayon-yellow)";
    return "var(--crayon-red)";
  };

  return (
    <div
      className="inline-flex items-center px-4 py-2 rounded-full font-bold text-lg bounce-in"
      style={{
        backgroundColor: "white",
        border: `3px solid ${getScoreColor(score)}`,
        color: getScoreColor(score),
        boxShadow: "3px 3px 0 rgba(0,0,0,0.1)",
      }}
    >
      {score}
    </div>
  );
}
