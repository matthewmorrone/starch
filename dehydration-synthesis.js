var log = console.log.bind(console);
var fs = require("fs");
var vm = require('vm');
var shell = require("shelljs/global");

var cp = function(from, to) {
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
}
var dive = function(dir, action) {
    if (typeof action !== "function") {
        action = function(error, file) {};
    }
    fs.readdir(dir, function(err, list) {
        if (err) {return action(err);}
        list.forEach(function(file1) {
            var path1 = dir + "/" + file1;
            log(path1);
            fs.readdir(path1, function(err, list) {
                if (err) {return action(err);}
                list.forEach(function(file2) {
                    var path2 = dir+"/"+file1+"/"+file2;
                    if (file2 === "index.js") {
                        log(path2);
                        log(dir+"/"+file1+".js");
                        cp(path2, dir+"/"+file1+".js")
                    }
                });
            });
        });
    });
};
dive(process.argv[2]);



// var exec = tryrequire('child_process').exec;

function tryrequire(pckg) {
  var requiredPackage;
  try {
    var requiredPackage = require(pckg);
  }
  catch (e) {
    log(e)
    // var requiredPackage = exec('npm install ' + pckg);
  }
  return requiredPackage;
}

// var version = exec('node -v').output;
// var minimist = tryrequire('minimist');
var argv = require('minimist')(process.argv.slice(2));
// really ... nothing special, just a cleaned up argv
module.exports = process.argv.slice(1 + /(?:^|\/|\\)node(?:\.exe)?$/.test(process.argv[0]));



var request = tryrequire("request");
var rimraf  = tryrequire("rimraf");
fs.rmdir      = rimraf;
fs.rmdirSync  = rimraf.sync;

var Set = require("./set.js").Set;// || tryrequire("./set.js");

var starch = tryrequire("./starch.js");




fs.nativeReadFile = fs.readFile;
fs.readFile = function(url, callback) {
    fs.nativeReadFile(url, {encoding: "utf8"}, callback);
}

fs.requestFile = function(from, to) {
  request(from).pipe(fs.createWriteStream(to)).on("response", function(res) {
    log(to);
  });
}
fs.copyFile = function(from, to) {
  fs.createReadStream(from).pipe(fs.createWriteStream(to))
}


var include = function(path) {
  var code = fs.readFileSync(path);
  vm.runInThisContext(code, path);
}.bind(this);
var inContext = function(code) {
  // vm.runInThisContext(code);
  vm.runInThisContext(JSON.stringify(code));
}.bind(this);
// // includeInThisContext(__dirname+"/models/car.js");

inContext(starch);
// inContext(Random);



// includeInThisContext("./starch.js");

exports.log = log;
