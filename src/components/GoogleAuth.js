import React from 'react';
import {MDBIcon, MDBNavLink} from "mdbreact";
import { connect } from "react-redux";
import {signIn, signOut} from "../actions";

// 94336615764-ja19p0pjqmr6nf9mfhsb8mbbfqpcbts9.apps.googleusercontent.com

class GoogleAuth extends React.Component{
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '94336615764-f6j82k445embtvteqcu7038o1trv53u2.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };
    onSignIn = () => {
        this.auth.signIn();
    };
    onSignOut = () => {
        this.auth.signOut();
    };
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (<div>
                <MDBNavLink onClick={this.onSignOut} className="waves-effect waves-light" to="#!" style={{display: 'flex'}}>
                    <MDBIcon fab icon="google-plus-g" style={{lineHeight: 26 + 'px'}} /> Sign Out
                </MDBNavLink>
            </div>)
        } else {
            return  (<div>
                <MDBNavLink onClick={this.onSignIn} className="waves-effect waves-light" to="#!" style={{display: 'flex'}}>
                    <MDBIcon fab icon="google-plus-g" style={{lineHeight: 26 + 'px'}} /> Sign In
                </MDBNavLink>
            </div>)
        }
    };
    render() {
        return (
           this.renderAuthButton()
        );
    }
}
const mapStateToProp = state => {
    return {isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProp, {signIn, signOut})(GoogleAuth);
