

--insert into common_categories(created_at, updated_at, active, name, code, type, category_type, ref_id, ref_code)
--values(GETDATE(), GETDATE(), 1, 'Borrow', 'BORROW', 'DEBT', 'main', null, null)

--insert into common_categories(created_at, updated_at, active, name, code, type, category_type, ref_id, ref_code)
--values(GETDATE(), GETDATE(), 1, 'Borrow', 'BORROW', 'DEBT', 'sub', 17, 'BORROW')

--insert into debts(created_at, updated_at, active, user_id, debt_code, debt_name, contact_no, contact_email, amount, debt_amount, interest_type, interest_rate, due_date, status, debt_type, attachment_file_name, payment_method, description)
--values(GETDATE(), GETDATE(), 1, 1, 'Dummy', 'dummy data', null, null, 20000, 20000, 'FLAT', 0, null, 'active', 'borrow', null, 'cash', '')


--insert into transactions(active, amount, user_category, trans_date, description, user_id, created_at, updated_at, trans_no, main_category_id, main_category_code, sub_category_id, sub_category_code, source_type, payment_method)
--values(1, 1000, null, GETDATE(), 'line added from debt lines', 1, GETDATE(), GETDATE(), 5035, 40, 'BORROW', 41, 'BORROW', 'DEBT', 'upi')



--insert into debt_lines(created_at, updated_at, user_id, transaction_id, debt_id, debt_code, account_id, account_code, main_category_id, main_category_code, sub_category_id, sub_category_code, amount, pay_date, debt_type, payment_method, debt_payment_type, serial_no)
--values(GETDATE(), GETDATE(), 1, 49, 1, 'Dummy', 1, 'SBI', 40, 'BORROW', 41, 'BORROW', 1000, GETDATE(), 'borrow', 'upi', 'repayment', 101)