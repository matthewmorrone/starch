var fs = require("fs");
var cp = function(from, to) {
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
}
var log = console.log.bind(console);
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
