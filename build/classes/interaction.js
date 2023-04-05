"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const interaction_1 = require("../interface/interaction");
class Interaction {
    constructor(res, data) {
        this.res = res;
        this.type = data.type;
        this.data = data.data;
        this.user = data.user || data.member.user;
        this.id = data.id;
        this.token = data.token;
    }
    followUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios_1.default.post(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}`, data);
            }
            catch (ex) {
                throw {
                    error: new Error(`Interaction response failed for /webhooks/${this.id}/${this.token}/callback`),
                    response: ex.response.data,
                };
            }
        });
    }
    edit(messageId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios_1.default.patch(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`, data);
            }
            catch (ex) {
                throw {
                    error: new Error(`Interaction response failed for /webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`),
                    response: ex.response.data,
                };
            }
        });
    }
    respond(data) {
        return this.res.send(data);
    }
    defer(data) {
        return this.respond({
            type: interaction_1.InteractionCallback.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: data
        });
    }
    pong() {
        return this.respond({
            type: interaction_1.InteractionCallback.PONG
        });
    }
    message(data) {
        return this.respond({
            type: interaction_1.InteractionCallback.CHANNEL_MESSAGE_WITH_SOURCE,
            data: data
        });
    }
}
exports.default = Interaction;
