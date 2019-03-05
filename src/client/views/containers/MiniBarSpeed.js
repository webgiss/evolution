import MiniBarGeneric from "./MiniBarGeneric";

const extractValue = (items) => items.filter(item=>item.alive).map(item=>item.dnaValues.speed);

export default MiniBarGeneric(module, extractValue, 'Speed');
