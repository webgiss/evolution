// const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
// const guid = () => `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;

let guidCount = 0;
// guid.mockImplementation(() => `00000000-0000-0000-0000-00000000${((0x10000 + (++guidCount)).toString(16).substring(1))}`);
const guid = () => `${((0x1000000 + (++guidCount)).toString(16).substring(1))}`;

export default guid;