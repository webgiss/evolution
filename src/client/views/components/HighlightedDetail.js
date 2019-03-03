import React from 'react';

import hot from './utils/hot';
import './HighlightedDetail.css'
import { Segment, Grid, Divider } from 'semantic-ui-react';

const Map = ({ item }) =>
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
    </div>;

export default hot(module, Map);
