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
              props.iconHome &&
              <Tooltip title='Home' placement='bottom'>
                <Link to={props.linkHome}>
                  <HomeIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              props.iconFilter &&
              <Tooltip title='Filtrar por status' placement='bottom'>
                <FilterListIcon
                  onClick={props.onClickFilter}
                  className={classes.allIcon}
                />
              </Tooltip>
            }
            {
              props.iconRegisterTemplate &&
              <Tooltip title='Cadastrar template' placement='bottom'>
                <Link to={props.linkRegisterTemplate}>
                  <PostAddIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              props.iconRegisterProject &&
              <Tooltip title='Cadastrar projeto' placement='bottom'>
                <Link to={props.linkRegisterProject}>
                  <AddIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              props.iconMyData &&
              <Tooltip title='Meus dados' placement='bottom'>
                <Link to={props.linkMyData}>
                  <PersonIcon className={classes.allIcon} />
                </Link>
              </Tooltip>
            }
            {
              props.iconLogOut &&
              <Tooltip title='Logout' placement='bottom'>
                <PowerSettingsNewIcon
                  onClick={props.onClickLogout}
                  className={classes.allIcon}
                />
              </Tooltip>
            }
            {
              props.iconMenu &&
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
          props.iconHome &&
          <Tooltip title='Home' placement='left'>
            <Link to={props.linkHome} >
              <HomeIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          props.iconFilter &&
          <Tooltip title='Filtrar por status' placement='left'>
            <FilterListIcon
              onClick={props.onClickFilter}
              // onClick={handleClickMenu}
              className={classes.allIconMenu}
            />
          </Tooltip>
        }
        {
          props.iconRegisterTemplate &&
          <Tooltip title='Cadastrar template' placement='left'>
            <Link to={props.linkRegisterTemplate}>
              <PostAddIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          props.iconRegisterProject &&
          <Tooltip title='Cadastrar projeto' placement='left'>
            <Link to={props.linkRegisterProject}>
              <AddIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          props.iconMyData &&
          <Tooltip title='Meus dados' placement='left'>
            <Link to={props.linkMyData}>
              <PersonIcon className={classes.allIconMenu} />
            </Link>
          </Tooltip>
        }
        {
          props.iconLogOut &&
          <Tooltip title='Logout' placement='left'>
            <PowerSettingsNewIcon
              onClick={props.onClickLogout}
              className={classes.allIconMenu}
            />
          </Tooltip>
        }
      </Box>
    </Box>
  );
}

export default TopBar;