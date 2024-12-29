class ImageController < ApplicationController
    def upload_image
        directory = Dir.getwd
        log_file_name = "UploadImage-#{Time.now().strftime('%Y%m%d%H%M%S')}.txt" #"DetailSlip#{sales_order.trans_no}-#{Time.now().strftime('%Y%m%d%H%M%S')}.pdf" 
        log_file = File.open("#{Rails.root}/public/images/log/#{log_file_name}", "w")
        log_file.puts("Start Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n") 
        error = nil
        begin 
            image_detail = params[:image]
            filename = image_detail.original_filename
            storage_directory = Rails.root.join('public', 'images', 'upload_images')
            FileUtils.mkdir_p(storage_directory) unless File.exist?(storage_directory)
            temp_path = image_detail.tempfile.path 
            target_path = Rails.root.join('public', 'images', 'upload_images', filename)

            new_file_path = storage_directory.join(filename)
            # Move the file to the new location
            # FileUtils.mv(image_detail.tempfile.path, new_file_path)
            FileUtils.copy(temp_path, target_path)

             # Delete the temporary file after copying
            # File.delete(temp_path)

            render json: { message: "File uploaded successfully", path: target_path.to_s }
        rescue Exception => ex 
            error = ex
            log_file.puts "Exception : #{ex}\n"
        ensure 
            log_file.puts("End Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")      
            # log_file.puts("Successful Records - #{total_records - error_record_count} Failed Records - #{error_record_count}\n")
            log_file.close 
            if (error)
                render json: { error: error.message }, status: :internal_server_error
            end
            
        end

    end

    def upload_bank_icon
        directory = Dir.getwd
        log_file_name = "UploadBankIcon-#{Time.now().strftime('%Y%m%d%H%M%S')}.txt" #"DetailSlip#{sales_order.trans_no}-#{Time.now().strftime('%Y%m%d%H%M%S')}.pdf" 
        log_file = File.open("#{Rails.root}/public/images/log/#{log_file_name}", "w")
        log_file.puts("Start Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n") 
        error = nil
        begin 
            image_detail = params[:image]
            filename = image_detail.original_filename
            storage_directory = Rails.root.join('public', 'images', 'upload_bank_icons')
            FileUtils.mkdir_p(storage_directory) unless File.exist?(storage_directory)
            temp_path = image_detail.tempfile.path 
            target_path = Rails.root.join('public', 'images', 'upload_bank_icons', filename)

            new_file_path = storage_directory.join(filename)
            # Move the file to the new location
            # FileUtils.mv(image_detail.tempfile.path, new_file_path)
            FileUtils.copy(temp_path, target_path)

             # Delete the temporary file after copying
            # File.delete(temp_path)

            render json: { message: "File uploaded successfully", path: target_path.to_s }
        rescue Exception => ex 
            error = ex
            log_file.puts "Exception : #{ex}\n"
        ensure 
            log_file.puts("End Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")      
            # log_file.puts("Successful Records - #{total_records - error_record_count} Failed Records - #{error_record_count}\n")
            log_file.close 
            if (error)
                render json: { error: error.message }, status: :internal_server_error
            end
            
        end
    end
    def upload_debt_file
        directory = Dir.getwd
        log_file_name = "UploadDebtFile-#{Time.now().strftime('%Y%m%d%H%M%S')}.txt" 
        log_file = File.open("#{Rails.root}/public/images/log/#{log_file_name}", "w")
        log_file.puts("Start Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n") 
        error = nil
        begin 
            image_detail = params[:image]
            filename = image_detail.original_filename
            storage_directory = Rails.root.join('public', 'images', 'upload_debt_files')
            FileUtils.mkdir_p(storage_directory) unless File.exist?(storage_directory)
            temp_path = image_detail.tempfile.path 
            target_path = Rails.root.join('public', 'images', 'upload_debt_files', filename)

            new_file_path = storage_directory.join(filename)
            # Move the file to the new location
            # FileUtils.mv(image_detail.tempfile.path, new_file_path)
            FileUtils.copy(temp_path, target_path)

             # Delete the temporary file after copying
            # File.delete(temp_path)

            render json: { message: "File uploaded successfully", path: target_path.to_s }
        rescue Exception => ex 
            error = ex
            log_file.puts "Exception : #{ex}\n"
        ensure 
            log_file.puts("End Time - #{Time.now.strftime("%Y-%m-%d %H:%M:%S")}\n")      
            # log_file.puts("Successful Records - #{total_records - error_record_count} Failed Records - #{error_record_count}\n")
            log_file.close 
            if (error)
                render json: { error: error.message }, status: :internal_server_error
            end
            
        end
    end
end