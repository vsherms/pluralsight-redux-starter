import React from 'react';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      token: ""
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);


  }

  handleUserNameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  authenticateUser(user) {
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(result => result.json())
    .then(image => {
      let allImages = this.state.images.slice();
      allImages.push(image);
      this.setState({images: allImages});
    });
  }

    handleUserAuth(e){
      console.log(e);
      event.preventDefault();
      let user = {username: this.state.username, password: this.state.password};
      this.authenticateUser(user);
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

          <button onClick={this.handleUserAuth} type="submit" className="btn btn-primary">Submit</button>
       </form>
    );
  }
}
