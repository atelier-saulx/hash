import hashObjectIgnoreKeyOrderNest from './hashObjectIgnoreKeyOrderNest.js';
const hashObjectIgnoreKeyOrder = (props) => {
    const x = hashObjectIgnoreKeyOrderNest(props);
    return (x[0] >>> 0) * 4096 + (x[1] >>> 0);
};
export default hashObjectIgnoreKeyOrder;
//# sourceMappingURL=hashObjectIgnoreKeyOrder.js.map