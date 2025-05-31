import guid from './guid';
import random from './random';
import { extractProps, generateDna, mutate } from './itemprops';

import { ORGANIC, HERBIVORE, CARNIVORE, OMNIVORE, ROCK } from '@/utils/constants/itemType';

const normalizeValueOnSize = (value, size) => ((value || 0) + size) % size;
export const normalizeNewItem = (item, size) => {
    // console.log('normalizeItem', {item, size});
    let id = item.id || guid();
    let x = normalizeValueOnSize(item.x, size);
    let y = normalizeValueOnSize(item.y, size);
    if (item.type === ROCK) {
        return { ...item, type: ROCK, id, x, y, alive: false, mass: 0 };
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

export const normalizeItem = (item, size) => {
    if (!item.id) {
        item.id = guid();
    }
    item.x = normalizeValueOnSize(item.x, size);
    item.y = normalizeValueOnSize(item.y, size);
    const props = extractProps(item);
    item.dna = generateDna(props);
    item.alive = (props.type !== ORGANIC && props.type !== ROCK);
    item.mass = item.mass || 0;
    item.type = props.type || item.type || 0;
    item.dnaValues = props;
    if (item.type == OMNIVORE) {
        item.type = HERBIVORE;
    }
}

export const resolveItems = (item1, item2) => {
    // console.log('resolveItems', {item1, item2});

    if (!item1) {
        return item2
    }
    if (!item2) {
        return item1
    }

    let type1 = item1.type;
    let type2 = item2.type;

    if ((!item1.alive) && (item1.type !== ROCK)) {
        type1 = ORGANIC;
    }
    if ((!item2.alive) && (item2.type !== ROCK)) {
        type2 = ORGANIC;
    }

    let mass = item1.mass + item2.mass;
    let item = null;

    switch (type1) {
        case ORGANIC:
            {
                switch (type2) {
                    case ORGANIC: item = item1; break;
                    case HERBIVORE: item = item2; break;
                    case CARNIVORE: break;
                    case OMNIVORE: item = item2; break;
                    case ROCK: break;
                }
                break;
            }
        case HERBIVORE:
            {
                switch (type2) {
                    case ORGANIC: item = item1; break;
                    case HERBIVORE: break;
                    case CARNIVORE: item = item2; break;
                    case OMNIVORE: item = item2; break;
                    case ROCK: break;
                }
                break;
            }
        case CARNIVORE:
            {
                switch (type2) {
                    case ORGANIC: break;
                    case HERBIVORE: item = item1; break;
                    case CARNIVORE: item = item1.mass === item2.mass ? null : (item1.mass > item2.mass ? item1 : item2); break;
                    case OMNIVORE: item = item1.mass === item2.mass ? null : (item1.mass > item2.mass ? item1 : item2); break;
                    case ROCK: break;
                }
                break;
            }
        case OMNIVORE:
            {
                switch (type2) {
                    case ORGANIC: item = item1; break;
                    case HERBIVORE: item = item1; break;
                    case CARNIVORE: item = item1.mass === item2.mass ? null : (item1.mass > item2.mass ? item1 : item2); break;
                    case OMNIVORE: item = item1.mass === item2.mass ? null : (item1.mass > item2.mass ? item1 : item2); break;
                    case ROCK: break;
                }
                break;
            }
        case ROCK:
            break;
        default:
            console.warn('Unknown item type', { item1, item2 });
            break;
    }
    if (item) {
        item.mass = mass;
    }
    return item
};

export const initMap = (size, oldItems = {}) => {
    // console.log('initMap', {size, oldItems});
    let map = [...Array(size * size).keys()].map(x => null);
    let items = {};
    Object.values(oldItems).forEach((item) => {
        let { x, y, id } = item;
        x = normalizeValueOnSize(x, size);
        y = normalizeValueOnSize(y, size);
        let existingItem = map[x + y * size];
        if (!existingItem) {
            map[x + y * size] = id;
            items[id] = item;
        }
    });
    return { items, map };
}

const findNewPosition = (speed, x, y, size) => {
    // console.log('findNewPosition', { speed, x, y, size });
    let speedx = random(speed + 1);
    let speedy = speed - speedx;
    speedx = (random(2) * 2 - 1) * speedx;
    speedy = (random(2) * 2 - 1) * speedy;
    const result = { newX: normalizeValueOnSize(x + speedx, size), newY: normalizeValueOnSize(y + speedy, size) };
    // console.log('/findNewPosition', { result });
    return result;
}

const addItemToMap = (map, size, items, item) => {
    const { x, y } = item;
    const index = x + y * size;
    if (map[index] !== null) {
        console.warn('addItemToMap: Position already occupied', { item, map, size, items });
    }
    map[index] = item.id;
    items[item.id] = item;
}

export const moveItem = (size, map, items, item) => {
    // console.log('moveItem', {size, map, items, item});
    if (item.alive) {
        let dnaValues = item.dnaValues;
        let { speed, minAge, maxDeltaAge } = dnaValues;
        const { x, y, mass } = item;
        const { id } = item;
        let maxAge = minAge + maxDeltaAge;
        let currentItemId = item.id;

        // Age
        item.age = (item.age || 0) + 1;

        // Resolve move
        let retry = 3;
        let movedItem = null
        while (!movedItem && retry > 0) {
            let { newX, newY } = findNewPosition(random(speed - 1) + 1, x, y, size);
            if (newX !== x || newY !== y) {
                let targetItemId = map[newX + newY * size];
                if (targetItemId && items[targetItemId]) {
                    const targetItem = items[targetItemId]
                    const targetItemMass = targetItem.mass || 0;
                    if (targetItemId !== id) {
                        movedItem = resolveItems(item, targetItem);
                        if (movedItem !== null) {
                            movedItem.x = newX;
                            movedItem.y = newY;
                            map[x + y * size] = null;
                            map[newX + newY * size] = movedItem.id;
                            if (movedItem.id !== targetItemId) {
                                if (targetItem.alive) {
                                    targetItem.alive = false;
                                }
                                delete items[targetItemId]
                            }
                            if (movedItem.id !== id) {
                                if (item.alive) {
                                    item.alive = false;
                                }
                                delete items[id]
                            }
                            // console.log(`Item ${id} moved from (${x}, ${y}) [${mass}] to (${newX}, ${newY}) and merged with item ${targetItemId} [${targetItemMass}] (Winner:${movedItem.id} [${movedItem.mass}])`);
                        }
                    }
                } else {
                    // console.log(`Item ${id} moved from (${x}, ${y}) [${mass}] to (${newX}, ${newY})`);
                    item.x = newX
                    item.y = newY
                    map[x + y * size] = null;
                    map[newX + newY * size] = id;
                    movedItem = item
                }
            }
            retry -= 1;
        }

        if (movedItem) {
            if (movedItem.id === id) {
                if ((random(dnaValues.dejecRateDen) < dnaValues.dejecRate) && (item.mass > dnaValues.minDejecMass)) {
                    let dejec = normalizeNewItem({ x, y, mass: 1, alive: false, dna: '', parent: item.id }, size);
                    movedItem.mass -= 1;
                    addItemToMap(map, size, items, dejec);
                    // console.log(`Item ${id} on (${movedItem.x},${movedItem.y}) [${movedItem.mass}] created excrement on (${x}, ${y}) with mass 1`);
                }
            }
        }

        // Resolve death
        if (item && item.alive && (!movedItem || movedItem.id === id)) {
            if (item.age >= maxAge || (item.age >= minAge && random(5) == 0)) {
                // console.log(`Item ${id} [${item.mass}] died at age ${item.age} (maxAge: ${maxAge})`);
                item.alive = false;
            }
        }

        // Resolve birth
        if (item && item.alive) {
            if (item.mass >= dnaValues.minReproMass) {
                if (random(dnaValues.reproRateDen) < dnaValues.reproRate) {
                    let placed = false;
                    let positions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
                    positions.forEach((position) => {
                        if (!placed) {
                            let newX = normalizeValueOnSize(x + position[0], size);
                            let newY = normalizeValueOnSize(y + position[1], size);
                            let index = x + y * size;
                            let newIndex = newX + newY * size;
                            if (map[newIndex] === null) {
                                let newBirthMass = Math.floor(item.mass / 3);
                                if (newBirthMass < 1) {
                                    newBirthMass = 1;
                                }
                                let childItem = normalizeNewItem({ x: newX, y: newY, mass: newBirthMass, alive: true, dna: mutate(dnaValues, item.dna), parent: item.id }, size);
                                item.mass -= newBirthMass
                                addItemToMap(map, size, items, childItem);
                                placed = true;
                                // console.log(`Item ${id} [${item.mass}] gave birth to a new item ${childItem.id} at (${newX}, ${newY}) with mass ${newBirthMass}`);
                            }
                        }
                    })
                }
            }
        }
    }
}

export const moveItems = (size, map, items) => {
    // console.log('moveItems', {size, map, items});
    Object.keys(items).forEach((id) => {
        const item = items[id];
        if (item && item.alive) {
            // console.log(`Processing item ${id}`);
            moveItem(size, map, items, item);
        }
    });


    Object.values(items).forEach((item) => {
        if (item.type != ORGANIC && item.alive) {
            item.dna = mutate(item.dnaValues, item.dna)
            normalizeItem(item, size);
        }
    })
};

export const insertItem = (size, map, items, item) => {
    // console.log('insertItem', { size, map, items, item });
    item = normalizeNewItem(item, size);
    let { x, y } = item;
    let existingItemId = map[x + y * size];
    if (!existingItemId) {
        map[x + y * size] = item.id;
        items[item.id] = item
    } else {
        let newItem = resolveItems(item, items[existingItemId]);
        if (!newItem) {
            console.warn('insertItem: Can\'t insert item', { item, existingItemId, map, items });
        } else {
            if (newItem.id !== existingItemId) {
                delete items[existingItemId];
            }
            if (newItem.id === item.id) {
                items[item.id] = item
            }
            if (map[x + y * size] !== newItem.id) {
                map[x + y * size] = newItem.id;
            }
        }
    }
}
