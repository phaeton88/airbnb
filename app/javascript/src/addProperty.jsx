import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { safeCredentials, safeCredentialsNoContent, handleErrors } from '@utils/fetchHelper';
import Layout from '@src/layout';
class AddProperty extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: 0,
      max_guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageRef = React.createRef();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths } = this.state;
    const image = this.imageRef.current.files[0]
    var formData = new FormData();
    formData.append('property[title]', title);
    formData.append('property[description]', description);
    formData.append('property[city]', city);
    formData.append('property[country]', country);
    formData.append('property[property_type]', property_type);
    formData.append('property[price_per_night]', price_per_night);
    formData.append('property[max_guests]', max_guests);
    formData.append('property[bedrooms]', bedrooms);
    formData.append('property[beds]', beds);
    formData.append('property[baths]', baths);
    formData.append('property[image]', image);
    fetch(`/api/properties/create`, safeCredentialsNoContent({
      method: 'POST',
      body: formData
    }))
    .then(handleErrors)
    .then(res => {
        if (res.property) {
          window.location.replace("/");
        }
    })
  }

  render () {
    const { title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths } = this.state;
    return (
      <Layout>
        <div className="py-4 px-2">
          <h2 className="text-center py-4">Add Property</h2>
          <div className="formDiv p-3">
            <form onSubmit={this.handleSubmit}>
              <input className="form-control" name="title" value={title} type="text" placeholder="title" onChange={this.handleChange} />
              <input className="form-control" name="description" value={description} type="text" placeholder="description" onChange={this.handleChange} />
              <input className="form-control" name="city" value={city} type="text" placeholder="city" onChange={this.handleChange} />
              <input className="form-control" name="country" value={country} type="text" placeholder="country" onChange={this.handleChange} />
              <input className="form-control" name="property_type" value={property_type} type="text" placeholder="property type" onChange={this.handleChange} />
              <label>Price per Night
              <input className="form-control" name="price_per_night" value={price_per_night} type="number" placeholder="0" onChange={this.handleChange} />
              </label>
              <label>Max Guests
              <input className="form-control" name="max_guests" value={max_guests} type="number" placeholder="0" onChange={this.handleChange} />
              </label>
              <label>Bedrooms
              <input className="form-control" name="bedrooms" value={bedrooms} type="number" placeholder="0" onChange={this.handleChange} />
              </label>
              <label>Beds
              <input className="form-control" name="beds" value={beds} type="number" placeholder="0" onChange={this.handleChange} />
              </label>
              <label>Baths
              <input className="form-control" name="baths" value={baths} type="number" placeholder="0" onChange={this.handleChange} />
              </label>
              <label>Upload image
              <input className="form-control-file" type="file" id="image-select" name="image" accept="image/*" ref={this.imageRef} />
              </label>
              <button className="btn btn-primary btn-block my-4">Add</button>
            </form>
          </div>
        </div>
      </Layout>
    )

  }


}

export default AddProperty;
