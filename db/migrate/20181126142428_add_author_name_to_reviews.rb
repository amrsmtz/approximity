class AddAuthorNameToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :author_name, :string
  end
end
