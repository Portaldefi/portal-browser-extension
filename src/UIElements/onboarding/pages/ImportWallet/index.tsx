import React, { useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Grid, Segment, Icon, Form, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
// import { isEqual } from 'lodash';
import * as bip39 from 'bip39';

import { generateAccount } from '@utils/seedPhrase';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSRFList, setSRFLength } from '../../slices/phraseSlice';
import { insertAccount } from '@/serviceworker/database';
import { IAccount } from '@/serviceworker/database/schema';

type FormValue = {
  phrase1: string,
  phrase2: string,
  phrase3: string,
  phrase4: string,
  phrase5: string,
  phrase6: string,
  phrase7: string,
  phrase8: string,
  phrase9: string,
  phrase10: string,
  phrase11: string,
  phrase12: string
};

const defaultPhrases = {
  phrase1: '', phrase2: '', phrase3: '',
  phrase4: '', phrase5: '', phrase6: '',
  phrase7: '', phrase8: '', phrase9: '',
  phrase10: '', phrase11: '', phrase12: '',
}

export default () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDirty, setIsDirty] = useState(false);
  const { setValue, getValues, watch } = useForm<FormValue>({ defaultValues: defaultPhrases });

  const phrase = useAppSelector(state => state.phrase);

  const phrases = useMemo(() => {
    return getValues()
  }, [
    watch('phrase1'), watch('phrase2'), watch('phrase3'),
    watch('phrase4'), watch('phrase5'), watch('phrase6'),
    watch('phrase7'), watch('phrase8'), watch('phrase9'),
    watch('phrase10'), watch('phrase11'), watch('phrase12'),
  ]);
  // @ts-ignore
  const isCorrectPhrase = useMemo(() => bip39.validateMnemonic(Object.keys(phrases).map(key => phrases[key]).join(' ')), [phrases]);

  const handleBack = useCallback(() => {
    navigate('/select-action');
  }, []);
  const handleConfirm = useCallback(() => {
    if (isCorrectPhrase) {
      const core = async () => {
        if (!phrase.SRF_Length) {
          // @ts-ignore
          const seedList = Object.keys(phrases).map(key => phrases[key]);

  // @ts-ignore
          const account = await generateAccount(seedList, phrase.password);
          chrome.storage.session.set(account);

          insertAccount(account as IAccount);

          dispatch(setSRFList(seedList));
          dispatch(setSRFLength(seedList.length));
        }
      }
      core();
      navigate('/congrats', { state: { mode: 'import' } });
    } else {
      setIsDirty(true);
    }
  }, [isCorrectPhrase]);

  return (
    <Segment className='board'>
      <Grid>
        <Grid.Row centered>
          <Header size='medium' className='heading'>Import Seed Phrase</Header>
        </Grid.Row>
        <Grid.Row>
          <Header as='p' size='small' color='grey' className='description'>
            Enter your seed phrase from a previously backed up Identity Seed.
          </Header>
        </Grid.Row>
        <Grid.Row centered>
          <Form className='form-container'>
            {[...new Array(4)].map((_, rowIdx) => (
              <Form.Group inline widths={3} key={rowIdx}>
                {[...new Array(3)].map((_, colIdx) => {
                  const id = rowIdx * 3 + colIdx + 1;
// @ts-ignore
                  return <Form.Input label={`${id}.`} width={16} key={colIdx} value={phrases[`phrase${id}`]} onChange={(e) => { setValue(`phrase${id}`, e.target.value); setIsDirty(true); }} />
                })}
              </Form.Group>
            ))}
          </Form>
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
