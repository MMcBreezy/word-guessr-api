// Description: Memory class
// This class is used to store key-value pairs in memory.
// A super super simple in-memory cache that will get reset if the server ever restarts.
// Also, it will expire after 3 days if not accessed.
// DANGER: This is not a good way to store data in production. This is just for learning purposes.
// This is not safe to use if multithreading is involved.
const defaultExpiration = 259200000 // 3 days
const checkExpirationInterval = 86400000 // 1 day

class Memory {
  expirationJob
  size

  constructor () {
    this.memory = {}
    this.size = 0
    this.startExpirationJob()
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
    this.size++
  }

  delete (key) {
    if (this.memory[key] !== undefined) {
      delete this.memory[key]
      this.size--
    }
  }

  expiration(key) {
    return this.memory[key].expiration
  }
  
  isExpired(key) {
    return this.memory[key].expiration < Date.now()
  }

  startExpirationJob() {
    this.expirationJob = setInterval(() => this.checkExpirations(), checkExpirationInterval)
  }

  stopExpirationJob() {
    clearInterval(this.expirationJob)
  }

  checkExpirations = () => {
    for (const key in this.memory) {
      if (this.isExpired(key)) {
        this.delete(key)
      }
    }
  }
}

module.exports = Memory
