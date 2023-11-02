import stringHash from './stringHash'

const hashObjectNest = (
  obj: { [key: string]: any } | any[],
  hash = 5381,
  hash2 = 52711
): [number, number] => {
  if (Array.isArray(obj)) {
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
          const x = hashObjectNest(field, hash, hash2)
          hash = stringHash(i + 'o:', x[0])
          hash2 = stringHash(i + 'o:', x[1])
        }
      } else if (type === 'boolean') {
        const f = i + 'b:' + (field ? 'true' : 'false')
        hash = stringHash(f, hash)
        hash2 = stringHash(f, hash2)
      }
    }
  } else {
    for (const key in obj) {
      if (key === undefined) {
        continue
      }
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
          const x = hashObjectNest(field, hash, hash2)
          hash = stringHash(key + 'o:', x[0])
          hash2 = stringHash(key + 'o:', x[1])
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

export default hashObjectNest
