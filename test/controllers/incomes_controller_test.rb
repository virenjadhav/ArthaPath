require "test_helper"

class IncomesControllerTest < ActionDispatch::IntegrationTest
  test "should get Expenses" do
    get incomes_Expenses_url
    assert_response :success
  end

  test "should get Budgets" do
    get incomes_Budgets_url
    assert_response :success
  end

  test "should get SavingsGoals" do
    get incomes_SavingsGoals_url
    assert_response :success
  end

  test "should get Categories" do
    get incomes_Categories_url
    assert_response :success
  end
end
