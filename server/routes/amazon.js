var AWS = require("aws-sdk");
var uuid = require('uuid');


var credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
AWS.config.credentials = credentials;

var amazon = [
    {id:0 , title:"Introduction to Ionic", speaker:"CHRISTOPHE COENRAETS", time:"9:40am", room:"Ballroom A", description: "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."},
    {id:1 , title:"AngularJS in 50 Minutes", speaker:"LISA SMITH", time:"10:10am", room:"Ballroom B", description: "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."},
    {id:2 , title:"Contributing to Apache Cordova", speaker:"JOHN SMITH", time:"11:10am", room:"Ballroom A", description: "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."},
    {id:3 , title:"Mobile Performance Techniques", speaker:"JESSICA WONG", time:"3:10Pm", room:"Ballroom B", description: "In this session, you will learn performance techniques to speed up your mobile application."},
    {id:4 , title:"Building Modular Applications", speaker:"LAURA TAYLOR", time:"2:00pm", room:"Ballroom A", description: "Join Laura to learn different approaches to build modular JavaScript applications."}
];

exports.findAll = function (req, res, next) {
    res.send(amazon);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(amazon[id]);
};

exports.healthCheck = function (req, res, next) {
    // console.log("Region: ", AWS.config.region);
    AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
            console.log("Access key:", AWS.config.credentials.accessKeyId);
            console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        }
    });
    res.send("Region");
};

exports.createBucket = function (req, res, next) {

    console.log("method called");
    // Create unique bucket name
    var bucketName = 'sentiment-analysis-' + uuid.v4();
    console.log(bucketName);
    // Create name for uploaded object key
    var keyName = 'tweets.txt';
    // Create a promise on S3 service object
    new AWS.S3({apiVersion: '2006-03-01'})
        .createBucket({Bucket: bucketName})
        .promise()
        .then(function(data) {
            // Create params for putObject call
            var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
            // Create object upload promise
            new AWS.S3({apiVersion: '2006-03-01'})
                .putObject(objectParams)
                .promise()
                .then(function(data) {
                    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
                });
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });
    res.send("Region");
};
