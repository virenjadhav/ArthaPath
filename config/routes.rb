Rails.application.routes.draw do
  post '/login', to: 'sessions#create_session'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create_user'
  get 'logged_in', to: 'sessions#logged_in'
  resources :transactions
  #   resources :transactions, only: [:list_all, :show_all, :new, :create, :edit, :update, :destroy], path_names: { index: 'list_all', show: 'show_all' }

  
  
  # get 'incomes/Expenses'
  # get 'incomes/Budgets'
  # get 'incomes/SavingsGoals'
  # get 'incomes/Categories'
  # post 'signup', to: 'users#signup'
  # post 'login', to: 'authentication#authenticate'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
