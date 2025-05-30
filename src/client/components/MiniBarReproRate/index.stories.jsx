import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniBarReproRate from './index';

export default {
    title: 'App/MiniBarReproRate',
    component: MiniBarReproRate,
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
