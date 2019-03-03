import React from 'react';
import { storiesOf } from '@storybook/react';
import MiniMap from '../client/views/components/MiniMap';
import { action } from '@storybook/addon-actions';
import { getReduxMockDecorator } from './utils/reduxMock';
// import '../client/views/main.css';

const size = 4;
const map = [
    null,
    {
        id: '0001',
        value: 0.8,
    },
    null,
    {
        id: '0002',
        value: 0.2,
    },
    {
        id: '0003',
        value: 0.1,
    },
    null,
    {
        id: '0004',
        value: 0.7,
    },
    null,
    null,
    null,
    {
        id: '0005',
        value: 1,
    },
    {
        id: '0006',
        value: 0,
    },
    null,
    null,
    null,
    null,
];
const highlighted = '0001';
const extractValue = (cell) => cell ? cell.value : null;

storiesOf('MiniMap', module)
    .add('base', () => {
        return <MiniMap
            map={map}
            size={size}
            highlighted={highlighted}
            onHighlight={action('onHighlight')}
            extractValue={extractValue}
            popupTitle='Mini map'
            popupContent='Test example'
        />
    })
    .add('+ no highlight', () => {
        return <MiniMap
            map={map}
            size={size}
            highlighted={null}
            onHighlight={action('onHighlight')}
            extractValue={extractValue}
            popupTitle='Mini map'
            popupContent='Test example'
        />
    })
