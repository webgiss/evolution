import actions from "../../actions";
import HighlightedDetail from "../components/HighlightedDetail";
import hot from './utils/hot';

const MapStateToProps = (state) => {
    return {
        item: state.evoMap.items.filter(i => i.id === state.evoMap.highlighted)[0],
    };
};

const MapDispatchToProps = (dispatch) => {
    return {
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, HighlightedDetail);
