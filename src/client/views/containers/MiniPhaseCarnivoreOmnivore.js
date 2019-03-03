import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ count }) => {
        let [d, h, c, o] = count;
        return [c, o]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Carnivore versus Omnivore (count)');
