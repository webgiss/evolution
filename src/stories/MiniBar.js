import React from 'react';
import { storiesOf } from '@storybook/react';
import MiniBar from '../client/views/components/MiniBarCanvas';
import { action } from '@storybook/addon-actions';
import { getReduxMockDecorator } from './utils/reduxMock';
// import '../client/views/main.css';

const values = [
    5,
    8,
    7,
    5,
    8,
    8,
    5,
    7,
    8,
    8,
    8,
    5,
    7,
    5,
];

storiesOf('MiniBar', module)
    .add('base', () => {
        return <MiniBar
        values={values}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
    .add('+ more values', () => {
        return <MiniBar
            values={[...values,5]}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
    .add('+ more more values', () => {
        return <MiniBar
            values={[...values,5,5]}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
    .add('+ yet more more values', () => {
        return <MiniBar
            values={[...values,5,5,6]}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
    .add('+ new column', () => {
        return <MiniBar
            values={[...values,5,5,6,4]}
            popupTitle='Mini phase'
            popupContent='Test example'
        />
    })
