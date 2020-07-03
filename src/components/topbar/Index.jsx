import React, { useState } from 'react';
import { useStyles } from './Style';
import { AppBar, Toolbar, Typography, Box, Tooltip } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { msgFormatDay } from '../../util/otherfunctions/Index';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Modal from '../../core/dialog/Index';

function TopBar(props) {
  const { action } = props;
  const location = useLocation();
  const [isMenuActive, setMenuActive] = useState(false)
  const classes = useStyles(isMenuActive);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(state => state.name);

  function fnClickYes() {
    setOpenModal(false);
    dispatch({
      type: 'UPDATE_USER',
      name: '',
      phone: '',
      email: '',
      id: null,
      isAuthenticated: false
    });
  }

  function getModal() {
    return (
      <Modal
        type='confirm'
        title='Confirmação'
        text='Deseja sair do sistema?'
        open={openModal}
        optionYes={() => fnClickYes()}
        optionNo={() => setOpenModal(false)}
      />
    );
  }

  function getTextTopBar() {
    switch (location.pathname) {
      case '/register-template':
        return 'Cadastrar template';
      case '/register-project':
        return 'Cadastrar projeto';
      case '/my-data':
        return 'Meus dados';
      default:
        return msgFormatDay(userName);
    }
  }

  return (
    <Box className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            <Tooltip title='Abrir projetos' placement='right'>
              <IconButton
                color='inherit'
                onClick={props.onClickDrawer}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box className={classes.toolbarCenter}>
            <Typography
              variant='h6'
              color='inherit'
            >
              {getTextTopBar()}
            </Typography>
          </Box>
          <Box className={classes.toolbarRight} >
            <Box className={classes.toolbarRightFlex} />
            {
              action.iconHome &&
              <Tooltip title='Home' placement='bottom'>
                <Link to={action.iconHome}>
                  <HomeIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              action.iconRegisterTemplate &&
              <Tooltip title='Cadastrar template' placement='bottom'>
                <Link to={action.iconRegisterTemplate}>
                  <PostAddIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              action.iconRegisterProject &&
              <Tooltip title='Cadastrar projeto' placement='bottom'>
                <Link to={action.iconRegisterProject}>
                  <AddIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              action.iconMyData &&
              <Tooltip title='Meus dados' placement='bottom'>
                <Link to={{
                  pathname: action.iconMyData,
                  state: {
                    isEdit: true
                  }
                }}>
                  <PersonIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              action.iconLogOut &&
              <Tooltip title='Logout' placement='bottom'>
                <PowerSettingsNewIcon
                  onClick={() => setOpenModal(true)}
                  className={classes.allIcon}
                />
              </Tooltip>
            }
            {
              action.iconMenu &&
              <Tooltip title='Menu' placement='left'>
                <Box
                  className={classes.menuIcon}
                  onClick={() => setMenuActive(!isMenuActive)}
                >
                  <Box />
                </Box>
              </Tooltip>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={classes.menuItems}>
        {
          action.iconHome &&
          <Tooltip title='Home' placement='left'>
            <Link to={action.iconHome}>
              <HomeIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          action.iconRegisterTemplate &&
          <Tooltip title='Cadastrar template' placement='left'>
            <Link to={action.iconRegisterTemplate}>
              <PostAddIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          action.iconRegisterProject &&
          <Tooltip title='Cadastrar projeto' placement='left'>
            <Link to={action.iconRegisterProject}>
              <AddIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          action.iconMyData &&
          <Tooltip title='Meus dados' placement='left'>
            <Link to={{
              pathname: action.iconMyData,
              state: {
                isEdit: true
              }
            }}>
              <PersonIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          action.iconLogOut &&
          <Tooltip title='Logout' placement='left'>
            <PowerSettingsNewIcon
              onClick={() => setOpenModal(true)}
              className={classes.allIconMenu}
            />
          </Tooltip>
        }
      </Box>
      {openModal && getModal()}
    </Box>
  );
}

export default TopBar;