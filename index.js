var tcpp = require("tcp-ping");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("results.db");

var op = {
  address: "www.google.com",
  port: 80,
  timeout: 5000,
  attempts: 3
};

/*
 *
 * SQLite table schema
 *
 * CREATE TABLE ping_results (result_ms INT);
 *
 */

console.log("Starting...");

for(var i = 0; i < 10; i++) {
	getResult(function(data) {
		db.run("INSERT INTO ping_results VALUES ($ms);", {
			$ms: data
		});
	});
	
}

console.log("Finished");


function getResult(whenDone) {
	var promise = new Promise(function(resolve, reject) {
		tcpp.ping(op, function(err, data) {
			// if ping was unsuccessful, data.avg will be NaN
			// else, data.avg will be average time in ms
			if(data.avg === NaN) {
				reject();
			}
			else {
				resolve(data.avg);
			}
		});
	});
}
