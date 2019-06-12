import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress'

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
        // handle input change and dispatch register
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        // handle button click and dispatch register
        e.preventDefault()
        const { username, password } = this.state
        this.setState({ submitted: true })
        if (!username || !password) return;
        this.props.dispatch(userActions.login({ username, password }))
            .then(() => { this.props.history.push('/') })
            .catch(() => { return })
    }

    render() {
        const { username, password, submitted } = this.state;
        const { message, type, loggingIn } = this.props

        return (
            <div className="col-md-6 col-md-offset-3">

                { (type === 'alert-danger') &&
                    (<div className='alert alert-danger'>
                        <p>{message}</p>
                    </div>)
                }

                { (type === 'alert-success') &&
                    (<div className='alert alert-success'>
                        <p>{message}</p>
                    </div>)
                }

                <h2>Login</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={e => this.handleChange(e)}/>
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control password" name="password" onChange={e => this.handleChange(e)}/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Login</button>
                        { loggingIn && <CircularProgress size={20} color="secondary" />}
                        <Link to={'/register'} className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ alert, authentication }) {
    const { type, message } = alert
    const { loggedIn, loggingIn } = authentication
    return {
        loggingIn,
        loggedIn,
        message,
        type,
    }    
};

const connectedLoginPage = connect()(LoginPage)

export default connect(mapStateToProps)(LoginPage)
export { connectedLoginPage as TestLoginPage };
