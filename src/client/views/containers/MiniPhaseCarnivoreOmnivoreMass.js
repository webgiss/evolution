import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ mass }) => {
        let [d, h, c, o] = mass;
        return [c, o]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Carnivore versus Omnivore (mass)');
