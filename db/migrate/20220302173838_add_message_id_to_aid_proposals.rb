class AddMessageIdToAidProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :aid_proposals, :message_id, :integer
  end
end
