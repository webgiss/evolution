import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniMapGeneric from '../MiniMapGeneric';
import { ORGANIC } from '@/utils/constants/itemType';

export default createComponent(() => {
    const getConst = (items) => {
        return null;
    }

    const extractValue = (item) => {
        if (!item) {
            return null;
        }
        return (item.type === ORGANIC || !(item.alive)) ? 1 : 0;
    };

    return (
        <MiniMapGeneric
            extractValue={extractValue}
            getConst={getConst}
            description='Dead biomass'
        />
    )
})
