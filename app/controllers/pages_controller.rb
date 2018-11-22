class PagesController < ApplicationController
  def home
    session[:journey] = []
    if params[:query].present?
      @businesses = Business.search_by_name_and_category(params[:query])
    else
      @businesses = Business.all
    end
  end

  def map
    @markers = [{ lat: 48.8582, lng: 2.2945 }];
  end

  def create_journey
    @business = Business.find(params[:business][:id])
    session[:journey] << @business
    respond_to do |format|
      format.html { redirect_to root_path }
      format.js # <-- will render `app/views/pages/create_journey.js.erb`
    end
  end
end
