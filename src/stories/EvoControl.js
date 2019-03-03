import React from 'react';
import { storiesOf } from '@storybook/react';
import EvoControl from '../client/views/components/EvoControl';
import { action } from '@storybook/addon-actions';
import { getReduxMockDecorator } from './utils/reduxMock';
// import '../client/views/main.css';

storiesOf('EvoControl', module)
    .add('base', () => {
        return <EvoControl
            onReset={action('onReset')}
            onNextGen={action('onNextGen')}
        >
            
        </EvoControl>;
    })
