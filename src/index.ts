import "dotenv/config"
import "express-async-errors"

process.on("unhandledRejection", (reason: Error|any) => {
	console.log("Unhandled Rejection at:", reason.stack || reason);
});

import App from "./providers/app"

async function main() {
	console.log("Starting...")
	
	App.loadCommands()
	App.loadServer()
}

main();