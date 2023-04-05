import express from "express";

import Http from "../middleware/http"
import ExceptionHandler from "../middleware/exception"
import Routes from "./routes"

class Express {
	public express: express.Application;

	constructor() {
		this.express = express();

		this.mountMiddleware();
		this.mountRoutes();
		this.mountExceptionHandler(); //Has to be in this order (last)
	}

	private mountMiddleware() {
		Http.mount(this.express);
	}

	private mountRoutes() {
		Routes.mountApi(this.express);
	}

	private mountExceptionHandler() {
		ExceptionHandler.mount(this.express);
	}

	public init() {
		this.express.listen(6974, "0.0.0.0", () => console.log("Webserv started!"));
	}
}

export default new Express();