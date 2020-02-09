class OrganizationsController < ApplicationController

    def index
        orgs = Organization.all
        render json: orgs
    end

    def show
        org = Organization.find(params[:id])
        render json: org, include: :users
    end

    def create
        org = Organization.new(org_params)
        if org.valid?
            org.save
            render json: org
        # else
        end
    end

    def update
        org = Organization.find(params[:id])
        if org.update(org_params)
            org.save
            render json: org
        # else
        end
    end

    private

    def org_params
        params.require(:organization).permit(:name, :icon_url)
    end

end