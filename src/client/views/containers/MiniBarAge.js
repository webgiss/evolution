import MiniBarGeneric from "./MiniBarGeneric";

const extractValue = (items) => items.filter(item=>item.alive).map(item=>item.age);

export default MiniBarGeneric(module, extractValue, 'Age');
