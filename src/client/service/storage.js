import configDao from '../dao/config';
import { dataMapping } from './storage.data.js';

const storage = window.localStorage;

const getOnState = (state, path = [], name) => {
    let level = state;
    for (let item of path) {
        if (level) {
            level = level[item];
        }
    }
    if (level) {
        level = level[name];
    }
    return level;
}

const setOnState = (state, path = [], name, value) => {
    if (state === undefined) {
        state = {};
    }
    let subState = state;
    for (let item of path) {
        if (subState[item] === undefined) {
            subState[item] = {};
        }
        subState = subState[item];
    }
    if (value !== undefined) {
        subState[name] = value;
    }
    return state;
};

if (configDao.debug) {
    window.dataMapping = dataMapping;
}

export default class StorageService {
    constructor(reactReduxInit) {
        reactReduxInit.addProvider(this);
    }

    onInitialState(initialState) {
        for (let dataName in dataMapping) {
            let dataItem = dataMapping[dataName];
            let value = storage.getItem(dataName);
            if (dataItem.formatSet !== undefined) {
                value = dataItem.formatSet(value);
            }
            initialState = setOnState(initialState, dataItem.path, dataItem.key, value);
        }
        return initialState;
    }

    onNewState(state) {
        for (let dataName in dataMapping) {
            let dataItem = dataMapping[dataName];
            let value = getOnState(state, dataItem.path, dataItem.key);
            if (dataItem.formatGet !== undefined && value !== undefined) {
                value = dataItem.formatGet(value);
            }
            if (value !== undefined) {
                storage.setItem(dataName, value);
            } else {
                storage.removeItem(dataName);
            }
        }
    }
}