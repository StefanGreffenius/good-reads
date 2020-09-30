module Callable
  extend ActiveSupport::Concern

  class_methods do
    def call(*args)
      new(*args).call
    end
  end
end

# whatever.rb
class Whatever
  include callable

  def call
    puts 'Works'
  end
end

Whatever.call
