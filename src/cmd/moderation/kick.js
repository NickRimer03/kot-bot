import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Select a member and kick them (but not really).")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("target");

    return interaction.reply({
      content: `You wanted to kick: ${member.user.username}`,
      ephemeral: true,
    });
  },
};
