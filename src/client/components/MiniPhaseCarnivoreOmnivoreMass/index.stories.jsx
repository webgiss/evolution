import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseCarnivoreOmnivoreMass from './index';

export default {
    title: 'App/MiniPhaseCarnivoreOmnivoreMass',
    component: MiniPhaseCarnivoreOmnivoreMass,
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
