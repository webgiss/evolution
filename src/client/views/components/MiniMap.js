import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import './MiniMap.css'
import { Popup } from 'semantic-ui-react';

const MapCell = ({ cellid, isHighlighted, onHighlight, value }) => {
    
    value = (value >= 0 && value <= 1) ? value : null;
    let valueClass = value ? 'value-' + Math.floor(1 + 12.99*value) : null;
    return <td
        className={
            classNames(
                'minimap-cell',
                valueClass,
                {
                    'highlighted': isHighlighted,
                }
            )
        }
        onClick={() => cellid && onHighlight(cellid)}
    >
    </td>
};

const getid = (cell) => cell && cell.id;

const MiniMapPopupContent = ({ map, size, highlighted, onHighlight, extractValue,popupContent }) =>
    <table className='minimap'>
        <tbody>
            {
                [...Array(size).keys()].map(y =>
                    <tr key={y}>
                        {
                            [...Array(size).keys()].map(x => {
                                const index = x + y * size;
                                const cell = map[index];
                                const value = extractValue(cell);
                                const cellid = cell && cell.id;
                                const isHighlighted = cellid && highlighted === cellid;

                                return <MapCell
                                    key={index}
                                    cellid={cellid}
                                    isHighlighted={isHighlighted}
                                    onHighlight={onHighlight}
                                    value={value}
                                />
                            }
                            )
                        }
                    </tr>
                )
            }
        </tbody>
    </table>;

const MiniMap = ({ map, size, highlighted, onHighlight, extractValue, popupTitle, popupContent }) =>
    <Popup
        trigger={MiniMapPopupContent({ map, size, highlighted, onHighlight, extractValue,popupContent })}
        content={popupContent}
        header={popupTitle}
        position='bottom left'
    ></Popup>

export default hot(module, MiniMap);
