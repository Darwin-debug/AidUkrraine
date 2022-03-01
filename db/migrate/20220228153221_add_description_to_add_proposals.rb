class AddDescriptionToAddProposals < ActiveRecord::Migration[7.0]
  def change
    rename_column :aid_proposals, :items, :description
  end
end
