import { Link, withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as WhiteLogo } from "../svgComponents/logo-white.svg";
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    top: "5px",
    position: "relative"
  }
}));

const ButtonAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <WhiteLogo height="30px" className={classes.logo}/>
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/login">
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar)


