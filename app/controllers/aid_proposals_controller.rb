class AidProposalsController < ApplicationController
  before_action :set_aid_proposal, only: %i[ show edit update destroy approve decline ]
  before_action :authenticate_user!, only: [:edit, :create, :update, :new, :index_to_validate, :approve, :decline, :my_proposals]
  before_action :validate_owner, only: [:edit, :update, :destroy]
  before_action :validate_moderator, only: [:index_to_validate, :approve, :decline]
  
  # GET /aid_proposals or /aid_proposals.json
  def index
    @aid_proposals = aid_proposals
  end

  def index_list
    @aid_proposals = AidProposal.all
  end

  # Get /aid_proposals_validate
  def index_to_validate
    @aid_proposals = AidProposal.where(approved: nil)
  end

  def my_proposals
    @aid_proposals = AidProposal.where(user_email: current_user.email)
  end

  # GET /aid_appovals_approve/1
  def approve
    @aid_proposal.update(approved: true)
    send_to_telegram
    respond_to do |format|
        format.html { redirect_to aid_proposal_url(@aid_proposal), alert: "Aid proposal approved" }
        format.json { render :show, status: :created, location: @aid_proposal }
    end
  end

  # GET /aid_approvals_deny/1
  def decline
    @aid_proposal.update(approved: false)
    respond_to do |format|
        format.html { redirect_to aid_proposal_url(@aid_proposal), alert: "Aid proposal declined" }
        format.json { render :show, status: :created, location: @aid_proposal }
    end
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
        send_to_telegram
        format.html { redirect_to aid_proposal_url(@aid_proposal), alert: I18.t('aid_proposals.create.success')}
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
        send_to_telegram
        format.html { redirect_to aid_proposal_url(@aid_proposal), alert: "Aid proposal was successfully updated." }
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
      format.html { redirect_to aid_proposals_url, alert: "Aid proposal was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def aid_proposals
      AidProposal.search params[:search_query]
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_aid_proposal
      @aid_proposal = AidProposal.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def aid_proposal_params
      params.require(:aid_proposal).permit(:full_name, :country, :city, :description, :date, :contact, :url, :lat, :lng)
    end

    def aid_proposal_search_params
      params.permit(:search_query).reject { |_, v| v.blank?}
    end

    def validate_owner
      if @aid_proposal.user_email != current_user.email
        redirect_to aid_proposals_url
      end
    end

    def validate_moderator
      if current_user.moderator != true
        redirect_to aid_proposals_url, alert: "Sorry, you don't have rights to access this page."
      end
    end

    def send_to_telegram
      UpdateTelegramJob.perform_later(@aid_proposal, aid_proposal_url(@aid_proposal), url_for(action: 'approve', id: @aid_proposal.id), url_for(action: 'decline', id: @aid_proposal.id))
    end
end
