import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount(){
    // Load in Google OAuth Library
    window.gapi.load('client:auth2', () => { 
        window.gapi.client.init({ //initialize OAuth Library - returns a promise
          clientId: '10054953973-26fibrcadt6fork6lq2tiecckaasgite.apps.googleusercontent.com',
          scope: 'email'
          }).then(()=>{ // handle promise
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
          });
    });
  };

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }
  onSignOutClick = () => {
    this.auth.signOut()
  }

  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    }else if (this.props.isSignedIn){
      return (
      <button className="red ui google button" onClick={this.onSignOutClick}>
        <i className="google icon">Sign Out</i>
      </button>);
    }else {return (
        <button className="red ui google button" onClick={this.onSignInClick}>
          <i className="google icon">Sign In With Google</i>
        </button>
        );
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn}
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);


// ------------- Some GAPI console commands to check if signed in or not ------------
//client id for google OAuth
// 10054953973-26fibrcadt6fork6lq2tiecckaasgite.apps.googleusercontent.com

// gapi.load('client:auth2')
// gapi.client.init({clientId: ''})

// gapi.auth2.getAuthInstance().signOut()
// gapi.auth2.getAuthInstance().signIn()

// gapi.auth2.getAuthInstance().isSignedIn.get()
// gapi.auth2.getAuthInstance().isSignedOut.get()

// ---------- GAPI contains an id for each user that you can use in your app
// gapi.auth2.getAuthInstance().currentUser
// gapi.auth2.getAuthInstance().currentUser.get().getId()