"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashObjectNest_1 = __importDefault(require("./hashObjectNest"));
const hashObject = (props) => {
    const x = hashObjectNest_1.default(props);
    return (x[0] >>> 0) * 4096 + x[1];
};
exports.default = hashObject;
//# sourceMappingURL=hashObject.js.map