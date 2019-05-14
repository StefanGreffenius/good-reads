# Cheat Sheet

## Sidekiq

#### Check Sidekiq Keys within Redis DB

```
Sidekiq.redis do |redis|
  keys                  = redis.keys('uniquejobs:*')
  keys_in_running_state = keys.select { |key| key =~ /RUN/}

  p "#{keys.count} TOTAL KEYS FOUND!"
  p "#{keys_in_running_state.count} RUNNING STATE KEYS FOUND"
end
```

#### Get the value of a single Redis Key

```
Sidekiq.redis do |redis|
  redis.get("uniquejobs:073c3c3ae711af019b4e7fac895cac04")
end

# on Redis::CommandError exception you need to check the type. `.get` only works for strings
# Redis value types are:
# strings — a sequence of binary safe bytes up to 512 MB
# hashes — a collection of key value pairs
# lists — an in-insertion-order collection of strings
# sets — a collection of unique strings with no ordering
# sorted sets — a collection of unique strings ordered by user defined scoring

```

#### Get the type of a single Redis Key

```
Sidekiq.redis do |redis|
  redis.type("uniquejobs:073c3c3ae711af019b4e7fac895cac04")
end
```

#### Delete all Sidekiq keys within Redis DB

```
# Do not use `flushdb` as redis might also contains other keys then Sidekiq

Sidekiq.redis do |redis|
  keys =
  redis.keys('uniquejobs:*').each do |key|
    redis.del(key)
    p "Deleted key: '#{key}'"
  end
end
```

#### Access Redis DB without Sidekiq

`Redis.current`


#### Create log entry when worker tries to run but there is already a locked worker
```
sidekiq_options lock: :until_executed, on_conflict: :log
```

#### Check Server Logs for conflictig Worker

- go to AWS CloudWatch -> Protokolle -> Einblicke
- select Server stdouterr.log
- select timeframe

```
fields @timestamp, @message
| sort @timestamp desc
| limit 100
| filter @message like /is not locked, allowing job to silently complete/

or

| filter @message like /WorkerName/
````
