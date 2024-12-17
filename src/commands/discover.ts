import Interaction from "../classes/interaction";
import SearchResponse from "../classes/search_response";
import DiscoverySearch from "../providers/discovery";
import Discord from "../providers/discord";

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
			},
			{
				type: 5,
				name: "ephemeral",
				description: "Whether the response should be ephemeral (defaults to true)",
			}
		],
		integration_types: [0, 1],
		contexts: [0, 1, 2]
	},

	async callback(interaction: Interaction) {
		let query: string = interaction.data.options[0].value
		let ephemeral = interaction.data.options[1]?.value ?? true

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
		if(!await Discord.checkTerm(query)) {
			return interaction.message({
				content: ":warning: Error: Your search contains words disallowed by Discord!",
				flags: 64
			})
		}

		interaction.defer({
			flags: ephemeral ? 64 : 0
		})

		const search = new DiscoverySearch(query)
		const results = await search.exec()

		interaction.edit("@original", new SearchResponse(results).make())
	}
}