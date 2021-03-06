import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import "firebase/auth";
import firebase from "firebase/app";
import { UserContext } from '../../App';
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faGoogle } from '@fortawesome/free-brands-svg-icons'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                console.log(result);
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email, photoURL }
                setLoggedInUser(signedInUser)
                history.replace(from)
                setNewUser(signedInUser)
            }).catch((error) => {
            });

    }

    return (
        <div style={{marginTop: '5rem'}}>
            <h3 style={{ textAlign: 'center' }}>
                {
                    !newUser ? 'To Continue you need to sign in first': 'Great Job!'
                }
            </h3>
            <div style={{ textAlign: 'center' }}>
            <Button onClick={handleGoogleSignIn} variant="outlined" color="primary" href="#outlined-buttons">
            <FontAwesomeIcon icon={faGoogle}/>  Sign in with google
            </Button>
            </div>
        </div>
    );
};

export default Login;