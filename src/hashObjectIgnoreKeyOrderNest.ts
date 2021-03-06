import stringHash from './stringHash'

const hashObjectIgnoreKeyOrderNest = (
  obj: object | any[],
  hash: number = 5381,
  hash2: number = 52711
): [number, number] => {
  if (obj.constructor === Array) {
    const fl = '__len:' + obj.length + 1
    hash = stringHash(fl, hash)
    hash2 = stringHash(fl, hash2)

    for (let i = 0; i < obj.length; i++) {
      const field = obj[i]
      const type = typeof field
      if (type === 'string') {
        const f = i + ':' + field
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      } else if (type === 'number') {
        const f = i + 'n:' + field
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      } else if (type === 'object') {
        if (field === null) {
          const f = i + 'v:' + 'null'
          hash = stringHash(f, hash)
          hash2 = stringHash(f, hash2)
        } else {
          const x = hashObjectIgnoreKeyOrderNest(field, hash, hash2)
          const f = i + 'o:'
          hash = stringHash(f, x[0])
          hash2 = stringHash(f, x[1])
        }
      } else if (type === 'boolean') {
        const f = i + 'b:' + (field ? 'true' : 'false')
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      }
    }
  } else {
    const keys = Object.keys(obj).sort()
    const fl = '__len:' + keys.length + 1
    hash = stringHash(fl, hash)
    hash2 = stringHash(fl, hash2)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const field = obj[key]
      const type = typeof field
      if (type === 'string') {
        const f = key + ':' + field
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      } else if (type === 'number') {
        const f = key + 'n:' + field
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      } else if (type === 'object') {
        if (field === null) {
          const f = key + 'v:' + 'null'
          hash = stringHash(f, hash)
          hash2 = stringHash(f, hash2)
        } else {
          const x = hashObjectIgnoreKeyOrderNest(field, hash, hash2)
          const f = key + 'o:'
          hash = stringHash(f, x[0])
          hash2 = stringHash(f, x[1])
        }
      } else if (type === 'boolean') {
        const f = key + 'b:' + (field ? 'true' : 'false')
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      }
    }
  }
  return [hash, hash2]
}

export default hashObjectIgnoreKeyOrderNest
