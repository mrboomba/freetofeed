import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home'
import Login from '../login/Login';
import Auth from '../auth/Auth';
import './app.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Auth>
          <Route path='/' exact component={Home} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
