
# Canvas Due Date Discord Bot

This discord bot is designed for discord servers created by students for their canvas classes. It sends weekly reminders of all upcoming assignments for the week. Additionally, the bot also provides a slash command (/get-assignments) that lists all assignments that are due. 
## How It Works
Once you install the and run the bot it will send a message containing all assignments due that week in the specified `channelId` every Sunday at 12pm . There is also /get-assignments that will return an ephemeral message containing all upcoming assignments that can be used by anyone.
![get-assignments](https://i.imgur.com/jXEhWWj.png)
## Installation

Create a discord bot and when generating a link to invite select scopes `bot` and `applications.commands`. For bot permissions select all text permissions.

Download the code or clone the repository using:
```bash
  git clone https://github.com/MichaeTav/Canvas-Assignments-Discord-Bot.git
```
Create a `.env` file in the root directory with the following fields:
```bash
token=YOUR_DISCORD_BOT_TOKEN
botId=YOUR_DISCORD_BOT_ID
guildId=YOUR_DISCORD_SERVER_ID
channelName=YOUR_DISCORD_SERVER_CHANNEL
courseId=YOUR_CANVAS_COURSE_ID
canvasToken=YOUR_CANVAS_TOKEN
```
`token` can be found once you create a discord bot. If you need to reset the token then it also needs to be updated here.

`botId` is the id of your bot and can be found either trhough the discord developer portal or by right clicking on the bot once it joins your server and selecting copy id.

`guildId` is the server you want the bot to operate in and can be found in the same way by right clicking the server and selecting copy id.

`channelName` is the channel where you want weekly updates. Make sure it is the exact name.

`courseId` can be found by navigating to https://your-institution.instructure.com/graphiql and using this query to find the id for the course you want to use the bot with:
```bash
query getClass {
  allCourses {
    _id
    name
  }
}
```
**Note**: I have only tested this using student level access not sure how different it is for other users.

`canvasToken` can be found following the first step [here](https://learninganalytics.ubc.ca/for-students/canvas-api/).

Once you have the .env fields updated use `npm install` in the root directory to install dependencies. 

You can now start the bot using `node bot.js`
