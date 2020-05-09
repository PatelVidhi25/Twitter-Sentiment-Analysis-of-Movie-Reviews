const request = require('request');
// var AWS = require('aws-sdk/dist/aws-sdk-react-native');
var AWS = require("aws-sdk");

// var credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
// AWS.config.credentials = credentials;
AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AWS_ACCESS_KEY_ID",
    secretAccessKey: "AWS_SECRET_ACCESS_KEY"});
var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

var twitter = [
    {id:0 , title:"Introduction to Ionic", speaker:"CHRISTOPHE COENRAETS", time:"9:40am", room:"Ballroom A", description: "In this session, you'll learn how to build a native-like mobile application using the Ionic Framework, AngularJS, and Cordova."},
    {id:1 , title:"AngularJS in 50 Minutes", speaker:"LISA SMITH", time:"10:10am", room:"Ballroom B", description: "In this session, you'll learn everything you need to know to start building next-gen JavaScript applications using AngularJS."},
    {id:2 , title:"Contributing to Apache Cordova", speaker:"JOHN SMITH", time:"11:10am", room:"Ballroom A", description: "In this session, John will tell you all you need to know to start contributing to Apache Cordova and become an Open Source Rock Star."},
    {id:3 , title:"Mobile Performance Techniques", speaker:"JESSICA WONG", time:"3:10Pm", room:"Ballroom B", description: "In this session, you will learn performance techniques to speed up your mobile application."},
    {id:4 , title:"Building Modular Applications", speaker:"LAURA TAYLOR", time:"2:00pm", room:"Ballroom A", description: "Join Laura to learn different approaches to build modular JavaScript applications."}
];

exports.findAll = function (req, res, next) {
    var movie = req.params.movie;
    request({
        url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23'+movie+'%20lang:en&result_type=recent&count=25',
        headers: {
            'Authorization': 'TWITTER_BEARER_TOKEN'
        },
    }, function(err, res1) {
        if(err) {
            console.error("err");
            console.error(err);
        } else {
            console.log(res1.body);
            var data = JSON.parse(res1.body)['statuses'];
            let texts = [];
            // console.log(data);
            data.forEach(function(data1) {
                texts.push(data1.text);
            });
            var params = {
                LanguageCode: 'en',
                TextList: texts
            };
            var totalPositive=0;
            var totalNegative=0;
            var totalNeutral=0;
            var totalMixed=0;

            comprehend.batchDetectSentiment(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    for(let i=0; i < data['ResultList'].length; i++) {
                        if (data['ResultList'][i]['Sentiment'] == "NEUTRAL") {
                            totalNeutral++;
                        } else if (data['ResultList'][i]['Sentiment'] == "POSITIVE") {
                            totalPositive++;
                        } else if (data['ResultList'][i]['Sentiment'] == "NEGATIVE") {
                            totalNegative++;
                        } else if (data['ResultList'][i]['Sentiment'] == "MIXED") {
                            totalMixed++;
                        }
                        data['ResultList'][i]['Tweet'] = texts[i];
                    }           // successful response
                    data['totalPositive'] = totalPositive;
                    data['totalNegative'] = totalNegative;
                    data['totalNeutral'] = totalNeutral;
                    data['totalMixed'] = totalMixed;
                    res.send(data);
                }
            });

        }

    });
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(twitter[id]);
};