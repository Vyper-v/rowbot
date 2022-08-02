const dotenv = require('dotenv');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord.js');

dotenv.config();

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID,"1002623366173294642"), {body: []});
