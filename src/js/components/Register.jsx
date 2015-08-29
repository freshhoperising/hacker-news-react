'use strict';

import React, { PropTypes } from 'react/addons';
import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const Register = React.createClass({

    propTypes: {
        user: PropTypes.object,
        errorMessage: PropTypes.string
    },

    getInitialState() {
        return {
            submitted: false,
            username: '',
            email: '',
            password: ''
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            // clear form if user prop changes (i.e. logged in)
            this.clearForm();
        }

        // allow resubmission if error comes through
        this.setState({
            submitted: false
        });
    },

    clearForm() {
        let { username, email, password } = this.state;

        this.setState({
            username: '',
            email: '',
            password: ''
        });
    },

    registerUser(e) {
        e.preventDefault();
        let { username, email, password } = this.state;

        if (!username) {
            return Actions.modalError('NO_USERNAME');
        }

        this.setState({
            submitted: true
        });

        let loginData = {
            email: email,
            password: password
        };

        Actions.register(username, loginData);
    },

    render() {
        let {
            submitted,
            username,
            email,
            password
        } = this.state;
        let { errorMessage } = this.props;

        let error = errorMessage && (
            <div className="error modal-form-error">{ errorMessage }</div>
        );

        return (
            <div className="register">
                <h1>Register</h1>
                <form onSubmit={ this.registerUser } className="modal-form">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={ username }
                        onChange={ (e) => this.setState({ username: e.target.value.trim() }) }
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={ email }
                        onChange={ (e) => this.setState({ email: e.target.value.trim() }) }
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={ password }
                        onChange={ (e) => this.setState({ password: e.target.value.trim() }) }
                    />
                    <button type="submit" className="button button-primary" disabled={ submitted }>
                        { this.state.submitted ? <Spinner /> : 'Register' }
                    </button>
                </form>
                { error }
            </div>
        );
    }

});

export default Register;
