import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './HighlightedDetail.css'
import { useHighlighted, useItems } from '@/redux/selectors/evoMap';
import { Divider, Grid, Segment } from 'semantic-ui-react';

export default createComponent(() => {

    const highlighted = useHighlighted()
    const item = useItems()[highlighted] || null;

    return (
        <div className='details'>
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column className='detailsContentColumn'>
                        <pre className='popupInfo'>{item ? JSON.stringify(item.dnaValues, null, 2) : null}</pre>
                    </Grid.Column>
                    <Grid.Column className='detailsContentColumn'>
                        <pre className='popupInfo'>{item ? JSON.stringify({ ...item, dnaValues: undefined }, null, 2) : null}</pre>
                    </Grid.Column>
                </Grid>
                <Divider vertical></Divider>
            </Segment>
        </div>
    )
})
