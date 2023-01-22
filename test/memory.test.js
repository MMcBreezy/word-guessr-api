const Memory = require('../memory');

jest.useFakeTimers();
let mem

describe('Memory', () => {
  beforeEach(() => {
    mem = new Memory()
    jest.clearAllTimers()
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
    const defaultExpiration = 259200000 // 3 days

    it('should set an expiration time of 3 days', () => {
      mem.set('foo', 'bar')
      expect(mem.expiration('foo')).toEqual(Date.now() + defaultExpiration)
    })

    it('should renew the expiration time by three days if get is called', () => {
      mem.set('foo', 'bar')
      const advanceTimeBy = 10000
      jest.advanceTimersByTime(advanceTimeBy)
      mem.get('foo') 
      expect(mem.expiration('foo')).toEqual(Date.now() + defaultExpiration)
    })
  })
});
