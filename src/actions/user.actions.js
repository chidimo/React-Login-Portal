import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(user) {
    // return the promise using fetch which adds to localstorage on resolve
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

    return dispatch => {
        dispatch(request(user))
        return new Promise((resolve, reject) => {
            userService.login(user)
            .then(user => {
                dispatch(alertActions.success('Login successful!'))
                dispatch(success(user))
                resolve()
            })
            .catch(error => {
                dispatch(alertActions.error(error))
                dispatch(failure(error))
                reject()
            })
        })
    }
}

function logout() {
    // complete this function
    const logout_user = () => ({ type: userConstants.LOGOUT })

    return dispatch => {
        userService.logout()
        dispatch(alertActions.clear())
        dispatch(logout_user())
    }
}

function register(user) {
    // return the promise using fetch which dispatches appropriately
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

    return dispatch => {
        dispatch(request(user))
        return new Promise((resolve, reject) => {
            userService.register(user)
            .then(user => { 
                dispatch(alertActions.success('User registered successfully!'))
                dispatch(success(user))
                resolve()
            })
            .catch(error => { 
                dispatch(alertActions.error(error))
                dispatch(failure(error))
                reject()
            })
        })
    }
}
