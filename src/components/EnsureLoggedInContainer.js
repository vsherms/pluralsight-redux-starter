import React from 'react';
import { browserHistory } from 'react-router';
import { isLoggedIn } from './route-authentication.js';

class HomePage extends Component {

  componentWillMount() {
    /**
    * Here the user will be redirected to the '/auth' route,
    * if they do not meet the isLoggedIn requirements.
    */
    if (!isLoggedIn()) {
      browserHistory.push('/auth');
    }
  }

  render() {
    return (
      <div>
        Hello, World!
      </div>
    );
  }
}


export default class EnsureLoggedInContainer extends React.Component {




  componentWillMount() {
    /**
    * Here the user will be redirected to the '/auth' route,
    * if they do not meet the isLoggedIn requirements.
    */
    if (!isLoggedIn()) {
      browserHistory.push('/login');
    }
  }

  render() {
    if (isLoggedIn) {
      return this.props.children
    } else {
      return null;
    }
  }
}
