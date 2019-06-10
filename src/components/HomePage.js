import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { userActions } from '../actions';

export class HomePage extends Component {

    _logout = (e) => {
        e.preventDefault()
        console.log("loggin out")
        this.props.dispatch(userActions.logout())
            .then(() => { return })
            .catch(() => { return })
    }

    render() {
        const { loggedIn } = this.props

        if (!loggedIn) return <Redirect to={'/login'} />
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                    <a onClick={e => this._logout(e)} href="">Logout</a>
                </p>
            </div>
        );
    }
}

function mapStateToProps({ authentication }) {
    const { loggedIn } = authentication
    return { loggedIn }    
};

export default connect(mapStateToProps)(HomePage)
