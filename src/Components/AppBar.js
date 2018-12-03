import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
    sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});


class NavAppBar extends Component {
    render() {
            const { classes } = this.props;

        return (<AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
                   <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Sharquity
            </Typography>
              
          </Toolbar>
        </AppBar>)
    }
}

export default withStyles(styles)(NavAppBar)