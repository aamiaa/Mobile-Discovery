import Interaction from "../classes/interaction";
import { ComponentType } from "../interface/component";
import AlgoliaSearch from "../providers/algolia";
import MurmurHashV3 from "../util/murmur3";
import { AddCommas } from "../util/num";

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

		const query: string = interaction.data.options[0].value
		if(query.length < 2)
			return interaction.message({
				content: ":warning: Error: Your search must be longer than one letter!",
				flags: 64
			})

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

		let pages = []
		if(results.pages > 1) {
			pages.push({
				type: ComponentType.Button,
				label: "1",
				style: 1,
				custom_id: "page_1",
				disabled: true
			})

			if(results.pages <= 5) {
				for(let i=2;i<results.pages;i++) {
					pages.push({
						type: ComponentType.Button,
						label: `${i}`,
						style: 2,
						custom_id: `page_${i}`,
					})
				}
			} else {
				for(let i=2;i<3;i++) {
					pages.push({
						type: ComponentType.Button,
						label: `${i}`,
						style: 2,
						custom_id: `page_${i}`,
					})
				}

				pages.push({
					type: ComponentType.Button,
					label: "...",
					style: 2,
					custom_id: "page_custom",
				})

				pages.push({
					type: ComponentType.Button,
					label: `${results.pages}`,
					style: 2,
					custom_id: `page_${results.pages}`,
				})
			}
		}

		interaction.edit("@original", {
			content: `${results.count} communities for '${query}'`,
			embeds: results.hits.map(result => ({
				thumbnail: result.icon ? {
					url: `https://cdn.discordapp.com/icons/${result.id}/${result.icon}.webp?size=128`
				} : undefined,
				title: result.name,
				description: `${result.description}\n\nClick to preview: https://discord.com/channels/${result.id}/${result.id}/1`,
				image: result.splash ? {
					url: `https://cdn.discordapp.com/discovery-splashes/${result.id}/${result.discovery_splash}.jpg?size=512`
				} : undefined,
				footer: {
					text: `${AddCommas(result.approximate_presence_count)} online | ${AddCommas(result.approximate_member_count)} members`
				},
				color: 0x2b2d31
			})),
			components: pages.length > 0 ? [
				{
					type: ComponentType.ActionRow,
					components: pages
				}
			] : undefined
		})
	}
}