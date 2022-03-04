class AidProposal < ApplicationRecord
    validates :country, :presence => true
    validates :city, :presence => true
    validates :full_name, :presence => true
    validates :contact, :presence => true
    validates :date, :presence => true
    validates :description, :presence => true
    validates :lat, :presence => true
    validates :lng, :presence => true

    def self.search(query)
        if query
            where(["(country LIKE ? or city LIKE ? or full_name LIKE ?) and approved == true", "%#{query}%", "%#{query}%", "%#{query}%"])
        else
            all.where(approved: true)
        end
    end
end
