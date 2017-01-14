Rails.application.routes.draw do
  root to: "conversations#new"

  resources :conversation, only: [:new, :create]
end
