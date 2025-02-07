module ExtendAssosiation
    # please note that : 
        # 1. this is use like : 
            # has_many :debt_lines, :extend=>ExtendAssosiation 
            # inside debt.rb where debt_lines have has_many relation to debt 
        # 2. it is only applicable to use for collection proxy like 'has_many' or 'has_and_belongs_to_many'
        # 3. it is only applicable for belongs_to or one_to_one association
        # 4. if you write :extend=>ExtendAssosiation  in debt module then you can access all it method to associated model 

        # 5. if you have function like : 
        #         def total_quantity
        #             sum(:quantity) // inside this quantity refer to debt_lines
        #         end
        #     then you can access like : debt.debt_lines.total_quantity

end