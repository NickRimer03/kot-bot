import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Kot replies with Meow!"),
  async execute(interaction) {
    await interaction.reply({ content: "Meow!", ephemeral: true });
  },
};
