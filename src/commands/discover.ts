import Interaction from "../classes/interaction";
import SearchResponse from "../classes/search_response";
import AlgoliaSearch from "../providers/algolia";
import MurmurHashV3 from "../util/murmur3";

// From the discord client
const BlacklistedWords = ['pepe', 'nude', 'nsfw', '18+', 'hentai', 'sex', 'porn', 'shit', 'rape', 'fuck', 'penis', 'pussy', 'incest', 'cum', 'jizz', 'cuck', 'kkk', 'terrorism']

export default {
	data: {
		name: "discover",
		description: "Browse public servers in discovery"
	},

	async callback(interaction: Interaction) {
		const pos = MurmurHashV3(`2023-02_discord_embeds:${interaction.user.id}`) % 10000
		if((pos >= 0 && pos < 100) || (pos >= 200 && pos < 1100) || (pos >= 2000 && pos < 3000) || (pos >= 4000 && pos < 7000))
			return interaction.message({
				content: "Unfortunately you don't have the Discord beta feature that this bot relies on. Please check back another time!",
				flags: 64
			})

		let query: string = interaction.data.options[0].value
		if(query.length < 2)
			return interaction.message({
				content: ":warning: Error: Your search must be longer than one letter!",
				flags: 64
			})

		if(query.length > 100)
			query = query.substring(0, 100)

		for(let word of query.split(" ")) {
			if(BlacklistedWords.includes(word.toLowerCase())) {
				return interaction.message({
					content: ":warning: Error: Your search contains words disallowed by Discord!",
					flags: 64
				})
			}
		}

		interaction.defer({
			flags: 64
		})

		const search = new AlgoliaSearch(query)
		const results = await search.exec()

		interaction.edit("@original", new SearchResponse(results).make())
	}
}