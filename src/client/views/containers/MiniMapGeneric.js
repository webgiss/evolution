import actions from "../../actions";
import MiniMap from "../components/MiniMap";
import hot from './utils/hot';

export default (mod, extractValue, getConst, description) => {
    const MapStateToProps = (state) => {
        let constValue = getConst(state);

        return {
            map: state.evoMap.map || [],
            size: state.evoMap.size,
            highlighted: state.evoMap.highlighted,
            popupTitle: 'Mini map',
            popupContent: description,
            extractValue: (item) => {
                return extractValue(item, constValue);
            },
        };
    };

    const MapDispatchToProps = (dispatch) => {
        window.dispatch = dispatch;

        return {
            onHighlight: (id) => dispatch(actions.evoActions.highlight(id)),
        };
    };
    return hot(mod, MapStateToProps, MapDispatchToProps, MiniMap);
}

