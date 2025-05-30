import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniMapGeneric from '../MiniMapGeneric';

export default createComponent(() => {
    const getConst = (items) => {
        let masses = items.filter(item => item && item.mass).map(item => item.mass);
        let maxMass = masses && masses.length >= 1 ? masses.reduce((acc, elem) => elem > acc ? elem : acc) : 1;
        return maxMass;
    }

    const extractValue = (item, maxMass) => {
        if (!item || !(item.mass) || !(item.alive)) {
            return null;
        }
        return item.mass / maxMass;
    };

    return (
        <MiniMapGeneric
            extractValue={extractValue}
            getConst={getConst}
            description='Living items by mass'
        />
    )
})
