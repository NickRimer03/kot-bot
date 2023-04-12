import { REST, Routes } from "discord.js";
import listCommands from "./list-commands.js";

export default () => {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

  (async () => {
    try {
      const { APPLICATION_ID, GUILD_ID } = process.env;
      const commands = await listCommands();

      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      const data = await rest.put(
        Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
        { body: commands }
      );

      // const data = await rest.put(
      //   Routes.applicationCommands(process.env.APPLICATION_ID),
      //   {
      //     body: commands,
      //   }
      // );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  })();
};
