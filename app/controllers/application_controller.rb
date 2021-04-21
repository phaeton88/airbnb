class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def check_for_session
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    if not session
      return render json: { error: 'unauthorised' }, status: 401
    end
    user = session.user
    return user
  end
end
