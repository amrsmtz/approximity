class PagesController < ApplicationController
  def home
    if params[:query].present?
      @businesses = Business.search_by_name_and_category(params[:query])
    else
      @businesses = Business.all
    end
  end
end
