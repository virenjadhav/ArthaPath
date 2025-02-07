module ConcernAssociation
    extend ActiveSupport::Concern
    # plaese not that : 
        # 1. to use concern you have to go to debt_line.rb (or child module) and write it like 'include ConcernAssociation'
        # **** if we write concern in debt_line then self is refer to debt_line if we write inside debt then self is refer debt module, apply logic accordingly ****
        # 2. it applicatble to all model or it is globally available to all associations (if we include this)
        # 3. doesn't matter which association you use (has_many or belongs_to) it is applicable to all associations
        # 4. it is provide methods, validations, scope 
        # 5. we apply custom logic, methos and validation to all associations
        # 6. like inside include we all method like set serial_no for all associations 


        # this include block will be run automatically if we access value
        included do
            # inside this we can add callbacks to all associations
            # inside this we add more functionality like before_save and after_action 
            # this function only run for new record
            # before_validation :assign_serial_no, on: :create
        
            # this validation only applicable for new record
            # this directly call when i write it like : 
            # Validate uniqueness of serial_no scoped to debt_id debt.debt_lines.create(price: 100.0)
            # validates :serial_no, uniqueness: { scope: :debt_id, message: "must be unique for the same Debt" }
        end
        public 
        # Define the method for assigning attributes
        def build_and_assign_attributes(attributes)
          # Get all column names as symbols for the current model
          attributes = attributes.attributes if attributes.respond_to?(:attributes)
          allowed_attributes = self.class.column_names.map(&:to_sym)
          # Slice attributes to include only matching attributes
          # filtered_attributes = attributes.slice(*allowed_attributes)
          filtered_attributes = attributes.transform_keys(&:to_sym).slice(*allowed_attributes)
          # Permit the filtered attributes explicitly
          # permitted_attributes = filtered_attributes.permit! if filtered_attributes.respond_to?(:permit)
          permitted_attributes = filtered_attributes.respond_to?(:permit) ? filtered_attributes.permit! : filtered_attributes
          # Assign the filtered attributes to the model
          # self.assign_attributes(filtered_attributes)

          # Assign attributes, checking for defaults
          filtered_attributes.each do |key, value|
            if value.nil? # Check if the attribute value is nil
              default_value = self.class.columns_hash[key.to_s].default # Fetch the default value from the schema
              self[key] = default_value unless default_value.nil? # Assign the default value if it exists
            else
              self[key] = value # Assign the provided value
            end
          end



          # Assign the permitted attributes to the model
          # self.assign_attributes(permitted_attributes)
          # Handle nested attributes, if present
          # attributes.each do |key, value|
          #   if self.class.reflect_on_association(key.to_sym)
          #     association = self.send(key)
              
          #     # If the association is present and the nested attributes exist
          #     if association.present? && value.is_a?(Hash)
          #       # Build and assign nested attributes using the same method
          #       association.build_and_assign_attributes(value)
          #     end
          #   end
          # end
          self.assign_serial_no
        end

        private
        # only provide method that is applicable to all association
        # debt = Debt.find(1)
        # new_debt_line = debt.debt_lines.create(price: 100.0)
        # puts new_debt_line.serial_no
        # if we puts debt_line.serial_no i am directly get max_serial_no for this new debt line by concern association
        # assign_serial_no will be called when i write debt.debt_lines.create(price: 100.0)
        # def assign_serial_no
        #   # Only calculate serial_no if it is a new record and serial_no is not already set
        #   if serial_no.blank? && new_record?
        #     max_serial_no = debt.debt_lines.maximum(:serial_no) || 0 # debt: Refers to the associated Debt object, accessed via the belongs_to :debt association in the DebtLine model.
        #     self.serial_no = max_serial_no + 1 # this is setting serial_no for debt_lines, this self refer to debt_lines
        #   end
        # end
        # def assign_serial_no
        #   return if serial_no.present? || !new_record?
      
        #   # Dynamically determine the parent model based on the instance's associations
        #   parent_model = self.class.reflect_on_all_associations(:belongs_to).find do |association|
        #     self.send(association.name).present?
        #   end
      
        #   return unless parent_model
      
        #   # Fetch the relevant model's lines (debt_lines, loan_lines, etc.)
        #   associated_model = self.send(parent_model.name)
          
        #   # Find the max serial_no for that model's lines
        #   max_serial_no = associated_model.class.maximum(:serial_no) || 100
        #   self.serial_no = max_serial_no + 1
        # end
        # def assign_serial_no
        #   return if serial_no.present? || !new_record?
      
        #   if parent_model_instance.present?
        #     # Fetch max serial_no for the associated lines
        #     max_serial_no = parent_model_instance.send("#{self.class.name.underscore.pluralize}").maximum(:serial_no) || 100
        #     self.serial_no = max_serial_no + 1
        #   else
        #     # Default serial_no if no parent model is present
        #     self.serial_no = 101
        #   end
        # end
        def assign_serial_no
          return if !new_record?
          if self.class.const_defined?(:PARENT_MODEL)
            parent_instance = send(self.class::PARENT_MODEL) if self.class::PARENT_MODEL
            if parent_instance.present?
              max_serial_no = parent_instance.send("#{self.class.name.underscore.pluralize}").maximum(:serial_no) || 100
              self.serial_no = max_serial_no + 1
            else
              self.serial_no = 101
            end
          end
        end

        # class_methods do
        #   def has_generic_association(association_name)
        #     # Set up the has_one association dynamically
        #     has_one association_name, dependent: :destroy, inverse_of: name.underscore.to_sym
      
        #     # Accept nested attributes for the association
        #     accepts_nested_attributes_for association_name
      
        #     # Define a dynamic method to build and modify the association
        #     define_method("build_and_modify_#{association_name}") do |attributes = {}, &block|
        #       association = send("build_#{association_name}", attributes)
        #       yield(association) if block_given?
        #       association
        #     end
        #   end
        # end
        
        # class_methods do
        #   def has_generic_association(association_name)
        #     # has_one association_name, dependent: :destroy, inverse_of: name.underscore.to_sym
        #     accepts_nested_attributes_for association_name
      
        #     define_method("build_and_modify_#{association_name}") do |attributes = {}, &block|
        #       # If attributes include an ID, find the existing association; otherwise, build a new one
        #       # if attributes[:id].present?
        #       #   association = send(association_name) || send("build_#{association_name}")
        #       #   association.assign_attributes(attributes.except(:id)) # Update attributes
        #       # else
        #       #   association = send("build_#{association_name}", attributes)
        #       # end
        #       if attributes[:id].present?
        #         association = send(association_name) || send("build_#{association_name}")
        #         association.build_and_assign_attributes(attributes.except(:id)) # Update attributes (excluding the ID)
        #       else
        #         association = send("build_#{association_name}", attributes) # Build a new association
        #       end
        #       yield(association) if block_given?
        #       association
        #     end
        #   end
        # end

        class_methods do
          def has_generic_association(association_name)
            accepts_nested_attributes_for association_name, allow_destroy: true
      
            define_method("build_and_modify_#{association_name}") do |attributes, &block|
              raise "Attributes cannot be null for association" if attributes.blank?
              association_reflection = self.class.reflect_on_association(association_name)
              is_collection = association_reflection.collection?
              if is_collection
                handle_has_many_association(association_name, attributes, &block)
              else
                handle_has_one_association(association_name, attributes, &block)
              end
            end
          end
        end
        def handle_has_one_association(association_name, attributes, &block)
          attributes = attributes.is_a?(Array) ? attributes.first : attributes
          # attributes = attributes.is_a?(Hash) ? attributes : attributes.attributes
          attributes = 
                    if attributes.is_a?(Hash)
                      attributes
                    elsif attributes.respond_to?(:to_unsafe_h)
                      attributes.to_unsafe_h # Convert ActionController::Parameters to a Hash
                    else
                      attributes.attributes
                    end
          association = send(association_name) || send("build_#{association_name}")
          # if attributes[:id].present?
          if attributes["id"].is_a?(Integer) && attributes["id"].present?
            association.assign_attributes(attributes.except(:id))
            # association =  send(association_name) || send("build_#{association_name}")
          else
            association.assign_attributes(attributes)
            # association = send("build_#{association_name}")
          end
          # association = if attributes["id"].present?
          #                 send(association_name) || send("build_#{association_name}")
          #               else
          #                 send("build_#{association_name}")
          #               end
          # association.assign_attributes(attributes.except("id"))
          # if attributes[:id].present?
          #   association = send(association_name) || send("build_#{association_name}")
          #   association.build_and_assign_attributes(attributes.except(:id)) # Update attributes (excluding the ID)
          # else
          #   association = send("build_#{association_name}", attributes) # Build a new association
          # end
          yield(association) if block_given?
          association
        end
      
        def handle_has_many_association(association_name, attributes_array, &block)
          attributes_array.each do |attributes|
            # Ensure attributes is a hash
            # attributes = attributes.is_a?(Hash) ? attributes : attributes.attributes
            attributes = 
                    if attributes.is_a?(Hash)
                      attributes
                    elsif attributes.respond_to?(:to_unsafe_h)
                      attributes.to_unsafe_h # Convert ActionController::Parameters to a Hash
                    else
                      attributes.attributes
                    end
            association = if attributes["id"].present?
                            send(association_name).find_or_initialize_by(id: attributes["id"])
                          else
                            send(association_name).build
                          end
            # association.assign_attributes(attributes.except(:id))
            association.build_and_assign_attributes(attributes.except("id"))
            yield(association) if block_given?
          end
        end

end