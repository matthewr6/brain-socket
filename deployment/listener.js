var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var execSync = require('child_process').execSync;
var spawn = require('child_process').spawn;

var baseDir = '/home/matthew/projects/brain-socket';

function build() {
    execSync('git pull origin master', {cwd: baseDir});
    execSync('go get -u all');
    execSync('go build', {cwd: baseDir});
    execSync('npm i', {cwd: `${baseDir}/client`});
    execSync('webpack', {cwd: `${baseDir}/client`});
}

build();
var mainProcess = spawn('./brain-socket', {cwd: baseDir});
mainProcess.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    var event = req.body;
    // make sure it's a push to master
    var repoName = event.repository.full_name.toLowerCase();
    var repoChecks = ['firedrake969/gopher-brain', 'firedrake969/brain-socket']
    if (repoChecks.indexOf(repoName) > -1 && event.ref === 'refs/heads/master') {
        console.log('Start deployment');

        build();

        if (mainProcess) {
            mainProcess.kill();
        }
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