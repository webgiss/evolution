import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniMapGeneric from '../MiniMapGeneric';
import { ORGANIC } from '@/utils/constants/itemType';

export default createComponent(() => {
    const getConst = (items) => {
        let masses = items.filter(item => item && item.mass).map(item => item.mass);
        let maxMass = masses && masses.length >= 1 ? masses.reduce((acc, elem) => elem > acc ? elem : acc) : 1;
        return maxMass;
    }

    const extractValue = (item, maxMass) => {
        if (!item || !(item.mass) || !(item.type === ORGANIC || !(item.alive))) {
            return null;
        }
        return item.mass / maxMass;
    };

    return (
        <MiniMapGeneric
            extractValue={extractValue}
            getConst={getConst}
            description='Dead biomass by mass'
        />
    )
})
