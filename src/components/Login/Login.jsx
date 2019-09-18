import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import './Login.css';

const logo = `images/logo.png`;
const upc = `images/upc.png`;
const up = `images/up.png`;
const apiURL = process.env.REACT_APP_API_HOST_PORT;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            referrer: this.props.referrer,
            redirect: false,
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
        const loginURL = `${apiURL}/authenticate/login`;
        const options = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
            method: 'POST',
        };
        this.setState({ email: '', password: '' });

        fetch(loginURL, options)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ redirect: true });
                } else {
                    throw new Error(res.error);
                }
            })
            .catch(err => {
                this.setState({ redirect: false });
            });
    }

    render() {
        if (this.state.redirect && this.state.referrer) {
            return <Redirect to={this.state.referrer} />;
        }

        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div id="login-page-header">
                    <h1>LOGIN</h1>
                </div>
                <Container>
                    <Row>
                        <div id="form-container">
                            <Col id="login-title">
                                <div className="img-container">
                                    <img
                                        id="img-logo"
                                        src={logo}
                                        alt="cenvi_logo"
                                    />
                                    <img
                                        id="img-upc"
                                        src={upc}
                                        alt="upc_logo"
                                    />
                                    <img id="img-up" src={up} alt="up_logo" />
                                </div>
                                <div className="login-header-title">
                                    <h1 id="login-header-region">
                                        CENTRAL VISAYAS{' '}
                                    </h1>
                                    <h1 id="login-header-office">
                                        CENTER FOR ENVIRONMENTAL INFORMATICS
                                    </h1>
                                </div>
                            </Col>
                            <Col>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
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
                                            autoComplete="current-password"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <Link to="/register">Register</Link>
                            </Col>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
