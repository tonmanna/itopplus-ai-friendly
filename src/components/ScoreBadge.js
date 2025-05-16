import React from "react";

export default function ScoreBadge({ score }) {
  const getScoreType = (score) => {
    if (score >= 90) return "high";
    if (score >= 61) return "medium";
    return "low";
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "var(--mario-green)";
    if (score >= 61) return "var(--mario-yellow)";
    return "var(--mario-red)";
  };

  const scoreType = getScoreType(score);
  const gaugeRotation = (score / 100) * 180; // Convert score to degrees (0-180)

  return (
    <div className="score-badge-container">
      <div className={`score-gauge score-${scoreType}`}>
        <div className="gauge-background">
          <div
            className="gauge-fill"
            style={{
              transform: `rotate(${gaugeRotation}deg)`,
              backgroundColor: getScoreColor(score),
            }}
          />
          <div className="gauge-cover">
            <span className="gauge-value">{score}</span>
          </div>
        </div>
        <div className="gauge-markers">
          <span className="marker marker-0">0</span>
          <span className="marker marker-60">60</span>
          <span className="marker marker-90">90</span>
          <span className="marker marker-100">100</span>
        </div>
      </div>
      <div className={`score-label score-${scoreType}`}>
        {score >= 90 ? "Excellent" : score >= 61 ? "Good" : "Needs Work"}
      </div>
    </div>
  );
}
