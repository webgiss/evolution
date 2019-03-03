import MiniPhaseGeneric from "./MiniPhaseGeneric";

const extractValues = (history) => {
    return history.map(({ count }) => {
        let [d, h, c, o] = count;
        return [h, c]
    });
};

export default MiniPhaseGeneric(module, extractValues, 'Herbivore versus Carnivore (count)');
