// Load the ".env" file and put its content to "process.env".
// To access "DISCORD_TOKEN", you'll have to use "process.env.DISCORD_TOKEN".
require('dotenv').config()

// Load "discord.js","REST" and "Routes" libraries.
const { Client, Events, GatewayIntentBits, REST, Routes } = require('discord.js');

(async () => {
  // Create a new client.
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });


  // Define the commands
  const commands = [
    {
      // Command name (for "/<NAME>")
      name: 'marco',

      // Command description that will be show when the user type "/"
      description: 'Replies with Polo!',

      // Command callback that will be executed
      callback: async interaction => {
        await interaction.reply('Polo!');
      }
    }
  ];

  // Register commands to Discord
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  console.log('Registering commands');

  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
    { body: commands.map(({ name, description }) => ({ name, description })) }
  );
  console.log('Commands registered');



  // Receive interactions
  client.on('interactionCreate', async interaction => {

    // Return (ignore) if it is not a command
    if (!interaction.isChatInputCommand()) return;

    // Try to fhind the command in "commands" array
    const command = commands.find(command => command.name === interaction.commandName);

    // If we haven't found the command, log, reply with an error and return
    if (!command) {
      console.log(`Unknown command received: ${interaction.commandName}`);
      await interaction.reply('Unknown command :(');
      return;
    }

    // Log the command
    console.log(`Command received by ${interaction.user.username}: ${interaction.commandName}`);

    // Execute the "callback" function corresponding to the command, and pass the "interaction" object to it
    await command.callback(interaction);
  });

  // Log in to Discord with your client's token.
  client.login(process.env.DISCORD_TOKEN);
})();