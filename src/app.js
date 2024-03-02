// Load the ".env" file and put its content to "process.env".
// To access "DISCORD_TOKEN", you'll have to use "process.env.DISCORD_TOKEN".
require('dotenv').config()

// Load "discord.js" library
const { Client, Events, GatewayIntentBits } = require('discord.js');


// Create a new client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);