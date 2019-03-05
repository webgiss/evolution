import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import './MiniBar.css'
import { Popup, Segment } from 'semantic-ui-react';

const sizePixel = 100;

const getGraph = (values, step) => {
    let minValue = null;
    let maxValue = null;
    if (!step) {
        step = 1;
    }
    let normedValues = values.map(value => Math.floor(value / step) * step);
    let countByNormedValue = {};
    let maxCount = 0;
    values.forEach(value => {
        if (minValue === null || minValue > value) {
            minValue = value;
        }
        if (maxValue === null || maxValue < value) {
            maxValue = value;
        }
        let count = countByNormedValue[value] || 0;
        count += 1;
        countByNormedValue[value] = count;
        if (count > maxCount) {
            maxCount = count;
        }
    });
    let data = [];
    let value = minValue;
    while (value <= maxValue) {
        let count = countByNormedValue[value] || 0;
        data.push([value, count]);
        value += step;
    }
    return { minValue, maxValue, maxCount, step, data };
}

const MiniBarGraph = ({ graph }) => {
    let { minValue, maxValue, maxCount, step, data } = graph;
    window.data = data;
    window.graph = graph;
    console.log({graph});
    if (minValue !== null && maxValue !== null) {
        let n = 1 + ((maxValue - minValue) / step);
        let barWidth = sizePixel / n;
        return <div
            className='miniBar'
            style={
                {
                    width: sizePixel + 'px',
                    height: sizePixel + 'px',
                }
            }
        >
            <svg viewBox={`0 0 ${sizePixel} ${sizePixel}`}>
                {data.map(
                    ([value, count]) => {
                        let height = sizePixel * (count / maxCount);
                        return <rect
                            key={value}
                            strokeWidth='2px'
                            stroke='white'
                            fill='blue'
                            x={((value - minValue) / step) * barWidth}
                            y={sizePixel - height}
                            width={barWidth}
                            height={height}
                        />;
                    }
                )}
            </svg>
        </div>;
    }
    return <div
        className='miniBar'
        style={
            {
                width: sizePixel + 'px',
                height: sizePixel + 'px',
            }
        }
    ></div>;
};


const MiniBar = ({ values, step, popupTitle, popupContent }) => {
    let graph = getGraph(values, step);
    return <Popup
        trigger={MiniBarGraph({ graph })}
        content={
            <Segment>
                <p>{popupContent}</p>
                <p>
                    min Value : {graph.minValue}
                    <br />
                    max Value : {graph.maxValue}
                    <br />
                    step : {graph.step}
                    <br />
                    min Count : 0
                    <br />
                    max Count : {graph.maxCount}
                    <br />
                </p>
            </Segment>
        }
        header={popupTitle}
        position='bottom left'
    />;
};

export default hot(module, MiniBar);
