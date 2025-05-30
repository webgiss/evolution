import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseHerbivoreCarnivoreMass from './index';

export default {
    title: 'App/MiniPhaseHerbivoreCarnivoreMass',
    component: MiniPhaseHerbivoreCarnivoreMass,
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
