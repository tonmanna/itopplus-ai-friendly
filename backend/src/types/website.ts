import { Document } from "mongoose";

export type WebsiteStatus = "pending" | "analyzed" | "error";
export type WebsiteBadge = "red" | "yellow" | "green";

export interface WebsiteMetrics {
  loadTime: number;
  accessibility: number;
  seoScore: number;
  performance: number;
  aiReadiness: number;
}

export interface IWebsite {
  url: string;
  submittedBy: string;
  score: number;
  status: WebsiteStatus;
  lastAnalyzed: Date | null;
  badge: WebsiteBadge;
  metrics: WebsiteMetrics;
}

export interface WebsiteDocument extends IWebsite, Document {
  calculateBadge(): WebsiteBadge;
}

export interface AnalyzeOptions {
  performance?: boolean;
  accessibility?: boolean;
  seo?: boolean;
  aiReadiness?: boolean;
}

export interface WebsiteAnalysisResult {
  performance?: {
    score: number;
    loadTime: number;
  };
  accessibility?: number;
  seo?: number;
  aiReadiness?: number;
}

export interface ImprovementSuggestion {
  category: keyof WebsiteMetrics;
  impact: "high" | "medium" | "low";
  title: string;
  description: string;
  steps: string[];
}

export interface WebsiteStatistics {
  totalWebsites: number;
  averageScore: number;
  scoreDistribution: {
    red: number;
    yellow: number;
    green: number;
  };
  topPerformers: WebsiteDocument[];
  mostImproved: Array<{
    website: WebsiteDocument;
    improvement: number;
  }>;
}
