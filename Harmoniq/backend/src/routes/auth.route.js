import { Router } from "express";
import { User } from "../models/user.model.js";
import { authCallback } from "../controller/auth.js";

const router = Router();

router.post("/callback", authCallback);

export default router;