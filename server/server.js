var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    twitter        = require('./routes/twitter'),
    amazon        = require('./routes/amazon'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//twitter routes
app.get('/tweets/:movie', twitter.findAll);
app.get('/tweets/:id', twitter.findById);

//amazon routes
app.get('/aws', amazon.findAll);
app.get('/aws/health/check', amazon.healthCheck);
app.get('/aws/:id', amazon.findById);
app.get('/aws/create/bucket', amazon.createBucket);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
