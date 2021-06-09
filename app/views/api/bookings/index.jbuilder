json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.property_id  booking.property_id
    json.price_per_night  booking.property.price_per_night
    json.is_paid  booking.is_paid
    json.username  booking.user.username
  end
end
