import React from 'react';
import { safeCredentials, safeCredentialsNoContent, handleErrors } from '@utils/fetchHelper';


class EditProperty extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      id: this.props.property.id,
      title: this.props.property.title,
      description: this.props.property.description,
      city: this.props.property.city,
      country: this.props.property.country,
      property_type: this.props.property.property_type,
      price_per_night: this.props.property.price_per_night,
      max_guests: this.props.property.max_guests,
      bedrooms: this.props.property.bedrooms,
      beds: this.props.property.beds,
      baths: this.props.property.baths,
      image: this.props.property.image_url,
    }

    this.handleChange = this.handleChange.bind(this);
    this.editProperty = this.editProperty.bind(this);
    this.imageRef = React.createRef();

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  editProperty(e) {
    e.preventDefault();
    const { title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, id, image_url } = this.state;
    const image = this.imageRef.current.files[0]
    var formData = new FormData();
    formData.append('property[id]', id);
    formData.append('property[title]', title);
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
    if (image) {
    formData.append('property[image]', image);
    }
    fetch(`/api/properties/` + id + `/edit`, safeCredentialsNoContent({
      method: 'PUT',
      body: formData
    }))
    .then(handleErrors)
    .then(res => {
        if (res.property) {
          window.location.replace(`/property/` + id);
        }
    })
  }


  render () {
    const { id, title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths } = this.state;
    return (
      <React.Fragment>
      <h2>Edit Property</h2>
      <form onSubmit={this.editProperty}>
        <input name="title" value={title} type="text" placeholder="title" onChange={this.handleChange} />
        <input name="description" value={description} type="text" placeholder="description" onChange={this.handleChange} />
        <input name="city" value={city} type="text" placeholder="city" onChange={this.handleChange} />
        <input name="country" value={country} type="text" placeholder="country" onChange={this.handleChange} />
        <input name="property_type" value={property_type} type="text" placeholder="property type" onChange={this.handleChange} />
        <label>Price per Night
        <input name="price_per_night" value={price_per_night} type="number" placeholder="0" onChange={this.handleChange} />
        </label>
        <label>Max Guests
        <input name="max_guests" value={max_guests} type="number" placeholder="0" onChange={this.handleChange} />
        </label>
        <label>Bedrooms
        <input name="bedrooms" value={bedrooms} type="number" placeholder="0" onChange={this.handleChange} />
        </label>
        <label>Beds
        <input name="beds" value={beds} type="number" placeholder="0" onChange={this.handleChange} />
        </label>
        <label>Baths
        <input name="baths" value={baths} type="number" placeholder="0" onChange={this.handleChange} />
        </label>
        <label>Upload image</label>
        <input type="file" id="image-select" name="image" accept="image/*" ref={this.imageRef} />
        <button className="btn btn-primary">Edit</button>
      </form>
      </React.Fragment>
    )

  }

}

export default EditProperty;
