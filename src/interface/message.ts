export interface Message {
	tts?: boolean,
	content?: string,
	embeds?: object[],
	allowed_mentions?: object,
	flags?: number,
	components?: object[],
	attachments?: object[]
}