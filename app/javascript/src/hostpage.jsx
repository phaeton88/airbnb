import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './hostpage.scss';
import { safeCredentials, safeCredentialsNoContent, handleErrors } from '@utils/fetchHelper';
import './hostpage.scss';

class Hostpage extends React.Component {
  constructor (props ) {
    super (props);
    this.state = {
      properties: [],
      usrname: '',
    }
    this.getProperties = this.getProperties.bind(this);
  }

  getProperties () {
    const username = window.location.pathname.replace('/hostpage/', '');
    this.setState({usrname: username});
    fetch(`/api/users/` + username + `/properties`)
      .then(handleErrors)
      .then((res) => {
        //console.log(res);
        this.setState ({properties: res.properties});
      });
  }

  componentDidMount () {
    this.getProperties ();
  }

  render () {
    const { properties, usrname } = this.state;
    return (
      <Layout>
        <div className="py-4">
          <h1 className="text-center">Listed by {usrname}</h1>
        </div>
        <div className="container-fluid">
          <div className="row">
            {properties.length > 0?
              properties.map(property => {
                return (
                  <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                    <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                      <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                    </a>
                      <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                      <h6 className="mb-0">{property.title}</h6>
                      <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                      <a href={`/property/bookings/${property.id}`} className="text-secondary text-decoration-none"><small><b>View bookings</b></small></a>
                  </div>
                  )
              }): <div className="col-12 property"><p className="text-center mb-4">No listings yet. <a className="text-secondary" href="/add">Add a property</a></p></div>
            }
          </div>
        </div>
      </Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hostpage />,
    document.body.appendChild(document.createElement('div')),
  )
})
