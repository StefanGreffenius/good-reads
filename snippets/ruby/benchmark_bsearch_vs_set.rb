require 'benchmark'
require 'set'

max = (ARGV.shift || 2_000_000).to_i

array = Array.new(20_000_000) do |val|
  val = (0...8).map { (65 + rand(26)).chr }.join
end

array << 'TESTTEST'

puts "# of iterations = #{max}"
Benchmark::bm(20) do |x|
  x.report("set") do
    set = array.to_set
    result = 0

    (0..max).each do
     if set.include?('TESTTEST')
       result += 1
     end
    end

    # p result - correct i checked
  end


  x.report("bsearch") do
    array.sort!
    result = 0

    (0..max).each do
      if array.bsearch{|val| 'TESTTEST' <=> val  }
        result += 1
      end
    end

    # p result - correct i checked
  end
end
