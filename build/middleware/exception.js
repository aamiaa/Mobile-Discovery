"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExceptionHandler {
    static mount(app) {
        app.all("*", this.notFoundHandler);
        app.use(this.errorHandler);
    }
    static notFoundHandler(req, res, next) {
        return res.status(404).send("");
    }
    static errorHandler(err, req, res, next) {
        console.error("[Express Error]", req.path, err);
        return res.status(500).send("");
    }
}
exports.default = ExceptionHandler;
