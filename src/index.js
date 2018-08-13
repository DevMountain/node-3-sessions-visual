import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './components/Store/Store.js';
import { unregister } from './registerServiceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/store" component={Store} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
unregister();
