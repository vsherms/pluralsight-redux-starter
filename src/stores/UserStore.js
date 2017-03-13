import {extendObservable} from 'mobx';
import {browserHistory} from 'react-router';

export default class UserStore {
  constructor(){
    extendObservable(this, {
      username: "",
      password: "",
      token: "",
      admin: false,
      isLoggedIn: false,
      failedLogin: false
    });

    this.authUser = this.authUser.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  authUser(user) {
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
    .then(result => result.json())
    .then(res => {
      console.log(res);
      this.token = res.token;
      if(res.token){
        this.isLoggedIn = true;
        browserHistory.replace("/");
      } else {
        this.failedLogin = true;
      }
      console.log(this.isLoggedIn);
    });
  }

  setUser(user) {
    this.username = user.username;
    this.password = user.password;

  }

  logout(){
    browserHistory.replace("/");
  }
}
