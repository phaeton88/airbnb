// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import EditProperty from './editProperty';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      property: {},
      loading: true,
      usrname: '',
    }

    this.showProperty = this.showProperty.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);

  }

  showProperty () {
    //console.log(process.env.STRIPE_PUBLISHABLE_KEY)
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data.property);
        this.setState({
          property: data.property,
          loading: false,
        })
      })
  }

  authenticate () {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((res) => {
        console.log (res.username);
        this.setState ({usrname: res.username});
      });
  }

  deleteProperty = (id) => {
    fetch(`/api/properties/` +id, safeCredentials({
      method: 'DELETE',
      body: JSON.stringify({
      id: id
      })
    }))
    .then(handleErrors)
    .then(res => {
      if (res.success) {
        window.location.replace("/");
      }
    })
  }


  componentDidMount () {
    this.authenticate();
    this.showProperty();
  }

  render () {
    const { property, loading, usrname } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = property

    const { username } = user

    return (
      <Layout>
        <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
          </div>
          <div className="row">
          <div className="col-12 mb-5">
            {usrname == username ?
            <EditProperty property={property} /> : ''
            }
          </div>
          {usrname == username ?
          <button className="btn-danger mx-auto btn-lg mb-5" onClick={() => {this.deleteProperty(id)}}>Delete Property</button> : ''
          }
        </div>
        </div>
      </Layout>
    )
  }
}

export default Property
