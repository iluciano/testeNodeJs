var mongoose = require( 'mongoose' );
var gracefulShutdown;
var readLine;
var dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

readLine = require("readline");
if(process.platform === "win32"){
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function(){
        process.emit("SIGINT");
    });
};

mongoose.connection.on('connected', function(){
    console.log('Mongoose conectando a ' + dbURI);
});
mongoose.connection.on('error', function(err){
    console.log('Mongoose erro de conexão: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose desconectado');
});

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose desconectado ' + msg);
        callback();
    });
};

process.on('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    });
});
process.on('SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown', function(){
        process.exit(0);
    });
});