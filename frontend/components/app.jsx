import React from 'react';
import {
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import SearchSplash from './search_splash.jsx';
import GifIndex from './gif_index.jsx';
import GifShow from './gif_show.jsx';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={SearchSplash} />
      <Route exact path="/gifs" component={GifIndex} />
      // <Route exact path="/gifs/:query" component={GifIndex} />
      <Route exact path="/:gif_id" component={GifShow} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
