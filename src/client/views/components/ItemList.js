import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import { ORGANIC, HERBIVORE, CARNIVORE, OMNIVORE } from '../../constants/itemprops';
import './ItemList.css'
import { Popup, Segment, Grid, Divider } from 'semantic-ui-react';

const ItemContent = ({ item }) =>
    <span
        className={
            classNames(
                'itemContent',
                {
                    'item-organic': (item && item.type === ORGANIC),
                    'item-herbivore': (item && item.type === HERBIVORE),
                    'item-carnivore': (item && item.type === CARNIVORE),
                    'item-omnivore': (item && item.type === OMNIVORE),
                    'itemContentAlive': (item && item.alive)
                }
            )
        }
    >
        {
            JSON.stringify(item)
        }
    </span>
    ;

const ItemPopupContent = ({ item }) =>
    <Segment>
        <Grid columns={2} relaxed='very'>
            <Grid.Column className='itemPopupContentColumn'>
                <pre className='popupInfo'>{JSON.stringify(item.dnaValues, null, 2)}</pre>
            </Grid.Column>
            <Grid.Column className='itemPopupContentColumn'>
                <pre className='popupInfo'>{JSON.stringify({ ...item, dnaValues: undefined }, null, 2)}</pre>
            </Grid.Column>
        </Grid>
        <Divider vertical></Divider>
    </Segment>

const ItemLine = ({ item, highlighted, onHighlight }) =>
    <div
        className={
            classNames(
                'itemLine', 
                { 
                    'highlighted': item && (highlighted === item.id) 
                }
            )
        }
        onClick={() => item && onHighlight(item.id)}
    >
        <Popup
            key={item.id}
            trigger={ItemContent({ item })}
            header={`Item [${item.id}]`}
            content={<ItemPopupContent item={item} />}
            position='bottom left'
        />
    </div>
    ;

const ItemList = ({ items, highlighted, onHighlight }) => {
    return <div className='itemList'>
        {
            items.map(item => {
                return <ItemLine
                    key={item.id}
                    item={item}
                    highlighted={highlighted}
                    onHighlight={onHighlight}
                />
            }
            )
        }
    </div>
}

export default hot(module, ItemList);
