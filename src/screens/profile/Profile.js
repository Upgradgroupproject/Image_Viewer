import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
	


});
class Profile extends Component {
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
					url: JSON.parse(this.responseText).data[0].images.standard_resolution.url
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
                    <div>
                    <Avatar className={classes.instaAvatar} src={this.state.instaProfilePicture} alt="profile"/>   
                    </div> 
					<br /><br />
					<div className={classes.instaProfile}>
						<GridList cols={3}>
						{this.state.instaUploads.map((instaImages,index) => (
                    		<GridListTile key={instaImages.id}>
                        		<img src={instaImages.images.standard_resolution.url} alt="Uploaded Images" />
                        		{/* image handler ?*/}
                    		</GridListTile>
                    	))}
						</GridList>
                	</div>
                </div>
        </div>
        )
    }
}

export default withStyles(styles) (Profile);