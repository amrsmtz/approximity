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
    session[:journey] << @business.id

    respond_to do |format|
      format.html { redirect_to root_path }
      format.js # <-- will render `app/views/pages/create_journey.js.erb`
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
    @origin = params[:origin]
    @business_ids = session[:journey]
    @businesses = @business_ids.map { |id| Business.find(id) }
    coords_array = Business.new(longaddress: @origin).geocode || [-73.567256, 45.5016889]

    @markers = [{ lat: coords_array.first, lng: coords_array.last }]

    @businesses.each do |business|
      @markers << { lat: business.latitude, lng: business.longitude }
    end
  end
end
