import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MiniPhaseDeadHerbivoreMass from './index';

export default {
    title: 'App/MiniPhaseDeadHerbivoreMass',
    component: MiniPhaseDeadHerbivoreMass,
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
