import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './Map.css'
import { Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import { useHighlighted, useMap, useSize } from '@/redux/selectors/evoMap';
import { useDispatch } from 'react-redux'
import { actions } from '@/redux/slices'
import { CARNIVORE, HERBIVORE, OMNIVORE, ORGANIC, ROCK } from '@/utils/constants/itemType';

const MapCellContent = createComponent(({ cell, highlighted, onHighlight }) => {
    return (
        <td
            className={
                classNames(
                    'mapCell',
                    {
                        'cell-empty': (!cell),
                        'cell-organic': (cell && cell.type === ORGANIC),
                        'cell-herbivore': (cell && cell.type === HERBIVORE),
                        'cell-carnivore': (cell && cell.type === CARNIVORE),
                        'cell-omnivore': (cell && cell.type === OMNIVORE),
                        'cell-rock': (cell && cell.type === ROCK),
                        'alive': (cell && cell.alive),
                        'highlighted': (cell && highlighted === cell.id),
                    }
                )
            }
            onClick={() => cell && onHighlight(cell.id)}
        >
            {
                cell ? cell.mass : ''
            }
        </td>
    )
})

const MapCell = createComponent(({ cell, x, y, size, highlighted, onHighlight }) => {
    return (
        cell ?
            <Popup
                key={x + y * size}
                trigger={MapCellContent({ cell, highlighted, onHighlight })}
                header={`Item [${cell.id}]`}
                content={<pre>{JSON.stringify(cell, null, 2)}</pre>}
                position='bottom left'
            />
            : MapCellContent({ cell, highlighted, onHighlight })
    )
})

export default createComponent(() => {
    const dispatch = useDispatch()

    const map = useMap()
    const size = useSize()
    const highlighted = useHighlighted()
    const onHighlight = (id) => dispatch(actions.evoMap.highlightItem({ id }))

    if (!map || !size) {
        return <div className='map'>Loading...</div>
    }        

    return (
        <table className='map'>
            <tbody>
                {
                    [...Array(size).keys()].map(y =>
                        <tr key={y}>
                            {
                                [...Array(size).keys()].map(x =>
                                    <MapCell
                                        key={x + y * size}
                                        cell={map[x + y * size]}
                                        x={x}
                                        y={y}
                                        size={y}
                                        highlighted={highlighted}
                                        onHighlight={onHighlight}
                                    />
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
})
