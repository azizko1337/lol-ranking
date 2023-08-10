# lol-ranking

### This project is API which checks given people' League of Legends ranking points every 1 hour (00:00, 01:00, ...). Every midnight ranking snapshot is saved to SQLITE database.

## Currently hosted on https://ranking.azalupka.cc

## Instruction to run this project:

0. You have to have installed Node.js and npm (and added to PATH)
1. # Get Riot API production key from https://developer.riotgames.com/
2. Set up `default PORT`, `Riot API key`, `Frontend URL (cors origin)` and `nicks to be tracked` in `backend/config.js` file
3. Run `npm install` command in `/backend` folder
4. # Optionally run `npm run test` command in `/backend` folder to check if project will work correctly
5. Set up `Backend URL` in `frontend/next.config.js` file
6. # Run sequentially `npm install` and `npm run build` commands in `/frontend` folder
7. Now you can start project by running `npm run start -p PORT` command in `/backend` folder and also `npm run start -- -p PORT` in `/frontend` folder
