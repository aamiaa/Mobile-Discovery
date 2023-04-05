import {Request, Response, NextFunction, Router} from "express";

class ExceptionHandler {
	public static mount(app: Router) {
		app.all("*", this.notFoundHandler)
		app.use(this.errorHandler)
	}

	private static notFoundHandler(req: Request, res: Response, next: NextFunction) {
		return res.status(404).send("")
	}

	private static errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
		console.error("[Express Error]", req.path, err);

		return res.status(500).send("")
	}
}

export default ExceptionHandler;