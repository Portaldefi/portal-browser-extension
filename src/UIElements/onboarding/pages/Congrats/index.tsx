import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

import { setItems } from '../../slices/menuSlice';
import { setSRFLength, setSRFList } from '../../slices/phraseSlice';
import { useAppDispatch } from '../../hooks';

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setItems([]));

    chrome.action.setPopup({ popup: 'index.html' });
  }, []);

  const handleCreate = useCallback(() => {
    // TODO: Backend interaction
    dispatch(setSRFLength(12));
    dispatch(setSRFList([
      'minor', 'regret', 'daring', 'perfect', 'tenant', 'surge', 'they', 'section', 'mobile', 'bottom', 'vacant', 'cheese'
    ]));

    navigate('/seed-phrase-intro');
  }, []);
  
  return (
    <Segment size='big'>
      <Header size='large' as='h1'>🎉<br/>Congratulations</Header>
      <Grid centered columns={1}>
        <Grid.Column width='eight'>
          <div>
          You passed the test - keep your Secret Recovery Phrase safe, it's your responsibility! <br />
          <strong>Tips on storing it safely</strong> <br />
          • Save a backup in multiple places. <br />
          • Never share the phrase with anyone. <br />
          • Be careful of phishing! MetaMask will never spontaneously ask for your Secret Recovery Phrase. <br />
          • If you need to back up your Secret Recovery Phrase again, you can find it in Settings -> Security. <br />
          • If you ever have questions or see something fishy, contact our support here. <br />
          *MetaMask cannot recover your Secret Recovery Phrase. Learn more. <br />
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}