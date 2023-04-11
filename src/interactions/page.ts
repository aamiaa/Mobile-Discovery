import Interaction from "../classes/interaction";
import SearchResponse from "../classes/search_response";
import AlgoliaSearch from "../providers/algolia";

export default {
	data: {
		name: "page"
	},

	async callback(interaction: Interaction) {
		interaction.deferComponent()

		let pageId = interaction.data.custom_id
		if(pageId === "page_custom") {
			//TODO
			return
		}

		let msg = await interaction.getMessage("@original")

		let query = msg.content.match(/^\d+ communities for '(.+)'$/)[1]
		let pageNum = parseInt(pageId.match(/page_(\d+)/)[1])

		const search = new AlgoliaSearch(query)
		const results = await search.exec(pageNum)

		interaction.edit("@original", new SearchResponse(results).make())
	}
}