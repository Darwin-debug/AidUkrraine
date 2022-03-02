class ApplicationController < ActionController::Base
    around_action :switch_locale

    def switch_locale(&action)
        locale = params[:locale] || I18n.default_locale
        I18n.with_locale(locale, &action)
    end

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
