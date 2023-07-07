import { Component, ComponentType } from "../interface/component"
import { AddCommas } from "../util/num"

export interface SearchHit {
	id: string,
	name: string,
	description?: string,
	icon?: string,
	splash?: string,
	banner?: string,
	approximate_member_count: number,
	approximate_presence_count: number,
	premium_subscription_count: number,
	preferred_locale: string,
	auto_removed: boolean,
	discovery_splash?: string,
	primary_category_id: number,
	vanity_url_code?: string,
	is_published: boolean,
	keywords: string[],
	features: string[]
}

export default class SearchResponse {
	private data: {query: string, page: number, visiblePage: number, hits: SearchHit[], count: number, pages: number}

	constructor(data: {query: string, page: number, visiblePage: number, hits: SearchHit[], count: number, pages: number}) {
		this.data = data
	}

	public make() {
		return {
			content: `${this.data.count} communities for '${this.data.query}'`,
			embeds: this.data.hits.map(result => ({
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
			components: this.data.pages > 1 ? [
				{
					type: ComponentType.ActionRow,
					components: this.makePages()
				}
			] : undefined
		}
	}

	/*
		Example for max 6 pages:
			1. 1 2 3 ... 6
			2. 1 2 3 ... 6
			3. 2 3 4 5 6
			4. 2 3 4 5 6
			5. 1 ... 4 5 6
			6. 1 ... 4 5 6

		Example for max 91 pages:
			1. 1 2 3 ... 91
			2. 1 2 3 ... 91
			3. 2 3 4 ... 91
			4. 3 4 5 ... 91
			87. 86 87 88 ... 91
			88. 87 88 89 90 91
			89. 87 88 89 90 91
			90. 1 ... 89 90 91
			91. 1 ... 89 90 91
	*/
	private makePages() {
		const pages: Component[] = []

		if(this.data.pages <= 5) {
			for(let i=1;i<=this.data.pages;i++) {
				pages.push({
					type: ComponentType.Button,
					label: `${i}`,
					style: i === this.data.visiblePage ? 1 : 2,
					custom_id: `page_${i}`,
					disabled: i === this.data.visiblePage
				})
			}
		} else if(this.data.visiblePage >= this.data.pages - 3 && this.data.visiblePage < this.data.pages - 1) {
			for(let i=this.data.pages-4;i<=this.data.pages;i++) {
				pages.push({
					type: ComponentType.Button,
					label: `${i}`,
					style: i === this.data.visiblePage ? 1 : 2,
					custom_id: `page_${i}`,
					disabled: i === this.data.visiblePage
				})
			}
		} else if(this.data.visiblePage >= this.data.pages - 1) {
			pages.push({
				type: ComponentType.Button,
				label: "1",
				style: 2,
				custom_id: "page_1",
			})

			pages.push({
				type: ComponentType.Button,
				label: "...",
				style: 2,
				custom_id: "page_custom",
			})

			for(let i=this.data.pages - 2;i<=this.data.pages;i++) {
				pages.push({
					type: ComponentType.Button,
					label: `${i}`,
					style: i === this.data.visiblePage ? 1 : 2,
					custom_id: `page_${i}`,
					disabled: i === this.data.visiblePage
				})
			}
		} else {
			let start = this.data.visiblePage - 1
			let end = this.data.visiblePage + 1

			if(this.data.visiblePage === 1) {
				start = 1
				end = 3
			}

			for(let i=start;i<=end;i++) {
				pages.push({
					type: ComponentType.Button,
					label: `${i}`,
					style: i === this.data.visiblePage ? 1 : 2,
					custom_id: `page_${i}`,
					disabled: i === this.data.visiblePage
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
				label: `${this.data.pages}`,
				style: 2,
				custom_id: `page_${this.data.pages}`,
			})
		}

		return pages
	}
}