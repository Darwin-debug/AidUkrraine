class UpdateTelegramJob < ApplicationJob
  queue_as :default


  CHAT_ID = "@testaidchannel"

  def construct_request_url(text)
      "https://api.telegram.org/bot#{Rails.application.credentials.telegram[:bot_token]}/sendMessage?#{{chat_id: CHAT_ID, text: text}.to_param}"
  end

  def convert_to_message(aid_proposal, proposal_url)
    %Q(
      #{aid_proposal.full_name} збирає гуманітарну допомогу Україні в #{aid_proposal.city}, #{aid_proposal.country}!

Опис:
#{aid_proposal.description}

Зв'язатися:
#{aid_proposal.contact}

Посилання на заявку:
#{proposal_url}
    )
  end

  def perform(aid_proposal, show_url)
      url = construct_request_url convert_to_message(aid_proposal, show_url)
      logger.debug url
      repsonse = HTTParty.post(url)
  end
end
