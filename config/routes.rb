Rails.application.routes.draw do
  root to: 'pages#home'
  get '/map', to: 'pages#map', as: 'map'
  post '/journey', to: 'pages#create_journey', as:'journey'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
