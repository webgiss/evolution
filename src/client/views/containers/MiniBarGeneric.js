import hot from './utils/hot';
import MiniBar from "../components/MiniBarCanvas";

export default (mod, extractValues, description, step) => {
    const MapStateToProps = (state) => {
        return {
            values: extractValues(state.evoMap.items),
            step,
            popupTitle: 'Mini bar',
            popupContent: description,
        };
    };

    const MapDispatchToProps = (dispatch) => {
        return {
        };
    };

    return hot(mod, MapStateToProps, MapDispatchToProps, MiniBar);
}

