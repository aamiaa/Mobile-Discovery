"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommas = void 0;
function AddCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.AddCommas = AddCommas;
