import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ mass }) => {
        let [d, h, c, o] = mass;
        return [h, o]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Herbivore versus Omnivore (mass)');
