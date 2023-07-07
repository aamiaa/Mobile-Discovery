import axios from "axios"
import fs from "fs"
import path from "path"

class Commands {
	private _commands = new Map()
	private readonly commandsPath = path.join(__dirname, "..", "commands")

	private _interactions = new Map()
	private readonly interactionsPath = path.join(__dirname, "..", "interactions")

	public init() {
		this.loadCommands()
		this.loadInteractions()
	}

	public registerCommands() {
		return axios({
			url: `https://discord.com/api/v9/applications/${process.env.APPLICATION_ID}/commands`,
			method: "put",
			headers: {
				"Authorization": `Bot ${process.env.TOKEN}`,
				"Content-Type": "application/json"
			},
			data: JSON.stringify([...this._commands.values()].map(x => x.data))
		})
	}

	private async loadCommands() {
		const commandFiles = fs.readdirSync(this.commandsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

		for (const file of commandFiles) {
			const filePath = path.join(this.commandsPath, file)
			delete require.cache[require.resolve(filePath)] // Allows for reloading at runtime
			const command = require(filePath).default
			this._commands.set(command.data.name, command)
		}

		try {
			await this.registerCommands()
		} catch(ex) {
			console.error("Failed to register commands:", JSON.stringify(ex.response.data))
		}
	}

	private loadInteractions() {
		const interactionFiles = fs.readdirSync(this.interactionsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

		for (const file of interactionFiles) {
			const filePath = path.join(this.interactionsPath, file)
			delete require.cache[require.resolve(filePath)]
			const interaction = require(filePath).default
			this._interactions.set(interaction.data.name, interaction)
		}
	}

	public getCommand(name: string) {
		return this._commands.get(name)
	}

	public getInteraction(name: string) {
		return this._interactions.get(name)
	}
}

export default new Commands;