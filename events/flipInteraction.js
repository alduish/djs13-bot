const { MessageComponentInteraction } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isButton()){
			result = Math.random() < 0.5
			console.log(result)
				if (interaction.customId === 'pile') {
					if (result) {
						await interaction.update({ content: 'Win!', components: [] });
						return;
					} else {
						await interaction.update({ content: 'Lose!', components: [] })
						return;
					}
				} else if (interaction.customId === 'face') {
					if (!result) {
						await interaction.update({ content: 'Win!', components: [] });
						return;
					} else {
						await interaction.update({ content: 'Lose!', components: [] })
						return;
					}
				}
		}
	},
};
