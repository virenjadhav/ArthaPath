namespace :transactions do
  desc 'Update trans_no for existing transactions starting from 5000'
  task update_trans_no: :environment do
    Transaction.order(:id).each_with_index do |transaction, index|
      transaction.update(trans_no: 5000 + index)
    end
    puts 'Transaction numbers updated successfully.'
  end
end



# namespace :transactions do
#   desc "Update trans_no for existing records starting from 5000"
#   task update_trans_no: :environment do
#     # Find all existing records, ordered by `id` (or any preferred order)
#     transactions = Transaction.order(:id)

#     # Start trans_no from 5000 and update each record
#     trans_no_start = 5000
#     transactions.each_with_index do |transaction, index|
#       transaction.update(trans_no: trans_no_start + index)
#       puts "Updated Transaction ID #{transaction.id} with trans_no #{trans_no_start + index}"
#     end

#     puts "Finished updating trans_no for existing transactions."
#   end
# end
