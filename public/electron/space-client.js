const { SpaceClient } = require('@fleekhq/space-client');

const spaceClient = new SpaceClient({
  url: 'http://0.0.0.0:9998',
});

module.exports = spaceClient;
