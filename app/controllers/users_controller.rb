class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: user, include: [:matches, :organizations]
    end

    def create
        user = User.new(user_params(params))
        if user.valid?
            user.save
            render json: user
        # else
        #     render JSON: error
        end     
    end

    def update
        user = User.find(params[:id])
        if user.update(user_params)
            render json: user, include: [:matches, :organizations]
        end
    end

    # def destroy
    #     user = User.find(params[:id])
    #     user.delete
    # end

    private

    def user_params
        params.require(:user).permit(:username, :password, :email_address, :phone_number, :profile_icon)
    end

end