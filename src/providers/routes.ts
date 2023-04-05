import {Application} from "express"

import apiRouter from "../routes/api"
import ExceptionHandler from "../middleware/exception"

class Routes {
	public mountApi(app: Application) {
		ExceptionHandler.mount(apiRouter)

		return app.use("/api", apiRouter)
	}
}

export default new Routes