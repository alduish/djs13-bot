const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Pile ou Face'),
	async execute(interaction) {
        const pile = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('pile')
                .setLabel('Pile')
                .setStyle('PRIMARY'),
        );

        const face = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('face')
                .setLabel('Face')
                .setStyle('PRIMARY'),
        );

        await interaction.reply({ content: 'Pile ou Face ?', components: [pile, face] });
	},
};
