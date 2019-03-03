import actions from "../../actions";
import ItemList from "../components/ItemList";
import hot from './utils/hot';

const MapStateToProps = (state) => {
    console.log({items:state.evoMap.items,});
    return {
        items: state.evoMap.items,
        highlighted: state.evoMap.highlighted,
    };
};

const MapDispatchToProps = (dispatch) => {
    window.dispatch = dispatch;

    return {
        onHighlight: (id) => dispatch(actions.evoActions.highlight(id)),
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, ItemList);
