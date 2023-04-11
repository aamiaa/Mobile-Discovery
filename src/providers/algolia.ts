import axios from "axios"
import { SearchHit } from "../classes/search_response"

export default class AlgoliaSearch {
	private readonly limit = 10
	private page = 0
	private query: string
	private filters = ["auto_removed: false", "approximate_presence_count>0", "approximate_member_count>200"]

	constructor(query: string) {
		this.query = query
	}

	public async exec(visiblePage?: number): Promise<{query: string, page: number, visiblePage: number, hits: SearchHit[], count: number, pages: number}> {
		if(visiblePage)
			this.page = visiblePage-1

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
				hitsPerPage: this.limit,
				page: this.page,
				optionalFilters: ["preferred_locale: en-US"],
				restrictSearchableAttributes: ["name","description","keywords","categories.name","categories.name_localizations.en-US","primary_category.name","primary_category.name_localizations.en-US","vanity_url_code"]
			})
		})

		return {
			query: this.query,
			page: this.page,
			visiblePage: this.page + 1,

			hits: res.data.hits,
			count: res.data.nbHits,
			pages: res.data.nbPages
		}
	}
}