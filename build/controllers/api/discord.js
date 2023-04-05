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
const interaction_1 = __importDefault(require("../../classes/interaction"));
const interaction_2 = require("../../interface/interaction");
const commands_1 = __importDefault(require("../../providers/commands"));
class DiscordController {
    static perform(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = new interaction_1.default(res, req.body);
            switch (interaction.type) {
                case interaction_2.InteractionType.PING:
                    return interaction.pong();
                case interaction_2.InteractionType.APPLICATION_COMMAND:
                    const commandName = interaction.data.name;
                    const command = commands_1.default.getCommand(commandName);
                    if (command)
                        return yield command.callback(interaction);
                    break;
                case interaction_2.InteractionType.MESSAGE_COMPONENT:
                case interaction_2.InteractionType.MODAL_SUBMIT:
                    const interactionName = interaction.data.custom_id;
                    const nameCollision = commands_1.default.getInteraction(interactionName);
                    if (nameCollision)
                        return yield nameCollision.callback(interaction);
            }
        });
    }
}
exports.default = DiscordController;
