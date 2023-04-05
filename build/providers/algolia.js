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
const axios_1 = __importDefault(require("axios"));
class AlgoliaSearch {
    constructor(query) {
        this.limit = 10;
        this.offset = 0;
        this.filters = ["auto_removed: false", "approximate_presence_count>0", "approximate_member_count>200"];
        this.query = query;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield (0, axios_1.default)({
                method: "post",
                url: "https://nktzz4aizu-dsn.algolia.net/1/indexes/prod_discoverable_guilds/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.1.0)%3B%20Browser",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://discord.com",
                    "Referer": "https://discord.com/",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "cross-site",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.50 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36",
                    "x-algolia-api-key": "aca0d7082e4e63af5ba5917d5e96bed0",
                    "x-algolia-application-id": "NKTZZ4AIZU"
                },
                data: JSON.stringify({
                    query: this.query,
                    filters: this.filters.join(" AND "),
                    length: this.limit,
                    offset: this.offset,
                    restrictSearchableAttributes: ["name", "description", "keywords", "categories.name", "categories.name_localizations.en-US", "primary_category.name", "primary_category.name_localizations.en-US", "vanity_url_code"]
                })
            });
            return {
                hits: res.data.hits,
                count: res.data.nbHits,
                pages: Math.ceil(res.data.nbHits / this.limit)
            };
        });
    }
}
exports.default = AlgoliaSearch;
