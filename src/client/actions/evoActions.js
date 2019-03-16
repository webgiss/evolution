import { INSERT_ITEM, UPGRADE_TICK, HIGHLIGHT_ITEM, SWAP_WALLS } from "../constants/evoMap";
import { } from "babel-polyfill";
import { ROCK } from "../constants/itemprops";


export const addLivingBioMass = () => ({ type: INSERT_ITEM, item: { x: 0, y: 0, mass: 70, alive: true, type: 1, dna: '' } });
export const nextGeneration = () => ({ type: UPGRADE_TICK });
export const reset = () => async (dispatch) => {
    dispatch({ type: "RESET" });
    try {
        const initSet = [
            { x: 1, y: 1, mass: 30, alive: false },
            { x: 1, y: 2, mass: 30, alive: false },
            { x: 0, y: 3, mass: 30, alive: false },
            { x: 3, y: 2, mass: 10, alive: false },
            { x: 3, y: 0, mass: 10, alive: false },
            { x: 4, y: 4, mass: 40, alive: false },
            { x: 5, y: 2, mass: 12, alive: false },
            { x: 2, y: 2, mass: 50, alive: true, type: 1 }
        ];
        // const initSet = [
        //     { x: 1, y: 1, mass: 3, alive: false },
        //     { x: 1, y: 2, mass: 3, alive: false },
        //     { x: 0, y: 3, mass: 3, alive: false },
        //     { x: 3, y: 2, mass: 1, alive: false },
        //     { x: 3, y: 0, mass: 1, alive: false },
        //     { x: 2, y: 2, mass: 5, alive: true, type: 1 }
        // ];

        initSet.map(item => dispatch({ type: INSERT_ITEM, item }));
    } catch (err) {
    }
};
export const swapWalls = () => async (dispatch) => {
    const range = (n) => [...Array(n).keys()];
    range(20).forEach((y) => dispatch({ type: SWAP_WALLS, wall: { x: 10, y, type: ROCK } }));
    range(20).forEach((y) => dispatch({ type: SWAP_WALLS, wall: { x: 11, y, type: ROCK } }));
    range(20).forEach((y) => dispatch({ type: SWAP_WALLS, wall: { x: 16, y:y+12, type: ROCK } }));
    range(20).forEach((y) => dispatch({ type: SWAP_WALLS, wall: { x: 17, y:y+12, type: ROCK } }));
}

export const highlight = (id) => ({ type: HIGHLIGHT_ITEM, id });
