'use strict';

import React, { PropTypes } from 'react/addons';
import Actions from '../actions/Actions';
import Spinner from '../components/Spinner';

const Login = React.createClass({

    propTypes: {
        user: PropTypes.object,
        errorMessage: PropTypes.string
    },

    getInitialState() {
        return {
            submitted: false,
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
        this.setState({
            email: '',
            password: ''
        });
    },

    login(e) {
        e.preventDefault();
        let { email, password } = this.state;

        this.setState({
            submitted: true
        });

        Actions.login({
            email: email,
            password: password
        });
    },

    render() {
        let {
            submitted,
            email,
            password
        } = this.state;
        let { errorMessage } = this.props;

        let error = errorMessage && (
            <div className="error modal-form-error">{ errorMessage }</div>
        );

        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={ this.login } className="modal-form">
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
                        { submitted ? <Spinner /> : 'Sign In' }
                    </button>
                </form>
                { error }
            </div>
        );
    }
});

export default Login;
