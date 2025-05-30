import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseAliveDead from './index';

export default {
    title: 'App/MiniPhaseAliveDead',
    component: MiniPhaseAliveDead,
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
