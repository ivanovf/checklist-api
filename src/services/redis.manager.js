const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 7000, 
  password: 'redis123'
});

module.exports = client;