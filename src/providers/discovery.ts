import axios from "axios"
import { SearchHit } from "../classes/search_response"
import { base64 } from "../util/base64"

export default class DiscoverySearch {
	private readonly limit = 10
	private page = 0
	private query: string

	constructor(query: string) {
		this.query = query
	}

	public async exec(visiblePage?: number): Promise<{query: string, page: number, visiblePage: number, hits: SearchHit[], count: number, pages: number}> {
		if(visiblePage)
			this.page = visiblePage-1

		let res = await axios({
			method: "get",
			url: `https://discord.com/api/v9/discoverable-guilds/search?query=${this.query}&offset=${this.limit * this.page}&limit=${this.limit}&with_counts=true`,
			headers: {
				Authorization: `Bot ${process.env.TOKEN}`,
				"X-Super-Properties": base64(JSON.stringify({
					os: "Windows",
					browser: "Discord Client",
					release_channel: "canary",
					client_version: "1.0.511",
					os_version: "10.0.19045",
					os_arch: "x64",
					app_arch: "x64",
					system_locale: "en-US",
					has_client_mods: false,
					browser_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.511 Chrome/128.0.6613.186 Electron/32.2.7 Safari/537.36",
					browser_version: "32.2.7",
					os_sdk_version: "19045",
					client_build_number: 354290,
					native_build_number: 56752,
					client_event_source: null
				}))
			}
		})

		return {
			query: this.query,
			page: this.page,
			visiblePage: this.page + 1,

			hits: res.data.guilds,
			count: res.data.total_count,
			pages: Math.ceil(res.data.total_count/this.limit)
		}
	}
}