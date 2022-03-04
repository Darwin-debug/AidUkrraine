class AidProposal < ApplicationRecord
    validates :country, :presence => true
    validates :city, :presence => true
    validates :full_name, :presence => true
    validates :contact, :presence => true
    validates :date, :presence => true
    validates :description, :presence => true

    def self.search(query)
        if query
            where(["(country LIKE ? or city LIKE ?) and approved == true", "%#{query}%", "%#{query}%"])
        else
            all.where(approved: true)
        end
    end
end
