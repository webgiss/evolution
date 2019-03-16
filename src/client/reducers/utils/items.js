import guid from './guid';
import random from './random';
import { extractProps, generateDna, mutate } from './itemprops';

import { ORGANIC, HERBIVORE, CARNIVORE, OMNIVORE, ROCK } from '../../constants/itemprops';

const normalizeValueOnSize = (value, size) => ((value || 0) + size) % size;
export const normalizeItem = (item, size) => {
    let id = item.id || guid();
    let x = normalizeValueOnSize(item.x, size);
    let y = normalizeValueOnSize(item.y, size);
    if (item.type === ROCK) {
        return { ...item, type: ROCK, id, x, y, alive: false, mass: 0};
    }
    let props = extractProps(item);
    let dna = generateDna(props);
    let alive = (props.type !== ORGANIC && props.type !== ROCK);
    let mass = item.mass || 0;
    let type = props.type || item.type || 0;
    let dnaValues = props;
    if (type == OMNIVORE) {
       type = HERBIVORE;
    }
    item = { ...item, type, id, x, y, alive, mass, dna, dnaValues };
    return item;
};

export const resolveItems = (item1, item2) => {
    let type1 = item1.type;
    let type2 = item2.type;
    if (! item1.alive) {
        type1 = 0;
        if (item1.type === ROCK) {
            type1 = 4;
        }
    }
    if (! item2.alive) {
        type2 = 0;
        if (item2.type === ROCK) {
            type2 = 4;
        }
    }

    let mass = item1.mass + item2.mass;

    switch (type1) {
        case ORGANIC:
            {
                switch (type2) {
                    case ORGANIC: return { ...item1, mass };
                    case HERBIVORE: return { ...item2, mass };
                    case CARNIVORE: return null;
                    case OMNIVORE: return { ...item2, mass };
                }
                break;
            }
        case HERBIVORE:
            {
                switch (type2) {
                    case ORGANIC: return { ...item1, mass };
                    case HERBIVORE: return null;
                    case CARNIVORE: return { ...item2, mass };
                    case OMNIVORE: return { ...item2, mass };
                }
                break;
            }
        case CARNIVORE:
            {
                switch (type2) {
                    case ORGANIC: return null;
                    case HERBIVORE: return { ...item1, mass };
                    case CARNIVORE: return item1.mass === item2.mass ? null : (item1.mass > item2.mass ? { ...item1, mass } : { ...item2, mass });
                    case OMNIVORE: return item1.mass === item2.mass ? null : (item1.mass > item2.mass ? { ...item1, mass } : { ...item2, mass });
                }
                break;
            }
        case OMNIVORE:
            {
                switch (type2) {
                    case ORGANIC: return { ...item1, mass };
                    case HERBIVORE: return { ...item1, mass };
                    case CARNIVORE: return item1.mass === item2.mass ? null : (item1.mass > item2.mass ? { ...item1, mass } : { ...item2, mass });
                    case OMNIVORE: return item1.mass === item2.mass ? null : (item1.mass > item2.mass ? { ...item1, mass } : { ...item2, mass });
                }
                break;
            }
    }
    return null;
};

const createIdMap = items => items.reduce((acc, elem) => {
    acc[elem.id] = elem;
    return acc;
}, {});

const createIdSet = items => new Set(items.map(item => item.id));

export const updateItems = (items, removed, added) => {
    let removedSet = createIdSet(removed);
    let addedMap = createIdMap(added);
    let itemsSet = createIdSet(items);

    return [...items, ...added.filter(item => !itemsSet.has(item.id))]
        .filter(item => !(removedSet.has(item.id) && addedMap[item.id] === undefined))
        .map(item => addedMap[item.id] === undefined ? item : addedMap[item.id])
        ;
}

export const initMap = (size, oldItems = []) => {
    let map = [...Array(size * size).keys()].map(x => null);
    let items = [];
    oldItems.forEach(item => {
        let { x, y } = item;
        x = normalizeValueOnSize(x, size);
        y = normalizeValueOnSize(y, size);
        let existingItem = map[x + y * size];
        if (!existingItem) {
            map[x + y * size] = item;
            items.push(item);
        }
    });
    return { items, map };
}

const findNewPosition = (speed, x, y, size) => {
    let speedx = random(speed + 1);
    let speedy = speed - speedx;
    speedx = (random(2) * 2 - 1) * speedx;
    speedy = (random(2) * 2 - 1) * speedy;
    return { newX: normalizeValueOnSize(x + speedx, size), newY: normalizeValueOnSize(y + speedy, size) };
}

export const moveItem = (size, map, items, item) => {
    if (item.alive) {
        let dnaValues = item.dnaValues;
        let { speed, minAge, maxDeltaAge } = dnaValues;
        let { x, y, mass, dna } = item;
        let maxAge = minAge + maxDeltaAge;
        let currentItemId = item.id;

        // Age
        map = [...map];
        {
            let newItem = { ...item, age: (item.age || 0) + 1 };
            items = updateItems(items, [item], [newItem]);
            item = newItem;
        }

        // Resolve move
        let retry = 3;
        let moved = false;
        while (!moved && retry > 0) {
            let { newX, newY } = findNewPosition(random(speed - 1) + 1, x, y, size);
            if (newX !== x || newY !== y) {
                let targetItem = map[newX + newY * size];
                if (targetItem) {
                    if (targetItem.id !== item.id) {
                        let newItem = resolveItems({ ...item, x: newX, y: newY }, targetItem, dnaValues);
                        if (newItem !== null) {
                            items = updateItems(items, [item, targetItem], [newItem]);
                            map[x + y * size] = null;
                            map[newX + newY * size] = newItem;
                            item = newItem;
                            moved = true;
                        }
                    }
                } else {
                    let newItem = { ...item, x: newX, y: newY };
                    items = updateItems(items, [item], [newItem]);
                    map[x + y * size] = null;
                    map[newX + newY * size] = newItem;
                    item = newItem;
                    moved = true;
                }
            }
            retry -= 1;
        }

        if (moved) {
            if (currentItemId === item.id) {
                if (random(dnaValues.dejecRateDen) < dnaValues.dejecRate && item.mass > dnaValues.minDejecMass) {
                    let dejec = normalizeItem({ x, y, mass: 1, alive: false, dna: '', parent: item.id }, size);
                    let newItem = { ...item, mass: item.mass - 1 };
                    items = updateItems(items, [item], [newItem, dejec]);
                    map[x + y * size] = dejec;
                    item = newItem;
                    x = item.x;
                    y = item.y;
                    mass = item.mass;
                    map[x + y * size] = item;
                } else {
                    x = item.x;
                    y = item.y;
                    mass = item.mass;
                }
            } else {
                item = null;
            }
        } else {
            // item has aged anyway
            items = updateItems(items, [], [item]);
            map[x + y * size] = item;
        }

        // Resolve death
        if (item) {
            if (item.age >= maxAge || (item.age >= minAge && random(5) == 0)) {
                let newItem = { ...item, alive: false };
                items = updateItems(items, [item], [newItem]);
                map[x + y * size] = newItem;
                item = null;
            }
        }

        // Resolve birth
        if (item) {
            if (mass >= dnaValues.minReproMass) {
                if (random(dnaValues.reproRateDen) < dnaValues.reproRate) {
                    let placed = false;
                    let positions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
                    positions.forEach(position => {
                        if (!placed) {
                            let newX = normalizeValueOnSize(x + position[0], size);
                            let newY = normalizeValueOnSize(y + position[1], size);
                            let index = x + y * size;
                            let newIndex = newX + newY * size;
                            if (map[newIndex] === null) {
                                let newBirthMass = Math.floor(item.mass / 3);
                                if (newBirthMass<1) {
                                    newBirthMass = 1;
                                }
                                let childItem = normalizeItem({ x: newX, y: newY, mass: newBirthMass, alive: true, dna: mutate(dnaValues, item.dna), parent: item.id }, size);
                                let newItem = { ...item, mass: item.mass - newBirthMass };
                                map[index] = newItem;
                                map[newIndex] = childItem;
                                items = updateItems(items, [item], [newItem, childItem]);
                                item = newItem;
                                placed = true;
                            }
                        }
                    })
                }
            }
        }
    }
    return { map, items };
};

export const moveItems = (size, map, items) => {
    items.forEach(itemX => {
        let id = itemX.id;
        let item = items.filter(it => it.id === id)[0];
        if (item) {
            let newProps = moveItem(size, map, items, item);
            map = newProps.map;
            items = newProps.items;
        }
    });
    let itemById = {};
    items.forEach(item => {
        if (item.type != 0 && item.alive) {
            let newItem = normalizeItem({...item, dna: mutate(item.dnaValues, item.dna)}, size);
            itemById[newItem.id] = newItem;
        } else {
            itemById[item.id] = item;
        }
    });
    items = items.map(item=>itemById[item.id]);
    map = map.map(item=>item ? itemById[item.id] : null);
    return { map, items };
};

export const insertItem = (size, map, items, item) => {
    item = normalizeItem(item, size);
    let { x, y } = item;
    map = [...map];
    let existingItem = map[x + y * size];
    if (!existingItem) {
        map[x + y * size] = item;
        items = [...items, item];
    } else {
        let newItem = resolveItems(item, existingItem);
        map[x + y * size] = newItem;
        items = updateItems(items, [item, existingItem], [newItem]);
    }

    return { map, items };
}
