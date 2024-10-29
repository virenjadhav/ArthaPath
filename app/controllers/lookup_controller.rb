class LookupController < ApplicationController

    def get_lookup_record 
        result, msg, records = Lookup.get_lookup_records(params)
        if result 
            render json: {message: "#{msg}", result: 'success', records: records}, status: :ok
        else 
            render json: {message: "#{msg}", result: 'error', error: "#{msg}"}, status: :unprocessable_entity
        end
    end

    def validate_lookup_value
        lookup__params = params[:lookup]
        result, msg, record = Lookup.validate_lookup(lookup__params)
        if result
            render json: {message: 'lookup validated.', result: 'success', record: record}, status: :ok
        else 
            render json: {message: "#{msg}", result: 'error', error: "#{msg}"}, status: :unprocessable_entity
        end
    end

end