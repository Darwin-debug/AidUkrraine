class AddMessageIdApprovalToAidProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :aid_proposals, :message_id_approval, :integer
  end
end
