import * as express from "express";

class Http {
	public static mount(app: express.Application) {
		app.disable("x-powered-by")

		//Don't trust arbitrary x-forwarded-for headers
		app.set("trust proxy", "loopback")

		app.use((req, res, next) => {
			let data = ""
			
			req.on("data", chunk => { 
				data += chunk;
			})
			req.on("end", () => {
				req.rawBody = data
			})
			
			next()
		})

		app.use(express.json())
	}
}

export default Http;