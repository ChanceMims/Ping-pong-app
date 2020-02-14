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
        user = User.new(user_params)
        if user.valid?
            user.save
            render json: user
        else
            render json: {errors: errors.full_messages}
        end
           
    end

    def login
        user = User.find_by(username: params[:username], password: params[:password])
        if !!user
            render json: user, include: [:matches, :organizations]
        else
            render json: {error: "Invalid Username/Password combination. Please try again or select create account"}
        end

    end

    def update
        user = User.find(params[:id])
        if user.update(user_params)
            render json: user, include: [:matches, :organizations]
        else
            render json: {errors: errors.full_messages}
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