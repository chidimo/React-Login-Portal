import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress'

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // handle input change and dispatch register
        const name = event.target.name;
        const value = event.target.value;
        this.setState(
            prevState => ({user: { ...prevState.user, [name]: value }}
        ))
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        event.preventDefault()
        const { username, password } = this.state.user
        this.setState({ submitted: true })
        if (!username || !password) return;
        this.props.dispatch(userActions.register({ username, password }))
            .then(resp => this.props.history.push('/login'))
            .catch(err => { return })
    }

    render() {
        const { user, submitted } = this.state;
        const { message, type, registering } = this.props
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className={(type === 'alert-success') ? 'card bg-success' : 'card bg-danger'}>
                    <p>{message}</p>
                </div>

                <h2>Register</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={e => this.handleChange(e)}/>
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={e => this.handleChange(e)}/>
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Register</button>
                        { registering && <CircularProgress size={20} color="secondary" />}
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps({ registration, alert }) {
    const { registering } = registration
    const { type, message } = alert
    return { 
        registering,
        message,
        type,
    }    
};

export default connect(mapStateToProps)(RegisterPage)
export { RegisterPage as TestRegisterPage }
