const Memory = require('../memory');

jest.useFakeTimers();
let mem

describe('Memory', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    mem = new Memory()
  })

  it('should set and get a value', () => {
    const mem = new Memory();
    mem.set('foo', 'bar');
    expect(mem.get('foo')).toEqual('bar');
  });

  it('should delete a value', () => {
    const mem = new Memory();
    mem.set('foo', 'bar');
    mem.delete('foo');
    expect(mem.get('foo')).toBeNull();
  });

  describe('expiration', () => {
    const oneDay = 86400000
    const defaultExpiration = oneDay * 3 // 3 days

    it('should set an expiration time of 3 days', () => {
      mem.set('foo', 'bar')
      expect(mem.expiration('foo')).toEqual(Date.now() + defaultExpiration)
    })

    it('should renew the expiration time by three days if get() is called', () => {
      mem.set('foo', 'bar')
      const advanceTimeBy = 10000
      jest.advanceTimersByTime(advanceTimeBy)
      mem.get('foo') 
      expect(mem.expiration('foo')).toEqual(Date.now() + defaultExpiration)
    })

    it('should call checkExpiration every 1 day', () => {
      const spy = jest.spyOn(mem, 'checkExpirations')
      jest.advanceTimersByTime(oneDay)
      expect(spy).toHaveBeenCalledTimes(1)
      jest.advanceTimersByTime(oneDay)
      expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should deleted the key if expired', () => {
      mem.set('foo', 'bar')
      const advanceTimeBy = defaultExpiration + oneDay
      jest.advanceTimersByTime(advanceTimeBy)
      expect(mem.get('foo')).toBeNull()
    })

    it('should not delete the key if not expired', () => {
      mem.set('foo', 'bar')
      const advanceTimeBy = defaultExpiration - oneDay
      jest.advanceTimersByTime(advanceTimeBy)
      expect(mem.get('foo')).toEqual('bar')
    })

    it('should stop the expiration job when stopExpirationJob is called', () => {
      const spy = jest.spyOn(mem, 'checkExpirations')
      mem.stopExpirationJob()
      jest.advanceTimersByTime(oneDay)
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })
});
