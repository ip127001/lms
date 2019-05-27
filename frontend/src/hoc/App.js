import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import IssueBooks from '../containers/IssueBooks/IssueBooks';
import RegisterBook from '../containers/RegisterBook/RegisterBook';
import BooksSearch from '../containers/BooksSearch/BooksSearch';
import SignupPage from '../containers/Auth/Signup';
import LoginPage from '../containers/Auth/Login';

import axios from '../axios-library';
import StudentProfile from '../containers/StudentProfile/StudentProfile';
import Profile from '../containers/StudentProfile/Profile/Profile';
import CreateAdmin from '../containers/CreateAdmin/CreateAdmin';
import Notice from '../containers/Home/Notice';
import CreateStudent from '../containers/CreateAdmin/CreateStudent/CreateStudent';
import ReturnBooks from '../containers/ReturnBooks/ReturnBooks';

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    isUser: false,
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
    const isUser = localStorage.getItem('isUser');
    let isAdmin;
    if(isUser === "true") {
      isAdmin = true
    } else if(isUser === "false") {
      isAdmin = false
    }
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId, isUser: isAdmin });
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
          error: 'signup failed make sure you are registered with college'
        });
      });
  };

  adminSignupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    console.log('[App.js] adminSignupHandler', authData);
    const signupData = {
      email: authData.signupForm.email.value,
      password: authData.signupForm.password.value,
      name: authData.signupForm.name.value
    }
    axios.post('/auth/admin/signup', signupData)
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
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({isAuth: false, authLoading: false, error: err});
      });
  }

  studentSignupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    console.log('[App.js] adminSignupHandler', authData);
    const signupData = {
      email: authData.signupForm.email.value,
      roll: authData.signupForm.roll.value,
      name: authData.signupForm.name.value
    }
    axios.post('/auth/student/signup', signupData)
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
        this.setState({authLoading: false});
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({isAuth: false, authLoading: false, error: err});
      });
  }
  
  
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
        console.log('response page of login')
        if (res.status === 403) {
          console.log('403 me hu frontend')
          console.log('status', res.status);
          this.setState({error: res.message});
          throw new Error('User is not verified with that email address');
        }
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
          userId: res.data.userId,
          isUser: res.data.isUser
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('isUser', res.data.isUser);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
        this.props.history.replace('/');
      })
      .catch(err => {
        console.log('error page of login')
        console.log(err.response);
        this.setState({
          isAuth: false,
          authLoading:  false,
          error: 'verify yourself'
        });
      });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('isUser');
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
            <Notice {...props} />
          )}
        />
        <Route path="/auth/:token"
          render={props => (
            <LoginPage {...props} error={this.state.error} onLogin={this.loginHandler} loading={this.state.authLoading} />
          )}
        />
        <Route path="/login" exact
          render={props => (
            <LoginPage {...props} error={this.state.error} onLogin={this.loginHandler} loading={this.state.authLoading} />
          )}
        />
        <Route path="/signup"
          render={props => (
            <SignupPage {...props} onSignup={this.signupHandler} loading={this.state.authLoading} />
          )}
        />
        <Redirect to="/" />
      </Switch>
    )

    if(this.state.isAuth && this.state.isUser) {
      console.log('student', this.state.isUser)
      routes = (
        <Switch>
          <Route 
                path="/profile" 
                exact 
                render={props => (
                  <Profile {...props} userId={this.state.userId} token={this.state.token} />
            )} />
            <Route 
                path="/" 
                render={props => (
                  <StudentProfile {...props} userId={this.state.userId} token={this.state.token} />
            )} />
          </Switch>
      );
    }
    
    if(this.state.isAuth && !this.state.isUser){
      console.log('admin', this.state.isUser)
      routes = (
        <Switch>
            <Route 
                path="/" 
                exact 
                render={props => (
                  <IssueBooks {...props} userId={this.state.userId} token={this.state.token} />
            )} />
            <Route  
                path="/return-books"  
                render={props => (
                  <ReturnBooks {...props} userId={this.state.userId} token={this.state.token} />
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
            <Route 
                path="/admin"
                render={props => (
                  <CreateAdmin {...props} 
                          userId={this.state.userId} 
                          token={this.state.token} 
                          onSignup={this.adminSignupHandler} 
                          loading={this.state.authLoading}/>
                )} />
                <Route 
                path="/create-student"
                render={props => (
                  <CreateStudent {...props} 
                          userId={this.state.userId} 
                          token={this.state.token} 
                          onSignup={this.studentSignupHandler} 
                          loading={this.state.authLoading}/>
                )} />
            <Redirect to="/" />
          </Switch>
      );
    }
    return (
      <div>
        <Layout isAuthenticated={this.state.isAuth} onLogout={this.logoutHandler} isAdmin={!this.state.isUser}>
          {routes}
        </Layout>
      </div>  
    );
  }
}

export default withRouter(App);
