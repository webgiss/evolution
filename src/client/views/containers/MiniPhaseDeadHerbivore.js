import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ count }) => {
        let [d, h, c, o] = count;
        return [d, h]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Dead versus Herbivores (count)');
