import React from 'react'
import createComponent from '@/tools/components/createComponent';
import { Container } from 'semantic-ui-react';
import KeyboardBinder from '@/components/KeyboardBinder';
import EvoTitle from '@/components/EvoTitle';
import EvoControl from '@/components/EvoControl';
import Map from '@/components/Map';
import MiniMapDeadMass from '@/components/MiniMapDeadMass';
import MiniMapMass from '@/components/MiniMapMass';
import MiniMapAge from '@/components/MiniMapAge';
import MiniFiller from '@/components/MiniFiller';
import MiniMapOrganic from '@/components/MiniMapOrganic';
import MiniMapHerbivore from '@/components/MiniMapHerbivore';
import MiniMapCarnivore from '@/components/MiniMapCarnivore';
import MiniMapOmnivore from '@/components/MiniMapOmnivore';
import MiniPhaseAliveDead from '@/components/MiniPhaseAliveDead';
import MiniPhaseDeadHerbivore from '@/components/MiniPhaseDeadHerbivore';
import MiniPhaseHerbivoreCarnivore from '@/components/MiniPhaseHerbivoreCarnivore';
import MiniPhaseHerbivoreOmnivore from '@/components/MiniPhaseHerbivoreOmnivore';
import MiniPhaseCarnivoreOmnivore from '@/components/MiniPhaseCarnivoreOmnivore';
import MiniPhaseAliveDeadMass from '@/components/MiniPhaseAliveDeadMass';
import MiniPhaseDeadHerbivoreMass from '@/components/MiniPhaseDeadHerbivoreMass';
import MiniPhaseHerbivoreCarnivoreMass from '@/components/MiniPhaseHerbivoreCarnivoreMass';
import MiniPhaseHerbivoreOmnivoreMass from '@/components/MiniPhaseHerbivoreOmnivoreMass';
import MiniPhaseCarnivoreOmnivoreMass from '@/components/MiniPhaseCarnivoreOmnivoreMass';
import MiniBarAge from '@/components/MiniBarAge';
import MiniBarSpeed from '@/components/MiniBarSpeed';
import MiniBarLivingMass from '@/components/MiniBarLivingMass';
import MiniBarDeadMass from '@/components/MiniBarDeadMass';
import MiniBarMutationRate from '@/components/MiniBarMutationRate';
import HighlightedDetail from '@/components/HighlightedDetail';
import Maps from '@/components/Maps';

export default createComponent(() => {
    return (
        <KeyboardBinder>
            <Container>
                <EvoTitle />
                <EvoControl />
                <Map />
                <Maps>
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
                    <MiniBarAge />
                    <MiniBarSpeed />
                    <MiniBarLivingMass />
                    <MiniBarDeadMass />
                    <MiniBarMutationRate />
                </Maps>
                <HighlightedDetail />
                {
                    // <ItemList />
                }
            </Container>
        </KeyboardBinder>
    )
})
