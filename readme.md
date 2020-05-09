/* Requirement */
NPM installed
Node.js installed
Developer account on Twitter
AWS basic developer account

/* Install node modules for client */
Open command prompt
Go to Client directory
	Run : npm install 

/* Install node modules for client */
Open command prompt
Go to Server directory
	Run : npm install 

/* Update personal account info */
	Open file "server/routes/twitter.js"
	Update your AWS personal account ID in place of "AWS_ACCESS_KEY_ID" at LINE#9
	Update your AWS Secret Access key in place of "AWS_SECRET_ACCESS_KEY" at LINE#10
	Update Twitter BEARER TOKEN generated using Twitter credentials for "TWITTER_BEARER_TOKEN" at LINE#26
	
/* Run the application */
-- Run Client
Open command prompt
Go to Client directory
	Run : ng serve 

-- Run server
Open command prompt
Go to Server directory
	Run : node server.js
	
Open your browser
access url : localhost:4200
