"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../interface/component");
const algolia_1 = __importDefault(require("../providers/algolia"));
const BlacklistedWords = ['pepe', 'nude', 'nsfw', '18+', 'hentai', 'sex', 'porn', 'shit', 'rape', 'fuck', 'penis', 'pussy', 'incest', 'cum', 'jizz', 'cuck', 'kkk', 'terrorism'];
exports.default = {
    data: {
        name: "search_modal"
    },
    callback(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = interaction.data.components[0].components[0].value;
            for (let word of query.split(" ")) {
                if (BlacklistedWords.includes(word.toLowerCase())) {
                    return interaction.message({
                        content: ":warning: Error: Your search contains words disallowed by Discord!",
                        flags: 64
                    });
                }
            }
            interaction.defer({
                flags: 64
            });
            const search = new algolia_1.default(query);
            const results = yield search.exec();
            interaction.edit("@original", {
                content: `${results.count} communities for '${query}'`,
                embeds: results.hits.map(result => ({
                    author: {
                        name: result.name,
                        icon_url: result.icon ? `https://cdn.discordapp.com/icons/${result.id}/${result.icon}.webp?size=32` : undefined
                    },
                    description: `${result.description}\n\nClick to preview: https://discord.com/channels/${result.id}/${result.id}/1`,
                    thumbnail: result.splash ? {
                        url: `https://cdn.discordapp.com/discovery-splashes/${result.id}/${result.discovery_splash}.jpg?size=240`
                    } : undefined,
                    footer: {
                        text: `${result.approximate_presence_count} online | ${result.approximate_member_count} members`
                    },
                    color: 0x2b2d31
                })),
                components: [
                    {
                        type: component_1.ComponentType.ActionRow,
                        components: [
                            {
                                type: component_1.ComponentType.Button,
                                label: "1",
                                style: 1,
                                custom_id: "page_1",
                                disabled: true
                            },
                            {
                                type: component_1.ComponentType.Button,
                                label: "2",
                                style: 2,
                                custom_id: "page_2",
                            },
                            {
                                type: component_1.ComponentType.Button,
                                label: "3",
                                style: 2,
                                custom_id: "page_3",
                            },
                            {
                                type: component_1.ComponentType.Button,
                                label: "...",
                                style: 2,
                                custom_id: "page_custom",
                            },
                            {
                                type: component_1.ComponentType.Button,
                                label: results.pages,
                                style: 2,
                                custom_id: "page_last",
                            }
                        ]
                    }
                ]
            });
        });
    }
};
