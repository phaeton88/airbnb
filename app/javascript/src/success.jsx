import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import { safeCredentials, safeCredentialsNoContent, handleErrors } from '@utils/fetchHelper';
import './success.scss';

class Success extends React.Component {
  constructor (props ) {
    super (props);
    this.state = {
      booking: {},
    }
    this.getBookingInfo = this.getBookingInfo.bind(this);
  }

  getBookingInfo () {
    const id = window.location.pathname.replace('/booking/success/', '');
    fetch(`/api/bookings/success/` + id)
      .then(handleErrors)
      .then((res) => {
        //console.log(res);
        this.setState ({booking: res.booking});
      });
  }

  componentDidMount () {
    this.getBookingInfo ();
  }

  render () {
    const { booking } = this.state;
    const { id, start_date, end_date, property_id } = booking;
    return (
      <Layout>
        <h1>Booking was successful!</h1>
        <p>Booking ID: {id}</p>
        <p>Property ID: {property_id}</p>
        <p>Start Date: {start_date}</p>
        <p>End Date: {end_date}</p>

      </Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Success />,
    document.body.appendChild(document.createElement('div')),
  )
})
