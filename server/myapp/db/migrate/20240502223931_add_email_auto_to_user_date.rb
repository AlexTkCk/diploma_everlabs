class AddEmailAutoToUserDate < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :email_auto, :boolean
  end
end
