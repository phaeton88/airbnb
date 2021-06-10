import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './guestpage.scss';
import { safeCredentials, safeCredentialsNoContent, handleErrors } from '@utils/fetchHelper';


class Guestpage extends React.Component {
  constructor (props ) {
    super (props);
    this.state = {
      bookings: [],
      usrname: '',
    }
    this.getBookings = this.getBookings.bind(this);
    this.initiateStripeCheckout = this.initiateStripeCheckout.bind(this);
  }

  getBookings () {
    const username = window.location.pathname.replace('/guestpage/', '');
    this.setState({usrname: username});
    fetch(`/api/users/` + username + `/bookings`)
      .then(handleErrors)
      .then((res) => {
        this.setState ({bookings: res.bookings});
      });
  }

  componentDidMount () {
    this.getBookings ();
  }

  initiateStripeCheckout (booking_id) {
  fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
    method: 'POST',
  }))
    .then(handleErrors)
    .then(response => {
      const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

      stripe.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.charge.checkout_session_id,
      }).then((result) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  render () {
    const { bookings, usrname } = this.state;
    return (
      <Layout>
      <div className="d-flex justify-content-center py-4">
        <h1>Logged in as: {usrname}</h1>
      </div>
      {bookings.map((booking) => {
        return (
          <div key={booking.id} className="p-4">
          <h4>Booking {booking.id}</h4>
          <p> Start Date: {booking.start_date}</p>
          <p> End Date Date: {booking.end_date}</p>
          <a href={'/property/' + booking.property_id}>
            <p> View Property</p>
          </a>
          <p> Price per night: {booking.price_per_night}</p>
          {booking.is_paid == true ? <p className="green">Paid</p> : <button className="btn btn-danger" onClick={() => {this.initiateStripeCheckout(booking.id)}}>Pay</button>}
          </div>
        )
      })}
      </Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Guestpage />,
    document.body.appendChild(document.createElement('div')),
  )
})
