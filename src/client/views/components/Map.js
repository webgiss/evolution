import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import { ORGANIC, HERBIVORE, CARNIVORE, OMNIVORE } from '../../constants/itemprops';
import './Map.css'
import { Popup } from 'semantic-ui-react';

const MapCellContent = ({ cell, highlighted, onHighlight }) =>
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
                    'alive': (cell && cell.alive),
                    'highlighted':(cell && highlighted === cell.id),
                }
            )
        }
        onClick={()=>cell && onHighlight(cell.id)}
    >
        {
            cell ? cell.mass : ''
        }
    </td>
    ;

const MapCell = ({ cell, x, y, size, highlighted, onHighlight }) =>
    cell ? 
    <Popup
        key={x + y * size}
        trigger={MapCellContent({ cell, highlighted, onHighlight })}
        header={`Item [${cell.id}]`}
        content={<pre>{JSON.stringify(cell, null, 2)}</pre>}
        position='bottom left'
        />
    : MapCellContent({ cell, highlighted, onHighlight })
    ;

const Map = ({ map, size, highlighted, onHighlight }) =>
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
    </table>;

export default hot(module, Map);
