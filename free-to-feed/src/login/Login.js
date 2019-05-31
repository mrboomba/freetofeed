import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'loginForm.email': "",
      'loginForm.password': "",
      'registerForm.email': "",
      'registerForm.password': "",
      'registerForm.confirmPassword': "",

      register: false
    };
  }

  validateForm() {
    return this.state['loginForm.email'].length > 0 && this.state['loginForm.password'].length > 0;
  }
  register = () => {
    this.setState({ 'register': true })

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      console.log(this.state);

    });


  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:8888/users/login', { email: this.state['loginForm.email'], password: this.state['loginForm.password'] })
        .then(res => {
          console.log(res);
          console.log(res.data);
          localStorage.setItem('token',res.data)
          this.setState({ 'register': false })
          this.props.history.push('/');
        })
  }
  handleRegister = event => {
    event.preventDefault();
    console.log(this.state.registerForm);

    if (this.state['registerForm.password'] === this.state['registerForm.confirmPassword']) {
      axios.post('http://localhost:8888/users/register', { email: this.state['registerForm.email'], password: this.state['registerForm.password'] })
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({ 'register': false })
        })

    }
    else {
      alert('Password is not correct')
    }

  }

  render() {
    return (
      <div className="Login-component">
        <Card style={{ width: '18rem', float: 'none', margin: '0 auto', backgroundColor: 'rgba(200, 200, 200, 0.5)' }}>
          <Card.Body><div className="Login">
            {!this.state.register && <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="loginForm.email" size="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="loginForm.password" size="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                variant="primary"
                size="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
          </Button>
              <Button
                block
                variant="outline-secondary"
                size="large"
                type="submit"
                onClick={this.register}
              >
                Register
          </Button>
            </form>}

            {this.state.register && <form onSubmit={this.handleRegister}>
              <FormGroup controlId="registerForm.email" size="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="registerForm.password" size="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="registerForm.confirmPassword" size="large">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                variant="primary"
                size="large"
                type="submit"
              >
                Submit
          </Button>
              <Button
                block
                variant="dark"
                size="large"
                onClick={() => { this.setState({ 'register': false }) }}
              >
                Cancel
          </Button>
            </form>}

          </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}