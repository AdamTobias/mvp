exports.handleRequest = function (req, res) {

  console.log('Incoming ' + req.method + ' request to ' + req.url);

  res.end('No response yet');

};
