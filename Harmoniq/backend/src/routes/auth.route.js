import { Router } from "express";
import { User } from "../models/user.model.js";
import { AuthCallback } from "../controller/auth.js";

const router = Router();

router.post("/callback", AuthCallback);

export default router;