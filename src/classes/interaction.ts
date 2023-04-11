import axios from "axios"
import { InteractionType, InteractionData, InteractionCallback } from "../interface/interaction"
import { Message } from "../interface/message"
import { Response } from "express"

export default class Interaction {
	private res: Response

	private id: string
	private token: string
	private responded = false

	public type: InteractionType
	public data: InteractionData["data"]
	public user: Record<string, any>

	constructor(res: Response, data: InteractionData) {
		this.res = res

		this.type = data.type
		this.data = data.data
		this.user = data.user || data.member.user

		this.id = data.id
		this.token = data.token
	}

	public async followUp(data: object) {
		try {
			await axios.post(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}`, data)
		} catch(ex) {
			throw {
				error: new Error(`Interaction response failed for /webhooks/${this.id}/${this.token}/callback`),
				response: ex.response.data,
			}
		}
	}

	public async edit(messageId: string, data: object) {
		try {
			await axios.patch(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`, data)
		} catch(ex) {
			throw {
				error: new Error(`Interaction response failed for /webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`),
				response: JSON.stringify(ex.response.data),
			}
		}
	}

	public async getMessage(messageId: string) {
		try {
			let res = await axios.get(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`)
			return res.data
		} catch(ex) {
			throw {
				error: new Error(`Interaction response failed for /webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`),
				response: ex.response.data,
			}
		}
	}

	public respond(data: object) {
		if(this.responded)
			throw new Error("Already responded to this interaction!")

		this.responded = true
		return this.res.send(data)
	}

	public defer(data?: object) {
		return this.respond({
			type: InteractionCallback.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
			data: data
		})
	}

	public deferComponent() {
		return this.respond({
			type: InteractionCallback.DEFERRED_UPDATE_MESSAGE
		})
	}

	public pong() {
		return this.respond({
			type: InteractionCallback.PONG
		})
	}

	public message(data: Message) {
		return this.respond({
			type: InteractionCallback.CHANNEL_MESSAGE_WITH_SOURCE,
			data: data
		})
	}
}