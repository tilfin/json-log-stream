const fs = require('fs')
const PromisedLife = require('promised-lifestream')
const transformers = require('./transformers')

class Helper {
  constructor(func) {
    this._func = func
  }

  execute(arg) {
    return this._func(arg)
  }

  sort(items, key, direct) {
    const lessThan = direct === 'desc' ? 1 : -1
    if (key) {
      const keyChain = key.split('.')
      return items.sort((a, b) => {
        let av = a, bv = b
        for (let key of keyChain) {
          av = av[key]
          bv = bv[key]
        }
        if (av < bv) return lessThan
        if (av > bv) return -lessThan
        return 0
      })
    } else {
      return items.sort((a, b) => {
        if (a < b) return lessThan
        if (a > b) return -lessThan
        return 0
      })
    }
  }

  keyBy(items, key) {
    const hash = {}
    const keyChain = key.split('.')
    for (let item of items) {
      let kv = item
      for (let key of keyChain) {
        kv = kv[key]
      }
      hash[kv] = item
    }
    return hash
  }

  sum(items, key) {
    let val = 0
    if (key) {
      items.forEach(item => val += item[key])
    } else {
      items.forEach(item => val += item)
    }
    return val
  }

  readJSONLinesFile(fileName) {
    return PromisedLife([
      fs.createReadStream(fileName),
      transformers.createReadline(),
      transformers.createJSONParser(),
    ], { needResult: true })
  }

  readTSVFile(fileName) {
    return PromisedLife([
      fs.createReadStream(fileName),
      transformers.createReadline(),
      transformers.createTSVParser(),
    ], { needResult: true })
  }
}

module.exports = Helper
