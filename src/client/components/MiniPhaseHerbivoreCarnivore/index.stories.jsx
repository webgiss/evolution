import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseHerbivoreCarnivore from './index';

export default {
    title: 'App/MiniPhaseHerbivoreCarnivore',
    component: MiniPhaseHerbivoreCarnivore,
    tags: ['autodocs'],
    parameters: {
    },
};

export const Default = {
    decorators: [withReduxState({
        evoMap: {
        },
    })],
    args: {
    },
}
