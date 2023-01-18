// Description: Memory class
// This class is used to store key-value pairs in memory.
// A super super simple in-memory cache that will get reset if the server ever restarts.
// DANGER: This is not a good way to store data in production. This is just for learning purposes.
// The cache doesn't expire, so it would keep growing and growing without handling cleanup.
class Memory {
  constructor () {
    this.memory = {}
  }

  get (key) {
    return this.memory[key]
  }

  set (key, value) {
    this.memory[key] = value
  }

  delete (key) {
    delete this.memory[key]
  }
}

module.exports = Memory
