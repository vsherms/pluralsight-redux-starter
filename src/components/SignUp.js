import React from 'react';
import {browserHistory} from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

class SignUp extends React.Component{

  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };

this.handleUserNameChange = this.handleUserNameChange.bind(this);
this.handlePasswordChange = this.handlePasswordChange.bind(this);
this.addNewUser = this.addNewUser.bind(this);
this.handleUserAdd = this.handleUserAdd.bind(this);


  }

  handleUserNameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  addNewUser(user) {
    fetch('/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(result => result.json())
    }


    handleUserAdd(event){
      event.preventDefault();
      let user = {username: this.state.username, password: this.state.password};
      this.addNewUser(user);
      this.setState({username: "", password: ""});
      browserHistory.push("/login");
    }


  render(){
    return(
      <div>
      <h2>MY GIPHY WONDERLAND</h2>
        <div className="login-form">
          <Jumbotron>
          <form method="" role="form">
              <legend>Please Sign Up</legend>

              <div className="form-group">
                <input onChange={this.handleUserNameChange} value={this.state.username} type="text" className="form-control" id="username" placeholder="username"/>
              </div>

              <div className="form-group">
                <input onChange={this.handlePasswordChange} value={this.state.password}type="text" className="form-control" id="password" placeholder="password"/>
              </div>

              <button onClick={this.handleUserAdd} type="submit" className="btn btn-primary">Submit</button>
           </form>
           </Jumbotron>
         </div>
       </div>
    );
  }
}

SignUp.propTypes = {
  imageStore: React.PropTypes.object
};

export default inject('imageStore')(observer(SignUp));
