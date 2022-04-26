import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Grid, GridColumn, GridRow, Header, Icon } from 'semantic-ui-react';

import { setItems } from '../../slices/menuSlice';
import { useAppDispatch } from '../../hooks';

export default () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setItems([
      {
        title: 'Back',
        link: '/welcome',
      }
    ]));
  }, []);

  const handleImportWallet = useCallback(() => {
    navigate('/import-wallet');
  }, []);

  const handleCreateWallet = useCallback(() => {
    navigate('/create-wallet')
  }, []);

  return (
    <Grid>
      <GridRow>
        <GridColumn width='sixteen'>
          <Header className='' as='h1' inverted>New to Fabric Wallet?</Header>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width='eight'>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                <Icon name='download' size='big' />
                <Header as='h2'>No I already have a Secret Recovery Phrase</Header>
              </Card.Header>
              <Card.Description>
                <div>Import your existing wallet using a Secret Recovery Phrase</div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='blue' size='massive' onClick={handleImportWallet}>
                Import Wallet
              </Button>
            </Card.Content>
          </Card>
        </GridColumn>
        <GridColumn width='eight'>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                <Icon name='plus' size='big' />
                <Header as='h2'>Yes, let’s get set up!</Header>
              </Card.Header>
              <Card.Description>
                <div>This will create a new wallet and Secret Recovery Phrase</div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='blue' size='massive' onClick={handleCreateWallet}>
                Create a Wallet
              </Button>
            </Card.Content>
          </Card>
        </GridColumn>
      </GridRow>
    </Grid>
  )
}