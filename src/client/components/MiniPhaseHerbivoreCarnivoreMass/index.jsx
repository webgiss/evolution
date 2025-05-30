import React from 'react'
import createComponent from '@/tools/components/createComponent';
import MiniPhaseGeneric from '../MiniPhaseGeneric';

export default createComponent(() => {
    return (
        <MiniPhaseGeneric
            extractValues={(history) => {
                return history.map(({ mass }) => {
                    let [d, h, c, o] = mass;
                    return [h, c]
                })
            }}
            description='Herbivore versus Carnivore (mass)'
        />
    )
})
