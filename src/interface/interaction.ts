import { ActionRowComponent } from "./component"

export enum InteractionType {
	PING = 1,
	APPLICATION_COMMAND = 2,
	MESSAGE_COMPONENT = 3,
	APPLICATION_COMMAND_AUTOCOMPLETE = 4,
	MODAL_SUBMIT = 5
}

export enum InteractionCallback {
	PONG = 1,
	CHANNEL_MESSAGE_WITH_SOURCE = 4,
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
	DEFERRED_UPDATE_MESSAGE = 6,
	UPDATE_MESSAGE = 7,
	APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
	MODAL = 9
}

export enum CommandType {
	CHAT_INPUT = 1,
	USER = 2,
	MESSAGE = 3
}

export interface InteractionData {
	id: string,
	application_id: string,
	type: InteractionType,
	data?: {
		id: string,
		name?: string,
		type?: CommandType,
		resolved?: object,
		options?: object,
		guild_id?: string,
		target_id?: string,

		custom_id?: string,
		components?: ActionRowComponent[]
	},
	guild_id?: string,
	channel_id?: string,
	member?: Record<string, any>,
	user?: Record<string, any>,
	token: string,
	version: number,
	message?: Record<string, any>,
	app_permissions?: string,
	locale?: string,
	guild_locale?: string
}

export interface InteractionResponse {
	type: InteractionCallback,
	data?: Record<string, any>
}