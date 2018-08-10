const { server } = require('./server');

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
