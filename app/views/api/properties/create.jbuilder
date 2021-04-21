json.property do
  json.username         @property.user.username
  json.title    @property.title
  json.description    @property.description
  json.city    @property.city
  json.country    @property.country
  json.property_type    @property.property_type
  json.price_per_night    @property.price_per_night
  json.max_guests    @property.max_guests
  json.bedrooms    @property.bedrooms
  json.beds    @property.beds
  json.baths    @property.baths
  json.image_url    url_for(@property.image)
end
