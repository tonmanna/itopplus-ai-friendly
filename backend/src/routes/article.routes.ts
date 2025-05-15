import { Router } from "express";
import * as articleController from "../controllers/article.controller";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = Router();

// Protect all article routes with JWT authentication
router.use(authenticateJwt);

// Article routes
router.get("/", articleController.getArticles);
router.get("/featured", articleController.getFeaturedArticles);
router.get("/categories", articleController.getCategories);
router.get("/:id", articleController.getArticle);
router.get("/:id/related", articleController.getRelatedArticles);

router.post("/", articleController.createArticle);
router.post("/:id/publish", articleController.publishArticle);
router.post("/:id/unpublish", articleController.unpublishArticle);

router.put("/:id", articleController.updateArticle);
router.patch("/:id/metadata", articleController.updateMetadata);

router.delete("/:id", articleController.deleteArticle);

export const articleRoutes = router;
