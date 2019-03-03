import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ mass }) => {
        let [d, h, c, o] = mass;
        return [d, h]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Dead versus Herbivores (mass)');
