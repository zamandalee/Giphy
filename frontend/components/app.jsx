import React from 'react';
import {
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import SearchSplash from './search_splash.jsx';
// import SearchSplash from './searchSplash.jsx';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={SearchSplash} />
      {/*<Route exact path="/:gif_id" component={GifShow} />*/}
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
