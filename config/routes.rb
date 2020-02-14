Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  resources :users
  post 'users/login', to: 'users#login'
  post 'organizations/:id/add_user', to: 'organizations#add_user'
  # patch 'organizations/update', to: 'organizations#update'
  resources :organizations
  resources :matches, only: [:show, :index, :create, :new, :update]

end
