import { Schema, model, Document, Types } from "mongoose";
import { WebsiteMetrics, WebsiteDocument } from "../types/website";

export interface IWebsite extends Document {
  url: string;
  submittedBy: Types.ObjectId;
  lastAnalyzed: Date;
  metrics: WebsiteMetrics;
  status: "pending" | "analyzing" | "completed" | "failed";
  badge: "gold" | "silver" | "bronze" | "none";
  history: {
    date: Date;
    metrics: WebsiteMetrics;
  }[];
  scheduledAnalysis?: {
    frequency: "daily" | "weekly" | "monthly";
    lastRun: Date;
    nextRun: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  calculateBadge(): string;
}

const websiteSchema = new Schema<IWebsite>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastAnalyzed: {
      type: Date,
      default: Date.now,
    },
    metrics: {
      performance: Number,
      accessibility: Number,
      bestPractices: Number,
      seo: Number,
      pwa: Number,
      aiFriendlyScore: Number,
      suggestions: [
        {
          category: String,
          message: String,
          impact: String,
          effort: String,
        },
      ],
    },
    status: {
      type: String,
      enum: ["pending", "analyzing", "completed", "failed"],
      default: "pending",
    },
    badge: {
      type: String,
      enum: ["gold", "silver", "bronze", "none"],
      default: "none",
    },
    history: [
      {
        date: Date,
        metrics: {
          performance: Number,
          accessibility: Number,
          bestPractices: Number,
          seo: Number,
          pwa: Number,
          aiFriendlyScore: Number,
          suggestions: [
            {
              category: String,
              message: String,
              impact: String,
              effort: String,
            },
          ],
        },
      },
    ],
    scheduledAnalysis: {
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
      },
      lastRun: Date,
      nextRun: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate badge based on AI Friendly Score
websiteSchema.methods.calculateBadge = function (): string {
  const score = this.metrics.aiFriendlyScore;

  if (score >= 90) {
    return "gold";
  } else if (score >= 75) {
    return "silver";
  } else if (score >= 60) {
    return "bronze";
  }
  return "none";
};

// Update badge before saving
websiteSchema.pre("save", function (next) {
  if (this.isModified("metrics.aiFriendlyScore")) {
    this.badge = this.calculateBadge();
  }
  next();
});

// Add current metrics to history before updating
websiteSchema.pre("save", function (next) {
  if (this.isModified("metrics")) {
    this.history.push({
      date: new Date(),
      metrics: this.metrics,
    });
  }
  next();
});

export const Website = model<IWebsite>("Website", websiteSchema);
