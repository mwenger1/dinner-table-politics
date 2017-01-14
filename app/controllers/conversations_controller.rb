class ConversationsController < ApplicationController
  def new
    @conversation = Conversation.new
    2.times { @conversation.people.build }
  end

  def show
    @conversation = Conversation.find(params[:id])
  end

  def create
    @conversation = Conversation.create(conversation_params)

    redirect_to @conversation
  end

  private

  def conversation_params
    params.require(:conversation).permit!
  end
end
