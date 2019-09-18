import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            referrer: this.props.referrer,
            redirect: false,
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const registerURL = `${apiURL}/register`;
        const options = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
            method: 'POST',
        };
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        });

        fetch(registerURL, options)
            .then(res => res.json())
            .then(res => {
                if (res.success === 'true') {
                    this.setState({ redirect: true });
                } else {
                    this.setState({ redirect: false, message: res.message });
                }
            })
            .catch(err => {
                this.setState({ redirect: false });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div id="page-header">
                    <h1>REGISTER</h1>
                </div>
                <Container>
                    <Row>
                        <div id="form-container">
                            <Col>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first-name">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            placeholder="First Name"
                                            value={this.state.firstName}
                                            className="form-control"
                                            onChange={this.handleChange}
                                            autoComplete="username email"
                                            required
                                        />
                                        <label htmlFor="last-name">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="last-name"
                                            placeholder="Last Name"
                                            value={this.state.lastName}
                                            className="form-control"
                                            onChange={this.handleChange}
                                            autoComplete="username email"
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            className="form-control"
                                            onChange={this.handleChange}
                                            autoComplete="username email"
                                            required
                                        />
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            className="form-control"
                                            onChange={this.handleChange}
                                            autoComplete="new-password"
                                            minlength="8"
                                            required
                                        />
                                        <label htmlFor="password">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="passwordConfirm"
                                            id="password-confirm"
                                            placeholder="Password"
                                            value={this.state.passwordConfirm}
                                            className="form-control"
                                            onChange={this.handleChange}
                                            autoComplete="new-password"
                                            minlength="8"
                                            required
                                        />
                                        <span id="password-confirm-message" />
                                        <br />
                                        <button
                                            type="submit"
                                            className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                    {this.state.message}
                                </form>
                                <Link to="/Login">Login</Link>
                            </Col>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Register;
