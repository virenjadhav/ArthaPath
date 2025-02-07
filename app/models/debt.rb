class Debt < ApplicationRecord
    include ModelHelper
    include General
    include ConcernAssociation
    
    has_many :debt_lines, dependent: :destroy
    # has_many :debt_lines, class_name: "DebtLine", dependent: :destroy

    has_generic_association :debt_lines

    # Define a mapping of symbolic names to characters
    STATUSES = { Active: 'A', Closed: 'C', Overdue: 'O' }.freeze
    # scope active, -> { where(active: true) }
    # Scope for active debts
    scope :active, -> { where(active: true) }

    # Scope to include only debts with active debt_lines
    scope :with_active_debt_lines, -> {
        joins(:debt_lines).where(debt_lines: { active: true }).distinct
    }
    def active_debt_lines
        debt_lines.active
    end

    # Add methods to mimic enum-like behavior
    def status=(value)
        super(STATUSES[value.to_sym]) if value.present?
    end

    def status
        STATUSES.key(super) if super.present?
    end

    # Define scopes for querying
    STATUSES.each do |key, value|
        scope key, -> { where(status: value) }
    end


    public
    def build_association_for_debt(doc)
        debt_lines_doc = doc[:debt_lines]
        if debt_lines_doc
            self.build_and_modify_debt_lines(debt_lines_doc) do |debt_line|
                # Additional modifications 
                debt_line.build_association_for_debt_lines(debt_line)  
                Rails.logger.debug("Processing DebtLine: #{debt_line.inspect}")
              end
        end
    end

    def self.find_or_create_debt(doc)
        begin
            debt = Debt.find_or_initialize_by(id: doc[:id])
            debt.build_and_assign_attributes(doc)
            if debt.new_record?
                code = get_debt_code(doc) 
                debt.debt_code = code
                debt.amount = doc[:initial_amount]
                debt.paid_amount = doc[:intial_paid_amount]
                debt.debt_amount = doc[:initial_amount] - doc[:intial_paid_amount]
            end
            # debt.assign_attributes(doc)
            # debt.assign_attributes(debt_attributes)
            
            return debt
        rescue Exception => ex
            raise ex.blank? ? "Something wrong in fetching debt." : ex.to_s
        end
      end
    private
    def self.get_debt_code(doc)
        code = doc["debt_code"]
        if code.blank?
            code = auto_generated_debt_code
            return code
        else
            # validate code it is already present or not if it is already present then give error to user.
            data = Debt.where(:debt_code => code) 
            if data.blank?
                return code
            else
                raise "Code# #{code} already exist. Please type unique Debt Code."
            end
        end
    end
    def self.auto_generated_debt_code
        # condition = "active = 1 and TRY_CAST(debt_code AS BIGINT) IS NOT NULL"
        condition = "active = 1 AND debt_code like '#{DEBT_CODE}-%' AND TRY_CAST(SUBSTRING(debt_code, CHARINDEX('-', debt_code) + 1, LEN(debt_code)) AS BIGINT) IS NOT NULL"
        debts = Debt.where(condition).select("MAX(TRY_CAST(SUBSTRING(debt_code, CHARINDEX('-', debt_code) + 1, LEN(debt_code)) AS BIGINT)) AS max_code")
        if debts.blank? or debts.first.max_code.blank?
            code = DEBT_CODE.to_s + "-"+ DEBT_CODE_NO.to_s
        else
            max_code = debts.first.max_code + 1
            code = DEBT_CODE.to_s + "-" + max_code.to_s
        end
        return code
    end
    
end