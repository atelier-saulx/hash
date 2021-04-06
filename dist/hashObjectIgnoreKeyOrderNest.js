"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stringHash_1 = __importDefault(require("./stringHash"));
const hashObjectIgnoreKeyOrderNest = (obj, hash = 5381, hash2 = 52711) => {
    if (obj.constructor === Array) {
        const fl = '__len:' + obj.length + 1;
        hash = stringHash_1.default(fl, hash);
        hash2 = stringHash_1.default(fl, hash2);
        for (let i = 0; i < obj.length; i++) {
            const field = obj[i];
            const type = typeof field;
            if (type === 'string') {
                const f = i + ':' + field;
                hash = stringHash_1.default(f, hash);
                hash2 = stringHash_1.default(f, hash2);
            }
            else if (type === 'number') {
                const f = i + 'n:' + field;
                hash = stringHash_1.default(f, hash);
                hash2 = stringHash_1.default(f, hash2);
            }
            else if (type === 'object') {
                if (field === null) {
                    const f = i + 'v:' + 'null';
                    hash = stringHash_1.default(f, hash);
                    hash2 = stringHash_1.default(f, hash2);
                }
                else {
                    const x = hashObjectIgnoreKeyOrderNest(field, hash, hash2);
                    const f = i + 'o:';
                    hash = stringHash_1.default(f, x[0]);
                    hash2 = stringHash_1.default(f, x[1]);
                }
            }
            else if (type === 'boolean') {
                const f = i + 'b:' + (field ? 'true' : 'false');
                hash = stringHash_1.default(f, hash);
                hash2 = stringHash_1.default(f, hash2);
            }
        }
    }
    else {
        const keys = Object.keys(obj).sort();
        const fl = '__len:' + keys.length + 1;
        hash = stringHash_1.default(fl, hash);
        hash2 = stringHash_1.default(fl, hash2);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const field = obj[key];
            const type = typeof field;
            if (type === 'string') {
                const f = key + ':' + field;
                hash = stringHash_1.default(f, hash);
                hash2 = stringHash_1.default(f, hash2);
            }
            else if (type === 'number') {
                const f = key + 'n:' + field;
                hash = stringHash_1.default(f, hash);
                hash2 = stringHash_1.default(f, hash2);
            }
            else if (type === 'object') {
                if (field === null) {
                    const f = key + 'v:' + 'null';
                    hash = stringHash_1.default(f, hash);
                    hash2 = stringHash_1.default(f, hash2);
                }
                else {
                    const x = hashObjectIgnoreKeyOrderNest(field, hash, hash2);
                    const f = key + 'o:';
                    hash = stringHash_1.default(f, x[0]);
                    hash2 = stringHash_1.default(f, x[1]);
                }
            }
            else if (type === 'boolean') {
                const f = key + 'b:' + (field ? 'true' : 'false');
                hash = stringHash_1.default(f, hash);
                hash2 = stringHash_1.default(f, hash2);
            }
        }
    }
    return [hash, hash2];
};
exports.default = hashObjectIgnoreKeyOrderNest;
//# sourceMappingURL=hashObjectIgnoreKeyOrderNest.js.map