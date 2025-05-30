import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseHerbivoreOmnivore from './index';

export default {
    title: 'App/MiniPhaseHerbivoreOmnivore',
    component: MiniPhaseHerbivoreOmnivore,
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
