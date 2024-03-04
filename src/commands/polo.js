module.exports = {
	name: 'polo',

	description: 'Replies with Marco!',

	callback: async interaction => {
		await interaction.reply('Marco!');
	}
};