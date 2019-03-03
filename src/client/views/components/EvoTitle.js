import React from 'react';

import { Header, Label } from 'semantic-ui-react';

import hot from './utils/hot';
import './EvoTitle.css'

const EvoTitle = ({ generation, totalBioMass, organicBioMass, herbivoreBioMass, carnivoreBioMass, omnivoreBioMass, totalCount, organicCount, herbivoreCount, carnivoreCount, omnivoreCount }) => <div className='evoTitle'>
    <Header as='h1'>Generation {1 + generation}</Header>
    <p>
        <b className='count-prefix'>Count:</b>
        <Label color='yellow'>{totalCount}</Label>
        <Label className='count-organic'>{organicCount}</Label>
        <Label className='count-herbivore'>{herbivoreCount}</Label>
        <Label className='count-carnivore'>{carnivoreCount}</Label>
        <Label className='count-omnivore'>{omnivoreCount}</Label>
    </p>
    <p>
        <b className='mass-prefix'>Bio mass:</b>
        <Label color='yellow'>{totalBioMass}</Label>
        <Label className='mass-organic'>{organicBioMass}</Label>
        <Label className='mass-herbivore'>{herbivoreBioMass}</Label>
        <Label className='mass-carnivore'>{carnivoreBioMass}</Label>
        <Label className='mass-omnivore'>{omnivoreBioMass}</Label>
    </p>
</div>;

export default hot(module, EvoTitle);
