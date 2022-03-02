class UpdateTelegramJob < ApplicationJob
  queue_as :default


  CHAT_ID = "@testaidchannel"

  def construct_request_url(text, message_id)
      if message_id.nil?
        "https://api.telegram.org/bot#{Rails.application.credentials.telegram[:bot_token]}/sendMessage?#{{chat_id: CHAT_ID, text: text}.to_param}"
      else
        "https://api.telegram.org/bot#{Rails.application.credentials.telegram[:bot_token]}/editMessageText?#{{chat_id: CHAT_ID, text: text, message_id: message_id}.to_param}"
      end
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
      logger.debug "Message id = #{aid_proposal.message_id}"
      url = construct_request_url(convert_to_message(aid_proposal, show_url), aid_proposal.message_id)
      response = HTTParty.post(url)

      response_value = JSON.parse(response.body) 

      if (response_value["ok"]) 
        message_id = response_value["result"]["message_id"]
        aid_proposal.update(:message_id => message_id)
      else
        logger.debug url
      end
  end
end
