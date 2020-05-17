import React, { useState } from 'react';
import { useStyles } from './Style';
import { AppBar, Toolbar, Typography, Box, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../assets/logo.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HomeIcon from '@material-ui/icons/Home';
import FilterListIcon from '@material-ui/icons/FilterList';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


function TopBar(props) {

  const [isMenuActive, setMenuActive] = useState(false)

  const classes = useStyles(isMenuActive);

  function handleClickMenu() {
    setMenuActive(!isMenuActive);
  }

  return (
    <Box className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            {
              props.menuDrawer
                ?
                <Tooltip title='Drawer lateral' placement='right'>
                  <IconButton
                    color="inherit"
                    onClick={props.onDrawerOpen}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Tooltip>
                :
                <img src={Logo}
                  alt='Logo empresa'
                  className={classes.logo}
                />
            }
          </Box>
          <Box className={classes.toolbarCenter}>
            <Typography
              variant='h6'
              color='inherit'
            >
              {props.textCenter}
            </Typography>
          </Box>
          <Box className={classes.toolbarRight} >
            <Box className={classes.toolbarRightFlex} />
            {
              props.iconHome ?
                <Tooltip title='Home' placement='bottom'>
                  <Link to={props.linkHome}>
                    <HomeIcon className={classes.allIcon} />
                  </Link>
                </Tooltip>
                :
                null
            }
            {
              props.iconFilter ?
                <Tooltip title='Filtrar por status' placement='bottom'>
                  <FilterListIcon
                    onClick={props.onClickFilter}
                    className={classes.allIcon}
                  />
                </Tooltip>
                :
                null
            }
            {
              props.iconRegisterTemplate ?
                <Tooltip title='Cadastrar template' placement='bottom'>
                  <Link to={props.linkRegisterTemplate}>
                    <PostAddIcon className={classes.allIcon} />
                  </Link>
                </Tooltip>
                :
                null
            }
            {
              props.iconRegisterProject ?
                <Tooltip title='Cadastrar projeto' placement='bottom'>
                  <Link to={props.linkRegisterProject}>
                    <AddIcon className={classes.allIcon} />
                  </Link>
                </Tooltip>
                :
                null
            }
            {
              props.iconMyData ?
                <Tooltip title='Meus dados' placement='bottom'>
                  <Link to={props.linkMyData}>
                    <PersonIcon className={classes.allIcon} />
                  </Link>
                </Tooltip>
                :
                null
            }
            {
              props.iconLogOut ?
                <Tooltip title='Logout' placement='bottom'>
                  <PowerSettingsNewIcon
                    onClick={props.onClickLogout}
                    className={classes.allIcon}
                  />
                </Tooltip>
                :
                null
            }
            {
              props.iconMenu ?
                <Tooltip title='Menu' placement='left'>
                  <Box className={classes.menuIcon} onClick={handleClickMenu}>
                    <Box />
                  </Box>
                </Tooltip>
                :
                null
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={classes.menuItems}>
        {
          props.iconHome ?
            <Tooltip title='Home' placement='left'>
              <HomeIcon
                onClick={() => handleClickIcon('home')}
                className={classes.allIconMenu}
              />
            </Tooltip>
            :
            null
        }
        {
          props.iconFilter ?
            <Tooltip title='Filtrar por status' placement='left'>
              <FilterListIcon
                onClick={() => handleClickIcon('filter')}
                className={classes.allIconMenu}
              />
            </Tooltip>
            :
            null
        }
        {
          props.iconRegisterTemplate ?
            <Tooltip title='Cadastrar template' placement='left'>
              <PostAddIcon
                onClick={() => handleClickIcon('template')}
                className={classes.allIconMenu}
              />
            </Tooltip>
            :
            null
        }
        {
          props.iconRegisterProject ?
            <Tooltip title='Cadastrar projeto' placement='left'>
              <AddIcon
                onClick={() => handleClickIcon('project')}
                className={classes.allIconMenu}
              />
            </Tooltip>
            :
            null
        }
        {
          props.iconMyData ?
            <Tooltip title='Meus dados' placement='left'>
              <PersonIcon
                onClick={() => handleClickIcon('myData')}
                className={classes.allIconMenu}
              />
            </Tooltip>
            :
            null
        }
        {
          props.iconLogOut ?
            <Tooltip title='Logout' placement='left'>
              <PowerSettingsNewIcon
                onClick={() => handleClickIcon('logout')}
                className={classes.allIconMenu}
              />
            </Tooltip>
            :
            null
        }
      </Box>
    </Box>
  );

  function handleClickIcon(icon) {

    setMenuActive(false);

    switch (icon) {
      case 'home':
        props.onClickHome();
        break;
      case 'filter':
        props.onClickFilter();
        break;
      case 'template':
        props.onClickRegisterTemplate();
        break;
      case 'project':
        props.onClickRegisterProject();
        break;
      case 'myData':
        props.onClickMyData();
        break;
      case 'logout':
        props.onClickLogout();
        break;
      default:
        break;
    }
  }
}

export default TopBar;