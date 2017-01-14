require "rails_helper"

RSpec.describe "User starts conversation" do
  scenario "User starts conversation" do
    visit root_path

    fill_in("conversation[people_attributes][0][name]", with: "Mike")
    fill_in("conversation[people_attributes][1][name]", with: "Laura")
    click_on t("helpers.submit.conversation.create")

    expect(page).to have_content "Mike + Laura"
  end
end
