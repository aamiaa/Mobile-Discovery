import {Router} from "express";
import DiscordController from "../controllers/api/discord";
import Security from "../middleware/security";

const router = Router();

router.post("/discord", Security.verify, DiscordController.perform.bind(DiscordController))

export default router;