var q = require("q");
var os = require("os");

module.exports = {


    ls: function (callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine ls', function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }


            //NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER    ERRORS
            //default   -        virtualbox   Running   tcp://192.168.99.100:2376           v1.10.3


            var lines = stdout.split(os.EOL);



            //getting the start and end positions for the subsequent substr operation
            var letterboundaries = [];
            letterboundaries.push(0);

            var headerline = lines[0];

            for (var i = 0; i < headerline.length; i++) {
                if (headerline[i] == ' ' && headerline[i + 1] != ' ') {
                    letterboundaries.push(i + 1);
                }
            }
            letterboundaries.push(headerline.length);



            var linearrays = [];

            // clean up the output
            for (var i = 0; i < lines.length; i++) {

                var stringarray = [];

                for (var j = 0; j < letterboundaries.length - 1; j++) {
                    var newString = lines[i].substring(letterboundaries[j], letterboundaries[j + 1]);
                    stringarray.push(newString);
                }

                linearrays.push(stringarray);
            }


            var json = [];
            var headers = [];

            //building headers

            for (var i = 0; i < linearrays[0].length; i++) {
                headers.push(linearrays[0][i].trim().toLowerCase());
            }

            //building the json objects
            for (var i = 1; i < linearrays.length - 1; i++) {
                var machineObj = Object();
                for (var j = 0; j < headers.length; j++) {
                    if (linearrays[i][j].trim() == '') {
                        machineObj[headers[j]] = undefined;
                    } else {
                        machineObj[headers[j]] = linearrays[i][j].trim();
                    }
                }

                json.push(machineObj);
            }

            d.resolve(json);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },

    create: function (machineName, options, callback) {

        var d = q.defer();

        var flags = "";

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'driver')
                    flags += " --" + key + " " + options[key];
                else
                    flags += " --" + key + "=" + options[key];
            }
        }

        var command = 'docker-machine create' + flags + ' ' + machineName;

        console.log(command);

        var exec = require('child_process').exec;
        exec(command, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            module.exports.inspect(machineName).then(function (output) {

                d.resolve(output);

            }).fail(function (err) {

                d.reject(err);
            });


        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;

    },



    rm: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine rm -y ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },


    active: function (callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine active', function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },


    inspect: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine inspect ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            try {
                var machine = JSON.parse(stdout);

            } catch (e) {
                d.reject(e);
            }

            d.resolve(machine);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },



    regenerateCerts: function (machineName, callback) {

        var d = q.defer();

        var command = 'docker-machine regenerate-certs -f ' + machineName;

        console.log(command);

        var exec = require('child_process').exec;
        exec(command, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            module.exports.inspect(machineName).then(function (output) {

                d.resolve(output);

            }).fail(function (err) {

                d.reject(err);
            });


        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;

    },




    kill: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine kill ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },


    start: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine start ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },



    stop: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine stop ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },




    restart: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine restart ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },



    upgrade: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine upgrade ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },


    ssh: function (machineName, command, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine ssh ' + machineName + ' ' + command, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },



    url: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine url ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout);

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    },



    ip: function (machineName, callback) {

        var d = q.defer();

        var exec = require('child_process').exec;
        exec('docker-machine ip ' + machineName, function (error, stdout, stderr) {

            if (error) {
                d.reject(stderr);
                return;
            }

            d.resolve(stdout.replace('\n', ''));

        });

        // allow standard node callbacks
        d.promise.nodeify(callback);

        return d.promise;
    }

};