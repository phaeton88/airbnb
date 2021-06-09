Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/guestpage/:user' => 'static_pages#guestpage'
  get '/hostpage/:user' => 'static_pages#hostpage'
  get '/property/bookings/:id' => 'static_pages#propertybookings'
  get '/booking/success/:id' => 'static_pages#success'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
    post '/charges/mark_complete' => 'charges#mark_complete'
    post '/properties/create' => 'properties#create'
    delete '/properties/:id' => 'properties#destroy'
    put '/properties/:id/edit' =>'properties#edit'
    get '/users/:username/bookings' => 'bookings#index_by_user'
    get '/users/:username/properties' => 'properties#index_by_user'
    get 'bookings/success/:id' => 'bookings#success'


  end

end
