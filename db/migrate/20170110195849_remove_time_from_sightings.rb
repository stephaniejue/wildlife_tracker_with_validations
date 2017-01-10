class RemoveTimeFromSightings < ActiveRecord::Migration
  def change
    remove_column :sightings, :time, :time
  end
end
