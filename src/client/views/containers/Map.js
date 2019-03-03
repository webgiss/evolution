import actions from "../../actions";
import Map from "../components/Map";
import hot from './utils/hot';

const MapStateToProps = (state) => {
    return {
        map: state.evoMap.map || [],
        size: state.evoMap.size,
        highlighted: state.evoMap.highlighted,
    };
};

const MapDispatchToProps = (dispatch) => {
    window.dispatch = dispatch;

    return {
        onHighlight: (id) => dispatch(actions.evoActions.highlight(id)),
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, Map);
