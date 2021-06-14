class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def guestpage
    render 'guestpage'
  end

  def hostpage
    render 'hostpage'
  end

  def propertybookings
    render 'propertybookings'
  end

  def add
    render 'addProperty'
  end

  def success
    render 'success'
  end
end
