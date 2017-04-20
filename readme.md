# Developer Lab 1

## Cognitive Services
This lab will be divided into roughly three sections; we'll look at two Cognitive Services
- Development environment setup
- LUIS integration 
- QnA Maker overview  

## Set-up VS Code
Download codebase from github
Set up the right command prompt for vscode
Set up code for debugging
- Node --debug app.js
- Hit "play" and select "add configuration"
- Use "attach to port"
Use npm to load libraries
- npm install -save

## LUIS
Log in to LUIS, set up an account
Log in to Azure and make your own Cognitive Services key (optional)
Upload an existing application (company assistant) and link it to a key
Train and test existing application/model
Overview of NLP - intents/entities/utterances/features

## LUIS with a Bot
Get LUIS URL and put it in our Bot
Set Bot up so that it detects intent and falls through to a default if no suitable option is found

## QnA Maker
Log in to QnA Maker, set up an account
Note - QnA Maker is early preview, so no need to associate key
Point QnA Maker at a suitable FAQ site
Test a specific QnA Maker scenario
Add a question to the QnA Maker model
Retest for a specific scenario
Modify Bot to fall through to QnA Maker search