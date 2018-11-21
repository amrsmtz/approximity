class PagesController < ApplicationController
  def home
    @businesses = Business.all
  end
end
