require 'fileutils'
require 'csv'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


def csv_to_hash
  base_path = Rails.root.join('db', 'data', 'data.csv')
  data = CSV.read(base_path)
  data.shift
  items = []
  data.each do |item| 
    is_separator = item.include?('Separator')
    if items.empty? || is_separator
      items << {}
    end
    next if is_separator

    items.last[:name] ||= item[0].strip if item[0]
    items.last[:tier] ||= item[3].strip.downcase.gsub('tier ', '').to_i if item[3]
    items.last[:price] ||= item[2].to_i if item[2]
    items.last[:category] ||= item[1].strip.downcase if item[1]
    items.last[:components] ||= []

    items.last[:properties] = [] unless items.last[:properties]
    prop = item[4]
    if prop
      parsed = prop.strip.scan(/^((?:\+|-)?\d*)%?\s(\w*)/).flatten
      items.last[:properties] << {
        type: parsed[1],
        value: parsed[0].to_i,
        modifier: prop.strip.scan(/^(?:\+|-)?\d*%/).any?
      }
    end

    items.last[:effects] = [] unless items.last[:effects]
    effect = item[5]
    if effect
      parsed = effect.strip.scan(/^(?<is_uniq>Unique)?\s?(?<is_passive>Passive)?-?(?<name>\w*):?\s?(?<content>.+)/).flatten
      items.last[:effects] << {
        name: parsed[2],
        effect: parsed.last,
        unique: !parsed[0].blank?,
        passive: !parsed[1].blank?
      }
    end
  end

  items
end

def write_hash_to_data(items)
  base_path = Rails.root.join('db', 'data')
  items.each do |item|
    unless item.empty?
      category = item[:category]
      tier = "tier_#{item[:tier]}"
      name = item[:name].gsub(/'|-/, '').gsub(/\s/, '_').downcase
      path = base_path.join("items", category, tier, name)
      file_path = path.join("#{name}.json")
      FileUtils.mkdir_p(path)
      File.open(file_path, 'w') { |file| file.write(JSON.pretty_generate(item)) } unless File.exist?(file_path)
    end

  end
end

def json_extractor
  Item.destroy_all

  require 'find'

  pathes = []
  base_path = Rails.root.join('db', 'data')

  Find.find(base_path) do |path|
    unless FileTest.directory?(path) 
      pathes << path if File.extname(path) == ".json"
    end
  end

  # Displays all the files
  # p pathes.map { |path| path.split('/').last }

  pathes.map do |path| 
    file = File.new(path, "r")
    record = JSON.parse(file.read).with_indifferent_access
    Item.create!(record)
  end

  # Item.where("'boots' = ANY (components)")
end

#items = csv_to_hash
#write_hash_to_data(items)
json_extractor

