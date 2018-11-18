import React, { Component } from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Profile from '../../screens/profile/Profile';
import Login from '../../screens/login/Login';
import Controller from '../../screens/Controller.js';

import './Header.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    background:'black'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:'#c0c0c0' ,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});




const multiTheme = createMuiTheme({
    palette: {
      primary: { main: '#263238' }, 
      secondary: { main: '#fff' }, 
    },
    button: {
      margin: 'theme.spacing.unit'*3,
    },
   
    
  });

class HomeHeader extends Component {


  constructor() {
    super();
    this.state = {
        user: ""
    }
}
  
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  accountClickHandler = () => {
    this.setState({ anchorEl: null });
      //ReactDOM.render(<Profile />, document.getElementById('root'));
      ReactDOM.render(<Controller />, document.getElementById('root'));
  };

  logoutHandler = () => {
    this.setState({ anchorEl: null });
    sessionStorage.removeItem("access-token");
    
      ReactDOM.render(<Login />, document.getElementById('root'));
  };


     

      componentWillMount() {
        
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    
                  avatar: JSON.parse(this.responseText).data.profile_picture,
                  
                });
            }
        });

        let instaendpoint1 = "https://api.instagram.com/v1/users/self/?access_token=";
        //const avatar = "https://api.instagram.com/v1/users/self/?access_token=8998502401.7fed2c7.a14d53ddd2de41c2b79a087237da6c04"

        xhr.open("GET", instaendpoint1 + sessionStorage.getItem("access-token"));
        xhr.send(data);
    
      }
     

    render() {
        const {classes} = this.props;
        const { anchorEl } = this.state;
        return (
            
            <div >
            <MuiThemeProvider theme={multiTheme}>
              <AppBar position="static" color='primary'>
                <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit"  noWrap>
                  Image Viewer
                  </Typography>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div class="fill-remaining-space"></div>
                  <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
                  
                    
                    <div class="fill-remaining-space"></div>
                    <div >
                      <IconButton className="logout-button" color='secondary'
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        >
                        { <Avatar src={this.state.avatar} alt="profile" /> }
                      </IconButton> 
                      <Menu 
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                      >
                      
                      <MenuItem onClick={this.accountClickHandler}>My account</MenuItem>
                      <hr></hr>
                      <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                        
                      </Menu> 

                    </div>
                </Toolbar>
              </AppBar>
            </MuiThemeProvider>
          </div>
          
        )
    }
}


export default withStyles(styles)(HomeHeader);