"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Commands {
    static init() {
        this.loadCommands();
        this.loadInteractions();
    }
    static loadCommands() {
        const commandFiles = fs_1.default.readdirSync(this.commandsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
        for (let file of commandFiles) {
            const filePath = path_1.default.join(this.commandsPath, file);
            delete require.cache[require.resolve(filePath)]; //allows for reloading
            let command = require(filePath).default;
            this._commands.set(command.data.name, command);
        }
    }
    static loadInteractions() {
        const interactionFiles = fs_1.default.readdirSync(this.interactionsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));
        for (let file of interactionFiles) {
            const filePath = path_1.default.join(this.interactionsPath, file);
            delete require.cache[require.resolve(filePath)]; //allows for reloading
            let interaction = require(filePath).default;
            this._interactions.set(interaction.data.name, interaction);
        }
    }
    static getCommand(name) {
        return this._commands.get(name);
    }
    static getInteraction(name) {
        return this._interactions.get(name);
    }
}
exports.default = Commands;
Commands._commands = new Map();
Commands.commandsPath = path_1.default.join(__dirname, "..", "commands");
Commands._interactions = new Map();
Commands.interactionsPath = path_1.default.join(__dirname, "..", "interactions");
