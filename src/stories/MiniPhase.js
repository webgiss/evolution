import React from 'react';
import { storiesOf } from '@storybook/react';
import MiniPhase from '../client/views/components/MiniPhase';
import { action } from '@storybook/addon-actions';
import { getReduxMockDecorator } from './utils/reduxMock';
// import '../client/views/main.css';

const points = [
    [5,1],
    [5,1],
    [7,2],
    [8,1],
    [8,3],
    [5,6],
    [3,7],
    [3,6],
    [5,4],
    [8,3],
    [9,1],
    [8,2],
];

storiesOf('MiniPhase', module)
    .add('base', () => {
        return <MiniPhase
            points={points}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
    .add('+ more values', () => {
        return <MiniPhase
            points={[...points,[6,2]]}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
    .add('+ yet more values', () => {
        return <MiniPhase
        points={[...points,[6,2],[3,8]]}
        popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
