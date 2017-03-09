import React from 'react';

export default class SignUp extends React.Component {
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
    .then(result => result.json());
    }

    handleUserAdd(e){
      console.log(e);
      event.preventDefault();
      let user = {username: this.state.username, password: this.state.password};
      this.addNewUser(user);
      this.setState({username: "", password: ""});
    }


  render(){
    return(
      <form method="" role="form">
          <legend>Please Log In</legend>

          <div className="form-group">
            <input onChange={this.handleUserNameChange} value={this.state.username} type="text" className="form-control" id="username" placeholder="username"/>
          </div>

          <div className="form-group">
            <input onChange={this.handlePasswordChange} value={this.state.password}type="text" className="form-control" id="password" placeholder="password"/>
          </div>

          <button onClick={this.handleUserAdd} type="submit" className="btn btn-primary">Submit</button>
       </form>
    );
  }
}
