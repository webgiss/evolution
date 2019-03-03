import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ count }) => {
        let [d, h, c, o] = count;
        return [h, o]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Herbivore versus Omnivore (count)');
