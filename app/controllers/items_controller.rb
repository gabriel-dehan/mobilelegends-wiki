class ItemsController < ApplicationController
  def index
    @items = Item.all.order(price: :asc)
    @categories = Item.all.select(:category).order(category: :asc).distinct.pluck(:category)
  end
end
