"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("../middleware/http"));
const exception_1 = __importDefault(require("../middleware/exception"));
const routes_1 = __importDefault(require("./routes"));
class Express {
    constructor() {
        this.express = (0, express_1.default)();
        this.mountMiddleware();
        this.mountRoutes();
        this.mountExceptionHandler(); //Has to be in this order (last)
    }
    mountMiddleware() {
        http_1.default.mount(this.express);
    }
    mountRoutes() {
        routes_1.default.mountApi(this.express);
    }
    mountExceptionHandler() {
        exception_1.default.mount(this.express);
    }
    init() {
        this.express.listen(6974, "0.0.0.0", () => console.log("Webserv started!"));
    }
}
exports.default = new Express();
