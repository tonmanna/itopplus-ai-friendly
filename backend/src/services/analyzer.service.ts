import { Types } from "mongoose";
import lighthouse from "lighthouse";
import { URL } from "url";
import chromeLauncher from "chrome-launcher";
import { Website } from "../models/website.model";
import { AnalyzeOptions, WebsiteAnalysisResult } from "../types/website";

// Analyze website and update database
export const analyzeWebsite = async (
  websiteId: string | Types.ObjectId,
  options: AnalyzeOptions
): Promise<void> => {
  //   let browser: Browser | null = null;

  try {
    const website = await Website.findById(websiteId);
    if (!website) return;

    // // Launch browser for analysis
    // browser = await puppeteer.launch({
    //   headless: true,
    //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // });

    try {
      // Analyze performance and load time
      //   const performanceMetrics = options.performance
      //     ? await analyzePerformance(browser, website.url)
      //     : null;

      // Analyze accessibility
      //   const accessibilityScore = options.accessibility
      //     ? await analyzeAccessibility(browser, website.url)
      //     : null;

      // Analyze SEO
      //   const seoScore = options.seo
      //     ? await analyzeSEO(browser, website.url)
      //     : null;

      // Analyze AI readiness
      //   const aiReadinessScore = options.aiReadiness
      //     ? await analyzeAIReadiness(browser, website.url)
      //     : null;

      // Update metrics
      //   website.metrics = {
      //     loadTime: performanceMetrics?.loadTime || website.metrics.loadTime,
      //     performance: performanceMetrics?.score || website.metrics.performance,
      //     accessibility: accessibilityScore || website.metrics.accessibility,
      //     seoScore: seoScore || website.metrics.seoScore,
      //     aiReadiness: aiReadinessScore || website.metrics.aiReadiness,
      //   };

      // Calculate overall score
      //   const scores = [
      //     website.metrics.performance,
      //     website.metrics.accessibility,
      //     website.metrics.seoScore,
      //     website.metrics.aiReadiness,
      //   ].filter(Boolean);

      //   website.score = Math.round(
      //     scores.reduce((sum, score) => sum + score, 0) / scores.length
      //   );

      //   // Update status
      //   website.status = "analyzed";
      //   website.lastAnalyzed = new Date();

      // Save changes
      await website.save();
    } finally {
      //   if (browser) {
      //     await browser.close();
      //   }
    }
  } catch (error) {
    console.error("Analysis error:", error);

    // Update website status to error
    const website = await Website.findById(websiteId);
    if (website) {
      website.status = "error";
      await website.save();
    }
  }
};
