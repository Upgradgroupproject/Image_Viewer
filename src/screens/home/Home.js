import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import HomeHeader from '../../common/header/HomeHeader';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    thingy: {
        marginTop: '35px',
        width: '90%',
        margin: 'auto',
        height:'100%',
    },
    fullWidth: {
        width: '100%'
    },
    commentForm: {

    },
    literalForm: {
        display: 'flex',
        
    },
    
    flex: {
        display: 'flex'
    },
});

class Home extends Component {
    constructor() {

        super();

        this.state = {
            likes: 0,
            text: '',
            instaUsername: "",
            instaProfilePicture: "",
            instaFullname: "",
            instaMedia: "",
            instaFollows: "",
            instaFollowers: "",
            instaUploads: [],
            instaComments: [],
            open: false,
            imgPopup: false,
            currentImg: "",
            currentCap: "",
            likeColor: "dark",
            liked: false,
        }
        //this.handleClick = this.handleClick.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleLike = this.handleLike.bind(this);
        //this.commentSubmit = this.commentSubmit.bind(this);
        //this.showModal = this.showModal.bind(this);
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <HomeHeader />
                <div>
                    <GridList cols={2} cellHeight="950" >
                        {this.state.instaUploads.map((instaImages) => (
                            <GridListTile key={instaImages.id}>
                                <Card className={classes.thingy}>
                                    <CardHeader avatar={
                                        <Avatar aria-label="Recipe" src={this.state.instaProfilePicture}>

                                        </Avatar>
                                    } title={this.state.instaUsername}
                                        subheader={instaImages.caption.created_time}>
                                    </CardHeader>

                                    <CardContent >
                                        <img src={instaImages.images.standard_resolution.url} />
                                        <hr />
                                        <p>{instaImages.caption.text}</p>
                                        <div className={classes.commentForm} >
                                            <div className={classes.flex}>
                                                <Button onClick={this.handleLike}>
                                                    <FavoriteIcon color={this.state.likeColor} ></FavoriteIcon>
                                                </Button>
                                                <p>{instaImages.likes.count}</p>
                                            </div>
                                            <form autoComplete="off" className={classes.literalForm}>
                                                <TextField id="comment-field" label="Add a comment" className={classes.textField} onChange={this.handleChange} value={this.text} />
                                                <Button type="submit" value="Submit" onClick={this.commentSubmit} variant="contained" color="primary" component="span" className={classes.button}>ADD</Button>
                                            </form>
                                        </div>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
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
                    instaMedia: JSON.parse(this.responseText).data.counts.media,
                    instaFollows: JSON.parse(this.responseText).data.counts.follows,
                    instaFollowers: JSON.parse(this.responseText).data.counts.followed_by,

                });
            }
        });

        let instaendpoint1 = "https://api.instagram.com/v1/users/self/?access_token=";
        let instaendpoint2 = "https://api.instagram.com/v1/users/self/media/recent/?access_token=";

        xhr.open("GET", instaendpoint1 + sessionStorage.getItem("access-token"));
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
    handleSubmit(e) {
        e.preventDefault();
        var text = this.state.text;
        this.setState({ instaFullname: text });
        this.handleClose();
    }
    commentSubmit(e) {
        e.preventDefault();
        var text = this.state.text;
        this.setState({ instaComments: [...this.state.instaComments, text] });

    }
    handleLike(e) {
        var oldLikes = this.state.likes;
        if (!this.state.liked) {

            this.setState({ liked: true, likeColor: "error", likes: oldLikes + 1 });
        }
        else if (this.state.liked) {
            this.setState({ liked: false, likeColor: "dark", likes: oldLikes - 1 });
        }
    }
    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClick = (e, id, instaImages, datat) => {
        //console.log(e.target.value, id);
        console.log(datat);
        this.setState({ imgPopup: true, currentImg: instaImages, currentCap: datat.caption.text, likes: datat.likes.count });
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleCloseimgPopup = () => {
        this.setState({ imgPopup: false });
    };
    showModal = (id) => {
        console.log(id);
    }
}

export default withStyles(styles)(Home);