class ItemsController < ApplicationController
  def index
    @items = Item.all.order(price: :asc)
    @categories = Item.all.select(:category).order(category: :asc).distinct.pluck(:category)
    # Add "All" to the categories
    @categories.unshift("All")
  end

end
