const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const {Client, GatewayIntentBits, Collection} = require('discord.js');

dotenv.config();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
});

eventFiles.forEach((file) => {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(
      event.name,
      async (interaction) => await event.execute(interaction, client)
    );
  } else {
    client.on(
      event.name,
      async (interaction) => await event.execute(interaction, client)
    );
  }
});
client.login(process.env.DISCORD_TOKEN);
