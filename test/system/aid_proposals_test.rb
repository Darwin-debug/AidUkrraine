require "application_system_test_case"

class AidProposalsTest < ApplicationSystemTestCase
  setup do
    @aid_proposal = aid_proposals(:one)
  end

  test "visiting the index" do
    visit aid_proposals_url
    assert_selector "h1", text: "Aid proposals"
  end

  test "should create aid proposal" do
    visit aid_proposals_url
    click_on "New aid proposal"

    fill_in "Aidproposal", with: @aid_proposal.AidProposal
    fill_in "City", with: @aid_proposal.city
    fill_in "Contact", with: @aid_proposal.contact
    fill_in "Country", with: @aid_proposal.country
    fill_in "Date", with: @aid_proposal.date
    fill_in "Full name", with: @aid_proposal.full_name
    fill_in "Items", with: @aid_proposal.items
    click_on "Create Aid proposal"

    assert_text "Aid proposal was successfully created"
    click_on "Back"
  end

  test "should update Aid proposal" do
    visit aid_proposal_url(@aid_proposal)
    click_on "Edit this aid proposal", match: :first

    fill_in "Aidproposal", with: @aid_proposal.AidProposal
    fill_in "City", with: @aid_proposal.city
    fill_in "Contact", with: @aid_proposal.contact
    fill_in "Country", with: @aid_proposal.country
    fill_in "Date", with: @aid_proposal.date
    fill_in "Full name", with: @aid_proposal.full_name
    fill_in "Items", with: @aid_proposal.items
    click_on "Update Aid proposal"

    assert_text "Aid proposal was successfully updated"
    click_on "Back"
  end

  test "should destroy Aid proposal" do
    visit aid_proposal_url(@aid_proposal)
    click_on "Destroy this aid proposal", match: :first

    assert_text "Aid proposal was successfully destroyed"
  end
end
