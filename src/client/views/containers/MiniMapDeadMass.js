import MiniMapGeneric from "./MiniMapGeneric";
import { ORGANIC } from "../../constants/itemprops";

const getConst = (state) => {
    let masses = state.evoMap.items.filter(item => item && item.mass).map(item => item.mass);
    let maxMass = masses && masses.length >= 1 ? masses.reduce((acc, elem) => elem > acc ? elem : acc) : 1;
    return maxMass;
};

const extractValue = (item, maxMass) => {
    if (!item || !(item.mass) || !(item.type === ORGANIC || !(item.alive))) {
        return null;
    }
    return item.mass / maxMass;
};

export default MiniMapGeneric(module, extractValue, getConst, 'Dead biomass by mass');
