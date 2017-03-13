import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/Home';
import SearchGiphy from './components/SearchGiphy';
import ShowGifs from './components/ShowGifs';
import SearchGifs from './components/SearchGifs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ImageStore from './stores/ImageStore';
import UserStore from './stores/UserStore';
import {Provider} from 'mobx-react';
import DisplayGifs from './components/DisplayGifs';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import Logout from './components/Logout';

const imageStore = new ImageStore();
const userStore = new UserStore();

ReactDOM.render((
         <Provider imageStore={imageStore} userStore={userStore}>
           <Router history={browserHistory}>
               <Route path="/login" component={Login}/>
               <Route path="/signup" component={SignUp}/>
               <Route component={EnsureLoggedInContainer}>
                 <Route path="/" component={App}>
                   <IndexRoute component={Home}/>
                   <Route path="/searchgiphy" component={SearchGiphy}/>
                   <Route path="/showgifs" component={DisplayGifs}/>
                   <Route path="/addgifs" component={SearchGifs}/>
                   <Route path="/logout" component={Logout}/>
               </Route>
             </Route>
           </Router>
          </Provider>
), document.getElementById('app'));
