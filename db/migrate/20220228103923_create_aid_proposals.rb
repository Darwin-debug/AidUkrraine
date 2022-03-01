class CreateAidProposals < ActiveRecord::Migration[7.0]
  def change
    create_table :aid_proposals do |t|
      t.string :AidProposal
      t.string :full_name
      t.string :country
      t.string :city
      t.text :items
      t.date :date
      t.text :contact

      t.timestamps
    end
  end
end
