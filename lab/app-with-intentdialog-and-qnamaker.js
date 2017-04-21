// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');
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
var luisRecognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(luisRecognizer);
var basicQnAMakerRecognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: process.env.QNA_KB_ID, 
	subscriptionKey: process.env.QNA_SUB_ID});	
bot.recognizer(basicQnAMakerRecognizer);
var luisIntents = new builder.IntentDialog({ 
    recognizers: [luisRecognizer], 
    intentThreshold: 0.8
});
var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
	recognizers: [basicQnAMakerRecognizer],
    defaultMessage: 'QnA Maker says no. Sorry.',
	qnaThreshold: 0.3,
    dialog: "qna"
});
bot.recognizer(basicQnAMakerRecognizer);

bot.dialog('/', luisIntents);
bot.dialog('qna', basicQnAMakerDialog);

luisIntents.matches('Help', [ 
    function (session) {
        session.endDialog('Computer says no. Sorry.');
    }
]);

luisIntents.matches('Book Leave', [ 
    function (session, args) {
        // retrieve type of leave name from matched entities
        var typeOfLeaveEntity = builder.EntityRecognizer.findEntity(args.entities, 'Type of Leave');
        if (typeOfLeaveEntity) {
            session.send('You want to book \'%s\' leave...?', typeOfLeaveEntity.entity);
        }
    }
]);

luisIntents.onDefault([
    function (session, args) {
        session.beginDialog('qna', args);
        // session.send('LUIS says no. Sorry.');
    }
]);
