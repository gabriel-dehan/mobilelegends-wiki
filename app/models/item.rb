class Item < ApplicationRecord
  after_save :set_code_name

  def full_price
    # Memoize
    if !@_full_price
      components_price = fetch_components.map(&:full_price).inject(:+) || 0
      @_full_price = components_price + self.craft_price    
    end
    @_full_price
  end

  def fetch_components
    # We can't batch this because sometimes two components are used twice 
    self.components.map { |component| Item.find_by(code_name: component) }
  end

  def as_json(options = {})
    super({ methods: [:full_price] }.merge(options))
  end

  private
  # Code name is just the name of the item downcased without ' and with _ instead of whitespaces
  # "King's glory" -> "kings_glory"
  def set_code_name
    _code_name = self.name.gsub(/'/, '').gsub(/ /, '_').downcase
    if self.code_name != _code_name
      self.code_name = _code_name
      self.save
    end
  end
end
