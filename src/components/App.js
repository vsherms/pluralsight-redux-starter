import React from 'react';
import AddGifToLib from './AddGifToLib';
import SearchGiphy from './SearchGiphy';
import Logout from './Logout';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import {NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand} from 'react-bootstrap/lib/NavbarHeader';
import { LinkContainer} from 'react-router-bootstrap';



class App extends React.Component {
  constructor(props){
    super(props);
  this.handleSelect = this.handleSelect.bind(this);
  this.onlyUserGifs = this.onlyUserGifs.bind(this);
  this.allUserGifs = this.allUserGifs.bind(this);
  this.handleAllSelect = this.handleAllSelect.bind(this);
  }

  componentDidMount(){
    this.props.imageStore.loadGifsFromServer();
  }

  onlyUserGifs(){
    let newList = this.props.imageStore.images.filter(
      img => img.user._id == this.props.userStore.userId );
      console.log(newList);
      this.props.imageStore.images = newList;
  }

  handleSelect(){
    this.onlyUserGifs();
  }

  allUserGifs(){
    this.props.imageStore.images = this.props.imageStore.allImages;
  }

  handleAllSelect(){
    this.allUserGifs();
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
              <LinkContainer onSelect={this.handleSelect} eventKey={3} to={{pathname: '/yourgifs'}}><NavItem>Your Gifs</NavItem></LinkContainer>
              <LinkContainer onSelect={this.handleAllSelect} eventKey={3.1} to={{pathname: '/allgifs'}}><NavItem>All Gifs</NavItem></LinkContainer>
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
  componentDidMount: React.PropTypes.func,
  handleSelect: React.PropTypes.func,
  onlyUserGifs: React.PropTypes.func,
  handleAllSelect: React.PropTypes.func,
  allUserGifs: React.PropTypes.func
};

export default inject('userStore','imageStore')(observer(App));
