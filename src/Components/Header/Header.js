import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import './Header.css'
import { UserContext } from '../../App';

const Header = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="static" color='transparent'>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        <Link to="/" className="link">Book-House</Link></Typography>
        <Link to="/order-info" className="link">Orders</Link>
        <Link to="/addBook" className="link">Admin</Link>
        <Link to="/login" className="link">Account</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;