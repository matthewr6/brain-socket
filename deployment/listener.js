var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var execSync = require('child_process').execSync;
var spawn = require('child_process').spawn;

var baseDir = '~/projects/brain-socket';
var mainProcess;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    var event = req.body;
    // make sure it's a push to master
    if (event.repository.full_name.toLowerCase() === 'firedrake969/brain-socket' && event.ref === 'refs/heads/master') {
        console.log('Deploying...');

        // kill server if already running
        if (mainProcess) {
            mainProcess.kill();
        }

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
    console.log('Node server on port 8000');
});

function execCallback(err, stdout, stderr) {
    if (stdout) {
        process.stdout.write(stdout);
    }
    if (stderr) {
        console.error(stderr);
    }
}