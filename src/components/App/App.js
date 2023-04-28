import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Favorite from '../Favorite';
import Search from '../Search';
function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Router >
        <Route exact path='/'>
          <Search />
        </Route>
        <Route exact path ='/favorite'>
          <Favorite />g
        </Route>

      </Router>
    </div>
  );
}

export default App;
