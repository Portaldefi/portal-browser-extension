import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Grid, Segment, Form } from 'semantic-ui-react';

import { useAppSelector } from '../../hooks';

export default () => {
  const navigate = useNavigate();

  const phrase = useAppSelector(state => state.phrase);
  console.log(phrase);

  const handleContinue = useCallback(() => {
    navigate('/seed-phrase-restore');
  }, []);
  const phraseRenderer = useCallback((phrases: Array<string>) => {
    let dispPhrases: Array<Array<string>>;

    dispPhrases = phrases.reduce((rows: Array<Array<string>>, phrase: string, index: number) => {
      if (index % 3 === 0) {
        rows.push([]);
      }

      rows.at(-1)?.push(phrase);

      return rows;
    }, []);

    return (
      <Form className='form-container'>
        {dispPhrases.map((rowPhrases, rowIdx) => (
          <Form.Group inline widths={3} key={rowIdx}>
            {rowPhrases.map((phrase, colIdx) => (
              <Form.Input label={`${rowIdx * rowPhrases.length + colIdx + 1}.`} width={16} readOnly value={phrase} key={colIdx} />
            ))}
          </Form.Group>
        ))}
      </Form>
    )
  }, []);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>New Seed Phrase</Header>
        </Grid.Row>
        <Grid.Row centered>
          {phraseRenderer(phrase.SRF_List)}
        </Grid.Row>
        <Grid.Row>
          <Header as='p' size='small' color='grey' className='description extra-former-blank extra-latter-blank'>
            WARNING: Improper backup of the seed phrase will result in loss of funds!
          </Header>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column>
            <Button className='primary-button' onClick={handleContinue}>Continue</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}