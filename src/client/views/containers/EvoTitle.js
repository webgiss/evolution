import EvoTitle from "../components/EvoTitle";
import hot from './utils/hot';

const sumReducer = (acc, value) => acc + value;
const massMapper = item => item.mass;
const countMapper = item => 1;

const MapStateToProps = (state) => {
    return {
        generation: state.evoMap.generation,
        totalBioMass: state.evoMap.items.map(massMapper).reduce(sumReducer, 0),
        organicBioMass: state.evoMap.items.filter(item => (!item.alive) || item.type === 0).map(massMapper).reduce(sumReducer, 0),
        herbivoreBioMass: state.evoMap.items.filter(item => item.alive && item.type === 1).map(massMapper).reduce(sumReducer, 0),
        carnivoreBioMass: state.evoMap.items.filter(item => item.alive && item.type === 2).map(massMapper).reduce(sumReducer, 0),
        omnivoreBioMass: state.evoMap.items.filter(item => item.alive && item.type === 3).map(massMapper).reduce(sumReducer, 0),
        totalCount: state.evoMap.items.map(countMapper).reduce(sumReducer, 0),
        organicCount: state.evoMap.items.filter(item => (!item.alive) || item.type === 0).map(countMapper).reduce(sumReducer, 0),
        herbivoreCount: state.evoMap.items.filter(item => item.alive && item.type === 1).map(countMapper).reduce(sumReducer, 0),
        carnivoreCount: state.evoMap.items.filter(item => item.alive && item.type === 2).map(countMapper).reduce(sumReducer, 0),
        omnivoreCount: state.evoMap.items.filter(item => item.alive && item.type === 3).map(countMapper).reduce(sumReducer, 0),
    };
};

const MapDispatchToProps = (dispatch) => {
    return {
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, EvoTitle);
