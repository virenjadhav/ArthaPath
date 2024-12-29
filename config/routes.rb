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
    get 'get_transaction', to: 'transactions#show_transaction'
    post 'create_or_save_transaction', to: 'transactions#create_or_save_transaction'
    # put 'update_transaction/:id', to: 'transactions#update_transaction'               # PUT request
    delete 'delete_transaction/:id', to: 'transactions#destroy_transaction'           # DELETE request
  end
  scope :budgets do
    get 'get_budgets', to: 'budgets#get_budgets'
    get 'get_budget', to: 'budgets#show'
    post 'create_budget', to: 'budgets#create_budget'
    put 'update_budget/:id', to: 'budgets#update_budget'               # PUT request
    delete 'delete_budget/:id', to: 'budgets#destroy_budget'           # DELETE request
  end
  scope :debts do
    get 'get_debts', to: 'debts#get_debts'
    get 'get_debt', to: 'debts#show_debt'
    post 'create_or_save_debt', to: 'debts#create_or_save_debt'
    # put 'update_debt/:id', to: 'debts#update_debt'               # PUT request
    delete 'delete_debt/:id', to: 'debts#destroy_debt'           # DELETE request
  end
  scope :banks do
    get 'get_banks_details', to: 'banks#get_banks_details'
    get 'get_bank', to: 'banks#show_bank'
    # post 'create_bank', to: 'banks#create_bank'
    # put 'update_bank/:id', to: 'banks#update_bank'               # PUT request
    post 'create_or_save_bank', to: 'banks#create_or_save_bank'
    delete 'delete_bank/:id', to: 'banks#destroy_bank'           # DELETE request
  end
  scope :accounts do
    get 'get_accounts_details', to: 'accounts#get_accounts_details'
    get 'get_account', to: 'accounts#show_account'
    post 'create_account', to: 'accounts#create_or_save_account'
    # put 'update_account/:id', to: 'accounts#update_account'               # PUT request
    delete 'delete_account/:id', to: 'accounts#destroy_account'           # DELETE request
  end
  scope :common_category do 
    post 'save_common_category', to: 'common_category#save_common_category_to_user'
  end
  scope :image do 
    post 'upload_image', to: 'image#upload_image'
    post 'upload_bank_icon', to: 'image#upload_bank_icon'
    post 'upload_debt_attachment', to: 'image#upload_debt_file'
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
