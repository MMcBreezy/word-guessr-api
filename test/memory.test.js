const Memory = require('../memory');

describe('Memory', () => {
  it('should set and get a value', () => {
    const mem = new Memory();
    mem.set('foo', 'bar');
    expect(mem.get('foo')).toEqual('bar');
  });

  it('should delete a value', () => {
    const mem = new Memory();
    mem.set('foo', 'bar');
    mem.delete('foo');
    expect(mem.get('foo')).toEqual(undefined);
  });
});
