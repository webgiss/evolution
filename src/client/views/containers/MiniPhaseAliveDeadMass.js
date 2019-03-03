import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ mass }) => {
        let [d, h, c, o] = mass;
        return [d, h + c + o]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Dead versus Living (mass)');
