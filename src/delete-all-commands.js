import { REST, Routes } from "discord.js";

export default () => {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

  (async () => {
    try {
      const { APPLICATION_ID, GUILD_ID } = process.env;

      console.log("Started deleting all commands.");

      await rest
        .put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), {
          body: [],
        })
        .then(() => console.log("Successfully deleted all guild commands."))
        .catch(console.error);
      await rest
        .put(Routes.applicationCommands(APPLICATION_ID), { body: [] })
        .then(() =>
          console.log("Successfully deleted all application commands.")
        )
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })();
};
