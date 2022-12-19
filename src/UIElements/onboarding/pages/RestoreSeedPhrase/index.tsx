import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Message, Button, Grid, Segment, Icon, Form } from 'semantic-ui-react';
import { useForm, NestedValue } from 'react-hook-form';
import { isEqual } from 'lodash';

import { useAppSelector } from '../../hooks';

type FormValue = {
  phrase1: string, phrase2: string, phrase3: string,
  phrase4: string, phrase5: string, phrase6: string,
  phrase7: string, phrase8: string, phrase9: string,
  phrase10: string, phrase11: string, phrase12: string
};

const defaultPhrases = {
  phrase1: '', phrase2: '', phrase3: '', 
  phrase4: '', phrase5: '', phrase6: '',
  phrase7: '', phrase8: '', phrase9: '',
  phrase10: '', phrase11: '', phrase12: '',
}

export default () => {
  const [ isDirty, setIsDirty ] = useState(false);
  const navigate = useNavigate();
  const phrase = useAppSelector(state => state.phrase);
  const { setValue, getValues, watch } = useForm<FormValue>({ defaultValues: defaultPhrases });

  const phrases = useMemo(() => {
    return getValues()
  }, [
    watch('phrase1'), watch('phrase2'), watch('phrase3'),
    watch('phrase4'), watch('phrase5'), watch('phrase6'),
    watch('phrase7'), watch('phrase8'), watch('phrase9'),
    watch('phrase10'), watch('phrase11'), watch('phrase12'),
  ]);
  const isCorrectPhrase = useMemo(() => isEqual(Object.keys(phrases).map(key => phrases[key]), phrase.SRF_List), [phrases, phrase.SRF_List]);

  const handleBack = useCallback(() => {
    navigate('/seed-phrase');
  }, []);

  const handleConfirm = useCallback(() => {
    if (isCorrectPhrase) {
      navigate('/congrats', { state: { mode: 'create' } });
    } else {
      setIsDirty(true);
    }
  }, [isCorrectPhrase]);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Restore Seed Phrase</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Form className='form-container'>
            {[...new Array(Math.ceil(phrase.SRF_Length / 3))].map((_, rowIdx) => (
              <Form.Group inline widths={3} key={rowIdx}>
                {[...new Array(3)].map((_, colIdx) => {
                  const id = rowIdx * 3 + colIdx + 1;

                  return <Form.Input label={`${id}.`} width={16} key={colIdx} value={phrases[`phrase${id}`]} onChange={(e) => { setValue(`phrase${id}`, e.target.value); setIsDirty(true); }} />
                })}
              </Form.Group>
            ))}
          </Form>
        </Grid.Row>
        <Grid.Row>
          <Header as='p' size='small' color='grey' className='description extra-former-blank extra-latter-blank'>
            WARNING: Improper backup of the seed phrase will result in loss of funds!
          </Header>
        </Grid.Row>
        {isDirty && !isCorrectPhrase && <Grid.Row>
          <Message warning>
            Invalid Secret Recovery Phrase
          </Message>
        </Grid.Row>}
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Button className='blank-button' onClick={handleBack}><Icon name='angle left' />Back</Button>
          </Grid.Column>
          <Grid.Column>
            <Button className='primary-button' onClick={handleConfirm}>Confirm</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}