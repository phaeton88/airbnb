module Api
  class PropertiesController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
      user = check_for_session
      if user
        @property = user.properties.new(property_params)

        if @property.save
          render 'api/properties/create'
        else
          render json: { success: false }
        end
      else
        render json: { success: false }
      end
    end

    def destroy
      user = check_for_session
      if user
        @property = Property.find_by(id: params[:id])
          if @property.user == user and @property.destroy
            render json: { success: true }
          else
            render json: { success: false }
          end
      end
    end

    def edit
      user = check_for_session
      if user
        @property = Property.find_by(id: params[:id])
          if @property.user == user and @property.update(property_params)
            render 'api/properties/edit'
          else
            render json: { success: false }
          end
      end

    end


    private

    def property_params
      params.require(:property).permit(:id, :title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image)
    end
  end
end
