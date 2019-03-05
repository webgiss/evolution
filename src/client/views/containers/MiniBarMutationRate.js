import MiniBarGeneric from "./MiniBarGeneric";

const extractValue = (items) => items.filter(item=>item.alive).map(item=>item.dnaValues.gmr/item.dnaValues.gmrDen);

export default MiniBarGeneric(module, extractValue, 'Mutation rate', 0.001);
