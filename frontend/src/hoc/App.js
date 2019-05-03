import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/Layout';
import IssueBooks from '../containers/IssueBooks/IssueBooks';
import RegisterBook from '../containers/RegisterBook/RegisterBook';
import BooksSearch from '../containers/BooksSearch/BooksSearch';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={IssueBooks} />
            <Route path="/student" component={RegisterBook} />
            <Route path="/books" component={BooksSearch} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
