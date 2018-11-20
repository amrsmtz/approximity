class Business < ApplicationRecord
  has_many :reviews, dependent: :destroy
end
