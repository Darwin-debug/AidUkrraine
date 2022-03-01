class AidProposalsController < ApplicationController
  before_action :set_aid_proposal, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: [:edit, :create, :update, :new]
  before_action :validate_owner, only: [:edit, :update, :destroy]

  
  # GET /aid_proposals or /aid_proposals.json
  def index
    @aid_proposals = aid_proposals
  end

  def index_list
    @aid_proposals = AidProposal.all
  end

  # GET /aid_proposals/1 or /aid_proposals/1.json
  def show
  end

  # GET /aid_proposals/new
  def new
    @aid_proposal = AidProposal.new
  end

  # GET /aid_proposals/1/edit
  def edit
  end

  # POST /aid_proposals or /aid_proposals.json
  def create
    @aid_proposal = AidProposal.new(aid_proposal_params.merge(:user_email => current_user.email))

    respond_to do |format|
      if @aid_proposal.save
        format.html { redirect_to aid_proposal_url(@aid_proposal), notice: "Aid proposal was successfully created." }
        format.json { render :show, status: :created, location: @aid_proposal }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @aid_proposal.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /aid_proposals/1 or /aid_proposals/1.json
  def update
    respond_to do |format|
      if @aid_proposal.update(aid_proposal_params)
        format.html { redirect_to aid_proposal_url(@aid_proposal), notice: "Aid proposal was successfully updated." }
        format.json { render :show, status: :ok, location: @aid_proposal }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @aid_proposal.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /aid_proposals/1 or /aid_proposals/1.json
  def destroy
    @aid_proposal.destroy

    respond_to do |format|
      format.html { redirect_to aid_proposals_url, notice: "Aid proposal was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def aid_proposals
      if (params[:country].blank? && params[:city].blank?)
        return AidProposal.all
      end
      
      AidProposal.where(aid_proposal_search_params)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_aid_proposal
      @aid_proposal = AidProposal.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def aid_proposal_params
      params.require(:aid_proposal).permit(:full_name, :country, :city, :description, :date, :contact, :url)
    end

    def aid_proposal_search_params
      params.permit(:country, :city).reject { |_, v| v.blank?}
    end

    def validate_owner
      if @aid_proposal.user_email != current_user.email
        redirect_to aid_proposals_url
      end
    end
end
