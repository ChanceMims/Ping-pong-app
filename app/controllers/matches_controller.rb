class MatchesController < ApplicationController

    def index
        matches = Match.all
        render json: matches, include: :users
    end

    def show
        match = Match.find(params[:id])
        render json: match, include: :users
    end

    def create
        match = Match.new(match_params)
        if match.valid?
            match.save
            render json: match, include: :users
        end
    end

    private

    def match_params
        params.require(:match).permit(:win?, :match_type, :match_weight)
    end

end