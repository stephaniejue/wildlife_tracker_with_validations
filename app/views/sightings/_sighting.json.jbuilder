json.extract! sighting, :id, :date, :latitude, :longitude, :animal_id, :region_id, :created_at, :updated_at
json.url sighting_url(sighting, format: :json)
