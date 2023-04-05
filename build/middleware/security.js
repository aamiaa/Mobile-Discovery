"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetnacl_1 = __importDefault(require("tweetnacl"));
class Security {
    static verify(req, res, next) {
        const signature = req.get("X-Signature-Ed25519");
        const timestamp = req.get("X-Signature-Timestamp");
        if (!signature || !timestamp)
            return res.status(400).send("");
        const verified = tweetnacl_1.default.sign.detached.verify(Buffer.from(timestamp + req.rawBody), Buffer.from(signature, "hex"), Buffer.from(process.env.PUBLIC_KEY, "hex"));
        if (!verified)
            return res.status(401).send("");
        return next();
    }
}
exports.default = Security;
