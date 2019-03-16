import actions from "../../actions";
import EvoControl from "../components/EvoControl";
import hot from './utils/hot';

const MapStateToProps = (state) => {
    return {};
};

const MapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(actions.evoActions.reset()),
        onNextGen: () => dispatch(actions.evoActions.nextGeneration()),
        onAddBioMass: () => dispatch(actions.evoActions.addLivingBioMass()),
        onSwapWalls: () => dispatch(actions.evoActions.swapWalls()),
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, EvoControl);
