const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info')
		.addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(false)),
	async execute(interaction) {
/* 		const user = interaction.options.getUser('target'); */

		const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');
		const background = await Canvas.loadImage(path.join(__dirname, 'wallpaper.jpg'));
		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
		await interaction.deferReply();
		await wait(3000);
		interaction.editReply({ files: [attachment] });

/* 		if (user != null) {
			await interaction.reply({ content :`User's tag: ${user.tag}\nUser's id: ${user.id}`, ephemeral: true});
		} else {
			await interaction.reply({ content :`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`, ephemeral: true});
		} */
	},
};