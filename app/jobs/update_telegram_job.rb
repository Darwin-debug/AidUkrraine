class UpdateTelegramJob < ApplicationJob
  queue_as :default

  CHAT_ID = (Rails.env.production? || false) ? "@aidukrainechannel" : "@testaidchannel"
  APPROVAL_CHAT_ID = "@aidukraineproposals"

  def select_channel(aid_proposal)
    if aid_proposal.approved.nil?
      APPROVAL_CHAT_ID
    elsif aid_proposal.approved
      CHAT_ID
    end
  end

  def construct_request_url(text, message_id, channel)
      if message_id.nil?
        "https://api.telegram.org/bot#{Rails.application.credentials.telegram[:bot_token]}/sendMessage?#{{chat_id: channel, text: text}.to_param}"
      else
        "https://api.telegram.org/bot#{Rails.application.credentials.telegram[:bot_token]}/editMessageText?#{{chat_id: channel, text: text, message_id: message_id}.to_param}"
      end
  end

  def convert_to_message(aid_proposal, proposal_url, approval_url, decline_url)
    result = %Q(
      #{aid_proposal.full_name} збирає гуманітарну допомогу Україні в #{aid_proposal.city}, #{aid_proposal.country}!
Дата: #{aid_proposal.date}

Опис:
#{aid_proposal.description}

Зв'язатися:
#{aid_proposal.contact}

Посилання на заявку:
#{proposal_url}
    )
  if aid_proposal.approved.nil?
    result+= %Q(

Approve: #{approval_url}
Decline: #{decline_url}
    )
  end
  result
end

  def message_id_key(aid_proposal)
    if aid_proposal.approved.nil?
      :message_id_approval
    else
      :message_id
    end
  end

  def perform(aid_proposal, show_url, approval_url, decline_url)
      url = construct_request_url(convert_to_message(aid_proposal, show_url, approval_url, decline_url), aid_proposal[message_id_key aid_proposal], select_channel(aid_proposal))
      response = HTTParty.post(url)
      response_value = JSON.parse(response.body) 
      if (response_value["ok"]) 
        message_id = response_value["result"]["message_id"]
        aid_proposal.update(message_id_key(aid_proposal)=> message_id)
      else
        logger.info "Failed to send telegram message."
      end
  end
end
