# Developer Lab 1

## Overview
This lab will be divided into roughly three sections; we'll look at two Cognitive Services  
- Development environment setup  
- LUIS integration  
- QnA Maker overview    

Time permitting, we'll aim to tick-off all of the following  
We'll use Node.js in VS Code as opposed to C# in Visual Studio, because it's quick and easy  

## Set-up VS Code
Breif overview of the Bot Framework, including sample libraries on GitHub  
Overview of the Bot Framework emulator  
Download the Lab codebase from GitHub  
Set up the correct/preferred command prompt for VS Code (hint: the one with node)  
Open the terminal window in VS Code using ctrl+`  
Use npm to load libraries  
- Run `>npm install -save`  

Set up code for debugging  
- Start the debugger run `>node --debug app.js`  
- Hit "play" and select "add configuration"  
- Use "attach to port"  

## LUIS
Log in to LUIS, set up an account  
Log in to Azure and make your own Cognitive Services key (optional)  
Upload an existing application (company assistant) and link it to a key  
Train and test existing application/model  
Explain the probability/threshold
Overview of NLP - intents/entities/utterances/features  

## LUIS with a Bot
Get LUIS URL and put it in our Bot  
Discuss the "Waterfall" and "Dialog" patterns 
Set Bot up so that it detects intent and falls through to a default if no suitable option is found 
Add "Help" to the LUIS model, retrain and rerun, show how the system matches the intent now
Add a waterfall element to the Book Leave dialog, so that there's a discussion  
Modify bot to used an IntentDialog and add a configurable threshold

## QnA Maker
Log in to QnA Maker, set up an account  
Note - QnA Maker is early preview, so no need to associate key  
Point QnA Maker at a suitable FAQ site  
Test a specific QnA Maker scenario  
Add a question to the QnA Maker model  
Retest for a specific scenario  
Add QnAMaker library to package.json and re-run `>npm install -save`  
Modify Bot to fall through to QnA Maker search  

## References
GitHub - Microsoft/BotBuilder-CognitiveServices (QnA Maker) - https://github.com/Microsoft/BotBuilder-CognitiveServices  
NodeJS overview of BotBuilder for CognitiveServices - https://www.npmjs.com/package/botbuilder-cognitiveservices  
IntentDialog overview - https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/  
Bot Framework documentation - https://docs.botframework.com/en-us/  
LUIS - https://www.luis.ai/  
QnA Maker - https://qnamaker.ai/  
Microsoft Bot Framework - https://dev.botframework.com/  
Bot Builder samples on GitHub - https://github.com/microsoft/BotBuilder-Samples  
Bot Builder core concepts - https://docs.botframework.com/en-us/node/builder/guides/core-concepts/  
Change terminal settings in VS Code - https://code.visualstudio.com/docs/editor/integrated-terminal#_windows  
QnAMaker and LUIS in same Bot - https://github.com/Microsoft/BotBuilder/issues/2330#issuecomment-283171255  
