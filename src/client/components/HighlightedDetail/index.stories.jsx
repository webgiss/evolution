import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'
import HighlightedDetail from './index';

export default {
    title: 'App/HighlightedDetail',
    component: HighlightedDetail,
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
