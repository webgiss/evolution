import { combineReducers } from 'redux';
import evoMap from './slice/evoMap';
// plop-import-slice

export const sliceList = [
    evoMap,
    // plop-insert-slice
]

export const slices = sliceList.reduce((acc, slice) => {
    acc[slice.name] = slice;
    return acc;
}, {});

export const reducer = sliceList.reduce((acc, slice) => {
    acc[slice.name] = slice.reducer;
    return acc;
}, {});

export const actions = sliceList.reduce((acc, slice) => {
    acc[slice.name] = slice.actions;
    return acc;
}, {});


