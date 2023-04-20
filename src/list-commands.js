import path from "node:path";
import fs from "node:fs";

export default async () => {
  const commands = [];
  const foldersPath = path.join(path.resolve(), "src/cmd");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      await (async () => {
        const { command } = await import(filePath);
        commands.push(command.data.toJSON());
      })();
    }
  }

  return commands;
};
