import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import IssueBooks from '../containers/IssueBooks/IssueBooks';
import RegisterBook from '../containers/RegisterBook/RegisterBook';
import BooksSearch from '../containers/BooksSearch/BooksSearch';
import LoginPage from '../containers/Auth/Login';
import SignupPage from '../containers/Auth/Signup';
import axios from '../axios-library';

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    isUser: null,
    authLoading: false,
    error: null
  }

  componentDidMount() {
    console.log('checking authenticated user');
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    console.log('[App.js] signupHandler', authData);
    const signupData = {
      email: authData.signupForm.email.value,
      password: authData.signupForm.password.value,
      name: authData.signupForm.name.value
    }
    axios.post('/auth/signup', signupData)
      .then(res => {
        console.log('response in app.js of frontend', res);
        if (res.status === 422) {
          throw new Error(
            "Validation failed, make sure that your email id isn't used yet"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error("creating a user failed");
        }
        console.log(res.data);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };


  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    console.log(authData);
    const loginData = {
      email: authData.email,
      password: authData.password
    }

    axios.post('/auth/login', loginData)  
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        console.log('res', res);
        this.setState({
          isAuth: true,
          token: res.data.token,
          authLoading: false,
          userId: res.data.userId
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading:  false,
          error: err
        });
      });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };


  render() {
    let routes = (
      <Switch>
        <Route path="/" exact
          render={props => (
            <LoginPage {...props} onLogin={this.loginHandler} loading={this.state.authLoading} />
          )}
        />
        <Route path="/signup" exact
          render={props => (
            <SignupPage {...props} onSignup={this.signupHandler} loading={this.state.authLoading} />
          )}
        />
        <Redirect to="/" />
      </Switch>
    )

    if(this.state.isAuth) {
      routes = (
        <Switch>
            <Route 
                path="/" 
                exact 
                render={props => (
                  <IssueBooks {...props} userId={this.state.userId} token={this.state.token} />
            )} />
            <Route 
                path="/student" 
                render={props => (
                  <RegisterBook {...props} userId={this.state.userId} token={this.state.token} />
            )} />
            <Route 
                path="/books" 
                render={props => (
                  <BooksSearch {...props} userId={this.state.userId} token={this.state.token} />
            )} />
            <Redirect to="/" />
          </Switch>
      );
    }
    return (
      <div>
        <Layout isAuthenticated={this.state.isAuth} onLogout={this.logoutHandler}>
          {routes}
        </Layout>
      </div>  
    );
  }
}

export default withRouter(App);
