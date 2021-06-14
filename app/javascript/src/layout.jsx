// layout.js
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Layout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      usrname: '',
    }
  this.authenticate = this.authenticate.bind(this);
  this.logOut = this.logOut.bind(this);
  }

  authenticate () {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((res) => {
        this.setState ({usrname: res.username});
      });
  }

  logOut () {
    fetch(`/api/sessions/`, safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(res => {
        if (res.success) {
          window.location.replace("/");
        }
    })
  }

  componentDidMount() {
    this.authenticate ();

  }
  render () {
    const { usrname } = this.state;
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" aria-expanded="false" aria-controls="navbar" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            {usrname ?
            <li className="nav-item">
              <a className="nav-link" href={'/hostpage/' + usrname}>View my listed properties</a>
            </li>: <li className="nav-item">
              <a className="nav-link" href={`/login?redirect_url=${window.location.pathname}`}>Log In</a>
            </li>
            }
            {usrname ?
            <li className="nav-item">
              <a className="nav-link" href={'/guestpage/' + usrname}>View my bookings</a>
            </li>: ''
            }
            {usrname ?
            <li className="nav-item">
              <a className="nav-link" href="/add">Add a Property</a>
            </li>: ''
            }
          </ul>
          {usrname ?
            <button className="btn btn-sm btn-link text-danger" onClick={this.logOut}>Log out</button>: ''
          }
        </div>
      </nav>
      {this.props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}
}

export default Layout;
