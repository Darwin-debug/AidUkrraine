json.extract! aid_proposal, :id, :full_name, :country, :city, :description, :url, :date, :contact, :user_email, :created_at, :updated_at
json.url aid_proposal_url(aid_proposal, format: :json)
