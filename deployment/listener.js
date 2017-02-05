var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

var base_dir = '~/projects/brain-socket';

app.post('/payload', function (req, res) {
    var event = req.body;
    var mainProcess;
    // make sure it's a push to master
    if (event.respository.full_name.toLowerCase() == 'firedrake969/brain-socket' && event.ref = 'refs/heads/master') {
        console.log('Deploying...')

        // kill server if already running
        if (mainProcess.kill) {
            mainProcess.kill();
        }
        
        // reset local changes
        exec('git reset --hard', {cwd: base_dir}, execCallback);

        // remove added files
        exec('git clean -df', {cwd: base_dir}, execCallback);

        // pull
        exec('git pull -f', {cwd: base_dir}, execCallback);

        // build
        exec('go build', {cwd: base_dir}, execCallback);
        exec('npm i', {cwd: `${base_dir}/client`}, execCallback);
        exec('webpack', {cwd: `${base_dir}/client`}, execCallback);

        // and run
        mainProcess = exec('./brain-socket', {cwd: base_dir}, execCallback);

        console.log('deployed');
    }
});

app.listen(8000, function () {
    console.log('Node server on port 8000')
});

function execCallback(err, stdout, stderr) {
    if (stdout) {
        console.log(stdout);
    }
    if (stderr) {
        console.log(stderr);
    }
}