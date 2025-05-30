import guid from './guid';

test('test guid size', () => {
    expect(guid().length).toBe(36);
})