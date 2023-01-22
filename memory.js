// Description: Memory class
// This class is used to store key-value pairs in memory.
// A super super simple in-memory cache that will get reset if the server ever restarts.
// DANGER: This is not a good way to store data in production. This is just for learning purposes.
// The cache doesn't expire, so it would keep growing and growing without handling cleanup.
const defaultExpiration = 259200000 // 3 days

class Memory {
  constructor () {
    this.memory = {}
  }

  get (key) {
    const found_memory = this.memory[key]
    if (found_memory === undefined) {
      return null
    }

    this.memory[key].expiration = Date.now() + defaultExpiration
    return this.memory[key].value
  }

  set (key, value) {
    this.memory[key] = {
      value: value,
      expiration: Date.now() + defaultExpiration
    }
  }

  delete (key) {
    delete this.memory[key]
  }

  expiration(key) {
    return this.memory[key].expiration
  }
}

module.exports = Memory
