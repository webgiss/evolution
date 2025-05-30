import React, { use, useEffect, useRef } from 'react'
import createComponent from '@/tools/components/createComponent';
import './MiniMap.css'
import { Popup } from 'semantic-ui-react';

const getid = (cell) => cell && cell.id;

const backgroundColor = '#444';
const paletteColors = ['#ff1f1f', '#ff3b29', '#ff5533', '#ff6e3d', '#ff8547', '#ff9a52', '#ffad5c', '#ffbf66', '#ffcf70', '#ffde7a', '#ffeb85', '#fff68f', '#ffff99'];
const highlightedColor = '#00ffff';
const cellWidth = 4;


const MiniMapCanvas = createComponent(({ map, size, highlighted, onHighlight, extractValue }) => {
    const canvasRef = useRef(null)

    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const canvas = canvasRef?.current;
        if (!canvas) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellWidth);
        const y = Math.floor((event.clientY - rect.top) / cellWidth);
        const index = x + y * size;
        const cell = map[index];
        const cellid = cell && cell.id;
        if (cellid) {
            onHighlight(cellid);
        }
    }

    useEffect(() => {
        const canvas = canvasRef?.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext('2d');
        const mapSize = size * cellWidth;
        if (canvas.width !== mapSize) {
            canvas.width = mapSize;
        }
        if (canvas.height !== mapSize) {
            canvas.height = mapSize;
        }
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, mapSize, mapSize);

        [...Array(size).keys()].forEach(y => {
            [...Array(size).keys()].forEach(x => {
                const index = x + y * size;
                const cell = map[index];
                const value = extractValue(cell);
                const cellid = cell && cell.id;
                const isHighlighted = cellid && highlighted === cellid;

                if (value) {
                    const valueIndex = Math.floor(12.99 * value);
                    context.fillStyle = isHighlighted ? highlightedColor : paletteColors[valueIndex];
                    context.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
                    //console.log([x*cellWidth, y*cellWidth, cellWidth-1, cellWidth-1, paletteColors[valueIndex]])
                }
            });
        });

    }, [map, size, highlighted, extractValue])

    return (
        <canvas ref={canvasRef} onClick={onClick}></canvas>
    )
})

const MiniMapPopupContent = createComponent(({ map, size, highlighted, onHighlight, extractValue }) => {
    const mapSize = size * cellWidth;
    return (
        <div className='minimap' style={{ width: `${mapSize}px`, height: `${mapSize}px` }}>
            <MiniMapCanvas
                map={map}
                size={size}
                highlighted={highlighted}
                onHighlight={onHighlight}
                extractValue={extractValue}
            />
        </div>
    )
})


export default createComponent(({ map, size, highlighted, onHighlight, extractValue, popupTitle, popupContent }) => {

    return (
        <Popup
            trigger={MiniMapPopupContent({ map, size, highlighted, onHighlight, extractValue })}
            content={popupContent}
            header={popupTitle}
            position='bottom left'
        ></Popup>
    )
})
