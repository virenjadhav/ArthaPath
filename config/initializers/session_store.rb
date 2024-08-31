Rails.application.config.session_store :cookie_store, key: '_finance_app_session', httponly: true, secure: Rails.env.production?, expire_after: 2.hours
