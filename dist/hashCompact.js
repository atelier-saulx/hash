import hash from './hash';
import stringHash from './stringHash';
import hashObject from './hashObject';
import { hashObjectIgnoreKeyOrder } from '.';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const toString = (hash) => {
    let result = '';
    let mod;
    do {
        mod = hash % 62;
        result = chars.charAt(mod) + result;
        hash = Math.floor(hash / 62);
    } while (hash > 0);
    return result;
};
const hashCompact = (val, size, ignoreKeyOrder) => {
    let result;
    if (typeof val === 'object') {
        if (val === null) {
            result = 0;
        }
        else {
            if (size && size > 9 && val.constructor === Array) {
                let str = '';
                const arraySize = val.length;
                for (let i = 0; i < arraySize; i++) {
                    str += toString(ignoreKeyOrder
                        ? val[i] && typeof val[i] === 'object'
                            ? hashObjectIgnoreKeyOrder(val[i])
                            : hash(val[i])
                        : hash(val[i]));
                }
                const len = str.length;
                if (len < size) {
                    str += 'x';
                    if (len + 1 < size) {
                        str += new Array(size - len).join('0');
                    }
                }
                else if (len > size) {
                    return str.slice(0, size);
                }
                return str;
            }
            else {
                result =
                    (ignoreKeyOrder ? hashObjectIgnoreKeyOrder(val) : hashObject(val)) >>>
                        0;
            }
        }
    }
    else {
        if (typeof val === 'boolean') {
            result = stringHash(val ? ':true' : ':false') * 4096;
        }
        else if (typeof val === 'number') {
            result = (stringHash('n:' + val) >>> 0) * 4096;
        }
        else {
            result = stringHash(val) >>> 0;
        }
    }
    let x = toString(result);
    const len = x.length;
    if (size && len < size) {
        x += 'x';
        if (len + 1 < size) {
            x += new Array(size - len).join('0');
        }
    }
    return x;
};
export default hashCompact;
//# sourceMappingURL=hashCompact.js.map