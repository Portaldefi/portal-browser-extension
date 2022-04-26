import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import { setItems } from '../../slices/menuSlice';
import { useAppDispatch } from '../../hooks';
import SecretPhraseViewer from '../../components/SecretPhraseViewer';

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setItems([
      {
        title: 'Back',
        link: '/seed-phrase-intro'
      }
    ]));
  }, []);

  const handleNext = useCallback(() => {
    navigate('/congrats');
  }, []);

  return (
    <Segment textAlign='left'>
      <Header as='h1' size='huge'>Secret Recovery Phrase</Header>
      <div>
        Your Secret Recovery Phrase makes it easy to back up and restore your account.
      </div>
      <div>
        WARNING: Never disclose your Secret Recovery Phrase. Anyone with this phrase can take your Ether forever.
      </div>
      <SecretPhraseViewer />
      <Button size='large' color='blue' onClick={handleNext}>Next</Button>
    </Segment>
  );
}