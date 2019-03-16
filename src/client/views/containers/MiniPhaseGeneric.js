import hot from './utils/hot';
import MiniPhase from "../components/MiniPhaseCanvas";

export default (mod, extractValues, description) => {
    const MapStateToProps = (state) => {
        return {
            points: extractValues(state.evoMap.history),
            popupTitle: 'Mini phase',
            popupContent: description,
        };
    };

    const MapDispatchToProps = (dispatch) => {
        return {
        };
    };

    return hot(mod, MapStateToProps, MapDispatchToProps, MiniPhase);
}

