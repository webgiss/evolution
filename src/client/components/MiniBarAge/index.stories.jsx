import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniBarAge from './index';

export default {
    title: 'App/MiniBarAge',
    component: MiniBarAge,
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
