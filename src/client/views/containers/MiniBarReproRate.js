import MiniBarGeneric from "./MiniBarGeneric";

const extractValue = (items) => items.filter(item=>item.alive).map(item=>item.dnaValues.reproRate/item.dnaValues.reproRateDen);

export default MiniBarGeneric(module, extractValue, 'Reproduction rate', 0.1);
