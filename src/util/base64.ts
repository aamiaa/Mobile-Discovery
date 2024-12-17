export function base64(input: string) {
	return Buffer.from(input).toString("base64")
}