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
            match.users << User.find(match.challenger)
            match.users << User.find(match.recipient)
            match.save
            render json: match, include: :users
        end
    end

    def update
        match = Match.find(params[:id])
        if match.update(match_params)
            render json: match, include: :users
        end
    end

    private

    def match_params
        params.require(:match).permit(:winner_id, :loser_id, :match_type, :status, :organization_id, :challenger, :recipient)
    end

end