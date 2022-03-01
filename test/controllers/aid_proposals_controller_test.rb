require "test_helper"

class AidProposalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @aid_proposal = aid_proposals(:one)
  end

  test "should get index" do
    get aid_proposals_url
    assert_response :success
  end

  test "should get new" do
    get new_aid_proposal_url
    assert_response :success
  end

  test "should create aid_proposal" do
    assert_difference("AidProposal.count") do
      post aid_proposals_url, params: { aid_proposal: { AidProposal: @aid_proposal.AidProposal, city: @aid_proposal.city, contact: @aid_proposal.contact, country: @aid_proposal.country, date: @aid_proposal.date, full_name: @aid_proposal.full_name, items: @aid_proposal.items } }
    end

    assert_redirected_to aid_proposal_url(AidProposal.last)
  end

  test "should show aid_proposal" do
    get aid_proposal_url(@aid_proposal)
    assert_response :success
  end

  test "should get edit" do
    get edit_aid_proposal_url(@aid_proposal)
    assert_response :success
  end

  test "should update aid_proposal" do
    patch aid_proposal_url(@aid_proposal), params: { aid_proposal: { AidProposal: @aid_proposal.AidProposal, city: @aid_proposal.city, contact: @aid_proposal.contact, country: @aid_proposal.country, date: @aid_proposal.date, full_name: @aid_proposal.full_name, items: @aid_proposal.items } }
    assert_redirected_to aid_proposal_url(@aid_proposal)
  end

  test "should destroy aid_proposal" do
    assert_difference("AidProposal.count", -1) do
      delete aid_proposal_url(@aid_proposal)
    end

    assert_redirected_to aid_proposals_url
  end
end
