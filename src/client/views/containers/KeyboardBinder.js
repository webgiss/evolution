import React from 'react';
import actions from "../../actions";
import hot from './utils/hot';

class KeyboardBinder extends React.Component {
    constructor(props) {
        super(props);
        this._onKey = (e) => this.onKey(e);
    }
    componentWillMount() {
        document.body.addEventListener('keydown', this._onKey);
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this._onKey);
    }
    onKey(e) {
        switch (e.code) {
            case 'NumpadAdd':
                {
                    this.props.onNextGen();
                    return true;
                }
            case 'NumpadMultiply':
                {
                    this.props.onReset();
                    return true;
                }
            case 'NumpadDivide':
                {
                    this.props.onAddLivingBioMass();
                    return true;
                }
        }
        return false;
    }
    render() {
        return <div>{this.props.children}</div>;
    }
}

const MapStateToProps = (state) => {
    return {};
};

const MapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(actions.evoActions.reset()),
        onNextGen: () => dispatch(actions.evoActions.nextGeneration()),
        onAddLivingBioMass: () => dispatch(actions.evoActions.addLivingBioMass()),
    };
};


export default hot(module, MapStateToProps, MapDispatchToProps, KeyboardBinder);
