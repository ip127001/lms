import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import IssueBooks from './containers/IssueBooks/IssueBooks';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <IssueBooks />
        </Layout>
      </div>
    );
  }
}

export default App;
