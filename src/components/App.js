import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';

class App extends React.Component {


  render() {
    return (
      <div>
        <h1>My Giphy Wonderland</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/searchgiphy">Search Giphy</Link></li>
          <li><Link to="/showgifs">Show Gifs</Link></li>
          <li><Link to="/addgifs">Add More Gifs</Link></li>
        </ul>
        {this.props.children || "<Home/>"}
      </div>
    );
  }
}

export default App;
