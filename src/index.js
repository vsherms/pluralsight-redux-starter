import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/Home';
import SearchGiphy from './components/SearchGiphy';
import ShowGifs from './components/ShowGifs';
import SearchGifs from './components/SearchGifs';

ReactDOM.render((
           <Router history={browserHistory}>
             <Route path="/" component={App}>
               <IndexRoute component={Home}/>
               <Route path="/searchgiphy" component={SearchGiphy}/>
               <Route path="/showgifs" component={ShowGifs}/>
               <Route path="/addgifs" component={SearchGifs}/>
             </Route>
           </Router>
), document.getElementById('app'));
