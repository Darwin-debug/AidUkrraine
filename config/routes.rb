Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: { registrations: "users/registrations" }

  resources :aid_proposals
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "static_pages#home"

  get '/aid_proposals_validate', to: 'aid_proposals#index_to_validate'
  get '/aid_proposals_approve/:id', to: 'aid_proposals#approve'
  get '/aid_proposals_decline/:id', to: 'aid_proposals#decline'
  get '/my_proposals', to: 'aid_proposals#my_proposals'
end
