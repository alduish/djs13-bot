const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const wait = require('util').promisify(setTimeout);

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);
	return context.font;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info')
		.addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');


		if (user != null) {
			const canvas = Canvas.createCanvas(700, 250);
			const context = canvas.getContext('2d');
			const background = await Canvas.loadImage(path.join(__dirname, 'wallpaper.jpg'));
			context.drawImage(background, 0, 0, canvas.width, canvas.height);
			context.strokeStyle = '#0099ff';
			context.strokeRect(0, 0, canvas.width, canvas.height);
			context.font = applyText(canvas, user.tag);
			context.fillStyle = '#ffffff';
			context.fillText(user.tag, canvas.width / 2.5, canvas.height / 1.8);
			context.beginPath();
			context.arc(125, 125, 100, 0, Math.PI * 2, true);
			context.closePath();
			context.clip();
			const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
			context.drawImage(avatar, 25, 25, 200, 200);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
			await interaction.deferReply();
			await wait(10);
			interaction.editReply({ files: [attachment] });
		} else {
			const canvas = Canvas.createCanvas(700, 250);
			const context = canvas.getContext('2d');
			const background = await Canvas.loadImage(path.join(__dirname, 'wallpaper.jpg'));
			context.drawImage(background, 0, 0, canvas.width, canvas.height);
			context.strokeStyle = '#0099ff';
			context.strokeRect(0, 0, canvas.width, canvas.height);
			context.font = applyText(canvas, interaction.user.tag);
			context.fillStyle = '#ffffff';
			context.fillText(interaction.user.tag, canvas.width / 2.5, canvas.height / 1.8);
			context.beginPath();
			context.arc(125, 125, 100, 0, Math.PI * 2, true);
			context.closePath();
			context.clip();
			const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
			context.drawImage(avatar, 25, 25, 200, 200);

			const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
			await interaction.deferReply();
			await wait(10);
			interaction.editReply({ files: [attachment] });
		}
	},
};