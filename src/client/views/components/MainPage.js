import React from 'react';

import { Container, Button } from 'semantic-ui-react';

import hot from './utils/hot';
import Map from '../containers/Map';
// import ItemList from '../containers/ItemList';
import EvoControl from '../containers/EvoControl';
import MiniMapMass from '../containers/MiniMapMass';
import MiniMapAge from '../containers/MiniMapAge';
import HighlightedDetail from '../containers/HighlightedDetail';
import MiniMapOrganic from '../containers/MiniMapOrganic';
import MiniMapHerbivore from '../containers/MiniMapHerbivore';
import MiniMapCarnivore from '../containers/MiniMapCarnivore';
import MiniMapOmnivore from '../containers/MiniMapOmnivore';
import MiniMapDeadMass from '../containers/MiniMapDeadMass';
import MiniPhaseAliveDead from '../containers/MiniPhaseAliveDead';
import MiniPhaseDeadHerbivore from '../containers/MiniPhaseDeadHerbivore';
import MiniPhaseHerbivoreCarnivore from '../containers/MiniPhaseHerbivoreCarnivore';
import MiniPhaseAliveDeadMass from '../containers/MiniPhaseAliveDeadMass';
import MiniPhaseDeadHerbivoreMass from '../containers/MiniPhaseDeadHerbivoreMass';
import MiniPhaseHerbivoreCarnivoreMass from '../containers/MiniPhaseHerbivoreCarnivoreMass';
import MiniPhaseCarnivoreOmnivore from '../containers/MiniPhaseCarnivoreOmnivore';
import MiniPhaseHerbivoreOmnivore from '../containers/MiniPhaseHerbivoreOmnivore';
import MiniPhaseHerbivoreOmnivoreMass from '../containers/MiniPhaseHerbivoreOmnivoreMass';
import MiniPhaseCarnivoreOmnivoreMass from '../containers/MiniPhaseCarnivoreOmnivoreMass';
import KeyboardBinder from '../containers/KeyboardBinder';
import EvoTitle from '../containers/EvoTitle';
import MiniFiller from './MiniFiller';

const MainPage = ({onKeyPress}) =>
    <KeyboardBinder>
        <Container>
            <EvoTitle />
            <EvoControl />
            <Map />
            <MiniMapDeadMass />
            <MiniMapMass />
            <MiniMapAge />
            <MiniFiller />
            <MiniFiller />
            <MiniMapOrganic />
            <MiniMapHerbivore />
            <MiniMapCarnivore />
            <MiniMapOmnivore />
            <MiniFiller />
            <MiniPhaseAliveDead />
            <MiniPhaseDeadHerbivore />
            <MiniPhaseHerbivoreCarnivore />
            <MiniPhaseHerbivoreOmnivore />
            <MiniPhaseCarnivoreOmnivore />
            <MiniPhaseAliveDeadMass />
            <MiniPhaseDeadHerbivoreMass />
            <MiniPhaseHerbivoreCarnivoreMass />
            <MiniPhaseHerbivoreOmnivoreMass />
            <MiniPhaseCarnivoreOmnivoreMass />
            <HighlightedDetail />
            {
                // <ItemList />
            }
        </Container>
    </KeyboardBinder>
    ;

export default hot(module, MainPage);
