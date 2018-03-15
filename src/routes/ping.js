const handler = (request, reply) => {
  reply('pong');
};

module.exports = {
  path: '/ping',
  method: 'GET',
  handler,
};

