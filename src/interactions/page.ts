import Interaction from "../classes/interaction";
import SearchResponse from "../classes/search_response";
import { ComponentType } from "../interface/component";
import { InteractionCallback } from "../interface/interaction";
import AlgoliaSearch from "../providers/algolia";

export default {
	data: {
		name: "page"
	},

	async callback(interaction: Interaction) {
		const pageId = interaction.data.custom_id

		if(pageId === "page_custom") {
			return interaction.respond({
				type: InteractionCallback.MODAL,
				data: {
					custom_id: "modal_page_custom",
					title: "Select page",
					components: [
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.TextInput,
									custom_id: "page_number",
									label: "Page number",
									style: 1,
									min_length: 1,
									max_length: 4,
									placeholder: "123",
									required: true
								}
							]
						}
					]
				}
			})
		}

		interaction.deferComponent()

		const msg = await interaction.getMessage("@original")

		const query: string = msg.content.match(/^\d+ communities for '(.+)'$/)[1]
		const pageNum = parseInt(pageId.match(/page_(\d+)/)[1])

		const search = new AlgoliaSearch(query)
		const results = await search.exec(pageNum)

		interaction.edit("@original", new SearchResponse(results).make())
	}
}