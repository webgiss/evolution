import React from 'react';
import actions from "../../actions";
import hot from './utils/hot';

class KeyboardBinder extends React.Component {
    constructor(props) {
        super(props);
        this._onKey = (e) => this.onKey(e);
        this._interval = null;
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
            case 'KeyN':
                {
                    this.props.onNextGen();
                    return true;
                }
            case 'NumpadMultiply':
            case 'KeyR':
                {
                    this.props.onReset();
                    return true;
                }
            case 'NumpadDivide':
            case 'KeyM':
                {
                    this.props.onAddLivingBioMass();
                    return true;
                }
            case 'KeyI':
                {
                    if (this._interval) {
                        clearInterval(this._interval);
                        this._interval = null;
                    }
                    this._interval = setInterval(() => this.props.onNextGen(), 200);
                    return true;
                }
            case 'KeyU':
                {
                    if (this._interval) {
                        clearInterval(this._interval);
                        this._interval = null;
                    }
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
