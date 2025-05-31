import { createSlice } from "@/redux/tools/createSlice";
import { CARNIVORE, HERBIVORE, OMNIVORE, ORGANIC, ROCK } from "@/utils/constants/itemType";
import { initMap, insertItem, moveItems } from "@/utils/items";

const identifyItem = (item) => [
    item.type === ORGANIC || !(item.alive),
    item.type === HERBIVORE && item.alive,
    item.type === CARNIVORE && item.alive,
    item.type === OMNIVORE && item.alive,
];

const getHistoryFrame = (items) => {
    return Object.values(items)
        .reduce(
            (acc, item) => {
                const itemValues = identifyItem(item);
                return {
                    count: [0, 1, 2, 3].map(
                        k => acc.count[k] + (itemValues[k] ? 1 : 0)
                    ),
                    mass: [0, 1, 2, 3].map(
                        k => acc.mass[k] + (itemValues[k] ? item.mass : 0)
                    ),
                };
            },
            { count: [0, 0, 0, 0], mass: [0, 0, 0, 0] }
        );
}

const initialState = {
    size: 25,
    map: null,
    items: [],
    generation: 0,
    highlighted: null,
    history: [],

}

{
    const { items, map } = initMap(initialState.size, initialState.items);
    initialState.map = map;
    initialState.items = items;
}

const slice = createSlice({
    name: "evoMap",
    initialState,
    reducers: {
        upgradeTick(state) {
            let { size, map, items, history } = state;
            if (history.length === 0) {
                history.push(getHistoryFrame(items))
            }
            moveItems(size, map, items);
            history.push(getHistoryFrame(items))

            state.generation += 1;
        },
        highlightItem(state, action) {
            const { id } = action.payload;
            if (id === state.highlighted) {
                state.highlighted = null;
            } else {
                state.highlighted = id;
            }
        },
        reset(state) {
            state.size = initialState.size
            state.map.splice(0, state.map.length, ...initialState.map);
            const keys = Object.keys(state.items)
            keys.forEach(key => {
                delete state.items[key];
            });
            Object.keys(initialState.items).forEach(key => {
                state.items[key] = initialState.items[key]
            })
            state.generation = initialState.generation
            state.highlighted = initialState.highlighted
            state.history.splice(0, state.history.length, ...initialState.history)
            const initSet = [
                { x: 1, y: 1, mass: 30, alive: false },
                { x: 1, y: 2, mass: 30, alive: false },
                { x: 0, y: 3, mass: 30, alive: false },
                { x: 3, y: 2, mass: 10, alive: false },
                { x: 3, y: 0, mass: 10, alive: false },
                { x: 4, y: 4, mass: 40, alive: false },
                { x: 5, y: 2, mass: 12, alive: false },
                { x: 2, y: 2, mass: 50, alive: true, type: HERBIVORE }
            ];
            initSet.forEach(item => {
                insertItem(state.size, state.map, state.items, item);
            });
        },
        addLivingBioMass(state) {
            const item = { x: 0, y: 0, mass: 70, alive: true, type: HERBIVORE, dna: '' };
            insertItem(state.size, state.map, state.items, item);
        },
        swapWalls(state) {
            const items = [];
            const range = (n) => [...Array(n).keys()];
            range(20).forEach((y) => items.push({ x: 10, y, type: ROCK }));
            range(20).forEach((y) => items.push({ x: 11, y, type: ROCK }));
            range(20).forEach((y) => items.push({ x: 16, y: y + 12, type: ROCK }));
            range(20).forEach((y) => items.push({ x: 17, y: y + 12, type: ROCK }));
            items.forEach(item => {
                insertItem(state.size, state.map, state.items, item);
            });
        },

    },
})


export const {
    upgradeTick,
    highlightItem,
    reset,
    addLivingBioMass,
    swapWalls
} = slice.actions;

export default slice