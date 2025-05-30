import React from 'react'
import createComponent from '@/tools/components/createComponent';
import { useHighlighted, useItems, useMap, useSize } from '@/redux/selectors/evoMap';
import { useDispatch } from 'react-redux';
import { actions } from '@/redux/slices';
import MiniMap from '../MiniMap';

export default createComponent(({ extractValue, getConst, description }) => {
    const dispatch = useDispatch()
    const items = useItems()
    const map = useMap() || []
    const size = useSize()
    const highlighted = useHighlighted()
    const constValue = getConst(items)

    const onHighlight = (id) => dispatch(actions.evoMap.highlightItem({ id }))

    return (
        <MiniMap
            map={map}
            size={size}
            highlighted={highlighted}
            popupTitle='Mini map'
            popupContent={description}
            extractValue={(item) => extractValue(item, constValue)}
            onHighlight={onHighlight}
        />
    )
})
