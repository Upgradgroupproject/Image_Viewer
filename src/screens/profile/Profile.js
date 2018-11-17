import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    instaAvatar: {
        width: '150px',
        height: '150px',
        margin: '0 50px'
    },

    instaProfile: {
        display: 'flex',
        alignItems: 'center',
        margin: '25px 10px',
        justifyContent: 'center',
    },
    profileSection: {

    },
    container: {
        margin: '0 100px',
    },
    gridList: {
        width: "500px",
        height: "500px",
    },
    instauser: {
        fontWeight: '500',
        fontSize: '2em',
    },
    instafullname: {
        fontWeight: '400',
        fontSize: '1.6em',
    },
    instainfo: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    marginLeft: {
        marginRight: '60px',
    },
    marginRight: {
        marginLeft: '10px'
    },
    paper: {
        position: 'relative',
        width: theme.spacing.unit * 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        margin: 'auto',
        top: '30vh'
    },
    noMargin: {
        margin: '0'
    }
});
class Profile extends Component {
    constructor() {

        super();

        this.state = {
            text: '',
            instaUsername: "",
            instaProfilePicture: "",
            instaFullname: "",
            instaMedia: "",
            instaFollows: "",
            instaFollowers: "",
            instaUploads: [],
            open: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var text = this.state.text;
        this.setState({ instaFullname: text });
        this.handleClose();
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
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
                    instaFollowers: JSON.parse(this.responseText).data.counts.followed_by
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
    showModal(id) {
        console.log(id);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className={classes.instaProfile}>
                    <div className={classes.profilePicture}>
                        <Avatar className={[classes.instaAvatar].join(' ')} src={this.state.instaProfilePicture} alt="profile" />
                    </div>
                    <div>
                        <p className={[classes.instauser, classes.noMargin].join(' ')}>{this.state.instaUsername}</p>
                        <div className={[classes.instainfo, classes.noMargin].join(' ')}>
                            <p className={[classes.marginLeft]}>Posts: {this.state.instaMedia}</p>
                            <p className={[classes.marginLeft]}>Follows: {this.state.instaFollows}</p>
                            <p className={[classes.marginLeft]}>Followed by: {this.state.instaFollowers}</p>
                        </div>
                        <p className={[classes.instafullname, classes.noMargin].join(' ')} >{this.state.instaFullname}
                            <Button variant="fab" color="secondary" aria-label="Edit" className={[classes.button, classes.marginRight].join(' ')} onClick={this.handleOpen}>
                                <EditIcon></EditIcon>
                            </Button></p>
                    </div>
                </div>

                <div className={[classes.container].join(' ')}>
                    <GridList cellHeight="570" cols={3}>
                        {this.state.instaUploads.map((instaImages, index) => (
                            <GridListTile className={classes.imgFullHeight} key={instaImages.id} onClick={this.showModal('Hey')}>
                                <img src={instaImages.images.standard_resolution.url} alt="Uploaded Images"/>                                {/* image handler ?*/}
                            </GridListTile>
                        ))}
                    </GridList>
                </div>


                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <Typography variant="h5" id="modal-title">
                            Edit
                    </Typography>
                        <form autoComplete="off">
                            <TextField
                                required="true"
                                id="standard-name"
                                label="Full Name"
                                className={classes.textField}
                                defaultValue={this.state.instaFullname}
                                value={this.text}
                                onChange={this.handleChange}
                                margin="normal" />
                            <Button type="submit" value="Submit" onClick={this.handleSubmit} variant="contained" color="primary" component="span" className={classes.button} >
                                UPDATE
                            </Button>
                        </form>
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <Typography variant="h5" id="modal-title">
                            Edit
                    </Typography>
                        <form autoComplete="off">
                            <TextField
                                required="true"
                                id="standard-name"
                                label="Full Name"
                                className={classes.textField}
                                defaultValue={this.state.instaFullname}
                                value={this.text}
                                onChange={this.handleChange}
                                margin="normal" />
                            <Button type="submit" value="Submit" onClick={this.handleSubmit} variant="contained" color="primary" component="span" className={classes.button} >
                                UPDATE
                            </Button>
                        </form>
                    </div>
                </Modal>
            </div >
        )
    }
}

export default withStyles(styles)(Profile);