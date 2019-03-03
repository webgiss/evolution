import MiniMapGeneric from "./MiniMapGeneric";
import { CARNIVORE } from "../../constants/itemprops";

const getConst = (state) => {
    return null;
};

const extractValue = (item) => {
    if (!item) {
        return null;
    }
    return (item.type === CARNIVORE && item.alive) ? 1 : 0;
};

export default MiniMapGeneric(module, extractValue, getConst, 'Carnivores');
