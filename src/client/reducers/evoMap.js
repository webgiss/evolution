import { UPGRADE_TICK, INSERT_ITEM, HIGHLIGHT_ITEM } from "../constants/evoMap";
import { initMap, insertItem, moveItems } from './utils/items';

const initialState = {
    size: 25,
    map: null,
    items: [],
    generation: 0,
    highlighted: null,
    history: [],
};

const identifyItem = (item) => [
    item.type === 0 || !(item.alive), 
    item.type === 1 && item.alive,
    item.type === 2 && item.alive,
    item.type === 3 && item.alive,
];

const getHistoryFrame = (items) => {
    return items
        .reduce(
            (acc, item) => {
                const itemValues = identifyItem(item);
                return {
                    count: [0,1,2,3].map(
                        k => acc.count[k] + (itemValues[k] ? 1 : 0)
                    ),
                    mass: [0,1,2,3].map(
                        k => acc.mass[k] + (itemValues[k] ? item.mass : 0)
                    ),
                };
            },
            {count:[0,0,0,0], mass:[0,0,0,0]}
        );
}

export default (state, action) => {
    state = state || initialState;

    if (!state.map) {
        let { items, map } = initMap(state.size, state.items);
        state = { ...state, map, items };
    }

    switch (action.type) {
        case UPGRADE_TICK:
            {
                let { size, map, items, generation, history } = state;
                if (history.length === 0) {
                    history = [
                        ...history, 
                        getHistoryFrame(items)
                    ];
                }
                let data = moveItems(size, map, items);
                history = [
                    ...history, 
                    getHistoryFrame(data.items)
                ];

                state = { ...state, map: data.map, items: data.items, generation: generation + 1, history };
                break;
            }
        case INSERT_ITEM:
            {
                let { map, items } = insertItem(state.size, state.map, state.items, action.item);
                state = { ...state, map, items }
                break;
            }
        case HIGHLIGHT_ITEM:
            {
                let highlighted = action.id;
                if (highlighted === state.highlighted) {
                    highlighted = null;
                }
                state = { ...state, highlighted };
                break;
            }
        case "RESET":
            {
                state = initialState;
                break;
            }
    }

    window.state = state;

    return state;
};

