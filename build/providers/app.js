"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("./commands"));
const express_p_1 = __importDefault(require("./express_p"));
class App {
    loadServer() {
        express_p_1.default.init();
    }
    loadCommands() {
        commands_1.default.init();
    }
}
exports.default = new App;
