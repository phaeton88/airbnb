json.booking do
  json.id @booking.id
  json.start_date @booking.start_date
  json.end_date @booking.end_date
  json.property_id  @booking.property_id
  json.price_per_night  @booking.property.price_per_night
end
