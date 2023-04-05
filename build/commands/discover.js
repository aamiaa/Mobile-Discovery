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
const murmur3_1 = __importDefault(require("../util/murmur3"));
const num_1 = require("../util/num");
// From the discord client
const BlacklistedWords = ['pepe', 'nude', 'nsfw', '18+', 'hentai', 'sex', 'porn', 'shit', 'rape', 'fuck', 'penis', 'pussy', 'incest', 'cum', 'jizz', 'cuck', 'kkk', 'terrorism'];
exports.default = {
    data: {
        name: "discover",
        description: "Browse public servers in discovery"
    },
    callback(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const pos = (0, murmur3_1.default)(`2023-02_discord_embeds:${interaction.user.id}`) % 10000;
            if ((pos >= 0 && pos < 100) || (pos >= 200 && pos < 1100) || (pos >= 2000 && pos < 3000) || (pos >= 4000 && pos < 7000))
                return interaction.message({
                    content: "Unfortunately you don't have the Discord beta feature that this bot relies on. Please check back another time!",
                    flags: 64
                });
            const query = interaction.data.options[0].value;
            if (query.length < 2)
                return interaction.message({
                    content: ":warning: Error: Your search must be longer than one letter!",
                    flags: 64
                });
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
            let pages = [];
            if (results.pages > 1) {
                pages.push({
                    type: component_1.ComponentType.Button,
                    label: "1",
                    style: 1,
                    custom_id: "page_1",
                    disabled: true
                });
                if (results.pages <= 5) {
                    for (let i = 2; i < results.pages; i++) {
                        pages.push({
                            type: component_1.ComponentType.Button,
                            label: `${i}`,
                            style: 2,
                            custom_id: `page_${i}`,
                        });
                    }
                }
                else {
                    for (let i = 2; i < 3; i++) {
                        pages.push({
                            type: component_1.ComponentType.Button,
                            label: `${i}`,
                            style: 2,
                            custom_id: `page_${i}`,
                        });
                    }
                    pages.push({
                        type: component_1.ComponentType.Button,
                        label: "...",
                        style: 2,
                        custom_id: "page_custom",
                    });
                    pages.push({
                        type: component_1.ComponentType.Button,
                        label: `${results.pages}`,
                        style: 2,
                        custom_id: `page_${results.pages}`,
                    });
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
                        text: `${(0, num_1.AddCommas)(result.approximate_presence_count)} online | ${(0, num_1.AddCommas)(result.approximate_member_count)} members`
                    },
                    color: 0x2b2d31
                })),
                components: pages.length > 0 ? [
                    {
                        type: component_1.ComponentType.ActionRow,
                        components: pages
                    }
                ] : undefined
            });
        });
    }
};
