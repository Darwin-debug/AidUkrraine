class AddLanLngToAidProposals < ActiveRecord::Migration[7.0]
  def change
    add_column :aid_proposals, :lat, :float
    add_column :aid_proposals, :lng, :float
  end
end
