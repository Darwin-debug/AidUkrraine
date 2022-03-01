class AddUrlToAidProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :aid_proposals, :url, :string
  end
end
