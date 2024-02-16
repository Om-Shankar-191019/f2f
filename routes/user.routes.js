import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import { getSearchedUsers, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/search", protectRoute, getSearchedUsers);

export default router;
