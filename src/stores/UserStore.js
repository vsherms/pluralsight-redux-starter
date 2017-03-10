import {extendObservable} from 'mobx';

export default class UserStore {
  constructor(){
    extendObservable(this, {
      username: "",
      password: "",
      token: "",
      admin: false,
      isLoggedIn: false
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
      }
      console.log(this.isLoggedIn);
    });
  }


  setUser(user) {
    this.name = user.username;
    this.password = user.password;

  }
}
