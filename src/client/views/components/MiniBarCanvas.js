import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import './MiniBar.css'
import { Popup, Segment } from 'semantic-ui-react';

const sizePixel = 100;

const itemColor = '#0000ff';
const backgroundColor = '#e4e4ff';
const itemBorderColor = '#ffffff';

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

class MiniBarCanvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        let { graph } = this.props;
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        let { minValue, maxValue, maxCount, step, data } = graph;

        if (canvas.width !== sizePixel) {
            canvas.width = sizePixel;
        }
        if (canvas.height !== sizePixel) {
            canvas.height = sizePixel;
        }
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, sizePixel, sizePixel);

        if (minValue !== null && maxValue !== null) {
            let n = 1 + ((maxValue - minValue) / step);
            let barWidth = sizePixel / n;
            data.forEach(
                ([value, count]) => {
                    let width=barWidth;
                    let height = sizePixel * (count / maxCount);
                    let x=((value - minValue) / step) * barWidth;
                    let y=sizePixel - height;
                    if (height>1) {
                        context.fillStyle = itemBorderColor;
                        context.fillRect(x, y, width, height);
                        if (height>2) {
                            context.fillStyle = itemColor;
                            context.fillRect(x+1, y+1, width-2, height-2);
                        }
                    }
                }
            )
        }
    }

    render() {
        return <canvas ref='canvas'></canvas>;
    }

};

const MiniBarGraph = ({ graph }) => {
    return <div
        className='miniBar'
        style={
            {
                width: sizePixel + 'px',
                height: sizePixel + 'px',
            }
        }
    ><MiniBarCanvas graph={graph} /></div>;
}

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
