import { Request, Response } from "express";
import { Website, IWebsite } from "../models/website.model";
import { analyzeWebsite as analyzeWebsiteService } from "../services/analyzer.service";
import { validateUrl } from "../utils/validators";
import { AnalyzeOptions } from "../types/website";

interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

// Get all websites
export const getWebsites = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const websites = await Website.find({ submittedBy: req.user?._id }).sort({
      lastAnalyzed: -1,
    });
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching websites" });
  }
};

// Get a single website
export const getWebsite = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      submittedBy: req.user?._id,
    });
    if (!website) {
      res.status(404).json({ message: "Website not found" });
      return;
    }
    res.json(website);
  } catch (error) {
    res.status(500).json({ message: "Error fetching website" });
  }
};

// Analyze a new website
export const analyzeWebsite = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { url, performance, accessibility, seo, aiReadiness } = req.body as {
      url: string;
    } & AnalyzeOptions;

    // Validate URL
    if (!validateUrl(url)) {
      res.status(400).json({ message: "Invalid URL format" });
      return;
    }

    // Check if website already exists for this user
    let website = await Website.findOne({
      url,
      submittedBy: req.user?._id,
    });

    if (website) {
      res.status(409).json({
        message: "Website already analyzed. Use reanalyze endpoint to update.",
      });
      return;
    }

    // Create new website document
    website = new Website({
      url,
      submittedBy: req.user?._id,
      status: "pending",
      score: 0,
      badge: "red",
      metrics: {
        loadTime: 0,
        accessibility: 0,
        seoScore: 0,
        performance: 0,
        aiReadiness: 0,
      },
    });

    // Save initial record
    await website.save();

    // Analyze website asynchronously
    analyzeWebsite(website._id, {
      performance,
      accessibility,
      seo,
      aiReadiness,
    });

    res.status(201).json(website);
  } catch (error) {
    res.status(500).json({ message: "Error analyzing website" });
  }
};

// Reanalyze an existing website
export const reanalyzeWebsite = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      submittedBy: req.user?._id,
    });

    if (!website) {
      res.status(404).json({ message: "Website not found" });
      return;
    }

    // Update status to pending
    website.status = "pending";
    await website.save();

    // Reanalyze website asynchronously
    analyzeWebsite(website._id, {
      performance: true,
      accessibility: true,
      seo: true,
      aiReadiness: true,
    });

    res.json(website);
  } catch (error) {
    res.status(500).json({ message: "Error reanalyzing website" });
  }
};

// Get analysis history
export const getHistory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const history = await Website.find({
      submittedBy: req.user?._id,
      status: "analyzed",
    })
      .sort({ lastAnalyzed: -1 })
      .limit(100);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
};

// Delete a website
export const deleteWebsite = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const website = await Website.findOneAndDelete({
      _id: req.params.id,
      submittedBy: req.user?._id,
    });

    if (!website) {
      res.status(404).json({ message: "Website not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting website" });
  }
};
