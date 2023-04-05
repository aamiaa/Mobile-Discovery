"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputStyle = exports.ComponentType = void 0;
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    ComponentType[ComponentType["Button"] = 2] = "Button";
    ComponentType[ComponentType["StringSelect"] = 3] = "StringSelect";
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
    ComponentType[ComponentType["UserSelect"] = 5] = "UserSelect";
    ComponentType[ComponentType["RoleSelect"] = 6] = "RoleSelect";
    ComponentType[ComponentType["MentionableSelect"] = 7] = "MentionableSelect";
    ComponentType[ComponentType["ChannelSelect"] = 8] = "ChannelSelect";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
var TextInputStyle;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle = exports.TextInputStyle || (exports.TextInputStyle = {}));
