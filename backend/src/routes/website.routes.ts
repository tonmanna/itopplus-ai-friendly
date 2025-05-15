import { Router } from "express";
import * as websiteController from "../controllers/website.controller";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = Router();

// Protect all website routes with JWT authentication
router.use(authenticateJwt);

// Website routes
router.get("/", websiteController.getWebsites);
router.get("/history", websiteController.getHistory);
router.get("/statistics", websiteController.getStatistics);
router.get("/:id", websiteController.getWebsite);
router.get("/:id/improve", websiteController.getImprovement);
router.get("/:id/export", websiteController.exportReport);
router.get("/:id/compare", websiteController.compareAnalysis);

router.post("/", websiteController.analyzeWebsite);
router.post("/:id/reanalyze", websiteController.reanalyzeWebsite);
router.post("/:id/schedule", websiteController.scheduleReanalysis);

router.delete("/:id", websiteController.deleteWebsite);
router.delete("/:id/schedule", websiteController.cancelScheduledReanalysis);

export const websiteRoutes = router;
