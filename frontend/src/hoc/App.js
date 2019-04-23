import React, { Component } from 'react';

import Layout from './Layout/Layout';
import IssueBooks from '../containers/IssueBooks/IssueBooks';
import StudentInfo from '../containers/StudentInfo/StudentInfo';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <IssueBooks />
          <StudentInfo />
        </Layout>
      </div>
    );
  }
}

export default App;
