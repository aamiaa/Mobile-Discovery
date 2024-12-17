import axios from "axios";

export default class Discord {
	public static async checkTerm(term: string): Promise<boolean> {
		const res = await axios.get<{valid: boolean}>("https://discord.com/api/v9/discovery/valid-term", {
			params: {
				term
			},
			headers: {
				Authorization: `Bot ${process.env.TOKEN}`
			}
		})

		if(typeof res.data?.valid !== "boolean") {
			throw new Error("Unexpected response when checking term")
		}

		return res.data.valid
	}
}