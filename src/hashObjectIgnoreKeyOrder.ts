import hashObjectIgnoreKeyOrderNest from './hashObjectIgnoreKeyOrderNest'

const hashObjectIgnoreKeyOrder = (props: object): number => {
  const x = hashObjectIgnoreKeyOrderNest(props)
  return (x[0] >>> 0) * 4096 + x[1]
}

export default hashObjectIgnoreKeyOrder
