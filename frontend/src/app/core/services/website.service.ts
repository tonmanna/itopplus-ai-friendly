import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Website {
  id: string;
  url: string;
  score: number;
  status: 'pending' | 'analyzed' | 'error';
  lastAnalyzed: Date | null;
  badge: 'red' | 'yellow' | 'green';
  metrics: {
    loadTime: number;
    accessibility: number;
    seoScore: number;
    performance: number;
    aiReadiness: number;
  };
}

export interface AnalyzeOptions {
  performance?: boolean;
  accessibility?: boolean;
  seo?: boolean;
  aiReadiness?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  private apiUrl = `${environment.apiUrl}/websites`;

  constructor(private http: HttpClient) {}

  /**
   * Get all websites for the current user
   */
  getWebsites(): Observable<Website[]> {
    return this.http.get<Website[]>(this.apiUrl);
  }

  /**
   * Get a specific website by ID
   */
  getWebsite(id: string): Observable<Website> {
    return this.http.get<Website>(`${this.apiUrl}/${id}`);
  }

  /**
   * Submit a new website for analysis
   */
  analyzeWebsite(url: string, options: AnalyzeOptions): Observable<Website> {
    return this.http.post<Website>(this.apiUrl, { url, ...options });
  }

  /**
   * Get analysis history for the current user
   */
  getHistory(): Observable<Website[]> {
    return this.http.get<Website[]>(`${this.apiUrl}/history`);
  }

  /**
   * Trigger reanalysis of an existing website
   */
  reanalyzeWebsite(id: string): Observable<Website> {
    return this.http.post<Website>(`${this.apiUrl}/${id}/reanalyze`, {});
  }

  /**
   * Delete a website analysis
   */
  deleteWebsite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Export website analysis report as PDF
   */
  exportReport(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/export`, {
      responseType: 'blob',
    });
  }

  /**
   * Schedule periodic reanalysis of a website
   */
  scheduleReanalysis(
    id: string,
    interval: 'daily' | 'weekly' | 'monthly'
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/schedule`, { interval });
  }

  /**
   * Cancel scheduled reanalysis
   */
  cancelScheduledReanalysis(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/schedule`);
  }

  /**
   * Get comparison data between two analysis dates
   */
  compareAnalysis(
    id: string,
    date1: string,
    date2: string
  ): Observable<{
    date1: Website;
    date2: Website;
    changes: {
      score: number;
      metrics: {
        loadTime: number;
        accessibility: number;
        seoScore: number;
        performance: number;
        aiReadiness: number;
      };
    };
  }> {
    return this.http.get(`${this.apiUrl}/${id}/compare`, {
      params: { date1, date2 },
    });
  }

  /**
   * Get suggestions for improving website score
   */
  getImprovement(id: string): Observable<{
    currentScore: number;
    potentialScore: number;
    suggestions: Array<{
      category: 'performance' | 'accessibility' | 'seo' | 'aiReadiness';
      impact: 'high' | 'medium' | 'low';
      title: string;
      description: string;
      steps: string[];
    }>;
  }> {
    return this.http.get(`${this.apiUrl}/${id}/improve`);
  }

  /**
   * Get aggregate statistics for all analyzed websites
   */
  getStatistics(): Observable<{
    totalWebsites: number;
    averageScore: number;
    scoreDistribution: {
      red: number;
      yellow: number;
      green: number;
    };
    topPerformers: Website[];
    mostImproved: Array<{
      website: Website;
      improvement: number;
    }>;
  }> {
    return this.http.get(`${this.apiUrl}/statistics`);
  }
}
