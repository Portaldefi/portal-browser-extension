import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

import { setItems } from '../../slices/menuSlice';
import { useAppDispatch } from '../../hooks';

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setItems([]));
  }, []);

  const handleNext = useCallback(() => {
    navigate('/seed-phrase');
  }, []);

  return (
    <Segment textAlign='left'>
      <Header as='h1' size='huge'>Secure your Wallet</Header>
      <div>
        Before getting started, watch this short video to learn about your Secret Recovery Phrase and how to keep your wallet safe.
      </div>
      <div>
        <video controls>
          <source type='video/webm' src='./images/videos/recovery-onboarding/video.webm' />
        </video>
      </div>
      <Button size='large' color='blue' onClick={handleNext}>Next</Button>
    </Segment>
  );
}