Rails.application.routes.draw do
  get 'incomes/Expenses'
  get 'incomes/Budgets'
  get 'incomes/SavingsGoals'
  get 'incomes/Categories'
  post 'signup', to: 'users#signup'
  post 'login', to: 'authentication#authenticate'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
