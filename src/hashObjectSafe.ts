// const hashObjectSafe = (props: object): number => {
//   const x = hashObjectSafeNest(props)
//   return (x[0] >>> 0) * 4096 + (x[1] >>> 0)
// }

// export default hashObjectSafe

// types
// Supported types:

// 'string'
// 'integer'
// 'number'
// 'array'
// 'object'
// 'boolean'
// 'null'

const escape = (s: string) => s.replace(/:/g, ':').replace(/,/g, ',')
const parse = (v: any) => {
  const t = typeof v
  if (t === 'object') {
    return v === null ? 'n' : walk(v)
  }
  if (t === 'string') {
    return 't' + escape(v)
  }
  if (t === 'number') {
    return 'i' + v
  }
  if (t === 'boolean') {
    return 'b' + Number(v)
  }
  if (t === 'function') {
    return 'f' + escape(v.toString())
  }
  if (v === undefined) {
    return 'v'
  }
  // unknown
  return 'u'
}

const walk = (obj: Record<any, any>) => {
  let str
  let keys

  if (obj instanceof Map) {
    str = 'm'
    keys = Object.keys(obj).sort()
    for (const key of keys) {
      str += `${parse(key)}:${parse(obj.get(key))},`
    }
    return str
  }

  if (Array.isArray(obj)) {
    str = 'a'
    for (const val of obj) {
      str += `${parse(val)},`
    }
    return str
  }

  if (obj instanceof Set) {
    str = 's'
    keys = Array.from(obj).sort()
  } else {
    str = 'o'
    keys = Object.keys(obj).sort()
  }

  for (const key of keys) {
    str += `${parse(key)}:${parse(obj[key])},`
  }

  return str
}

const obj = {
  aool: 1,
  bool: {
    x: 'yes!',
    // snake: {
    //   floops: 0,
    // },
    // flups: 'x',
    // dicky: {
    //   ballz: 1,
    //   foo: 'baz',
    // },
  },
  cool: {
    sukkel: true,
  },

  // arr: [
  //   [
  //     'youzi',
  //     {
  //       coolguy: true,
  //     },
  //   ],
  //   // [
  //   // 'youzi',
  //   { sukkel: 'youzi' },
  //   // ],
  //   [{ ballz: true }],
  // ],
}

const unparseObj = (t, str, ctx, chain, depth) => {
  const key = unparse(str, ctx, chain, depth)
  if (key === undefined) return
  // t[key] = null
  const val = unparse(str, ctx, chain, depth + 1)
  t[key] = val
  if (str[ctx.i] === ',') {
    while (str[ctx.i + 1] === ',') {
      t = chain[--depth]
      ctx.i++
      if (Array.isArray(t)) {
        return unparseArr(t, str, ctx, chain, depth)
      }
    }
    unparseObj(t, str, ctx, chain, depth)
  }
}

const unparseArr = (t, str, ctx, chain, depth) => {
  // const l = t.length
  const val = unparse(str, ctx, chain, depth + 1)
  if (val === undefined) return
  // t[l] = val
  t.push(val)
  // console.log('???', t.length, val, k, chain, depth)
  // t[key] = val
  if (str[ctx.i] === ',') {
    while (str[ctx.i + 1] === ',') {
      t = chain[--depth]
      ctx.i++
      if (!Array.isArray(t)) {
        return unparseObj(t, str, ctx, chain, depth)
      }
    }

    unparseArr(t, str, ctx, chain, depth)
  }
}

const unparse = (
  str: string,
  ctx: { i: number; p: Map<any, any> } = { i: -1, p: new Map() },
  chain: any[] = [],
  depth = 0
): any => {
  const t = str[++ctx.i]
  if (t === 't') {
    // string
    let i = ctx.i
    let res = ''
    while (i++) {
      const char = str[i]
      if (char === ',' || char === ':') {
        if (str[i - 1] !== '\\') {
          break
        }
      }
      if (char !== '\\') {
        res += char
      }
    }
    ctx.i = i
    return res
  }

  if (t === 'b') {
    // boolean
    ctx.i++
    return Boolean(Number(str[ctx.i++]))
  }

  if (t === 'i') {
    // number
    const start = ctx.i + 1
    const end = str.indexOf(',', start)
    ctx.i = end
    return Number(str.substring(start, end))
  }

  if (t === 'o') {
    // object
    const res = (chain[depth] = {})
    unparseObj(res, str, ctx, chain, depth)
    return res
  }

  if (t === 'a') {
    // array
    const res = (chain[depth] = [])
    unparseArr(res, str, ctx, chain, depth)
    return res
  }
}

console.log(JSON.stringify(obj, null, 2), parse(obj))
console.log('-----------\n')
console.log(JSON.stringify(unparse(parse(obj)), null, 2))

export default () => {}
