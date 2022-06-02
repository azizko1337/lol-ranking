# riot-api-ranking

### This project is API which checks given people' League of Legends ranking points every 1 hour (00:00, 01:00, ...). Every midnight ranking snapshot is saved to "database". (For simplicity I used json files as database). Project contains also minimalistic front-end (index page) with day-by-day ranking graph.

## Currently hosted on https://riot.antonizalupka.cf

## Front-end to this API written by my friend: http://soloqtable.epizy.com

## Instruction to run this project:

1. Get Riot API production key from https://developer.riotgames.com/
2. Set PORT and Riot API key in config.js file
3. Run `npm install` command
4. Now you can start project by running `node app` command
