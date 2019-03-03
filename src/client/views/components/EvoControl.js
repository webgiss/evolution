import React from 'react';

import { Button } from 'semantic-ui-react';

import hot from './utils/hot';
import './EvoControl.css';

const EvoControl = ({ onReset, onNextGen }) =>
    <div className='buttons'>
        <Button primary onClick={() => onReset()}>Reset</Button>
        <Button secondary onClick={() => onNextGen()}>Next Gen</Button>
    </div>
    ;

export default hot(module, EvoControl);
