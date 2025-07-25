import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniBarGeneric from '../MiniBarGeneric';

export default createComponent(() => {
    return (
        <MiniBarGeneric
            extractValues={(items) => items.filter(item=>item.alive).map(item=>item.dnaValues.gmr/item.dnaValues.gmrDen)}
            description='Mutation rate'
            step={0.001}
        />
    )
})
