/**
 * Created by Ferkat on 8/25/17.
 */
var pg = require('pg');
require('dotenv').load();

var connectDB = function() {

    var dbUserName=process.env.DB_USER_NAME,
    dbPassword=process.env.DB_PASSWORD,
    dbUrl=process.env.DB_URL,
    dbPort=process.env.DB_PORT,
    dbName=process.env.DB_NAME;


    var conString = "postgres://"+dbUserName+":"+dbPassword+"@"+dbUrl+":"+dbPort+"/"+dbName;
    this.client = new pg.Client(conString);
    this.client.connect(function(err){
        if(err){
            return console.error('Could not connect to postgres: /n', err);
        }
    });
};
module.exports = connectDB;