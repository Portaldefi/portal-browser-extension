import React from 'react';
import { Header, Image,  } from 'semantic-ui-react';

export default () => {
  return (
    <>
      <Header className="app-header" as='h1' inverted textAlign='center'>
        Fabric Wallet
        <span style={{fontSize:14, fontWeight:200}}>by </span><Image src="https://portaldefi.com/assets/portal-logo.gif" alt="Portal Logo" />
      </Header>
      <div className='branding'>
        Safe & Stable & ... Wallet
      </div>
    </>
  )
}