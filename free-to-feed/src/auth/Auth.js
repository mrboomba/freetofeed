import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helpers';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({
        user: null
      });
      return;
    }

    axios.get('http://localhost:8888/users/getUser', { headers: { Authorization: getJwt() } }).then(res => {
      this.setState({
        user: res.data
      })
      console.log(this.state.user);

    }).catch(e => {
      console.log(e)
      this.setState({
        user: null
      })
    });
  }

  render() {
    const { user } = this.state;
    if (user === undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (user === null) {
      this.props.history.push('/login');
    }

    return this.props.children;
  }
}

export default withRouter(Auth);