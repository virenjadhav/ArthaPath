# class FilterQueryParameters
#     HTTP_HEADER = 'HTTP_SET_COOKIE'  # Use the correct header key
  
#     def initialize(app)
#       @app = app
#     end
  
#     def call(env)
#       # Remove the query string from the request URI
#       original_path_info = env["PATH_INFO"]
#       env["PATH_INFO"] = original_path_info.split("?").first
  
#       # Log the modified request path without the query string
#       Rails.logger.info("Request path without query: #{env['PATH_INFO']}")
  
#       # Check for the presence of the Set-Cookie header
#       if env[HTTP_HEADER].nil?
#         Rails.logger.warn("HTTP_HEADER is nil")
#       else
#         Rails.logger.info("HTTP_HEADER: #{env[HTTP_HEADER]}")
#       end
  
#       @app.call(env)
#     end
# end
  
  
  
  


# # # app/middleware/filter_query_parameters.rb
# # class FilterQueryParameters
# #     def initialize(app)
# #       @app = app
# #     end
  
# #     # def call(env)
# #     #   # Remove the query string from the request URI before processing
# #     #   env["PATH_INFO"] = env["PATH_INFO"].split("?").first
      
# #     #   # Call the next middleware in the stack
# #     #   @app.call(env)
# #     # end
# #     # def call(env)
# #     #     original_path = env["PATH_INFO"]
# #     #     env["PATH_INFO"] = original_path.split("?").first
# #     #     Rails.logger.info("Request path without query: #{env['PATH_INFO']}")
      
# #     #     @app.call(env)
# #     #   end
# #     def call(env)
# #         # Save the original request path for logging
# #         original_path = env["PATH_INFO"]
    
# #         # Remove the query string from the request URI
# #         env["PATH_INFO"] = original_path.split("?").first
    
# #         # Call the next middleware
# #         @app.call(env)
    
# #         # Restore original PATH_INFO after call
# #         env["PATH_INFO"] = original_path
# #     end
      
      
# #   end
  