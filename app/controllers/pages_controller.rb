class PagesController < ApplicationController
  def home
  end
  def map
    @markers = { lat: 48.8582, lng: 2.2945 };
  end
end
