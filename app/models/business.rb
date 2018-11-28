class Business < ApplicationRecord
  has_many :reviews, dependent: :destroy

  geocoded_by :longaddress

  include PgSearch
  pg_search_scope :search_by_name_and_category,
    against: [:name, :category],
    using: {
      tsearch: { prefix: true }
    }
end
