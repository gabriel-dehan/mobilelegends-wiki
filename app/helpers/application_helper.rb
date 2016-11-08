require 'find'

module ApplicationHelper
  # render all the partials in views/components
  def load_components
    pathes = Find.find(Rails.root.join("app", "views", "components")).select { |path| !FileTest.directory?(path) }

    pathes.map do |path| 
      render path.split(/\/views\//).last.gsub(/\/_/, "/").gsub(/\.html\.erb/, '')
    end.join.html_safe
  end
end
