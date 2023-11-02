import hashObjectNest from './hashObjectNest';
const hashObject = (props) => {
    const x = hashObjectNest(props);
    return (x[0] >>> 0) * 4096 + x[1];
};
export default hashObject;
//# sourceMappingURL=hashObject.js.map