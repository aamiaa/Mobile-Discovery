export default class Discord {
	public static async checkTerm(term: string): Promise<boolean> {
		const res = await fetch(`https://discord.com/api/v9/discovery/valid-term?term=${term}`, {
			headers: {
				Authorization: `Bot ${process.env.TOKEN}`
			}
		})
		if(!res.ok) {
			throw new Error(`Valid term check failed with code ${res.status}`)
		}

		const json = await res.json()
		if(typeof json.valid !== "boolean") {
			throw new Error("Unexpected response when checking term")
		}

		return json.valid
	}
}