import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';

import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';
import tourLogo from '../../images/tourlogo.png';
import kodai from './images/kodai.jpg';

import JWPlayer from 'react-jwplayer';
import Modal from 'react-modal';
import ReactJWPlayer from 'react-jw-player';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import './style.scss';
import 'react-notifications/lib/notifications.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const customStyles2 = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    'background-color': 'white',
    'font-size': '20px',
    'color': 'white'
  }
};


class HomeView extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalIsOpen2: false,
      currentSlideIndex: 0,
      bannerDiv: null,
      currentArtist: ''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  openModal2 = (artist) => {
    this.setState({modalIsOpen2: true,currentArtist: artist});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  createNotification = (type) => {
      return () => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
            NotificationManager.success('Success message', 'Title here');
            break;
          case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
          case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
              alert('callback');
            });
            break;
        }
      };
  }

  closeModal() {
    this.setState({modalIsOpen: false, modalIsOpen2: false});
  }

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            fetchVideos: PropTypes.func.isRequired,
            fetchBanners: PropTypes.func.isRequired,
            saveUserNotificationRequest: React.PropTypes.func.isRequired

        }).isRequired,
        videos:PropTypes.array,
        banners: PropTypes.array,
        notificationRequestSent: PropTypes.bool
    };

    static defaultProps = {
        statusText: '',
        userName: '',
        videos: null,
        currentVideo: '',
        banners: null,
        notificationRequestSent: false
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    updateVideo = (url) => {
      this.setState({currentVideo: url });
      this.openModal();
    }

    saveUserNotificationRequest = () => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      var email = $('#notifyMeEmail').val();

      if(email.match(re)) {
        console.log(email);
        console.log(this.state.currentArtist);
        this.props.actions.saveUserNotificationRequest(email, this.state.currentArtist);
        this.closeModal();
      }
    }


    componentWillMount() {
        this.props.actions.fetchBanners();
        this.props.actions.fetchVideos();
    }

    componentDidMount() {

    }

    handleSubmit(event) {
  //  alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    }

    componentDidUpdate() {
      if(this.state.notificationRequestSent == true) {
        this.createNotification('success')
        this.setState({notificationRequestSent: false});
      }
      if(this.props.banners) {
        if(!this.state.bannerDiv) {
        var banners = this.props.banners.map(function (object) {
            return (
                  <div className="col-md-4" key={object.id}>
                    <div className="card" >
                      <img className="card-img-top" src={object.image} alt="Card image cap" />
                      <div className="card-block">
                        <h4 className="card-title">{object.artist}</h4>
                        <p className="card-text">Location: {object.location}</p>
                        <p className="card-text">Date: TBD</p>
                        <a onClick={() => this.openModal2(object.artist)} className="btn btn-primary card-button">Notify me</a>
                      </div>
                    </div>
                  </div>
            );

        }, this )

        this.setState({bannerDiv: banners})
      }
      }
    }


    render() {
      var myBigGreenDialog = {
    backgroundColor: '#00897B',
    color: '#ffffff',
    width: '70%',
    height: '600px',
    marginTop: '-300px',
    marginLeft: '-35%',
  };
        return (
            <div className="container">
                <div className="row margin-top-medium text-center">
                  <div className="col-md-12">

                    {this.state.bannerDiv}


                  </div>
                </div>
                <br/>
                <hr className="tourHR"/>
                <br/>

                <div className="row">
                  <div className="col-md-12 margin-top-large margin-bottom-large" style={{'zIndex': 0}}>

                    { this.props.videos ?
                    <OwlCarousel
                    	className="owl-theme"
                    	loop margin={10} nav lazyLoad={true}  responsive = {
                        { 0:{  items:1 },600:{  items:3},1000:{  items:3}} }
                        startPosition={this.state.currentSlideIndex}
onTranslated={(e) => {
  console.log(e.item.index);
    this.setState({
        currentSlideIndex: e.item.index - 4
    });
}}
                      >
                        {this.props.videos.map(function (object) {
                            return (
                                <div className="item" key={object.id}>
                                  <h4>{object.name} </h4>

                                  <div className="video-container">
                                    <img className="image" src={"https://assets-jpcust.jwpsrv.com/thumbs/"+object.url+ "-720.jpg"} alt={object.name+ " Thumbnail"} />
                                    <div className="overlay">
                                      <a onClick={() => this.updateVideo(object.url)}   ><div className="text"><span className="glyphicon glyphicon-play"></span></div></a>
                                    </div>
                                  </div>

                                </div>
                            );

                        },this ) }

                    </OwlCarousel>
                    :
                    null }
                    <Modal
                             isOpen={this.state.modalIsOpen}
                             onAfterOpen={this.afterOpenModal}
                             onRequestClose={this.closeModal}
                             style={customStyles}
                             contentLabel="Example Modal"
                           >
                            <div className="video-lightbox">
                              <JWPlayer videoId={this.state.currentVideo} />

                            </div>
                           </Modal>

                    <Modal
                      isOpen={this.state.modalIsOpen2}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Example Modal2"
                    >
                      <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                      <h4>Get Notified when this live event begins! </h4>
                      <br/>
                      <input type="email" id="notifyMeEmail" className="form-control" placeholder="e.g. patrick@tourmonkeys.com" /><br/>
                      <button type="submit"  onClick={() => this.saveUserNotificationRequest()}   className="btn btn-primary card-button"> Notify me </button>
                      </div>
                    </form>
                    </Modal>
                  </div>
                </div>

                <NotificationContainer/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
        videos: state.data.videos,
        banners: state.data.banners
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
