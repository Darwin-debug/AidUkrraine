class ApplicationController < ActionController::Base
    def after_sign_in_path_for(resource)
        new_aid_proposal_path
    end

    def after_sign_up_path_for(resource)
        new_aid_proposal_path
    end

    def after_sign_out_path_for(resource_or_scope)
        root_url
    end
end
