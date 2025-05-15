import { Request, Response } from "express";
import { Article, IArticle } from "../models/article.model";

interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

// Get all articles
export const getArticles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .populate("author", "name");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles" });
  }
};

// Get featured articles
export const getFeaturedArticles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ views: -1 })
      .limit(5)
      .populate("author", "name");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured articles" });
  }
};

// Get article categories
export const getCategories = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const categories = await Article.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Get a single article
export const getArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name"
    );

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article" });
  }
};

// Get related articles
export const getRelatedArticles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    const relatedArticles = await Article.find({
      category: article.category,
      _id: { $ne: article._id },
      status: "published",
    })
      .limit(3)
      .populate("author", "name");

    res.json(relatedArticles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching related articles" });
  }
};

// Create a new article
export const createArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content, summary, category, tags } = req.body;

    const article = new Article({
      title,
      content,
      summary,
      category,
      tags,
      author: req.user?._id,
      status: "draft",
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error creating article" });
  }
};

// Update an article
export const updateArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user?._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    const { title, content, summary, category, tags } = req.body;
    Object.assign(article, {
      title,
      content,
      summary,
      category,
      tags,
    });

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error updating article" });
  }
};

// Update article metadata
export const updateMetadata = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user?._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    const { featuredImage, tags } = req.body;
    if (featuredImage) article.featuredImage = featuredImage;
    if (tags) article.tags = tags;

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error updating article metadata" });
  }
};

// Publish an article
export const publishArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user?._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    article.status = "published";
    article.publishedAt = new Date();
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error publishing article" });
  }
};

// Unpublish an article
export const unpublishArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user?._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    article.status = "draft";
    article.publishedAt = undefined;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error unpublishing article" });
  }
};

// Delete an article
export const deleteArticle = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      author: req.user?._id,
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article" });
  }
};
