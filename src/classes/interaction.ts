import { InteractionType, InteractionData, InteractionCallback, InteractionResponse } from "../interface/interaction"
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
		const res = await fetch(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if(!res.ok) {
			throw new Error(`Interaction response failed with code ${res.status} for /webhooks/${this.id}/${this.token}/callback`)
		}
	}

	public async edit(messageId: string, data: object) {
		const res = await fetch(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`, {
			method: "PATCH",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if(!res.ok) {
			throw new Error(`Interaction response failed with code ${res.status} for /webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`)
		}
	}

	public async getMessage(messageId: string) {
		const res = await fetch(`https://discord.com/api/v9/webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`)
		if(!res.ok) {
			throw new Error(`Interaction response failed with code ${res.status} for /webhooks/${process.env.APPLICATION_ID}/${this.token}/messages/${messageId}`)
		}

		const json = await res.json()
		return json
	}

	public respond(data: InteractionResponse) {
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