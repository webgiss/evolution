import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseHerbivoreOmnivoreMass from './index';

export default {
    title: 'App/MiniPhaseHerbivoreOmnivoreMass',
    component: MiniPhaseHerbivoreOmnivoreMass,
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
