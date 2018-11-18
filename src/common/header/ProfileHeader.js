import React, { Component } from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import ReactDOM from 'react-dom';
import Login from '../../screens/login/Login';
import { Link } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const multiTheme = createMuiTheme({
    palette: {
      primary: { main: '#263238' }, 
      secondary: { main: '#fff' }, 
    },
    button: {
      margin: 'theme.spacing.unit'*3,
    },
   
    
  });

class ProfileHeader extends Component {


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
                  <header className="app-header">
                  <Link className='image-loader-logo' style={{ textDecoration: 'none'}}  to="/home">Image Viewer                         
                  </Link>
                  </header>
                  
                    <div class="fill-remaining-space"></div>
                    <div class="fill-remaining-space"></div>
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

export default ProfileHeader;








