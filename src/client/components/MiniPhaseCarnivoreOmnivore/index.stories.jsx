import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseCarnivoreOmnivore from './index';

export default {
    title: 'App/MiniPhaseCarnivoreOmnivore',
    component: MiniPhaseCarnivoreOmnivore,
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
