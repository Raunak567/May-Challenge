import { Router } from "express";
import { get } from "mongoose";
import { getAllAlbums, getAlbumById } from "../Controllers/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.post("/:albumId", getAlbumById);

export default router;