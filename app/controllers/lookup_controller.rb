class LookupController < ApplicationController

    def get_lookup_record 
        doc = @doc
        dependentLookup = doc["dependentLookup"] if !doc.blank? 
        if !dependentLookup.nil? and dependentLookup == "true"
            result, msg, records = Lookup.get_dependent_lookup_records(doc)
        else
            result, msg, records = Lookup.get_lookup_records(doc)
        end
        
        if result 
            render json: {message: "#{msg}", result: 'success', records: records}, status: :ok
        else 
            render json: {message: "#{msg}", result: 'error', error: "#{msg}"}, status: :unprocessable_entity
        end
    end

    def validate_lookup_value
        # lookup__params = params[:lookup]
        doc = @doc
        dependentLookup = doc["dependentLookup"] if !doc.blank? 
        if !dependentLookup.nil? and dependentLookup == true
            result, msg, record = Lookup.validate_dependent_lookup(doc)
        else
            result, msg, record = Lookup.validate_lookup(doc)
        end
        if result
            render json: {message: 'lookup validated.', result: 'success', record: record}, status: :ok
        else 
            render json: {message: "#{msg}", result: 'error', error: "#{msg}"}, status: :ok
        end
    end

end