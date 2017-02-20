var tcpp = require("tcp-ping");

//tcpp.probe("www.google.com", 81, function(err, available) {
//  console.log(available);
//});

var op = {
  address: "www.google.com",
  port: 81,
  timeout: 5000,
  attempts: 5
};

tcpp.ping(op, function(err, data) {
  console.log(data);
});
