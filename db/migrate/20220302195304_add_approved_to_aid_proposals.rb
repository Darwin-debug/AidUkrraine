class AddApprovedToAidProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :aid_proposals, :approved, :boolean
  end
end
