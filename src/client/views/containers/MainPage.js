import actions from "../../actions";
import MainPage from "../components/MainPage";
import hot from './utils/hot';

const MapStateToProps = (state) => {
    return {
    };
};

const MapDispatchToProps = (dispatch) => {
    return {
        onKeyPress: (keyCode,e) => {
            console.log('onKeyPress',e);
            switch (keyCode) {
                case 13:
                {
                    dispatch(actions.evoActions.highlight(id));
                    return true;
                }
            }
            return false;
            
        },
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, MainPage);
