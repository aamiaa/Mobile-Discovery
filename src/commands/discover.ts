import Interaction from "../classes/interaction";
import SearchResponse from "../classes/search_response";
import AlgoliaSearch from "../providers/algolia";

// Taken from the Discord client
const BlacklistedWords = ['pepe', 'nude', 'nsfw', '18+', 'hentai', 'sex', 'porn', 'shit', 'rape', 'fuck', 'penis', 'pussy', 'incest', 'cum', 'jizz', 'cuck', 'kkk', 'terrorism']

export default {
	data: {
		name: "discover",
		description: "Browse public servers in server discovery",
		options: [
			{
				type: 3,
				name: "search",
				description: "Your search query",
				required: true
			}
		]
	},

	async callback(interaction: Interaction) {
		let query: string = interaction.data.options[0].value
		if(query.length < 2)
			return interaction.message({
				content: ":warning: Error: Your search must be longer than one letter!",
				flags: 64
			})

		if(query.length > 100)
			query = query.substring(0, 100)

		for(const word of query.split(" ")) {
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