import React from 'react';
import { observer, inject } from 'mobx-react';
import { Jumbotron } from 'react-bootstrap';


class Home extends React.Component{
  render(){
      return (
        <div>
          <Jumbotron>
            <h2>{this.props.userStore.username}, welcome to your Giphy Site!</h2>
          </Jumbotron>
          <div className="home-div">
            <img className="home-image" src={'https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif'}></img>
          </div>
        </div>
      );
   }
}

Home.propTypes = {
  userStore: React.PropTypes.object
};

export default inject('userStore')(observer(Home));
