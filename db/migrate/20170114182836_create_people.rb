class CreatePeople < ActiveRecord::Migration[5.0]
  def change
    create_table :people do |t|
      t.string :name
      t.belongs_to :conversation, index: true
    end
  end
end
