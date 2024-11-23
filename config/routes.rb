Rails.application.routes.draw do
  post '/login', to: 'sessions#create_session'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create_user'
  get 'logged_in', to: 'sessions#logged_in'
  # resources :transactions
  # resources :budgets
   # Route to change the user's password (requires authentication)
   scope :transactions do
    get 'get_transactions', to: 'transactions#get_transactions'
    get 'get_transaction', to: 'transactions#show'
    post 'create_transaction', to: 'transactions#create_transaction'
    put 'update_transaction/:id', to: 'transactions#update_transaction'               # PUT request
    delete 'delete_transaction/:id', to: 'transactions#destroy_transaction'           # DELETE request
  end
  scope :common_category do 
    post 'save_common_category', to: 'common_category#save_common_category_to_user'
  end
  scope :user_category do 
    get 'get_user_categories', to: 'user_category#get_user_categories'
    get 'get_user_category', to: 'user_category#show_user_category'
    post 'create_user_category', to: 'user_category#create_user_category'
    put 'update_user_category/:id', to: 'user_category#update_user_category'               # PUT request
    delete 'delete_user_category/:id', to: 'user_category#destroy_user_category' 
  end
  
  get 'get_common_categories', to: 'common_category#get_common_categories'
  put 'change_password', to: 'users#change_password'
  get 'get_lookup_record', to: 'lookup#get_lookup_record'
  post 'validate_lookup_value', to: 'lookup#validate_lookup_value'

  # match ':module_name/:module_name/:action', to: 'application#module_action_handler', via: [:get, :post]
  # match ':module_name/:action', to: 'application#module_action_handler', via: [:get, :post]
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


  # namespace :transaction do
  #   resources :transaction, only: [:index, :create] do
  #     collection do
  #       get 'get_transactions'
  #       post 'create_transaction'
  #     end
  #   end
  # end

  # scope :transaction do
  #   scope :transaction do
  #     get 'get_transactions', to: 'transaction#get_transactions'
  #     post 'create_transaction', to: 'transaction#create_transaction'
  #     # Add more actions as needed
  #   end
  # end
end
