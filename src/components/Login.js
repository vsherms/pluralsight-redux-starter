import React from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';



class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      token: ""
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);


  }

  handleUserNameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

    handleUserAuth(event){
      event.preventDefault();
      let user = {username: this.state.username, password: this.state.password};
      this.props.userStore.authUser(user);
      this.props.userStore.setUser(user);
      this.setState({username: "", password: ""});
    }


  render(){

    let signUpLink = (<Link className="signup-link" to="/signup">Sign Up</Link>);

    let loginForm = (
      <div>
      <h2>MY GIPHY WONDERLAND</h2>
      <div className="login-form">
        <Jumbotron>
          <form method="" role="form">
            <legend>Please Log In</legend>

            <div className="form-group">
              <input onChange={this.handleUserNameChange} value={this.state.username} type="text" className="form-control" id="username" placeholder="username"/>
            </div>

            <div className="form-group">
              <input onChange={this.handlePasswordChange} value={this.state.password}type="text" className="form-control" id="password" placeholder="password"/>
            </div>

            <button onClick={this.handleUserAuth} type="submit" className="btn btn-primary">Submit</button>
            {signUpLink}
          </form>
        </Jumbotron>
      </div>
    </div>);

    if(this.props.userStore.failedLogin){
      return(
        <div>
          {loginForm}
          <h4 style={{color: "red"}}>Please enter valid username and password.</h4>
        </div>
      );
    } else {
      return (
        <div>
          {loginForm}
        </div>
      );
    }
  }
}

Login.propTypes = {
  userStore: React.PropTypes.object
};

export default inject('userStore')(observer(Login));
