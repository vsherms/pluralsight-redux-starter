import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import Logout from './Logout';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import {NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand} from 'react-bootstrap/lib/NavbarHeader';
import { LinkContainer} from 'react-router-bootstrap';



class App extends React.Component {
  constructor(){
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    this.props.imageStore.loadGifsFromServer();
  }


  render() {
    return (
      <div>
      <h1>My Giphy Wonderland</h1>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{pathname: '/searchgiphy'}}><NavItem>Search Giphy</NavItem></LinkContainer>
            <NavDropdown title="Library" id="basic-nav-dropdown">
              <LinkContainer onSelect={this.props.imageStore.showYourGifs} to={{pathname: '/yourgifs'}}><NavItem>Your Gifs</NavItem></LinkContainer>
              <LinkContainer onSelect={this.props.imageStore.showAllGifs} to={{pathname: '/allgifs'}}><NavItem>All Gifs</NavItem></LinkContainer>
            </NavDropdown>
            <LinkContainer to={{pathname: '/addgifs'}}><NavItem>Add More Gifs</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight className="nav-bar-right">
            <Navbar.Text>Welcome, {this.props.userStore.username}!</Navbar.Text>
            <LinkContainer to={{pathname: '/logout'}}><NavItem>Logout</NavItem></LinkContainer>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes ={
  userStore: React.PropTypes.object,
  imageStore: React.PropTypes.object,
  componentDidMount: React.PropTypes.func
};

export default inject('userStore','imageStore')(observer(App));
