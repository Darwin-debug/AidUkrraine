class AidProposal < ApplicationRecord
    validates :country, :presence => true
    validates :city, :presence => true
    validates :full_name, :presence => true
    validates :contact, :presence => true
    validates :date, :presence => true
    validates :description, :presence => true
end
