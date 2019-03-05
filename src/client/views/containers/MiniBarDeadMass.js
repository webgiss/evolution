import MiniBarGeneric from "./MiniBarGeneric";

const extractValue = (items) => items.filter(item=>!item.alive).map(item=>item.mass);

export default MiniBarGeneric(module, extractValue, 'Dead mass');
