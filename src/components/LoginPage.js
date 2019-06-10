import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
    }

    handleSubmit(e) {
        
    }

    render() {
        const { username, password, submitted } = this.state;
        const { message, type } = this.props
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className={(type === 'alert-success') ? 'bg-success' : 'bg-danger'}>
                    <p>{message}</p>
                </div>

                <h2>Login</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password"/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to={'/register'} className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps({ alert }) {
    const { type, message } = alert
    return { 
        message,
        type,
    }    
};

export default connect(mapStateToProps)(LoginPage)
export { LoginPage as TestLoginPage };
