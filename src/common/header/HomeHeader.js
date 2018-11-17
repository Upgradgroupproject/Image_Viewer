import React, { Component } from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
class HomeHeader extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                        <div className="image-loader-logo">
                                Image Viewer
                        </div>
                        <TextField className="searchBox"
                          id="outlined-search"
                          label="Search field"
                          type="search"
                          margin="normal"
                          variant="outlined"
                         
                         />
                  
                </header>  
            </div>
        )
    }
}

export default HomeHeader;