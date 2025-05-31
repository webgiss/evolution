import guid from './guid';
import { normalizeNewItem, updateItems, initMap, resolveItems, insertItem, moveItems } from './items';
import { generateDna, extractProps } from './itemprops';
import { ORGANIC, HERBIVORE, CARNIVORE, OMNIVORE } from '@/utils/constants/itemType';

jest.mock('./guid');

let guidCount = 0;
const guidCountReinit = (count = 0) => guidCount = count;
// guid.mockImplementation(() => `00000000-0000-0000-0000-00000000${((0x10000 + (++guidCount)).toString(16).substring(1))}`);
guid.mockImplementation(() => `${((0x1000000 + (++guidCount)).toString(16).substring(1))}`);

describe('guid', () => {
    test('guid to be mocked', () => {
        guidCountReinit();
        expect(guid()).toEqual("00000000-0000-0000-0000-000000000001");
        expect(guid()).toEqual("00000000-0000-0000-0000-000000000002");
    });

    test('guid to be mocked starting 5', () => {
        guidCountReinit(5);
        expect(guid()).toEqual("00000000-0000-0000-0000-000000000006");
        expect(guid()).toEqual("00000000-0000-0000-0000-000000000007");
    });
});

describe('normalizeItem', () => {
    test('normalizeItem on emptyItem', () => {
        guidCountReinit();
        let normalizedItem = normalizeNewItem({}, 16);
        expect(normalizedItem).toEqual({ id: "00000000-0000-0000-0000-000000000001", x: 0, y: 0, alive: false, mass: 0, dna: '' });
    });
    test('normalizeItem on organic with mass', () => {
        guidCountReinit();
        let normalizedItem = normalizeNewItem({ mass: 15 }, 16);
        expect(normalizedItem).toEqual({ id: "00000000-0000-0000-0000-000000000001", x: 0, y: 0, alive: false, mass: 15, dna: '' });
    });
    test('normalizeItem on herbivore with mass', () => {
        guidCountReinit();
        let normalizedItem = normalizeNewItem({ mass: 15, dna: generateDna({ type: HERBIVORE }) }, 16);
        expect(normalizedItem).toEqual({ id: "00000000-0000-0000-0000-000000000001", x: 0, y: 0, alive: true, mass: 15, dna: '0000000000000000000000000000001' });
    });
    test('normalizeItem on carnivore with mass', () => {
        guidCountReinit();
        let normalizedItem = normalizeNewItem({ mass: 15, dna: generateDna({ type: CARNIVORE }) }, 16);
        expect(normalizedItem).toEqual({ id: "00000000-0000-0000-0000-000000000001", x: 0, y: 0, alive: true, mass: 15, dna: '0000000000000000000000000000010' });
    });
    test('normalizeItem on omnivore with mass', () => {
        guidCountReinit();
        let normalizedItem = normalizeNewItem({ mass: 15, dna: generateDna({ type: OMNIVORE }) }, 16);
        expect(normalizedItem).toEqual({ id: "00000000-0000-0000-0000-000000000001", x: 0, y: 0, alive: true, mass: 15, dna: '0000000000000000000000000000011' });
    });
});

const item1 = { id: "00000000-0000-0000-0000-000000000001", x: 5, y: 7, name: 'Test', mass: 5 };
const item2 = { id: "00000000-0000-0000-0000-000000000002", x: 9, y: 4, name: 'Tost', mass: 8 };
const item3 = { id: "00000000-0000-0000-0000-000000000003", x: 13, y: 2, name: 'Tist', mass: 11 };

const defaultItems = [item1, item2, item3];

const item4 = { id: "00000000-0000-0000-0000-000000000004", x: 17, y: 1, name: 'Tast', mass: 19 };
const movedItem2 = { id: "00000000-0000-0000-0000-000000000002", x: 11, y: 4, name: 'Tost', mass: 8 };
const changedItem2 = { id: "00000000-0000-0000-0000-000000000002", x: 9, y: 4, name: 'Tost', mass: 9 };
const conflictingItem4 = { id: "00000000-0000-0000-0000-000000000004", x: 9, y: 4, name: 'Tast', mass: 19 };
const winningItem4 = { id: "00000000-0000-0000-0000-000000000004", x: 9, y: 4, name: 'Tast', mass: 21 };

describe('updateItems', () => {
    test('update items nothing to update', () => {
        let items = updateItems(defaultItems, [], []);
        expect(items).toEqual(defaultItems);
    });

    test('update items with just add', () => {
        let items = updateItems(defaultItems, [], [item4]);
        expect(items).toEqual([...defaultItems, item4]);
    });

    test('update items with just move', () => {
        let items = updateItems(defaultItems, [item2], [movedItem2]);
        expect(items).toEqual([item1, movedItem2, item3]);
    });

    test('update items with just change', () => {
        let items = updateItems(defaultItems, [], [changedItem2]);
        expect(items).toEqual([item1, changedItem2, item3]);
    });

    test('update items with new winning item', () => {
        let items = updateItems(defaultItems, [item2, conflictingItem4], [winningItem4]);
        expect(items).toEqual([item1, item3, winningItem4]);
    });

    test('update items with new losing item', () => {
        let items = updateItems(defaultItems, [item2, conflictingItem4], [changedItem2]);
        expect(items).toEqual([item1, changedItem2, item3]);
    });
});

const emptyMap = [...Array(256).keys()].map(x => null);

describe('initMap', () => {
    test('initMap with no items', () => {
        let { items, map } = initMap(16);
        expect(items).toEqual([]);
        expect(map).toEqual([...Array(256).keys()].map(x => null));
    });
    test('initMap with item1', () => {
        let expectedMap = [...emptyMap];
        expectedMap[133] = item1;
        let { items, map } = initMap(16, [item1]);
        expect(items).toEqual([item1]);
        expect(map).toEqual(expectedMap);
    });
    test('initMap with defaultItems', () => {
        let expectedMap = [...emptyMap];
        expectedMap[133] = item1;
        expectedMap[73] = item2;
        expectedMap[45] = item3;
        let { items, map } = initMap(16, defaultItems);
        expect(items).toEqual([item1, item2, item3]);
        expect(map).toEqual(expectedMap);
    });
    test('initMap should ignore conflictingItems', () => {
        let expectedMap = [...emptyMap];
        expectedMap[133] = item1;
        expectedMap[73] = item2;
        expectedMap[45] = item3;
        let { items, map } = initMap(16, [...defaultItems, conflictingItem4]);
        expect(items).toEqual([item1, item2, item3]);
        expect(map).toEqual(expectedMap);
    });
});

const massMin = 7;
const massMax = 9;
const massFinal = 16;
const massFinalDoubleMin = 14;
const organic1Min = { ...item1, mass: massMin, dna: generateDna({ type: ORGANIC }) };
const herbivore1Min = { ...item1, mass: massMin, dna: generateDna({ type: HERBIVORE }) };
const carnivore1Min = { ...item1, mass: massMin, dna: generateDna({ type: CARNIVORE }) };
const omnivore1Min = { ...item1, mass: massMin, dna: generateDna({ type: OMNIVORE }) };
const organic1Max = { ...item1, mass: massMax, dna: generateDna({ type: ORGANIC }) };
const herbivore1Max = { ...item1, mass: massMax, dna: generateDna({ type: HERBIVORE }) };
const carnivore1Max = { ...item1, mass: massMax, dna: generateDna({ type: CARNIVORE }) };
const omnivore1Max = { ...item1, mass: massMax, dna: generateDna({ type: OMNIVORE }) };
const organic2Min = { ...item2, mass: massMin, dna: generateDna({ type: ORGANIC }) };
const herbivore2Min = { ...item2, mass: massMin, dna: generateDna({ type: HERBIVORE }) };
const carnivore2Min = { ...item2, mass: massMin, dna: generateDna({ type: CARNIVORE }) };
const omnivore2Min = { ...item2, mass: massMin, dna: generateDna({ type: OMNIVORE }) };
const organic2Max = { ...item2, mass: massMax, dna: generateDna({ type: ORGANIC }) };
const herbivore2Max = { ...item2, mass: massMax, dna: generateDna({ type: HERBIVORE }) };
const carnivore2Max = { ...item2, mass: massMax, dna: generateDna({ type: CARNIVORE }) };
const omnivore2Max = { ...item2, mass: massMax, dna: generateDna({ type: OMNIVORE }) };

const resolveItemsTest = (itemLeft, itemRight, isNull, expectedId, expectedMass) => {
    let item = resolveItems(itemLeft, itemRight);
    // console.log({itemLeft, itemRight, item});
    if (isNull) {
        expect(item).toEqual(null);
    } else {
        expect(item).not.toEqual(null);
        expect(item.id).toBe(expectedId);
        expect(item.mass).toBe(expectedMass);
    }
}

describe('resolveItems', () => {
    describe('resolveItems min vs max', () => {
        test('organicMin vs organicMax', () => resolveItemsTest(organic1Min, organic2Max, false, item1.id, massFinal));
        test('organicMin vs herbivoreMax', () => resolveItemsTest(organic1Min, herbivore2Max, false, item2.id, massFinal));
        test('organicMin vs carnivoreMax', () => resolveItemsTest(organic1Min, carnivore2Max, true));
        test('organicMin vs omnivoreMax', () => resolveItemsTest(organic1Min, omnivore2Max, false, item2.id, massFinal));

        test('herbivoreMin vs organicMax', () => resolveItemsTest(herbivore1Min, organic2Max, false, item1.id, massFinal));
        test('herbivoreMin vs herbivoreMax', () => resolveItemsTest(herbivore1Min, herbivore2Max, true));
        test('herbivoreMin vs carnivoreMax', () => resolveItemsTest(herbivore1Min, carnivore2Max, false, item2.id, massFinal));
        test('herbivoreMin vs omnivoreMax', () => resolveItemsTest(herbivore1Min, omnivore2Max, false, item2.id, massFinal));

        test('carnivoreMin vs organicMax', () => resolveItemsTest(carnivore1Min, organic2Max, true));
        test('carnivoreMin vs herbivoreMax', () => resolveItemsTest(carnivore1Min, herbivore2Max, false, item1.id, massFinal));
        test('carnivoreMin vs carnivoreMax', () => resolveItemsTest(carnivore1Min, carnivore2Max, true));
        test('carnivoreMin vs omnivoreMax', () => resolveItemsTest(carnivore1Min, omnivore2Max, false, item2.id, massFinal));

        test('omnivoreMin vs organicMax', () => resolveItemsTest(omnivore1Min, organic2Max, false, item1.id, massFinal));
        test('omnivoreMin vs herbivoreMax', () => resolveItemsTest(omnivore1Min, herbivore2Max, false, item1.id, massFinal));
        test('omnivoreMin vs carnivoreMax', () => resolveItemsTest(omnivore1Min, carnivore2Max, false, item1.id, massFinal));
        test('omnivoreMin vs omnivoreMax', () => resolveItemsTest(omnivore1Min, omnivore2Max, false, item2.id, massFinal));
    });
    describe('resolveItems max vs min', () => {
        test('organicMax vs organicMin', () => resolveItemsTest(organic1Max, organic2Min, false, item1.id, massFinal));
        test('organicMax vs herbivoreMin', () => resolveItemsTest(organic1Max, herbivore2Min, false, item2.id, massFinal));
        test('organicMax vs carnivoreMin', () => resolveItemsTest(organic1Max, carnivore2Min, true));
        test('organicMax vs omnivoreMin', () => resolveItemsTest(organic1Max, omnivore2Min, false, item2.id, massFinal));

        test('herbivoreMax vs organicMin', () => resolveItemsTest(herbivore1Max, organic2Min, false, item1.id, massFinal));
        test('herbivoreMax vs herbivoreMin', () => resolveItemsTest(herbivore1Max, herbivore2Min, true));
        test('herbivoreMax vs carnivoreMin', () => resolveItemsTest(herbivore1Max, carnivore2Min, false, item2.id, massFinal));
        test('herbivoreMax vs omnivoreMin', () => resolveItemsTest(herbivore1Max, omnivore2Min, false, item2.id, massFinal));

        test('carnivoreMax vs organicMin', () => resolveItemsTest(carnivore1Max, organic2Min, true));
        test('carnivoreMax vs herbivoreMin', () => resolveItemsTest(carnivore1Max, herbivore2Min, false, item1.id, massFinal));
        test('carnivoreMax vs carnivoreMin', () => resolveItemsTest(carnivore1Max, carnivore2Min, true));
        test('carnivoreMax vs omnivoreMin', () => resolveItemsTest(carnivore1Max, omnivore2Min, false, item2.id, massFinal));

        test('omnivoreMax vs organicMin', () => resolveItemsTest(omnivore1Max, organic2Min, false, item1.id, massFinal));
        test('omnivoreMax vs herbivoreMin', () => resolveItemsTest(omnivore1Max, herbivore2Min, false, item1.id, massFinal));
        test('omnivoreMax vs carnivoreMin', () => resolveItemsTest(omnivore1Max, carnivore2Min, false, item1.id, massFinal));
        test('omnivoreMax vs omnivoreMin', () => resolveItemsTest(omnivore1Max, omnivore2Min, false, item1.id, massFinal));
    });
    describe('resolveItems min vs min', () => {
        test('organicMin vs organicMin', () => resolveItemsTest(organic1Min, organic2Min, false, item1.id, massFinalDoubleMin));
        test('organicMin vs herbivoreMin', () => resolveItemsTest(organic1Min, herbivore2Min, false, item2.id, massFinalDoubleMin));
        test('organicMin vs carnivoreMin', () => resolveItemsTest(organic1Min, carnivore2Min, true));
        test('organicMin vs omnivoreMin', () => resolveItemsTest(organic1Min, omnivore2Min, false, item2.id, massFinalDoubleMin));

        test('herbivoreMin vs organicMin', () => resolveItemsTest(herbivore1Min, organic2Min, false, item1.id, massFinalDoubleMin));
        test('herbivoreMin vs herbivoreMin', () => resolveItemsTest(herbivore1Min, herbivore2Min, true));
        test('herbivoreMin vs carnivoreMin', () => resolveItemsTest(herbivore1Min, carnivore2Min, false, item2.id, massFinalDoubleMin));
        test('herbivoreMin vs omnivoreMin', () => resolveItemsTest(herbivore1Min, omnivore2Min, false, item2.id, massFinalDoubleMin));

        test('carnivoreMin vs organicMin', () => resolveItemsTest(carnivore1Min, organic2Min, true));
        test('carnivoreMin vs herbivoreMin', () => resolveItemsTest(carnivore1Min, herbivore2Min, false, item1.id, massFinalDoubleMin));
        test('carnivoreMin vs carnivoreMin', () => resolveItemsTest(carnivore1Min, carnivore2Min, true));
        test('carnivoreMin vs omnivoreMin', () => resolveItemsTest(carnivore1Min, omnivore2Min, false, item2.id, massFinalDoubleMin));

        test('omnivoreMin vs organicMin', () => resolveItemsTest(omnivore1Min, organic2Min, false, item1.id, massFinalDoubleMin));
        test('omnivoreMin vs herbivoreMin', () => resolveItemsTest(omnivore1Min, herbivore2Min, false, item1.id, massFinalDoubleMin));
        test('omnivoreMin vs carnivoreMin', () => resolveItemsTest(omnivore1Min, carnivore2Min, false, item1.id, massFinalDoubleMin));
        test('omnivoreMin vs omnivoreMin', () => resolveItemsTest(omnivore1Min, omnivore2Min, true));
    });
});

const showData = (size, { map, items }) => {
    let sizes = [...Array(size).keys()];
    let hasAlive = items.map(item => item.alive).reduce((acc, elem) => acc || elem);
    console.log(sizes.map(y => sizes.map(x => {
        let v = map[x + y * size];
        if (v === null) {
            return '. ';
        } else {
            if (hasAlive) {
                let props = extractProps(v);
                switch (props.type) {
                    case 0: return '* ';
                    case 1: return 'H ';
                    case 2: return 'C ';
                    case 3: return 'O ';
                }
            } else {
                return 'x ';
            }
        }
    }).join('')).join('\n'));
    console.log(items.map(item => JSON.stringify(item) + ' ' + JSON.stringify(extractProps(item))).join('\n'));
};

describe('move items', () => {
    test('moveItems on 4x4', () => {
        let size = 20;
        let data = initMap(size);
        data = insertItem(size, data.map, data.items, { x: 1, y: 1, mass: 30, alive: false });
        data = insertItem(size, data.map, data.items, { x: 1, y: 2, mass: 30, alive: false });
        data = insertItem(size, data.map, data.items, { x: 0, y: 3, mass: 30, alive: false });
        data = insertItem(size, data.map, data.items, { x: 3, y: 2, mass: 10, alive: false });
        data = insertItem(size, data.map, data.items, { x: 3, y: 0, mass: 10, alive: false });
        data = insertItem(size, data.map, data.items, { x: 4, y: 4, mass: 40, alive: false });
        data = insertItem(size, data.map, data.items, { x: 5, y: 2, mass: 12, alive: false });
        data = insertItem(size, data.map, data.items, { x: 2, y: 2, mass: 50, alive: true, dna: generateDna({ type: HERBIVORE }) });
        [...Array(500).keys()].forEach(() => {
            showData(size, data);
            data = moveItems(size, data.map, data.items);
        });
        showData(size, data);
        console.log(data.items.filter(item=>item.alive).map(item=>item.dna).sort().join('\n'));
    });
});
