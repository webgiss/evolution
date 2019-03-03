import React from 'react';
import { storiesOf } from '@storybook/react';
import ItemList from '../client/views/components/ItemList';
import { action } from '@storybook/addon-actions';
import { getReduxMockDecorator } from './utils/reduxMock';
// import '../client/views/main.css';

const itemList = [{type:0,id:'00001'},{type:1,id:'00012'},{type:2,id:'00019'},{type:3,id:'0002c'}];
const allAliveItemList = itemList.map(cell=>cell ? {...cell, alive: true}: cell);
const noneAliveItemList = itemList.map(cell=>cell ? {...cell, alive: false}: cell);


storiesOf('ItemList', module)
    .add('base', () => {
        return <ItemList
            items={itemList}>
        </ItemList>;
    })
    .add('+ all alive', () => {
        return <ItemList
            items={allAliveItemList}>
        </ItemList>;
    })
    .add('+ none alive', () => {
        return <ItemList
            items={noneAliveItemList}>
        </ItemList>;
    })
