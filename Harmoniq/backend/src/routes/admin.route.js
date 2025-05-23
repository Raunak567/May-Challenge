import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// Songs routes - only require authentication
router.post("/songs", protectRoute, createSong);
router.delete("/songs/:id", protectRoute, deleteSong);

// Admin routes - require both authentication and admin status
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
