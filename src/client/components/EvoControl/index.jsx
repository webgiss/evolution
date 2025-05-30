import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './EvoControl.css'
import { useDispatch } from 'react-redux'
import { actions } from '@/redux/slices'
import { getOnClick } from '@/tools/components/helper';
import { Button } from 'semantic-ui-react';

export default createComponent(() => {
    const dispatch = useDispatch()

    const onReset = () => dispatch(actions.evoMap.reset())
    const onNextGen = () => dispatch(actions.evoMap.upgradeTick())
    const onAddBioMass = () => dispatch(actions.evoMap.addLivingBioMass())
    const onSwapWalls = () => dispatch(actions.evoMap.swapWalls())

    return (
        <div className='buttons'>
            <Button primary onClick={() => onReset()}>Reset</Button>
            <Button secondary onClick={() => onNextGen()}>Next Gen</Button>
            <Button onClick={() => onAddBioMass()}>Add bio mass at (0,0)</Button>
            <Button onClick={() => onSwapWalls()}>Swap walls</Button>
        </div>
    )
})
