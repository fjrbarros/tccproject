import React from 'react';
import TopBar from '../../components/topbar/Index';
import Body from '../../components/body/Index';
import ComponentRegister from '../../components/register/Index';

function PageRegister() {

  return (
    <React.Fragment>
      <TopBar
        textCenter='Cadastro de usuário'
        img={true}
      />
      <Body topBar='65px' >
        <ComponentRegister topBar='75px' />
      </Body>
    </React.Fragment>
  );
}

export default PageRegister;