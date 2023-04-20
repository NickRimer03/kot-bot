import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Events, GatewayIntentBits, Partials } from "discord.js";

export default () => {
  const acceptedUsers = process.env.PRIVILEGED_USERS.split(" ");
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

  client.commands = new Collection();
  const foldersPath = path.join(path.resolve(), "src/cmd");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      (async () => {
        const { command } = await import(filePath);
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      })();
    }
  }

  client.once(Events.ClientReady, (c) => {
    console.log(`Kot is ready for MEOW!\nLogged in as ${c.user.tag}`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!acceptedUsers.includes(interaction.user.id)) {
      await interaction.reply({
        content: "Sorry. You're not allowed to use this bot.",
        ephemeral: true,
      });
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });

  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
      console.log("partial");
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        return;
      }
    } else {
      console.log("not partial");
    }

    console.log(
      `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
    );
    console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
  });

  client.login(process.env.BOT_TOKEN).catch((error) => console.error(error));
};
