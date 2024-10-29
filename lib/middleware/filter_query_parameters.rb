# lib/middleware/filter_query_parameters.rb
class FilterQueryParameters
    def initialize(app)
      @app = app
    end
  
    # def call(env)
    #   # Remove the query string from the request URI before logging
    #   env["PATH_INFO"] = env["PATH_INFO"].split("?").first
    #   @app.call(env)
    # end
    def call(env)
        # Logic for filtering query parameters
        @app.call(env)
      end
  end
  