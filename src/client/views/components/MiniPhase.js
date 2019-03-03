import React from 'react';

import hot from './utils/hot';
import classNames from 'classnames';
import './MiniPhase.css'
import { Popup, Segment } from 'semantic-ui-react';

const recentLimit = 4;
const sizePixel = 100;

const getRecentFirstIndex = (points) => {
    let recentFirstIndex = points.length - recentLimit;
    if (recentFirstIndex < 0) {
        recentFirstIndex = 0;
    }
    return recentFirstIndex;
}

const makePath = (points) => points.reduce((acc, point) => acc + " L" + point[0] + " " + point[1], "M" + points[0][0] + " " + points[0][1]);

const MiniPhaseGraph = ({ points }) => {
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
        const path = makePath(resizedPoints.slice(-100));
        return <div
            className='miniPhase'
            style={
                {
                    width: sizePixel + 'px',
                    height: sizePixel + 'px',
                }
            }
        >
            <svg viewBox={`0 0 ${sizePixel} ${sizePixel}`}>
                <path d={path} fill='none' strokeWidth='2px' stroke='blue' />
                {
                    recentResizedPoints.map((point, i) => <circle key={i + recentFirstIndex} strokeWidth='2px' stroke='white' fill='blue' r={(2 + i)} cx={point[0]} cy={point[1]} />)
                }

            </svg>
        </div>;
    }
    return <div
        className='miniPhase'
        style={
            {
                width: sizePixel + 'px',
                height: sizePixel + 'px',
            }
        }
    ></div>;
};


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
