import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TopBar from '../../components/topbar/Index';
import ComponentDrawer from '../../components/drawer/Index';
import Body from '../../components/body/Index';
import ComponentRegister from '../../components/register/Index';
import Dialog from '../../core/dialog/Index';

function PageMyData() {

  let history = useHistory();

  const [dialog, setDialog] = useState({
    open: false,
    message: '',
    type: '',
    title: ''
  });

  function handleCloseDialog() {
    setDialog({
      ...dialog,
      message: '',
      type: '',
      open: false,
      title: ''
    });
  }

  function handleClickOptionYes() {
    handleCloseDialog();
    localStorage.setItem('authenticad', false);
    history.push('/login');
  }

  const [openDrawer, setOpenDrawer] = useState(false);

  function handleDrawerOpen() {
    setOpenDrawer(true);
  }

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  function handleClickLogout() {
    setDialog({
      ...dialog,
      message: 'Deseja sair do sistema?',
      type: 'confirm',
      open: true,
      title: 'Confirmação'
    });
  }

  return (
    <React.Fragment>
      <TopBar
        textCenter='Meus dados'
        iconMenu
        iconHome linkHome='/dashboard'
        iconRegisterTemplate linkRegisterTemplate='/register-template'
        iconRegisterProject linkRegisterProject='/register-project'
        iconMyData linkMyData='/mydata'
        iconLogOut onClickLogout={handleClickLogout}
        menuDrawer onDrawerOpen={handleDrawerOpen}
      />
      <Body topBar='65px' >
        <ComponentRegister topBar='75px' isMyData={true}/>
      </Body>
      <ComponentDrawer
        open={openDrawer}
        toggleDrawer={toggleDrawer}
      />
      <Dialog
        type={dialog.type}
        title={dialog.title}
        text={dialog.message}
        open={dialog.open}
        optionYes={handleClickOptionYes}
        optionNo={handleCloseDialog}
      />
    </React.Fragment>
  );
}

export default PageMyData;