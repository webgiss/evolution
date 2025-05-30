import React from 'react'
import createComponent from '@/tools/components/createComponent';
import { useHistory } from '@/redux/selectors/evoMap';
import MiniPhase from '../MiniPhase';

export default createComponent(({ extractValues, description }) => {
    const points = extractValues(useHistory())
    const popupTitle = 'Mini phase'
    const popupContent = description

    return (
        <MiniPhase
            points={points}
            popupTitle={popupTitle}
            popupContent={popupContent}
        />
    )
})
