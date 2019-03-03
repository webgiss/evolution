import MiniMapGeneric from "./MiniMapGeneric";

const getConst = (state) => {
    let ages = state.evoMap.items.filter(item=>item && item.age).map(item=>item.age);
    let maxAge = ages && ages.length>=1 ? ages.reduce((acc,elem)=>elem>acc ? elem : acc) : 1;
    return maxAge;
};

const extractValue = (item, maxAge) => {
    if (!item || !(item.age) || !(item.alive)) {
        return null;
    }
    return item.age/maxAge;
};

export default MiniMapGeneric(module, extractValue, getConst, 'Living items by age');
