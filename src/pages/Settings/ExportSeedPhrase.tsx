import { getSeedPhrase } from '@/serviceworker/database';
import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

export default () => {
    const [seedPhrases, setSeedPhrases] = useState<Array<string>>([]);

    useEffect(() => {
        (async () => {
            setSeedPhrases(await getSeedPhrase());
        })();
    }, []);

    return (
        <Grid.Column>
            <Grid.Row column={4} centered>
                <Grid.Column centered>{seedPhrases[0]+','+seedPhrases[1]+','+seedPhrases[2]}</Grid.Column>
                <Grid.Column centered>{seedPhrases[3]+','+seedPhrases[4]+','+seedPhrases[5]}</Grid.Column>
                <Grid.Column centered>{seedPhrases[6]+','+seedPhrases[7]+','+seedPhrases[8]}</Grid.Column>
                <Grid.Column centered>{seedPhrases[9]+','+seedPhrases[10]+','+seedPhrases[11]}</Grid.Column>
            </Grid.Row>
        </Grid.Column>
    );
}