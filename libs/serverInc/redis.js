const config = require('@/config')
const redis = require('redis')
const bluebird = require('bluebird')
const __reids = require('@/mods/__redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = async function () {
  for (const name in config.redis) {
    let client = redis.createClient(config.redis[name])

    await client.setAsync('__$$name$', 99)
    if (99 !== +await client.getAsync('__$$name$')) {
      throw 'redis init faild'
    }
    await client.delAsync('__$$name$')

    __reids[name] = client
  }
}
