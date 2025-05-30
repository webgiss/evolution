import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './ItemList.css'
import { useDispatch } from 'react-redux'
import { actions } from '@/redux/slices'
import { useHighlighted, useItems } from '@/redux/selectors/evoMap';

const ItemContent = createComponent(({ item }) =>
    <span
        className={
            classNames(
                'itemContent',
                {
                    'item-organic': (item && item.type === 0),
                    'item-herbivore': (item && item.type === 1),
                    'item-carnivore': (item && item.type === 2),
                    'item-omnivore': (item && item.type === 3),
                    'itemContentAlive': (item && item.alive)
                }
            )
        }
    >
        {
            JSON.stringify(item)
        }
    </span>
)

const ItemPopupContent = createComponent(({ item }) =>
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
)

const ItemLine = createComponent(({ item, highlighted, onHighlight }) =>
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
)

export default createComponent(() => {
    const dispatch = useDispatch()

    const items = useItems()
    const highlighted = useHighlighted()
    const onHighlight = (id) => dispatch(actions.evoMap.highlightItem({ id }))

    return (
        <div className='itemList'>
            {
                items.map((item) =>
                    <ItemLine
                        key={item.id}
                        item={item}
                        highlighted={highlighted}
                        onHighlight={onHighlight}
                    />
                )
            }
        </div>
    )
})
