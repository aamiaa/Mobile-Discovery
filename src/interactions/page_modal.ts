import Interaction from "../classes/interaction";
import SearchResponse from "../classes/search_response";
import { TextInputComponent } from "../interface/component";
import AlgoliaSearch from "../providers/algolia";

export default {
	data: {
		name: "modal_page_custom"
	},

	async callback(interaction: Interaction) {
		interaction.deferComponent()

		const pageNum = parseInt((interaction.data.components[0].components[0] as TextInputComponent).value)
		if(!pageNum && pageNum < 1)
			return interaction.followUp({
				content: "Invalid page number was provided!",
				flags: 64
			})

		let msg = await interaction.getMessage("@original")

		let maxPage = parseInt(msg.components[0].components.pop().label)
		if(pageNum > maxPage)
			return interaction.followUp({
				content: "Invalid page number was provided!",
				flags: 64
			})

		let query = msg.content.match(/^\d+ communities for '(.+)'$/)[1]

		const search = new AlgoliaSearch(query)
		const results = await search.exec(pageNum)

		interaction.edit("@original", new SearchResponse(results).make())
	}
}