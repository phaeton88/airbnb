import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './propertybookings.scss';
import { safeCredentials, safeCredentialsNoContent, handleErrors } from '@utils/fetchHelper';

class PropertyBookings extends React.Component {
  constructor (props ) {
    super (props);
    this.state = {
      bookings: [],
      id: '',
    }
    this.getBookings = this.getBookings.bind(this);
  }

  getBookings () {
    const propertyId = window.location.pathname.replace('/property/bookings/', '');
    this.setState({id: propertyId});
    fetch(`/api/properties/${propertyId}/bookings`)
      .then(handleErrors)
      .then(data => {
        console.log(data);
        this.setState({bookings: data.bookings})
      })
  }

  componentDidMount () {
    this.getBookings ();
  }


  render () {
    const { bookings, id } = this.state;
    return (
      <Layout>
        <h1>Bookings of Property {id}</h1>
        {bookings.map(booking => {
          return (
            <div key={booking.id} className="col-6 col-lg-4 mb-4 property">
                <p className="text-uppercase mb-0 text-secondary">Start date: {booking.start_date}</p>
                <p className="text-uppercase mb-0 text-secondary">End date: {booking.end_date}</p>
                <p className="text-uppercase mb-0 text-secondary">Price per night: {booking.price_per_night}</p>
                <p className="text-uppercase mb-0 text-secondary">Booked by: {booking.username}</p>
                {booking.is_paid == true ? <p className="green">Paid</p> : <p className="red">Not paid</p>}
            </div>
          )
        })}
      </Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PropertyBookings />,
    document.body.appendChild(document.createElement('div')),
  )
})
