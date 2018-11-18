import React, { Component } from 'react';
import './Home.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CardActions from '@material-ui/core/CardActions';
import Header from '../../common/header/HomeHeader';
import HomeHeader from '../../common/header/HomeHeader';
import DisplayPhoto from './DisplayPhoto';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	instaAvatar: {
		width: '50px',
		height: '50px',
	},

	instaProfile: {
		display: 'flex',
		alignItems: 'center',
		margin: '10px',
		marginLeft: '150px'
	},
	card: {
        maxWidth: 400,
    },


});
class Home extends Component {
    constructor() {
		super();
		
        this.state = {
            instaUsername:"",
			instaProfilePicture:"",
			instaFullname:"",
            instaMedia:"",
            instaFollows:"",
			instaFollowers:"",
			instaUploads:[],
           
        }
    }
    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                
                that.setState({
					instaUsername: JSON.parse(this.responseText).data.username,
                    instaProfilePicture: JSON.parse(this.responseText).data.profile_picture,
                    instaFullname: JSON.parse(this.responseText).data.full_name,
                    instaMedia:  JSON.parse(this.responseText).data.counts.media,
                    instaFollows : JSON.parse(this.responseText).data.counts.follows,
                    instaFollowers : JSON.parse(this.responseText).data.counts.followed_by
                });
             }
        });
		
		let instaendpoint1 = "https://api.instagram.com/v1/users/self/?access_token=";
		let instaendpoint2 = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" ;

        xhr.open("GET",  instaendpoint1 + sessionStorage.getItem("access-token"));
        xhr.send(data);    
		
		
		let xhrinstaPictures = new XMLHttpRequest();
        xhrinstaPictures.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    instaUploads: JSON.parse(this.responseText).data,
					//url: JSON.parse(this.responseText).data.images.standard_resolution.url,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url,
                    username:JSON.parse(this.responseText).data[0].images.username
                });
            }
        });

        xhrinstaPictures.open("GET", instaendpoint2 + sessionStorage.getItem("access-token"));
        xhrinstaPictures.send(data);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                 
                <Header/>
                    <div className={classes.instaProfile}>
                    
					<br /><br />
					<div className={classes.instaProfile}>
						
                       
						{this.state.instaUploads.map((instaImages,index) => (
                             <Card className={classes.card}>
                             <CardHeader
                                 avatar={
                                     <Avatar aria-label="Recipe" className={classes.avatar}>
             
                                     </Avatar>
                                 }
                                 
                                 title={instaImages.images.username}
                                 subheader="hytyjty"
                             />
                             <CardMedia
                                 className={classes.media}
                                 image="/static/images/cards/paella.jpg"
                                 title="Paella dish"
                             />
                             <CardContent>
                                 <img src={instaImages.images.standard_resolution.url} alt="Uploaded Images" />
                             </CardContent>
                             <CardActions className={classes.actions} disableActionSpacing>
                                 <IconButton aria-label="Add to favorites">
                                     <FavoriteIcon />
                                 </IconButton>
                                 <br></br>
                                 <br></br>
                                 
                                 <TextField
                                     id="standard-with-placeholder"
                                     label="Add Your comments"
                                     placeholder="Placeholder"
                                     className={classes.textField}
                                     margin="normal"
                                 />
                                  <Button variant="contained" className="addButton">
                                     Add
                                 </Button>
                                 
                                
                                 
                             </CardActions>
             
                             
                         </Card>
                    	))}
						
                	</div>
                </div>
        </div>
        )
    }
}

export default withStyles(styles) (Home);