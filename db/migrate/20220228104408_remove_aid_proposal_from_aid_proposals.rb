class RemoveAidProposalFromAidProposals < ActiveRecord::Migration[7.0]
  def change
    remove_column :aid_proposals, :AidProposal
  end
end
