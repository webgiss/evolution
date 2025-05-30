import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import EvoTitle from './index';

export default {
    title: 'App/EvoTitle',
    component: EvoTitle,
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
