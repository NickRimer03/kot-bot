import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies back with your message.")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back.")
        .setRequired(true)
        .setMaxLength(280)
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("The channel to echo into.")
    ),
  async execute(interaction) {
    const text = interaction.options.getString("input");
    const channel =
      interaction.options.getChannel("channel") ??
      interaction.client.channels.cache.get(interaction.channelId);

    await channel?.send(`Echoed: ${text}`);
    await interaction.reply({
      content: "Echo sent!",
      ephemeral: true,
    });
  },
};
