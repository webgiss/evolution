import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './EvoTitle.css'
import { useGeneration, useItems } from '@/redux/selectors/evoMap';
import { Header, Label } from 'semantic-ui-react';
import { CARNIVORE, HERBIVORE, OMNIVORE, ORGANIC } from '@/utils/constants/itemType';

const sumReducer = (acc, value) => acc + value;
const massMapper = item => item.mass;
const countMapper = item => 1;

export default createComponent(() => {
    const generation = useGeneration()
    const items = useItems()
    const totalBioMass = items.map(massMapper).reduce(sumReducer, 0)
    const organicBioMass = items.filter(item => (!item.alive) || item.type === ORGANIC).map(massMapper).reduce(sumReducer, 0)
    const herbivoreBioMass = items.filter(item => item.alive && item.type === HERBIVORE).map(massMapper).reduce(sumReducer, 0)
    const carnivoreBioMass = items.filter(item => item.alive && item.type === CARNIVORE).map(massMapper).reduce(sumReducer, 0)
    const omnivoreBioMass = items.filter(item => item.alive && item.type === OMNIVORE).map(massMapper).reduce(sumReducer, 0)
    const totalCount = items.map(countMapper).reduce(sumReducer, 0)
    const organicCount = items.filter(item => (!item.alive) || item.type === ORGANIC).map(countMapper).reduce(sumReducer, 0)
    const herbivoreCount = items.filter(item => item.alive && item.type === HERBIVORE).map(countMapper).reduce(sumReducer, 0)
    const carnivoreCount = items.filter(item => item.alive && item.type === CARNIVORE).map(countMapper).reduce(sumReducer, 0)
    const omnivoreCount = items.filter(item => item.alive && item.type === OMNIVORE).map(countMapper).reduce(sumReducer, 0)
    
    return (
        <div className='evoTitle'>
            <Header as='h1'>Generation {1 + generation}</Header>
            <div className='p'>
                <b className='count-prefix'>Count:</b>
                <Label color='yellow'>{totalCount}</Label>
                <Label className='count-organic'>{organicCount}</Label>
                <Label className='count-herbivore'>{herbivoreCount}</Label>
                <Label className='count-carnivore'>{carnivoreCount}</Label>
                <Label className='count-omnivore'>{omnivoreCount}</Label>
            </div>
            <div className='p'>
                <b className='mass-prefix'>Bio mass:</b>
                <Label color='yellow'>{totalBioMass}</Label>
                <Label className='mass-organic'>{organicBioMass}</Label>
                <Label className='mass-herbivore'>{herbivoreBioMass}</Label>
                <Label className='mass-carnivore'>{carnivoreBioMass}</Label>
                <Label className='mass-omnivore'>{omnivoreBioMass}</Label>
            </div>
        </div>
    )
})
