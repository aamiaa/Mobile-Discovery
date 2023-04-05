"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discord_1 = __importDefault(require("../controllers/api/discord"));
const security_1 = __importDefault(require("../middleware/security"));
const router = (0, express_1.Router)();
router.post("/discord", security_1.default.verify, discord_1.default.perform.bind(discord_1.default));
exports.default = router;
