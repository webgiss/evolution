import MiniMapGeneric from "./MiniMapGeneric";
import { OMNIVORE } from "../../constants/itemprops";

const getConst = (state) => {
    return null;
};

const extractValue = (item) => {
    if (!item) {
        return null;
    }
    return (item.type === OMNIVORE && item.alive) ? 1 : 0;
};

export default MiniMapGeneric(module, extractValue, getConst, 'Omnivores');
