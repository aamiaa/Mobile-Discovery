import Commands from "./commands";
import Express from "./express_p"

class App {
	public loadServer() {
		Express.init();
	}

	public loadCommands() {
		Commands.init()
	}
}

export default new App