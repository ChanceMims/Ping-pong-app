class OrganizationsController < ApplicationController

    def index
        orgs = Organization.all
        render json: orgs, include: :users
    end

    def show
        org = Organization.find(params[:id])
        render json: org, include: :users
    end

    def create
        org = Organization.new(org_params)
        if org.valid?
            org.save
            render json: org, include: :users
        # else
        end
    end

    def add_user
        org = Organization.find(params[:id])
        org.users << User.find(params[:users][:id])
        org.save
        render json: org, include: :users
    end

    def update
        org = Organization.find(params[:id])
        if org.update(org_params)
            org.save
            render json: org, include: :users
        # else
        end
    end

    private

    def org_params
        params.require(:organization).permit(:name, :icon_url, users_attributes:[:id, :username, :password, :profile_icon, :email_address, :phone_number])
    end

end