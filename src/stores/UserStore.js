import {extendObservable} from 'mobx';
import {browserHistory} from 'react-router';
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class UserStore {
  constructor(){
    extendObservable(this, {
      username: "",
      password: "",
      token: "",
      admin: false,
      isLoggedIn: false,
      failedLogin: false,
      userId: ""
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
      this.token = res.token;
      this.userId = res.userId;
      if(res.token){
        this.isLoggedIn = true;
        browserHistory.replace("/");
      } else {
        this.failedLogin = true;
      }
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
