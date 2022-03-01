class AddUserToAidProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :aid_proposals, :user_email, :string
  end
end
