"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandType = exports.InteractionCallback = exports.InteractionType = void 0;
var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["PING"] = 1] = "PING";
    InteractionType[InteractionType["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    InteractionType[InteractionType["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    InteractionType[InteractionType["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    InteractionType[InteractionType["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionType = exports.InteractionType || (exports.InteractionType = {}));
var InteractionCallback;
(function (InteractionCallback) {
    InteractionCallback[InteractionCallback["PONG"] = 1] = "PONG";
    InteractionCallback[InteractionCallback["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionCallback[InteractionCallback["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionCallback[InteractionCallback["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    InteractionCallback[InteractionCallback["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    InteractionCallback[InteractionCallback["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    InteractionCallback[InteractionCallback["MODAL"] = 9] = "MODAL";
})(InteractionCallback = exports.InteractionCallback || (exports.InteractionCallback = {}));
var CommandType;
(function (CommandType) {
    CommandType[CommandType["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    CommandType[CommandType["USER"] = 2] = "USER";
    CommandType[CommandType["MESSAGE"] = 3] = "MESSAGE";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
