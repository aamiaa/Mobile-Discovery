import fs from "fs"
import path from "path"

export default class Commands {
	private static _commands = new Map()
	private static readonly commandsPath = path.join(__dirname, "..", "commands")

	private static _interactions = new Map()
	private static readonly interactionsPath = path.join(__dirname, "..", "interactions")

	public static init() {
		this.loadCommands()
		this.loadInteractions()
	}

	private static loadCommands() {
		const commandFiles = fs.readdirSync(this.commandsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

		for (let file of commandFiles) {
			const filePath = path.join(this.commandsPath, file)
			delete require.cache[require.resolve(filePath)] //allows for reloading
			let command = require(filePath).default
			this._commands.set(command.data.name, command)
		}
	}

	private static loadInteractions() {
		const interactionFiles = fs.readdirSync(this.interactionsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

		for (let file of interactionFiles) {
			const filePath = path.join(this.interactionsPath, file)
			delete require.cache[require.resolve(filePath)] //allows for reloading
			let interaction = require(filePath).default
			this._interactions.set(interaction.data.name, interaction)
		}
	}

	public static getCommand(name: string) {
		return this._commands.get(name)
	}

	public static getInteraction(name: string) {
		return this._interactions.get(name)
	}
}