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
var bot = new builder.UniversalBot(connector);
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
var intents = new builder.IntentDialog({ recognizers: [recognizer], intentThreshold: 0.8 });
bot.dialog('/', intents);

intents.matches('Help', [ 
    function (session) {
        session.endDialog('Computer says no. Sorry.');
    }
]);

intents.matches('Book Leave', [ 
    function (session, args, next) {
        // retrieve type of leave name from matched entities
        var typeOfLeaveEntity = builder.EntityRecognizer.findEntity(args.entities, 'Type of Leave');
        if (typeOfLeaveEntity) {
            session.privateConversationData.typeOfLeave = typeOfLeaveEntity.entity;
            session.beginDialog('getDate');
        }
    },
    function (session, results, next) {
        // check for a response
        if (results.response) {
            const typeOfLeave = session.privateConversationData.typeOfLeave;
            const date = results.response;
            session.endConversation(`Booking ${typeOfLeave} leave for ${date}`);
            // do stuff here
        } else {
            // no valid response received - End the conversation
            session.endConversation(`Sorry, computer says no.`);
        }
    }
]);

intents.onDefault([
    function (session) {
        session.send('Hello');
    }
]);

bot.dialog('getDate', [
    function (session, args, next) {
        // prompt user
        builder.Prompts.text(session, 'What date would you like?');
    },
    function (session, results, next) {
        const date = results.response;
        session.endDialogWithResult({ response: date.trim() });
    }
]);
