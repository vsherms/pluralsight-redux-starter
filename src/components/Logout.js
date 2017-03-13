import React from 'react';
import {browserHistory} from 'react-router';

export default function Logout(){
    window.location.reload();
    browserHistory.replace("/");
  }
