require 'open-uri'

class PagesController < ApplicationController

  def home
    if params[:query].present?
      @businesses = Business.search_by_name_and_category(params[:query])
    else
      @businesses = Business.all
    end

    @origin = params[:origin]
    respond_to do |format|
      format.html { session[:journey] = [] }
      format.js
    end
  end

  def create_journey
    @business = Business.find(params[:business][:id])
    if !session[:journey].include?(@business.id)
      session[:journey] << @business.id
    end

    respond_to do |format|
      format.html { redirect_to root_path }
      format.js
      # <-- will render `app/views/pages/create_journey.js.erb`
    end
  end

  def delete_from_journey
    @business_id = params[:business_id].to_i
    index_to_destroy = session[:journey].find_index { |business| business == @business_id }
    session[:journey].delete_at(index_to_destroy)
    respond_to do |format|
      format.html { redirect_to root_path }
      format.js # <-- will render `app/views/pages/delete_from_journey.js.erb`
    end
  end

  def map
    if session[:journey].empty? || params[:origin].blank?
      redirect_to root_path
    else
      @origin = params[:origin]
      @business_ids = session[:journey]
      @businesses = @business_ids.map { |id| Business.find(id) }
      @colors = ['#fff','#fff','#fff','#fff','#fff']

      coords_array = Business.new(longaddress: @origin).geocode || [-73.567256, 45.5016889]

      @markers = [ { marker: {lng: coords_array.last, lat: coords_array.first } } ]
      @businesses.each do |business|
        @markers << {  marker: {lng: business.longitude, lat: business.latitude}  }
      end

      @json_string = @markers.map {|marker| marker[:marker].values.join(",")}.join(";")

      @optimization_url = "https://api.mapbox.com/optimized-trips/v1/mapbox/walking/#{@json_string}?access_token=#{ENV['MAPBOX_API_KEY']}&source=first&roundtrip=true"

      @optimized_route = JSON.parse(open(@optimization_url).read)

      @markers = @optimized_route['waypoints'].each_with_index.map do |waypoint, i|
        if i == 0
          { lng: waypoint['location'][0], lat: waypoint['location'][1]}
        else
          { lng: waypoint['location'][0], lat: waypoint['location'][1] , index: waypoint["waypoint_index"], popHTML: render_to_string(partial: "components/popup", locals: { business: @businesses[i - 1] })}
        end
      end
    end
  end
end
