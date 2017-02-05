var express = require('express');
var app = express();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var baseDir = '~/projects/brain-socket';
var mainProcess;

app.post('/payload', function (req, res) {
    var event = req.body;
    // make sure it's a push to master
    if (event.respository.full_name.toLowerCase() === 'firedrake969/brain-socket' && event.ref === 'refs/heads/master') {
        console.log('Deploying...');

        // kill server if already running
        if (mainProcess) {
            mainProcess.kill();
        }

        // reset local changes
        execSync('git reset --hard', {cwd: baseDir}, execCallback);

        // remove added files
        execSync('git clean -df', {cwd: baseDir}, execCallback);

        // pull
        execSync('git pull origin master', {cwd: baseDir}, execCallback);

        // build
        execSync('go build', {cwd: baseDir}, execCallback);
        execSync('npm i', {cwd: `${baseDir}/client`}, execCallback);
        execSync('webpack', {cwd: `${baseDir}/client`}, execCallback);

        // and run
        mainProcess = spawn('./brain-socket', {cwd: baseDir});
        mainProcess.stdout.on('data', function(data) {
            process.stdout.write(data.toString());
        });

        console.log('Deployed');
    }
});

app.listen(8000, function() {
    process.stdout.write('Node server on port 8000');
});

function execCallback(err, stdout, stderr) {
    if (stdout) {
        process.stdout.write(stdout);
    }
    if (stderr) {
        console.error(stderr);
    }
}