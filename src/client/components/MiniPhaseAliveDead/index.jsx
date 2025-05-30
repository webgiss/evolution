import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniPhaseGeneric from '../MiniPhaseGeneric';

export default createComponent(() => {
    return (
        <MiniPhaseGeneric
            extractValues={(history) => {
                return history.map(({ count }) => {
                    let [d, h, c, o] = count;
                    return [d, h + c + o]
                })
            }}
            description='Dead versus Living (count)'
        />
    )
})
