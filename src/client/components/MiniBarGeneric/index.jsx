import React from 'react'
import createComponent from '@/tools/components/createComponent';
import { useItems } from '@/redux/selectors/evoMap';
import MiniBar from '../MiniBar';

export default createComponent(({ extractValues, description, step }) => {
    const values = extractValues(Object.values(useItems()))

    return (
        <MiniBar
            values={values}
            step={step}
            popupTitle='Mini bar'
            popupContent={description}
        />
    )
})
