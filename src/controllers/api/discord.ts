import {Request, Response, NextFunction} from "express"
import Interaction from "../../classes/interaction";
import { InteractionType } from "../../interface/interaction";
import Commands from "../../providers/commands";

class DiscordController {
	public static async perform(req: Request, res: Response, next: NextFunction) {
		const interaction = new Interaction(res, req.body)

		switch(interaction.type) {
			case InteractionType.PING:
				return interaction.pong()
			case InteractionType.APPLICATION_COMMAND:
				const commandName = interaction.data.name
				const command = Commands.getCommand(commandName)
				if(command)
					return await command.callback(interaction)
				break
			case InteractionType.MESSAGE_COMPONENT:
			case InteractionType.MODAL_SUBMIT:
				let interactionName = interaction.data.custom_id
				if(interactionName.startsWith("page_")) //TODO: some better way
					interactionName = "page"

				const nameCollision = Commands.getInteraction(interactionName)
				if(nameCollision)
					return await nameCollision.callback(interaction)
		}
	}
}

export default DiscordController;