import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseDeadHerbivore from './index';

export default {
    title: 'App/MiniPhaseDeadHerbivore',
    component: MiniPhaseDeadHerbivore,
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
