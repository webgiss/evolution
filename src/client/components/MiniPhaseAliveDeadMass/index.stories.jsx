import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseAliveDeadMass from './index';

export default {
    title: 'App/MiniPhaseAliveDeadMass',
    component: MiniPhaseAliveDeadMass,
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
