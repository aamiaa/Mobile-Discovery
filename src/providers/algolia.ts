import axios from "axios"

export default class AlgoliaSearch {
	private readonly limit = 10
	private offset = 0
	private query: string
	private filters = ["auto_removed: false", "approximate_presence_count>0", "approximate_member_count>200"]

	constructor(query: string) {
		this.query = query
	}

	public async exec() {
		let res = await axios({
			method: "post",
			url: "https://nktzz4aizu-dsn.algolia.net/1/indexes/prod_discoverable_guilds/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.1.0)%3B%20Browser",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Origin": "https://discord.com",
				"Referer": "https://discord.com/",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "cross-site",
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.50 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36",
				"x-algolia-api-key": "aca0d7082e4e63af5ba5917d5e96bed0",
				"x-algolia-application-id": "NKTZZ4AIZU"
			},
			data: JSON.stringify({
				query: this.query,
				filters: this.filters.join(" AND "),
				length: this.limit,
				offset: this.offset,
				restrictSearchableAttributes: ["name","description","keywords","categories.name","categories.name_localizations.en-US","primary_category.name","primary_category.name_localizations.en-US","vanity_url_code"]
			})
		})

		return {
			hits: res.data.hits,
			count: res.data.nbHits,
			pages: Math.ceil(res.data.nbHits/this.limit)
		}
	}
}