import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/Layout';
import IssueBooks from '../containers/IssueBooks/IssueBooks';
import StudentInfo from '../containers/StudentInfo/StudentInfo';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={IssueBooks} />
            <Route path="/student" component={StudentInfo} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
