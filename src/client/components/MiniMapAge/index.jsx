import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniMapGeneric from '../MiniMapGeneric';

export default createComponent(() => {
    const getConst = (items) => {
        let ages = items.filter(item => item && item.age).map(item => item.age);
        let maxAge = ages && ages.length >= 1 ? ages.reduce((acc, elem) => elem > acc ? elem : acc) : 1;
        return maxAge;
    }

    const extractValue = (item, maxAge) => {
        if (!item || !(item.age) || !(item.alive)) {
            return null;
        }
        return item.age / maxAge;
    };

    return (
        <MiniMapGeneric
            extractValue={extractValue}
            getConst={getConst}
            description='Living items by age'
        />
    )
})
