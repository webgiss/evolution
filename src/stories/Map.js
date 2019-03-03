import React from 'react';
import { storiesOf } from '@storybook/react';
import Map from '../client/views/components/Map';
import { action } from '@storybook/addon-actions';
import { getReduxMockDecorator } from './utils/reduxMock';
// import '../client/views/main.css';

const map = [null,{type:0,id:'00001'},null,null,null,null,null,{type:1,id:'00012',alive:true},null,null,{type:2,id:'00019'},null,{type:3,id:'0002c'},null,null,null];
const allAliveMap = map.map(cell=>cell ? {...cell, alive: true}: cell);
const noneAliveMap = map.map(cell=>cell ? {...cell, alive: false}: cell);

storiesOf('Map', module)
    .add('base', () => {
        return <Map
            size={4}
            map={map}>
        </Map>;
    })
    .add('+ all alive', () => {
        return <Map
            size={4}
            map={allAliveMap}>
        </Map>;
    })
    .add('+ none alive', () => {
        return <Map
            size={4}
            map={noneAliveMap}>
        </Map>;
    })
