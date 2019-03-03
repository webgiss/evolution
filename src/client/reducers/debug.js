import configDao from '../dao/config';

const initialState = {};

export default (state, action) => {
    state = state || initialState;

    if (configDao.config.useDebug) {
        console.log('action: [' + action.type + ']', action);
    }

    return state;
};
