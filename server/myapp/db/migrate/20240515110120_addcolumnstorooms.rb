class Addcolumnstorooms < ActiveRecord::Migration[7.1]
  def change
    add_column :rooms, :name, :string
    add_column :rooms, :players_count, :integer, default: 0
    add_column :rooms, :game_started, :boolean, default: false
    add_column :rooms, :password, :string
    add_column :rooms, :password_status, :boolean, default: false
    add_column :rooms, :game_lock_status, :boolean, default: false
  end
end
