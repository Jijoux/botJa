module.exports = {
	name: 'marco',

	description: 'Replies with Polo!',

	callback: async interaction => {
		await interaction.reply('Polo!');
	}
};