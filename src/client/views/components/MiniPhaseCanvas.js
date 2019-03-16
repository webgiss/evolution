import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import './MiniPhase.css'
import { Popup, Segment } from 'semantic-ui-react';

const recentLimit = 4;
const sizePixel = 100;

// const itemColor = '#0000ff';
const itemColor = '#0000ff';
const backgroundColor = '#e4e4ff';
const itemBorderColor = '#ffffff';

const getRecentFirstIndex = (points) => {
    let recentFirstIndex = points.length - recentLimit;
    if (recentFirstIndex < 0) {
        recentFirstIndex = 0;
    }
    return recentFirstIndex;
}

const makePath = (points) => points.reduce((acc, point) => acc + " L" + point[0] + " " + point[1], "M" + points[0][0] + " " + points[0][1]);

class MiniPhaseCanvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        let { points } = this.props;
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');

        if (canvas.width !== sizePixel) {
            canvas.width = sizePixel;
        }
        if (canvas.height !== sizePixel) {
            canvas.height = sizePixel;
        }
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, sizePixel, sizePixel);

        const reduceMax = (acc, elem) => acc > elem ? acc : elem;
        const extractX = point => point[0];
        const extractY = point => point[1];
        if (points && points.length > 0) {
            const maxX = points.map(extractX).reduce(reduceMax);
            const maxY = points.map(extractY).reduce(reduceMax);
            const maxXY = (maxX>maxY ? maxX : maxY)+10;
            let resizedPoints = points.map(
                (point) => [
                    Math.floor(point[0] * 100 * sizePixel / maxXY) / 100,
                    sizePixel - Math.floor(point[1] * 100 * sizePixel / maxXY) / 100
                ]
            );
            let recentFirstIndex = getRecentFirstIndex(resizedPoints);
            let recentResizedPoints = resizedPoints.slice(recentFirstIndex);

            context.strokeStyle = itemColor;
            context.lineWidth = 2;
            context.beginPath();
            {
                let points = resizedPoints.slice(-100);
                context.moveTo(...points[0])
                points.slice(1,).forEach((point)=>{
                    context.lineTo(...point);
                });
            }
            context.stroke();
            context.closePath();

            recentResizedPoints.forEach(
                (point, i) => {
                    context.strokeStyle = itemBorderColor;
                    context.beginPath();
                    context.arc(point[0], point[1], 2+i, 0, 2*Math.PI);
                    context.fillStyle = itemColor;
                    context.fill();
                    context.stroke();
                    context.closePath();
                }
            );
        }
    }

    render() {
        return <canvas ref='canvas'></canvas>;
    }

};

const MiniPhaseGraph = ({ points }) => {
    return <div
        className='miniBar'
        style={
            {
                width: sizePixel + 'px',
                height: sizePixel + 'px',
            }
        }
    ><MiniPhaseCanvas points={points} /></div>;
}

const MiniPhase = ({ points, popupTitle, popupContent }) => {
    let recentFirstIndex = getRecentFirstIndex(points);
    let recentPoints = points.slice(recentFirstIndex);
    return <Popup
        trigger={MiniPhaseGraph({ points })}
        content={
            <Segment>
                <p>{popupContent}</p>
                <p>{recentPoints.map(
                    (point, i) => <React.Fragment key={i}>
                        {`${point[0]} / ${point[1]}`}
                        <br />
                    </React.Fragment>
                )}</p>
            </Segment>
        }
        header={popupTitle}
        position='bottom left'
    />;
};

export default hot(module, MiniPhase);
