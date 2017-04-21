// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Computer says no. Dunno what \'%s\' means. Try typing \'help\' if you like...', session.message.text);
});

// Specify the LUIS model we'll use
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(recognizer);

bot.dialog('Book Leave', function (session, args) {
    // retrieve type of leave name from matched entities
    var typeOfLeaveEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Type of Leave');
    if (typeOfLeaveEntity) {
        session.send('You want to book \'%s\' leave...?', typeOfLeaveEntity.entity);
    }
}).triggerAction({
    matches: 'Book Leave'
});

bot.dialog('Help', function (session) {
    session.endDialog('Computer says no. Sorry.');
}).triggerAction({
    matches: 'Help'
});