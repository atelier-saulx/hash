const stringHash = (str, hash = 5381) => {
    let i = str.length;
    while (i) {
        const char = str.charCodeAt(--i);
        hash = (hash * 33) ^ char;
    }
    return hash;
};
export default stringHash;
//# sourceMappingURL=stringHash.js.map