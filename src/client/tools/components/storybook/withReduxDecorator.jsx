import React from 'react';
import { Provider } from 'react-redux';

import storeCreator from '@/redux/storeCreator';
import { slices } from '@/redux/slices';

export const withRedux = (Story) => {
    const store = storeCreator()
    return (
        <Provider store={store}>
            <Story />
        </Provider>
    )
}

export const withReduxState = (patchState) => (Story) => {
    // console.log({ patchState, slices });
    const preloadedState = Object.fromEntries(
        Object.values(slices).map(slice => {
            const subState = slice.getInitialState();
            if (patchState && patchState[slice.name]) {
                return [slice.name, { ...subState, ...patchState[slice.name] }]
            }
            return [slice.name, subState]
        }))
    const store = storeCreator({preloadedState})

    return (
        <Provider store={store}>
            <Story />
        </Provider>
    );
}