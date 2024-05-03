class SomeController < JwtTokenApplicationController
  before_action :authenticate_request

  def some_action
    render json: { message: 'Выполнено какое-то действие' }
  end
end
