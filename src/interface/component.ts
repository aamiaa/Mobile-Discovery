export type Component = ActionRowComponent | ButtonComponent | TextInputComponent

export interface ActionRowComponent {
	type: ComponentType.ActionRow,
	components: Component[]
}

export interface ButtonComponent {
	type: ComponentType.Button,
	style: number,
	label?: string,
	emoji?: object,
	custom_id?: string,
	url?: string,
	disabled?: boolean
}

export interface TextInputComponent {
	type: ComponentType.TextInput,
	custom_id: string,
	style: TextInputStyle,
	label: string,
	min_length?: number,
	max_length?: number,
	required?: boolean,
	value?: string,
	placeholder?: string
}

export enum ComponentType {
	ActionRow = 1,
	Button = 2,
	StringSelect = 3,
	TextInput = 4,
	UserSelect = 5,
	RoleSelect = 6,
	MentionableSelect = 7,
	ChannelSelect = 8
}

export enum TextInputStyle {
	Short = 1,
	Paragraph = 2
}