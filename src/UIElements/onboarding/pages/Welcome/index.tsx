import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image, Button } from 'semantic-ui-react';

export default () => {
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    navigate('/select-action');
  }, []);

  return (
    <>
      <Header className="app-header" as='h1' inverted textAlign='center'>
        Fabric Wallet
        <span style={{fontSize:14, fontWeight:200}}>by </span><Image src="https://portaldefi.com/assets/portal-logo.gif" alt="Portal Logo" />
      </Header>
      <div className='branding'>
        Safe & Stable & ... Wallet
      </div>
      <Button color='teal' size='huge' onClick={handleStart}>Start Wallet</Button>
    </>
  )
}