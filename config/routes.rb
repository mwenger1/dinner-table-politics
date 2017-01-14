Rails.application.routes.draw do
  root to: "conversations#new"

  resources :conversations, only: [:new, :create, :show]
end
