"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashObjectIgnoreKeyOrderNest_1 = __importDefault(require("./hashObjectIgnoreKeyOrderNest"));
const hashObjectIgnoreKeyOrder = (props) => {
    const x = hashObjectIgnoreKeyOrderNest_1.default(props);
    return (x[0] >>> 0) * 4096 + x[1];
};
exports.default = hashObjectIgnoreKeyOrder;
//# sourceMappingURL=hashObjectIgnoreKeyOrder.js.map