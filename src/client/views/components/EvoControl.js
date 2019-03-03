import React from 'react';

import { Button } from 'semantic-ui-react';

import hot from './utils/hot';
import './EvoControl.css';

const EvoControl = ({ onReset, onNextGen, onAddBioMass }) =>
    <div className='buttons'>
        <Button primary onClick={() => onReset()}>Reset</Button>
        <Button secondary onClick={() => onNextGen()}>Next Gen</Button>
        <Button onClick={() => onAddBioMass()}>Add bio mass at (0,0)</Button>
    </div>
    ;

export default hot(module, EvoControl);
