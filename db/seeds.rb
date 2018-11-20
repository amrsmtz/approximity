# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

parameters = "key=#{ENV['API_PLACES_KEY']}"
bakery = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bakery+in+montreal&#{parameters}"
shoemaker = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=shoemaker+in+montreal&#{parameters}"
butcher = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=butcher+in+montreal&#{parameters}"
drycleaner = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=dry+cleaner+in+montreal&#{parameters}"

ids = []

bakery_serialized = open(bakery).read
bakeryid = JSON.parse(bakery_serialized)

shoemaker_serialized = open(shoemaker).read
shoemakerid = JSON.parse(shoemaker_serialized)

butcher_serialized = open(butcher).read
butcherid = JSON.parse(butcher_serialized)

drycleaner_serialized = open(drycleaner).read
drycleanerid = JSON.parse(drycleaner_serialized)


(bakeryid["results"] + shoemakerid["results"] + butcherid["results"] + drycleanerid["results"]).each do |result|
 ids << result["place_id"]
end

ids.first(1).each do |id|
  details_url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{id}&#{parameters}"
  details_serialized = open(details_url).read
  details = JSON.parse(details_serialized)["result"]

  name = details["name"]
  shortaddress = details["vicinity"]
  longaddress = details["formatted_address"]
  phone = details["formatted_phone_number"]
  ratings = details["rating"]
  hours = details["opening_hours"]["weekday_text"]
  type = details["types"][0]
  website = details["website"]
  p price_level = details["price_level"]
  latitude = details["geometry"]["location"]["lat"]
  longitude = details["geometry"]["location"]["lng"]

  # business = Business.create(....)

  all_review = details["reviews"]
  all_review.first(3).each do |review|
    note = review["rating"]
    text = review["text"]
    # Review.create!(...., business: business)
  end


end


# storedb = []

# puts "#{store['place_id']}"
#faire une requete generale par localisation
# response['candidates'] est un array
# array_of_ids = response['candidates'].map { |business| business['id']}

# array_of_ids.each do |id|
  # faire une requete detail pour chaque id
  # Business.create(...)
# end

