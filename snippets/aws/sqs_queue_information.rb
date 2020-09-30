require 'aws-sdk-sqs'

sqs = Aws::SQS::Client.new(
  access_key_id: ENV['AWS_ACCESS_KEY_ID'],
  secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
  region: 'eu-west-1'
)
queues = sqs.list_queues
queues.queue_urls.each do |url|
  puts 'URL:                ' + url
  # Get ARN, messages available, and messages in flight for queue
  req = sqs.get_queue_attributes(
    {
      queue_url: url, attribute_names:
        [
          'QueueArn',
          'ApproximateNumberOfMessages',
          'ApproximateNumberOfMessagesNotVisible'
        ]
    }
  )

  arn = req.attributes['QueueArn']
  msgs_available = req.attributes['ApproximateNumberOfMessages']
  msgs_in_flight = req.attributes['ApproximateNumberOfMessagesNotVisible']

  puts 'ARN:                ' + arn
  puts 'Messages available: ' + msgs_available
  puts 'Messages in flight: ' + msgs_in_flight
  puts
end
